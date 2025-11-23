import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock, Award } from "lucide-react";
import { Link } from "wouter";

const modules = [
  {
    id: 1,
    title: "Introduction to Leadership Fundamentals",
    type: "video",
    duration: "45 min",
    completed: true,
  },
  {
    id: 2,
    title: "Building High-Performance Teams",
    type: "text",
    duration: "30 min",
    completed: true,
  },
  {
    id: 3,
    title: "Leadership Challenge: Team Dynamics",
    type: "challenge",
    duration: "60 min",
    completed: false,
  },
  {
    id: 4,
    title: "Effective Communication Strategies",
    type: "video",
    duration: "40 min",
    completed: false,
  },
  {
    id: 5,
    title: "Decision-Making Under Pressure",
    type: "quiz",
    duration: "25 min",
    completed: false,
  },
  {
    id: 6,
    title: "Advanced Leadership Quiz",
    type: "quiz",
    duration: "30 min",
    completed: false,
    locked: true,
  },
];

const typeColors: Record<string, string> = {
  video: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  text: "bg-green-500/10 text-green-700 dark:text-green-400",
  challenge: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  quiz: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

export default function TrailDetail() {
  const completedModules = modules.filter((m) => m.completed).length;
  const totalModules = modules.length;
  const progress = (completedModules / totalModules) * 100;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/trails">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trails
          </Button>
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Advanced Leadership Skills</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Master the art of leading high-performing teams and driving organizational change
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>12 hours</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>{totalModules} modules</span>
              </div>
              <Badge variant="secondary">Intermediate</Badge>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            {completedModules} of {totalModules} modules completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Modules</h2>
        <div className="space-y-4">
          {modules.map((module, index) => (
            <Card
              key={module.id}
              className={`hover-elevate ${module.completed ? "bg-muted/30" : ""}`}
              data-testid={`card-module-${index}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      module.completed
                        ? "bg-primary text-primary-foreground"
                        : module.locked
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {module.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : module.locked ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <PlayCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg mb-1">{module.title}</CardTitle>
                        <CardDescription className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${typeColors[module.type]}`}
                          >
                            {module.type}
                          </Badge>
                          <span>{module.duration}</span>
                        </CardDescription>
                      </div>
                      {!module.locked && (
                        <Button
                          variant={module.completed ? "outline" : "default"}
                          data-testid={`button-module-${index}`}
                        >
                          {module.completed ? "Review" : "Start"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
