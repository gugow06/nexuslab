import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, FlaskConical, Briefcase, ArrowRight, Flame, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";

export default function DashboardHome() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  const stats = [
    { label: "Skills Acquired", value: data?.stats?.skillsAcquired || 0, icon: Award, color: "text-chart-1" },
    { label: "XP Earned", value: data?.stats?.xpEarned || 0, icon: TrendingUp, color: "text-chart-2" },
    { label: "Labs Completed", value: data?.stats?.labsCompleted || 0, icon: FlaskConical, color: "text-chart-3" },
    { label: "Opportunities", value: data?.stats?.opportunities || 0, icon: Briefcase, color: "text-chart-4" },
  ];

  const activeTrails = data?.activeTrails || [];
  const streak = data?.streak || 0;
  const dailyChallenge = data?.dailyChallenge;
  const recommendations = data?.recommendations || [];
  const recentWellbeing = data?.recentWellbeing || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'there'}</h1>
          {streak > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1" data-testid="badge-streak">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>{streak} day streak</span>
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-lg">
          Continue your journey to excellence
        </p>
      </div>

      {dailyChallenge && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20" data-testid="card-daily-challenge">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Daily Challenge
            </CardTitle>
            <CardDescription>Complete today's challenge to earn bonus XP</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{dailyChallenge.description}</p>
            <Progress value={dailyChallenge.progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {dailyChallenge.progress}% complete • {dailyChallenge.xpReward} XP reward
            </p>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card data-testid={`card-stat-${index}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Active Trails</h2>
          <Link href="/dashboard/trails">
            <Button variant="ghost" data-testid="link-view-all-trails">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTrails.length > 0 ? (
            activeTrails.map((trail, index) => (
              <motion.div
                key={trail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover-elevate" data-testid={`card-trail-${index}`}>
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-md" />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{trail.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={trail.progress || 0} />
                      <p className="text-sm text-muted-foreground">
                        {trail.progress || 0}% complete
                      </p>
                    </div>
                    <Link href={`/dashboard/trails/${trail.id}`}>
                      <Button className="w-full mt-4" variant="outline" data-testid={`button-continue-${index}`}>
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No active trails yet</p>
                <Link href="/dashboard/trails">
                  <Button variant="outline">Browse Learning Trails</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {recentWellbeing.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent Well-being Check-ins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentWellbeing.map((log: any, index: number) => (
              <Card key={index} data-testid={`card-wellbeing-${index}`}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">Mood: {log.mood}/5</p>
                  {log.note && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{log.note}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6">Personalized Recommendations</h2>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec: any, index: number) => (
              <Card key={index} className="hover-elevate" data-testid={`card-recommendation-${index}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={rec.action}>
                    <Button variant="outline" data-testid={`button-recommendation-${index}`}>
                      Take Action <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">
                Complete activities to get personalized recommendations
              </p>
              <Link href="/dashboard/trails">
                <Button variant="outline">Explore Learning Trails</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
