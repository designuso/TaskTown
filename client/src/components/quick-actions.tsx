import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Your performance report is being generated...",
    });
    // TODO: Implement actual export functionality
  };

  const handleScheduleReminder = () => {
    toast({
      title: "Reminder Feature",
      description: "Reminder scheduling will be available soon!",
    });
    // TODO: Implement reminder scheduling
  };

  const handleViewCalendar = () => {
    toast({
      title: "Calendar View",
      description: "Calendar integration coming soon!",
    });
    // TODO: Implement calendar view
  };

  const actions = [
    {
      title: "Export Report",
      description: "Download performance data",
      icon: Download,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      onClick: handleExportReport,
      testId: "button-export-report"
    },
    {
      title: "Set Reminder",
      description: "Schedule notifications",
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      onClick: handleScheduleReminder,
      testId: "button-schedule-reminder"
    },
    {
      title: "View Calendar",
      description: "See upcoming tasks",
      icon: Calendar,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      onClick: handleViewCalendar,
      testId: "button-view-calendar"
    },
  ];

  return (
    <Card data-testid="quick-actions">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="w-full flex items-center space-x-3 p-3 h-auto text-left justify-start hover:bg-slate-50"
                onClick={action.onClick}
                data-testid={action.testId}
              >
                <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{action.title}</p>
                  <p className="text-xs text-slate-600">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
