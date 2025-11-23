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
  { value: 1, icon: Frown, label: "Muito Baixo", color: "text-red-500" },
  { value: 2, icon: Frown, label: "Baixo", color: "text-orange-500" },
  { value: 3, icon: Meh, label: "Ok", color: "text-yellow-500" },
  { value: 4, icon: Smile, label: "Bom", color: "text-green-500" },
  { value: 5, icon: Smile, label: "Ótimo", color: "text-emerald-500" },
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
      setAiSuggestion(data.aiSuggestion || "Cuide de si mesmo hoje!");
      setSubmitted(true);
    } catch (error) {
      setAiSuggestion("Reserve um momento para refletir sobre seu bem-estar. Lembre-se de equilibrar trabalho e descanso.");
      setSubmitted(true);
    }
  };

  const currentMoodEmoji = moodEmojis.find((m) => m.value === mood);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Bem-estar</h1>
        <p className="text-muted-foreground text-lg">
          Acompanhe sua saúde emocional e mantenha o equilíbrio trabalho-vida
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={submitted ? "opacity-50" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Check-in Diário
            </CardTitle>
            <CardDescription>Como você está se sentindo hoje?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Seu Humor</Label>
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
                <span>Muito Baixo</span>
                <span>Ok</span>
                <span>Ótimo</span>
              </div>
              {currentMoodEmoji && (
                <p className="text-center text-lg font-semibold">
                  {currentMoodEmoji.label}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Notas (Opcional)</Label>
              <Textarea
                id="note"
                placeholder="O que está em sua mente? Algum pensamento ou preocupação?"
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
              {submitted ? "Check-in Enviado" : "Enviar Check-in"}
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
                  Sugestão de Bem-estar IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4">{aiSuggestion}</p>
                <Button variant="outline" className="w-full" data-testid="button-new-checkin" onClick={() => setSubmitted(false)}>
                  Novo Check-in
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendências de Humor (Últimos 7 Dias)</CardTitle>
          <CardDescription>
            Acompanhe seus padrões emocionais ao longo do tempo
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
            <CardTitle className="text-sm font-medium">Humor Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1 / 5.0</div>
            <p className="text-sm text-muted-foreground mt-1">Esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sequência de Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 dias</div>
            <p className="text-sm text-muted-foreground mt-1">Continue assim!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total de Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground mt-1">Todo o tempo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
