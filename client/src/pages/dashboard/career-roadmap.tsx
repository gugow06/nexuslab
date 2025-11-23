import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const roadmapSteps = [
  {
    title: "Junior Product Manager",
    description: "Your current position",
    skills: ["Product Strategy", "User Research", "Agile Methodologies"],
    timeframe: "Current",
    status: "current",
  },
  {
    title: "Product Manager",
    description: "Master core product management skills",
    skills: ["Data Analysis", "Stakeholder Management", "Feature Prioritization"],
    timeframe: "6-12 months",
    status: "in-progress",
  },
  {
    title: "Senior Product Manager",
    description: "Lead product initiatives and mentor others",
    skills: ["Strategic Planning", "Team Leadership", "Market Analysis"],
    timeframe: "12-18 months",
    status: "pending",
  },
  {
    title: "Director of Product",
    description: "Your target position",
    skills: ["Vision Setting", "Cross-functional Leadership", "Business Strategy"],
    timeframe: "24-36 months",
    status: "target",
  },
];

export default function CareerRoadmap() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">Career Roadmap</h1>
          <Button data-testid="button-regenerate-roadmap">
            <Sparkles className="mr-2 h-4 w-4" />
            Regenerate with AI
          </Button>
        </div>
        <p className="text-muted-foreground text-lg">
          Your personalized path from Junior Product Manager to Director of Product
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>AI-Generated Career Path</CardTitle>
          <CardDescription>
            Based on your skills, experience, and target role, Nexus.AI has created this personalized roadmap
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="relative space-y-6">
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {index < roadmapSteps.length - 1 && (
              <div className="absolute left-6 top-24 w-0.5 h-12 bg-border" />
            )}
            <Card
              className={`hover-elevate ${
                step.status === "current"
                  ? "border-primary bg-primary/5"
                  : step.status === "target"
                  ? "border-chart-2 bg-chart-2/5"
                  : ""
              }`}
              data-testid={`card-roadmap-step-${index}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "current"
                        ? "bg-primary text-primary-foreground"
                        : step.status === "in-progress"
                        ? "bg-chart-1 text-primary-foreground"
                        : step.status === "target"
                        ? "bg-chart-2 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.status === "current" || step.status === "in-progress" ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Circle className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <CardTitle className="text-2xl mb-1">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{step.timeframe}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" data-testid={`badge-skill-${index}-${skillIndex}`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {step.status === "in-progress" && (
                    <Button variant="outline" data-testid={`button-view-plan-${index}`}>
                      View Learning Plan <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Focus on these actions to progress along your career path
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Complete "Data Analysis Fundamentals" trail to strengthen analytical skills</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Take the "Stakeholder Management" digital lab simulation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Apply to Product Manager positions that match your skill level</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
