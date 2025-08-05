import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Chart.js is loaded via CDN in the HTML, so we declare it globally
declare global {
  interface Window {
    Chart: any;
  }
}

interface PerformanceData {
  date: string;
  tasksCompleted: number;
  tasksCreated: number;
  completionRate: number;
}

export default function PerformanceChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const { data: performanceData, isLoading } = useQuery<PerformanceData[]>({
    queryKey: ["/api/analytics/performance", { days: 7 }],
  });

  useEffect(() => {
    if (!performanceData || !chartRef.current || !window.Chart) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Prepare data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const chartData = last7Days.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const dayData = performanceData.find(d => 
        new Date(d.date).toISOString().split('T')[0] === dateStr
      );
      return {
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: dayData?.tasksCompleted || 0,
        created: dayData?.tasksCreated || 0,
      };
    });

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map(d => d.label),
        datasets: [
          {
            label: 'Tasks Completed',
            data: chartData.map(d => d.completed),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Tasks Created',
            data: chartData.map(d => d.created),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom' as const,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9'
            },
            ticks: {
              stepSize: 1,
            }
          },
          x: {
            grid: {
              color: '#f1f5f9'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [performanceData]);

  if (isLoading) {
    return (
      <Card data-testid="performance-chart-loading">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="performance-chart">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <canvas 
            ref={chartRef} 
            data-testid="performance-chart-canvas"
          />
        </div>
      </CardContent>
    </Card>
  );
}
