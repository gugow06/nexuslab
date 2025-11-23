import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const trails = [
  {
    id: 1,
    title: "Advanced Leadership Skills",
    description: "Master the art of leading high-performing teams and driving organizational change",
    difficulty: "intermediate",
    category: "Leadership",
    estimatedHours: 12,
    modules: 8,
    thumbnail: "leadership",
  },
  {
    id: 2,
    title: "Data-Driven Decision Making",
    description: "Learn to leverage data analytics and insights for strategic business decisions",
    difficulty: "advanced",
    category: "Data",
    estimatedHours: 16,
    modules: 10,
    thumbnail: "data",
  },
  {
    id: 3,
    title: "Strategic Communication",
    description: "Develop communication skills for executive presentations and stakeholder management",
    difficulty: "beginner",
    category: "Communication",
    estimatedHours: 8,
    modules: 6,
    thumbnail: "communication",
  },
  {
    id: 4,
    title: "Product Innovation",
    description: "Create breakthrough products through design thinking and customer insights",
    difficulty: "intermediate",
    category: "Product",
    estimatedHours: 14,
    modules: 9,
    thumbnail: "innovation",
  },
  {
    id: 5,
    title: "Financial Strategy",
    description: "Understand financial metrics and create value-driven business strategies",
    difficulty: "advanced",
    category: "Finance",
    estimatedHours: 18,
    modules: 12,
    thumbnail: "finance",
  },
  {
    id: 6,
    title: "Agile Methodologies",
    description: "Master agile frameworks for faster delivery and continuous improvement",
    difficulty: "beginner",
    category: "Methodology",
    estimatedHours: 10,
    modules: 7,
    thumbnail: "agile",
  },
];

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-700 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function LearningTrails() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Learning Trails</h1>
        <p className="text-muted-foreground text-lg">
          Structured learning paths to master in-demand skills
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trails..."
            className="pl-10"
            data-testid="input-search-trails"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All Trails</TabsTrigger>
          <TabsTrigger value="in-progress" data-testid="tab-in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trails.map((trail, index) => (
              <motion.div
                key={trail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover-elevate h-full flex flex-col" data-testid={`card-trail-${index}`}>
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-md flex items-center justify-center">
                    <TrendingUp className="h-16 w-16 text-primary/40" />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg leading-tight">{trail.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${difficultyColors[trail.difficulty]}`}
                      >
                        {trail.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {trail.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{trail.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{trail.modules} modules</span>
                      </div>
                    </div>
                    <Link href={`/dashboard/trails/${trail.id}`}>
                      <Button className="w-full" variant="outline" data-testid={`button-start-trail-${index}`}>
                        Start Trail
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No trails in progress yet</p>
            <Button className="mt-4" variant="outline">
              Browse All Trails
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No completed trails yet</p>
            <Button className="mt-4" variant="outline">
              Start Learning
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
