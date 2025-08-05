import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, CheckCircle, Calendar, Flame } from "lucide-react";

interface StatsData {
  todayTasks: number;
  completedToday: number;
  weekTasks: number;
  currentStreak: number;
}

export default function StatsOverview() {
  const { data: stats, isLoading } = useQuery<StatsData>({
    queryKey: ["/api/analytics/stats"],
  });

  const statCards = [
    {
      title: "Tasks Today",
      value: stats?.todayTasks || 0,
      change: "+2.1%",
      changeText: "from yesterday",
      icon: ClipboardList,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      testId: "stat-today-tasks"
    },
    {
      title: "Completed",
      value: stats?.completedToday || 0,
      change: "+12.5%",
      changeText: "completion rate",
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      testId: "stat-completed"
    },
    {
      title: "This Week",
      value: stats?.weekTasks || 0,
      change: "4",
      changeText: "pending tasks",
      icon: Calendar,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      testId: "stat-week-tasks"
    },
    {
      title: "Streak",
      value: stats?.currentStreak || 0,
      change: "days",
      changeText: "personal best",
      icon: Flame,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      testId: "stat-streak"
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="stats-overview">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6" data-testid={stat.testId}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900" data-testid={`${stat.testId}-value`}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
              <span className="text-sm text-slate-600 ml-2">
                {stat.changeText}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
