import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock, Award } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { LearningTrail, TrailModule, UserTrailProgress } from "@shared/schema";

const typeColors: Record<string, string> = {
  vídeo: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  texto: "bg-green-500/10 text-green-700 dark:text-green-400",
  desafio: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  quiz: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

const typeMap: Record<string, string> = {
  video: "vídeo",
  text: "texto",
  challenge: "desafio",
  quiz: "quiz",
};

const difficultyMap: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

type TrailWithModules = LearningTrail & {
  modules: TrailModule[];
};

export default function TrailDetail() {
  const [, params] = useRoute("/dashboard/trails/:id");
  const trailId = params?.id ? parseInt(params.id) : null;
  const { toast } = useToast();

  const { data: trail, isLoading: isLoadingTrail } = useQuery<TrailWithModules>({
    queryKey: ['/api/trails', trailId],
    enabled: !!trailId,
  });

  const { data: progress, isLoading: isLoadingProgress } = useQuery<UserTrailProgress>({
    queryKey: ['/api/user/trail-progress', trailId],
    queryFn: async () => {
      if (!trailId) return { completedModules: [], progressPercentage: 0 };
      const res = await fetch(`/api/user/trail-progress/${trailId}`, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 404) return { completedModules: [], progressPercentage: 0 };
        throw new Error("Failed to fetch progress");
      }
      return res.json();
    },
    enabled: !!trailId,
  });

  const completeMutation = useMutation({
    mutationFn: async (moduleId: number) => {
      if (!trailId || !trail) return;

      const completedModules = progress?.completedModules || [];
      const newCompletedModules = completedModules.includes(moduleId)
        ? completedModules
        : [...completedModules, moduleId];

      const totalModules = trail.modules.length;
      const progressPercentage = totalModules > 0 
        ? Math.round((newCompletedModules.length / totalModules) * 100)
        : 0;

      await apiRequest("POST", `/api/trails/${trailId}/progress`, {
        completedModules: newCompletedModules,
        progressPercentage,
      });

      return { moduleId, progressPercentage };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/trail-progress', trailId] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/trail-progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/trails', trailId] });

      toast({
        title: "Módulo concluído!",
        description: data?.progressPercentage === 100 
          ? "Parabéns! Você concluiu toda a trilha!"
          : "Continue aprendendo para completar a trilha.",
      });
    },
    onError: (error) => {
      console.error("Error completing module:", error);
      toast({
        title: "Erro ao completar módulo",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const { completedModules, totalModules, progressPercentage, modulesWithStatus } = useMemo(() => {
    const completed = progress?.completedModules || [];
    const total = trail?.modules?.length || 0;
    const percentage = progress?.progressPercentage || 0;

    const modulesStatus = trail?.modules?.map((module, index) => {
      const isCompleted = completed.includes(module.id);
      const isLocked = index > 0 && !completed.includes(trail.modules[index - 1].id);
      
      return {
        ...module,
        completed: isCompleted,
        locked: isLocked,
      };
    }) || [];

    return {
      completedModules: completed.length,
      totalModules: total,
      progressPercentage: percentage,
      modulesWithStatus: modulesStatus,
    };
  }, [trail, progress]);

  const isLoading = isLoadingTrail || isLoadingProgress;

  if (!trailId) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Trilha não encontrada</p>
        <Link href="/dashboard/trails">
          <Button className="mt-4" variant="outline" data-testid="button-back">
            Voltar para Trilhas
          </Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-full mb-1" />
          <Skeleton className="h-6 w-5/6 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-2 w-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Trilha não encontrada</p>
        <Link href="/dashboard/trails">
          <Button className="mt-4" variant="outline" data-testid="button-back">
            Voltar para Trilhas
          </Button>
        </Link>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-2" data-testid="text-trail-title">
              {trail.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-4" data-testid="text-trail-description">
              {trail.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span data-testid="text-estimated-hours">{trail.estimatedHours || 0} horas</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span data-testid="text-modules-count">{totalModules} módulos</span>
              </div>
              <Badge variant="secondary" data-testid="badge-difficulty">
                {difficultyMap[trail.difficulty] || trail.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
          <CardDescription data-testid="text-progress-description">
            {completedModules} de {totalModules} módulos concluídos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-2" data-testid="progress-bar" />
          <p className="text-sm text-muted-foreground" data-testid="text-progress-percentage">
            {Math.round(progressPercentage)}% concluído
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Módulos</h2>
        <div className="space-y-4">
          {modulesWithStatus.map((module) => {
            const typeLabel = typeMap[module.type] || module.type;
            
            return (
              <Card
                key={module.id}
                className={`hover-elevate ${module.completed ? "bg-muted/30" : ""}`}
                data-testid={`card-module-${module.id}`}
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
                      data-testid={`icon-module-${module.id}`}
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
                          <CardTitle className="text-lg mb-1" data-testid={`text-module-title-${module.id}`}>
                            {module.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-3">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${typeColors[typeLabel]}`}
                              data-testid={`badge-type-${module.id}`}
                            >
                              {typeLabel}
                            </Badge>
                          </CardDescription>
                        </div>
                        {!module.locked && (
                          <Button
                            variant={module.completed ? "outline" : "default"}
                            onClick={() => !module.completed && completeMutation.mutate(module.id)}
                            disabled={completeMutation.isPending}
                            data-testid={`button-module-${module.id}`}
                          >
                            {module.completed ? "Revisar" : completeMutation.isPending ? "Salvando..." : "Completar"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
