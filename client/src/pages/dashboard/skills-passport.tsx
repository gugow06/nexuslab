import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Award } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  { name: "Planejamento Estratégico", category: "Liderança", level: 85, dateAcquired: "2024-01-15" },
  { name: "Análise de Dados", category: "Análise", level: 72, dateAcquired: "2024-02-20" },
  { name: "Gestão de Stakeholders", category: "Comunicação", level: 90, dateAcquired: "2023-11-10" },
  { name: "Estratégia de Produto", category: "Produto", level: 78, dateAcquired: "2024-03-05" },
  { name: "Liderança de Equipe", category: "Liderança", level: 88, dateAcquired: "2023-12-18" },
  { name: "Análise Financeira", category: "Finanças", level: 65, dateAcquired: "2024-04-12" },
  { name: "Metodologias Ágeis", category: "Metodologia", level: 92, dateAcquired: "2023-10-22" },
  { name: "Pesquisa com Usuários", category: "Produto", level: 70, dateAcquired: "2024-01-28" },
  { name: "Estratégia de Negócios", category: "Estratégia", level: 75, dateAcquired: "2024-02-14" },
  { name: "Oratória", category: "Comunicação", level: 82, dateAcquired: "2023-12-05" },
  { name: "Análise de Mercado", category: "Estratégia", level: 68, dateAcquired: "2024-03-20" },
  { name: "Resolução de Conflitos", category: "Liderança", level: 86, dateAcquired: "2024-01-08" },
];

const categories = Array.from(new Set(skills.map((s) => s.category)));

const getSkillColor = (level: number) => {
  if (level >= 80) return "text-green-600 dark:text-green-400";
  if (level >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-orange-600 dark:text-orange-400";
};

const getProgressColor = (level: number) => {
  if (level >= 80) return "[&>div]:bg-green-500";
  if (level >= 60) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-orange-500";
};

export default function SkillsPassport() {
  const averageProficiency = Math.round(
    skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Passaporte de Habilidades</h1>
          <p className="text-muted-foreground text-lg">
            Seu portfólio abrangente de competências
          </p>
        </div>
        <Button data-testid="button-export-pdf">
          <Download className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Habilidades</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skills.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proficiência Média</CardTitle>
            <Award className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProficiency}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Award className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar habilidades..."
            className="pl-10"
            data-testid="input-search-skills"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all" data-testid="tab-all">Todas as Habilidades</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} data-testid={`tab-${category.toLowerCase()}`}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Card className="hover-elevate" data-testid={`card-skill-${index}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Award className={`h-5 w-5 ${getSkillColor(skill.level)}`} />
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-tight">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Proficiência</span>
                        <span className={`font-semibold ${getSkillColor(skill.level)}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className={getProgressColor(skill.level)} />
                      <p className="text-xs text-muted-foreground">
                        Adquirida em {new Date(skill.dateAcquired).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, index) => (
                  <Card key={index} className="hover-elevate">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Award className={`h-5 w-5 ${getSkillColor(skill.level)}`} />
                      </div>
                      <CardTitle className="text-base leading-tight">{skill.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Proficiência</span>
                          <span className={`font-semibold ${getSkillColor(skill.level)}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className={getProgressColor(skill.level)} />
                        <p className="text-xs text-muted-foreground">
                          Adquirida em {new Date(skill.dateAcquired).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
