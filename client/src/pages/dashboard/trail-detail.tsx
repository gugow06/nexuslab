import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock, Award } from "lucide-react";
import { Link } from "wouter";

const modules = [
  {
    id: 1,
    title: "Introdução aos Fundamentos de Liderança",
    type: "vídeo",
    duration: "45 min",
    completed: true,
  },
  {
    id: 2,
    title: "Construindo Equipes de Alta Performance",
    type: "texto",
    duration: "30 min",
    completed: true,
  },
  {
    id: 3,
    title: "Desafio de Liderança: Dinâmica de Equipe",
    type: "desafio",
    duration: "60 min",
    completed: false,
  },
  {
    id: 4,
    title: "Estratégias de Comunicação Eficaz",
    type: "vídeo",
    duration: "40 min",
    completed: false,
  },
  {
    id: 5,
    title: "Tomada de Decisão Sob Pressão",
    type: "quiz",
    duration: "25 min",
    completed: false,
  },
  {
    id: 6,
    title: "Quiz Avançado de Liderança",
    type: "quiz",
    duration: "30 min",
    completed: false,
    locked: true,
  },
];

const typeColors: Record<string, string> = {
  vídeo: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  texto: "bg-green-500/10 text-green-700 dark:text-green-400",
  desafio: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
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
            Voltar para Trilhas
          </Button>
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Habilidades Avançadas de Liderança</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Domine a arte de liderar equipes de alta performance e impulsionar mudanças organizacionais
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>12 horas</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>{totalModules} módulos</span>
              </div>
              <Badge variant="secondary">Intermediário</Badge>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
          <CardDescription>
            {completedModules} de {totalModules} módulos concluídos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% concluído</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Módulos</h2>
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
                          {module.completed ? "Revisar" : "Iniciar"}
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
