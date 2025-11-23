import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Target, Flame, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";

const leaderboard = [
  { rank: 1, name: "Sarah Chen", xp: 15420, level: 24, avatar: "SC" },
  { rank: 2, name: "Marcus Rodriguez", xp: 14850, level: 23, avatar: "MR" },
  { rank: 3, name: "Emily Watson", xp: 13920, level: 22, avatar: "EW" },
  { rank: 4, name: "Alex Johnson", xp: 12450, level: 21, avatar: "AJ" },
  { rank: 5, name: "David Kim", xp: 11890, level: 20, avatar: "DK" },
  { rank: 6, name: "Lisa Anderson", xp: 11230, level: 20, avatar: "LA" },
  { rank: 7, name: "James Turner", xp: 10890, level: 19, avatar: "JT" },
  { rank: 8, name: "Maria Garcia", xp: 10450, level: 19, avatar: "MG" },
  { rank: 9, name: "Ryan Parker", xp: 9820, level: 18, avatar: "RP" },
  { rank: 10, name: "Nina Patel", xp: 9450, level: 18, avatar: "NP" },
];

const challenges = [
  {
    title: "Complete 3 Módulos de Trilha",
    description: "Conclua 3 módulos de suas trilhas ativas",
    reward: 150,
    progress: 2,
    total: 3,
    type: "diário",
  },
  {
    title: "Pontuação 80+ em Qualquer Lab",
    description: "Alcance uma pontuação alta em uma simulação de laboratório digital",
    reward: 200,
    progress: 0,
    total: 1,
    type: "diário",
  },
  {
    title: "Consistência Semanal",
    description: "Faça login e complete atividades por 7 dias consecutivos",
    reward: 500,
    progress: 4,
    total: 7,
    type: "semanal",
  },
  {
    title: "Mestre de Habilidades",
    description: "Alcance 90% de proficiência em qualquer habilidade",
    reward: 300,
    progress: 85,
    total: 90,
    type: "conquista",
  },
];

const achievements = [
  { title: "Primeiros Passos", icon: Award, unlocked: true },
  { title: "Desbravador", icon: TrendingUp, unlocked: true },
  { title: "Praticante de Lab", icon: Zap, unlocked: true },
  { title: "Mestre da Sequência", icon: Flame, unlocked: false },
  { title: "Líder da Comunidade", icon: Trophy, unlocked: false },
  { title: "Colecionador de Habilidades", icon: Target, unlocked: false },
];

export default function Community() {
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const currentLevel = 8;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Comunidade 1%</h1>
        <p className="text-muted-foreground text-lg">
          Junte-se à elite. Compita, cresça e alcance a excelência.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Nível {currentLevel}</span>
                <span className="text-sm text-muted-foreground">
                  {currentXP} / {nextLevelXP} XP
                </span>
              </div>
              <Progress value={xpProgress} className="[&>div]:bg-primary" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{currentXP}</p>
                <p className="text-sm text-muted-foreground">XP Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-chart-1">{currentLevel}</p>
                <p className="text-sm text-muted-foreground">Nível</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">7</p>
                <p className="text-sm text-muted-foreground">Dias de Sequência</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-chart-2" />
              Conquistas
            </CardTitle>
            <CardDescription>
              {achievements.filter((a) => a.unlocked).length} / {achievements.length} desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`h-16 w-16 rounded-md flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`achievement-${index}`}
                >
                  <achievement.icon className="h-7 w-7" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Desafios Ativos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-challenge-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1 flex-shrink-0">
                    <Zap className="h-3 w-3" />
                    {challenge.reward} XP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress
                    value={(challenge.progress / challenge.total) * 100}
                    className="[&>div]:bg-chart-1"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {challenge.progress} / {challenge.total}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {challenge.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Ranking</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 hover-elevate ${
                    user.rank === 4 ? "bg-primary/5" : ""
                  }`}
                  data-testid={`leaderboard-item-${index}`}
                >
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center font-bold flex-shrink-0 ${
                      user.rank === 1
                        ? "bg-yellow-500 text-yellow-950"
                        : user.rank === 2
                        ? "bg-gray-400 text-gray-950"
                        : user.rank === 3
                        ? "bg-orange-600 text-orange-950"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <Avatar>
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">Nível {user.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{user.xp.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">XP</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
