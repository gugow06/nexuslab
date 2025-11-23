import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, FlaskConical, Briefcase, ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const stats = [
  { label: "Skills Acquired", value: 12, icon: Award, color: "text-chart-1" },
  { label: "XP Earned", value: 2450, icon: TrendingUp, color: "text-chart-2" },
  { label: "Labs Completed", value: 8, icon: FlaskConical, color: "text-chart-3" },
  { label: "Opportunities", value: 24, icon: Briefcase, color: "text-chart-4" },
];

const activeTrails = [
  {
    id: 1,
    title: "Advanced Leadership Skills",
    progress: 65,
    difficulty: "intermediate",
    thumbnail: "leadership",
  },
  {
    id: 2,
    title: "Data-Driven Decision Making",
    progress: 30,
    difficulty: "advanced",
    thumbnail: "data",
  },
  {
    id: 3,
    title: "Strategic Communication",
    progress: 85,
    difficulty: "beginner",
    thumbnail: "communication",
  },
];

const recommendations = [
  {
    type: "trail",
    title: "Complete 'Strategic Communication' trail",
    description: "You're 85% done! Finish the last module to earn 150 XP",
  },
  {
    type: "lab",
    title: "Try the Crisis Management Simulation",
    description: "Based on your leadership skills, this lab will challenge your decision-making",
  },
  {
    type: "opportunity",
    title: "Senior Product Manager role at TechCorp",
    description: "Your skills match 90% of the requirements",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">Welcome back, Alex</h1>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3 text-orange-500" />
            <span>7 day streak</span>
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Continue your journey to excellence
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20" data-testid="card-daily-challenge">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Challenge
          </CardTitle>
          <CardDescription>Complete today's challenge to earn bonus XP</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Complete one module from any active trail</p>
          <Progress value={0} className="mb-2" />
          <p className="text-sm text-muted-foreground">0/1 modules completed</p>
        </CardContent>
      </Card>

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
          {activeTrails.map((trail, index) => (
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
                    <Progress value={trail.progress} />
                    <p className="text-sm text-muted-foreground">
                      {trail.progress}% complete
                    </p>
                  </div>
                  <Button className="w-full mt-4" variant="outline" data-testid={`button-continue-${index}`}>
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">AI Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-recommendation-${index}`}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" data-testid={`button-recommendation-${index}`}>
                  Take Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
