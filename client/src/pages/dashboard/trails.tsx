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
    title: "Habilidades Avançadas de Liderança",
    description: "Domine a arte de liderar equipes de alta performance e impulsionar mudanças organizacionais",
    difficulty: "intermediário",
    category: "Liderança",
    estimatedHours: 12,
    modules: 8,
    thumbnail: "leadership",
  },
  {
    id: 2,
    title: "Tomada de Decisão Baseada em Dados",
    description: "Aprenda a aproveitar análise de dados e insights para decisões estratégicas de negócios",
    difficulty: "avançado",
    category: "Dados",
    estimatedHours: 16,
    modules: 10,
    thumbnail: "data",
  },
  {
    id: 3,
    title: "Comunicação Estratégica",
    description: "Desenvolva habilidades de comunicação para apresentações executivas e gestão de stakeholders",
    difficulty: "iniciante",
    category: "Comunicação",
    estimatedHours: 8,
    modules: 6,
    thumbnail: "communication",
  },
  {
    id: 4,
    title: "Inovação de Produtos",
    description: "Crie produtos inovadores através de design thinking e insights de clientes",
    difficulty: "intermediário",
    category: "Produto",
    estimatedHours: 14,
    modules: 9,
    thumbnail: "innovation",
  },
  {
    id: 5,
    title: "Estratégia Financeira",
    description: "Compreenda métricas financeiras e crie estratégias de negócios orientadas por valor",
    difficulty: "avançado",
    category: "Finanças",
    estimatedHours: 18,
    modules: 12,
    thumbnail: "finance",
  },
  {
    id: 6,
    title: "Metodologias Ágeis",
    description: "Domine frameworks ágeis para entrega mais rápida e melhoria contínua",
    difficulty: "iniciante",
    category: "Metodologia",
    estimatedHours: 10,
    modules: 7,
    thumbnail: "agile",
  },
];

const difficultyColors: Record<string, string> = {
  iniciante: "bg-green-500/10 text-green-700 dark:text-green-400",
  intermediário: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  avançado: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function LearningTrails() {
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
            data-testid="input-search-trails"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">Todas as Trilhas</TabsTrigger>
          <TabsTrigger value="in-progress" data-testid="tab-in-progress">Em Andamento</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">Concluídas</TabsTrigger>
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
                        <span>{trail.modules} módulos</span>
                      </div>
                    </div>
                    <Link href={`/dashboard/trails/${trail.id}`}>
                      <Button className="w-full" variant="outline" data-testid={`button-start-trail-${index}`}>
                        Iniciar Trilha
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
            <p className="text-muted-foreground">Nenhuma trilha em andamento ainda</p>
            <Button className="mt-4" variant="outline">
              Explorar Todas as Trilhas
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma trilha concluída ainda</p>
            <Button className="mt-4" variant="outline">
              Começar a Aprender
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
