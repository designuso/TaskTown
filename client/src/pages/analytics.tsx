import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BarChart3, TrendingUp, Download, Calendar } from "lucide-react";
import PerformanceChart from "@/components/performance-chart";
import Leaderboard from "@/components/leaderboard";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/footer";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7");
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/stats"],
  });

  const { data: performanceData, isLoading: performanceLoading } = useQuery({
    queryKey: ["/api/analytics/performance", { days: parseInt(timeRange) }],
  });

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Your performance report is being generated...",
    });
    // TODO: Implement actual export functionality
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const getInsights = () => {
    if (!stats) return [];
    
    const insights = [];
    
    // Completion rate insight
    const completionRate = stats.todayTasks > 0 ? (stats.completedToday / stats.todayTasks) * 100 : 0;
    if (completionRate >= 80) {
      insights.push({
        type: "success",
        title: "Excellent Performance!",
        description: `You've completed ${completionRate.toFixed(1)}% of today's tasks.`,
        icon: TrendingUp,
        color: "text-green-600"
      });
    } else if (completionRate >= 50) {
      insights.push({
        type: "warning",
        title: "Good Progress",
        description: `You've completed ${completionRate.toFixed(1)}% of today's tasks. Keep going!`,
        icon: BarChart3,
        color: "text-yellow-600"
      });
    } else {
      insights.push({
        type: "info",
        title: "Room for Improvement",
        description: `You've completed ${completionRate.toFixed(1)}% of today's tasks. Let's push forward!`,
        icon: BarChart3,
        color: "text-blue-600"
      });
    }

    // Streak insight
    if (stats.currentStreak >= 7) {
      insights.push({
        type: "success",
        title: "Amazing Streak!",
        description: `You're on a ${stats.currentStreak}-day completion streak!`,
        icon: TrendingUp,
        color: "text-green-600"
      });
    } else if (stats.currentStreak >= 3) {
      insights.push({
        type: "info",
        title: "Building Momentum",
        description: `Keep it up! You're on a ${stats.currentStreak}-day streak.`,
        icon: Calendar,
        color: "text-blue-600"
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-to-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="text-slate-600 mt-2">Track your productivity and performance over time.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40" data-testid="select-time-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="60">Last 60 days</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleExportReport}
                variant="outline"
                data-testid="button-export-analytics"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-slate-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card data-testid="analytics-today-tasks">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{stats?.todayTasks || 0}</p>
                  <p className="text-sm text-slate-600">Tasks Today</p>
                </div>
              </CardContent>
            </Card>
            <Card data-testid="analytics-completed-today">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{stats?.completedToday || 0}</p>
                  <p className="text-sm text-slate-600">Completed Today</p>
                </div>
              </CardContent>
            </Card>
            <Card data-testid="analytics-week-tasks">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{stats?.weekTasks || 0}</p>
                  <p className="text-sm text-slate-600">This Week</p>
                </div>
              </CardContent>
            </Card>
            <Card data-testid="analytics-streak">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{stats?.currentStreak || 0}</p>
                  <p className="text-sm text-slate-600">Day Streak</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <Card key={index} data-testid={`insight-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${insight.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Charts and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PerformanceChart />
          </div>
          <div className="space-y-6">
            <Leaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}