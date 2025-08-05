import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import TaskModal from "./task-modal";
import type { TaskWithCategory } from "@shared/schema";

export default function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<TaskWithCategory[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await apiRequest("POST", `/api/tasks/${taskId}/complete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      toast({
        title: "Task completed!",
        description: "Great job on completing your task.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to complete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredTasks = tasks?.filter(task => {
    if (selectedCategory === "all") return true;
    return task.categoryId === selectedCategory;
  }) || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName?.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-800";
      case "personal":
        return "bg-purple-100 text-purple-800";
      case "health":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (dueDate: string | Date | null, status: string) => {
    if (!dueDate || status === "completed") return false;
    return new Date(dueDate) < new Date();
  };

  const formatDueDate = (dueDate: string | Date | null, status: string) => {
    if (!dueDate) return "No due time";
    if (status === "completed") return `Completed at ${new Date(dueDate).toLocaleTimeString()}`;
    
    const due = new Date(dueDate);
    const now = new Date();
    
    if (isOverdue(dueDate, status)) {
      return `Overdue: ${due.toLocaleDateString()} ${due.toLocaleTimeString()}`;
    }
    
    if (due.toDateString() === now.toDateString()) {
      return `Due: ${due.toLocaleTimeString()}`;
    }
    
    return `Due: ${due.toLocaleDateString()} ${due.toLocaleTimeString()}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Today's Tasks</h3>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-slate-200 rounded animate-pulse"></div>
                  <div className="w-1/2 h-3 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card data-testid="task-list">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Today's Tasks</h3>
            <div className="flex items-center space-x-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48" data-testid="select-category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {(categories as any[])?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-blue-600"
                data-testid="button-add-task"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8" data-testid="empty-tasks">
              <p className="text-slate-600">No tasks found. Create your first task!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors ${
                    task.status === "completed" 
                      ? "bg-green-50 border-green-200" 
                      : isOverdue(task.dueDate, task.status)
                        ? "bg-red-50 border-red-200"
                        : "border-slate-200"
                  }`}
                  data-testid={`task-${task.id}`}
                >
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => {
                      if (task.status !== "completed") {
                        completeTaskMutation.mutate(task.id);
                      }
                    }}
                    disabled={completeTaskMutation.isPending}
                    data-testid={`checkbox-task-${task.id}`}
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium text-slate-900 ${
                      task.status === "completed" ? "line-through" : ""
                    }`} data-testid={`task-title-${task.id}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-2">
                      {task.category && (
                        <Badge 
                          className={getCategoryColor(task.category.name)}
                          data-testid={`task-category-${task.id}`}
                        >
                          {task.category.name}
                        </Badge>
                      )}
                      <Badge 
                        className={getPriorityColor(task.priority)}
                        data-testid={`task-priority-${task.id}`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </Badge>
                      <span 
                        className={`text-sm ${
                          isOverdue(task.dueDate, task.status) 
                            ? "text-red-600 font-medium" 
                            : "text-slate-500"
                        }`}
                        data-testid={`task-due-date-${task.id}`}
                      >
                        {formatDueDate(task.dueDate, task.status)}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" data-testid={`button-task-menu-${task.id}`}>
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TaskModal 
        open={showModal} 
        onOpenChange={setShowModal}
      />
    </>
  );
}
