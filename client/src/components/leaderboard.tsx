import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@shared/schema";

interface LeaderboardEntry {
  user: User;
  totalTasks: number;
  completionRate: number;
}

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/analytics/leaderboard", { limit: 10 }],
  });

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-gray-100 text-gray-600";
      case 2:
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getUserDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.email) return user.email.split('@')[0];
    return "User";
  };

  const getUserInitials = (user: User) => {
    const name = getUserDisplayName(user);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card data-testid="leaderboard-loading">
        <CardHeader>
          <CardTitle className="text-lg">Team Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="leaderboard">
      <CardHeader>
        <CardTitle className="text-lg">Team Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {!leaderboard || leaderboard.length === 0 ? (
          <div className="text-center py-4" data-testid="empty-leaderboard">
            <p className="text-slate-600">No leaderboard data available yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.user.id} 
                className="flex items-center space-x-3"
                data-testid={`leaderboard-entry-${index}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(index)}`}
                >
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage 
                    src={entry.user.profileImageUrl || ""} 
                    alt={getUserDisplayName(entry.user)} 
                  />
                  <AvatarFallback className="text-xs">
                    {getUserInitials(entry.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900" data-testid={`leaderboard-name-${index}`}>
                    {getUserDisplayName(entry.user)}
                  </p>
                  <p className="text-xs text-slate-600" data-testid={`leaderboard-completion-${index}`}>
                    {entry.completionRate}% completion
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900" data-testid={`leaderboard-tasks-${index}`}>
                    {entry.totalTasks}
                  </p>
                  <p className="text-xs text-slate-600">tasks</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
