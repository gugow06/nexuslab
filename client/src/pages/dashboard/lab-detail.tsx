import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const scenario = {
  title: "Crisis Management Simulation",
  description:
    "Your team just discovered a critical security vulnerability 24 hours before a major product launch. The vulnerability affects user data, but fixing it requires delaying the launch. Key stakeholders are demanding you proceed as planned.",
  decisions: [
    {
      id: "delay-launch",
      text: "Delay the launch to fix the vulnerability immediately",
      impact: "Protects users but disappoints stakeholders and delays revenue",
      points: 100,
    },
    {
      id: "partial-fix",
      text: "Implement a temporary patch and proceed with launch",
      impact: "Maintains timeline but introduces technical debt and risk",
      points: 60,
    },
    {
      id: "proceed-launch",
      text: "Proceed with launch and fix the issue in the next sprint",
      impact: "Keeps stakeholders happy but exposes users to risk",
      points: 20,
    },
    {
      id: "limited-rollout",
      text: "Launch to a limited user group while fixing the vulnerability",
      impact: "Balances risk and progress, but requires additional coordination",
      points: 85,
    },
  ],
};

export default function LabDetail() {
  const [selectedDecision, setSelectedDecision] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState("");

  const handleSubmit = () => {
    const decision = scenario.decisions.find((d) => d.id === selectedDecision);
    if (decision) {
      setScore(decision.points);
      setAiFeedback(
        `Based on your choice to "${decision.text.toLowerCase()}", you demonstrated ${
          decision.points >= 80
            ? "excellent strategic thinking"
            : decision.points >= 60
            ? "good judgment with room for improvement"
            : "a decision that may need reconsideration"
        }. ${
          decision.points >= 80
            ? "This approach balances user safety with business needs effectively."
            : decision.points >= 60
            ? "Consider how to better balance short-term gains with long-term consequences."
            : "User trust and security should be prioritized over short-term business metrics."
        }`
      );
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/labs">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Labs
          </Button>
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{scenario.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-red-500/10 text-red-700 dark:text-red-400">
                Advanced
              </Badge>
              <Badge variant="secondary">Leadership</Badge>
            </div>
          </div>
        </div>
      </div>

      {!submitted ? (
        <>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardHeader>
              <CardTitle>Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{scenario.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What would you do?</CardTitle>
              <CardDescription>
                Select your decision and submit to receive AI-powered feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                <div className="space-y-4">
                  {scenario.decisions.map((decision, index) => (
                    <Card
                      key={decision.id}
                      className={`hover-elevate cursor-pointer ${
                        selectedDecision === decision.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedDecision(decision.id)}
                      data-testid={`card-decision-${index}`}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value={decision.id} id={decision.id} />
                          <div className="flex-1">
                            <Label
                              htmlFor={decision.id}
                              className="text-base font-semibold cursor-pointer"
                            >
                              {decision.text}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-2">
                              {decision.impact}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
              <Button
                className="w-full mt-6"
                onClick={handleSubmit}
                disabled={!selectedDecision}
                data-testid="button-submit-decision"
              >
                Submit Decision
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <CardTitle>Simulation Complete!</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="text-4xl font-bold">{score}/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">AI Feedback</p>
                  <p className="leading-relaxed">{aiFeedback}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" onClick={() => setSubmitted(false)} data-testid="button-try-again">
                Try Different Approach
              </Button>
              <Link href="/dashboard/labs">
                <Button className="w-full" variant="outline" data-testid="button-explore-labs">
                  Explore More Labs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
