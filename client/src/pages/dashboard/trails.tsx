import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Clock, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { LearningTrail, UserTrailProgress } from "@shared/schema";

const difficultyColors: Record<string, string> = {
  iniciante: "bg-green-500/10 text-green-700 dark:text-green-400",
  intermediário: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  avançado: "bg-red-500/10 text-red-700 dark:text-red-400",
};

const difficultyMap: Record<string, string> = {
  beginner: "iniciante",
  intermediate: "intermediário",
  advanced: "avançado",
};

type TrailWithProgress = LearningTrail & {
  modulesCount?: number;
  progress?: number;
};

export default function LearningTrails() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { data: trails, isLoading: isLoadingTrails } = useQuery<LearningTrail[]>({
    queryKey: ['/api/trails'],
  });

  const { data: userProgress, isLoading: isLoadingProgress } = useQuery<UserTrailProgress[]>({
    queryKey: ['/api/user/trail-progress'],
  });

  const { data: allTrailsWithModules } = useQuery({
    queryKey: ['/api/trails/with-modules'],
    queryFn: async () => {
      if (!trails) return [];
      const trailsWithModules = await Promise.all(
        trails.map(async (trail) => {
          try {
            const response = await fetch(`/api/trails/${trail.id}`);
            if (!response.ok) return { ...trail, modules: [] };
            const data = await response.json();
            return data;
          } catch {
            return { ...trail, modules: [] };
          }
        })
      );
      return trailsWithModules;
    },
    enabled: !!trails && trails.length > 0,
  });

  const trailsWithProgress: TrailWithProgress[] = useMemo(() => {
    if (!trails) return [];
    
    const moduleCounts = allTrailsWithModules?.reduce((acc, trail) => {
      acc[trail.id] = trail.modules?.length || 0;
      return acc;
    }, {} as Record<number, number>) || {};

    return trails.map((trail) => {
      const progress = userProgress?.find((p) => p.trailId === trail.id);
      return {
        ...trail,
        modulesCount: moduleCounts[trail.id] || 0,
        progress: progress?.progressPercentage || 0,
      };
    });
  }, [trails, userProgress, allTrailsWithModules]);

  const filteredTrails = useMemo(() => {
    let filtered = trailsWithProgress;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (trail) =>
          trail.title.toLowerCase().includes(query) ||
          trail.description.toLowerCase().includes(query) ||
          trail.category.toLowerCase().includes(query)
      );
    }

    if (activeTab === "in-progress") {
      filtered = filtered.filter((trail) => (trail.progress || 0) > 0 && (trail.progress || 0) < 100);
    } else if (activeTab === "completed") {
      filtered = filtered.filter((trail) => (trail.progress || 0) === 100);
    }

    return filtered;
  }, [trailsWithProgress, searchQuery, activeTab]);

  const isLoading = isLoadingTrails || isLoadingProgress;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Trilhas de Aprendizado</h1>
        <p className="text-muted-foreground text-lg">
          Caminhos de aprendizado estruturados para dominar habilidades em alta demanda
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar trilhas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-trails"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">Todas as Trilhas</TabsTrigger>
          <TabsTrigger value="in-progress" data-testid="tab-in-progress">Em Andamento</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <Skeleton className="h-40 rounded-t-md" />
                  <CardHeader className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredTrails.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Nenhuma trilha encontrada"
                  : activeTab === "in-progress"
                  ? "Nenhuma trilha em andamento ainda"
                  : activeTab === "completed"
                  ? "Nenhuma trilha concluída ainda"
                  : "Nenhuma trilha disponível"}
              </p>
              {activeTab !== "all" && (
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("all")}
                  data-testid="button-view-all"
                >
                  {activeTab === "in-progress" ? "Explorar Todas as Trilhas" : "Começar a Aprender"}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrails.map((trail, index) => {
                const difficultyLabel = difficultyMap[trail.difficulty] || trail.difficulty;
                const hasProgress = (trail.progress || 0) > 0;

                return (
                  <motion.div
                    key={trail.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="hover-elevate h-full flex flex-col" data-testid={`card-trail-${trail.id}`}>
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-md flex items-center justify-center">
                        <TrendingUp className="h-16 w-16 text-primary/40" />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg leading-tight" data-testid={`text-trail-title-${trail.id}`}>
                            {trail.title}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${difficultyColors[difficultyLabel]}`}
                            data-testid={`badge-difficulty-${trail.id}`}
                          >
                            {difficultyLabel}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2" data-testid={`text-trail-description-${trail.id}`}>
                          {trail.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {hasProgress && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Progresso</span>
                              <span data-testid={`text-progress-${trail.id}`}>{trail.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${trail.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span data-testid={`text-hours-${trail.id}`}>{trail.estimatedHours || 0}h</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span data-testid={`text-modules-${trail.id}`}>{trail.modulesCount || 0} módulos</span>
                          </div>
                        </div>
                        <Link href={`/dashboard/trails/${trail.id}`}>
                          <Button
                            className="w-full"
                            variant={hasProgress ? "default" : "outline"}
                            data-testid={`button-start-trail-${trail.id}`}
                          >
                            {hasProgress ? "Continuar" : "Iniciar Trilha"}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
