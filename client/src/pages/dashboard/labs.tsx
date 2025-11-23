import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FlaskConical, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const labs = [
  {
    id: 1,
    name: "Crisis Management Simulation",
    description: "Navigate a product launch crisis and make critical decisions under pressure",
    difficulty: "advanced",
    category: "Leadership",
    completions: 1240,
  },
  {
    id: 2,
    name: "Stakeholder Negotiation",
    description: "Balance competing priorities and negotiate win-win solutions",
    difficulty: "intermediate",
    category: "Communication",
    completions: 2150,
  },
  {
    id: 3,
    name: "Budget Allocation Challenge",
    description: "Optimize resource allocation across multiple projects with constraints",
    difficulty: "intermediate",
    category: "Finance",
    completions: 1890,
  },
  {
    id: 4,
    name: "Team Conflict Resolution",
    description: "Address team dynamics and resolve interpersonal conflicts effectively",
    difficulty: "beginner",
    category: "Leadership",
    completions: 3420,
  },
  {
    id: 5,
    name: "Market Entry Strategy",
    description: "Develop and execute a go-to-market strategy for a new product",
    difficulty: "advanced",
    category: "Strategy",
    completions: 980,
  },
  {
    id: 6,
    name: "Data-Driven Decision Making",
    description: "Analyze datasets and make strategic recommendations based on insights",
    difficulty: "intermediate",
    category: "Analytics",
    completions: 1650,
  },
];

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-700 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function DigitalLabs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Digital Labs</h1>
        <p className="text-muted-foreground text-lg">
          Practice real-world scenarios in risk-free simulations
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search labs..."
            className="pl-10"
            data-testid="input-search-labs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover-elevate h-full flex flex-col" data-testid={`card-lab-${index}`}>
              <div className="h-40 bg-gradient-to-br from-chart-3/20 to-chart-3/5 rounded-t-md flex items-center justify-center">
                <FlaskConical className="h-16 w-16 text-chart-3/40" />
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg leading-tight">{lab.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${difficultyColors[lab.difficulty]}`}
                  >
                    {lab.difficulty}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {lab.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{lab.completions.toLocaleString()} completions</span>
                </div>
                <Link href={`/dashboard/labs/${lab.id}`}>
                  <Button className="w-full" data-testid={`button-start-lab-${index}`}>
                    Start Simulation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
