import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const roadmapSteps = [
  {
    title: "Gerente de Produto Júnior",
    description: "Sua posição atual",
    skills: ["Estratégia de Produto", "Pesquisa com Usuários", "Metodologias Ágeis"],
    timeframe: "Atual",
    status: "current",
  },
  {
    title: "Gerente de Produto",
    description: "Domine habilidades essenciais de gestão de produto",
    skills: ["Análise de Dados", "Gestão de Stakeholders", "Priorização de Funcionalidades"],
    timeframe: "6-12 meses",
    status: "in-progress",
  },
  {
    title: "Gerente de Produto Sênior",
    description: "Lidere iniciativas de produto e mentore outros",
    skills: ["Planejamento Estratégico", "Liderança de Equipe", "Análise de Mercado"],
    timeframe: "12-18 meses",
    status: "pending",
  },
  {
    title: "Diretor de Produto",
    description: "Sua posição-alvo",
    skills: ["Definição de Visão", "Liderança Multifuncional", "Estratégia de Negócios"],
    timeframe: "24-36 meses",
    status: "target",
  },
];

export default function CareerRoadmap() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">Roadmap de Carreira</h1>
          <Button data-testid="button-regenerate-roadmap">
            <Sparkles className="mr-2 h-4 w-4" />
            Regenerar com IA
          </Button>
        </div>
        <p className="text-muted-foreground text-lg">
          Seu caminho personalizado de Gerente de Produto Júnior a Diretor de Produto
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Caminho de Carreira Gerado por IA</CardTitle>
          <CardDescription>
            Com base em suas habilidades, experiência e função-alvo, a Nexus.AI criou este roadmap personalizado
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
                    <h4 className="font-semibold mb-3">Habilidades Necessárias</h4>
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
                      Ver Plano de Aprendizado <ArrowRight className="ml-2 h-4 w-4" />
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
          <CardTitle>Próximos Passos</CardTitle>
          <CardDescription>
            Concentre-se nestas ações para progredir em sua carreira
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Complete a trilha "Fundamentos de Análise de Dados" para fortalecer habilidades analíticas</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Faça a simulação de laboratório digital "Gestão de Stakeholders"</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Candidate-se a posições de Gerente de Produto que correspondam ao seu nível de habilidade</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
