import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Heart, TrendingUp, Smile, Meh, Frown } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodData = [
  { date: "Mon", mood: 4 },
  { date: "Tue", mood: 3 },
  { date: "Wed", mood: 4 },
  { date: "Thu", mood: 5 },
  { date: "Fri", mood: 4 },
  { date: "Sat", mood: 5 },
  { date: "Sun", mood: 4 },
];

const moodEmojis = [
  { value: 1, icon: Frown, label: "Very Low", color: "text-red-500" },
  { value: 2, icon: Frown, label: "Low", color: "text-orange-500" },
  { value: 3, icon: Meh, label: "Okay", color: "text-yellow-500" },
  { value: 4, icon: Smile, label: "Good", color: "text-green-500" },
  { value: 5, icon: Smile, label: "Great", color: "text-emerald-500" },
];

export default function Wellbeing() {
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/wellbeing/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "mock-user-id", // TODO: Get from auth context
          mood,
          note: note || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit check-in");

      const data = await response.json();
      setAiSuggestion(data.aiSuggestion || "Take care of yourself today!");
      setSubmitted(true);
    } catch (error) {
      setAiSuggestion("Take a moment to reflect on your well-being. Remember to balance work and rest.");
      setSubmitted(true);
    }
  };

  const currentMoodEmoji = moodEmojis.find((m) => m.value === mood);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Well-being</h1>
        <p className="text-muted-foreground text-lg">
          Track your emotional health and maintain work-life balance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={submitted ? "opacity-50" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Daily Check-in
            </CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Your Mood</Label>
              <div className="flex items-center justify-center py-6">
                {currentMoodEmoji && (
                  <currentMoodEmoji.icon
                    className={`h-24 w-24 ${currentMoodEmoji.color}`}
                  />
                )}
              </div>
              <Slider
                value={[mood]}
                onValueChange={(value) => setMood(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
                disabled={submitted}
                data-testid="slider-mood"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Very Low</span>
                <span>Okay</span>
                <span>Great</span>
              </div>
              {currentMoodEmoji && (
                <p className="text-center text-lg font-semibold">
                  {currentMoodEmoji.label}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Notes (Optional)</Label>
              <Textarea
                id="note"
                placeholder="What's on your mind? Any thoughts or concerns?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                disabled={submitted}
                data-testid="textarea-note"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={submitted}
              data-testid="button-submit-checkin"
            >
              {submitted ? "Check-in Submitted" : "Submit Check-in"}
            </Button>
          </CardContent>
        </Card>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Wellness Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4">{aiSuggestion}</p>
                <Button variant="outline" className="w-full" data-testid="button-new-checkin" onClick={() => setSubmitted(false)}>
                  New Check-in
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Trends (Last 7 Days)</CardTitle>
          <CardDescription>
            Track your emotional patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1 / 5.0</div>
            <p className="text-sm text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Check-in Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-sm text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
