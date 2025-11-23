import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FlaskConical, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const labs = [
  {
    id: 1,
    name: "Simulação de Gerenciamento de Crise",
    description: "Navegue por uma crise de lançamento de produto e tome decisões críticas sob pressão",
    difficulty: "avançado",
    category: "Liderança",
    completions: 1240,
  },
  {
    id: 2,
    name: "Negociação com Stakeholders",
    description: "Equilibre prioridades concorrentes e negocie soluções ganha-ganha",
    difficulty: "intermediário",
    category: "Comunicação",
    completions: 2150,
  },
  {
    id: 3,
    name: "Desafio de Alocação de Orçamento",
    description: "Otimize a alocação de recursos em múltiplos projetos com restrições",
    difficulty: "intermediário",
    category: "Finanças",
    completions: 1890,
  },
  {
    id: 4,
    name: "Resolução de Conflitos em Equipe",
    description: "Aborde a dinâmica de equipe e resolva conflitos interpessoais de forma eficaz",
    difficulty: "iniciante",
    category: "Liderança",
    completions: 3420,
  },
  {
    id: 5,
    name: "Estratégia de Entrada no Mercado",
    description: "Desenvolva e execute uma estratégia de entrada no mercado para um novo produto",
    difficulty: "avançado",
    category: "Estratégia",
    completions: 980,
  },
  {
    id: 6,
    name: "Tomada de Decisão Baseada em Dados",
    description: "Analise conjuntos de dados e faça recomendações estratégicas baseadas em insights",
    difficulty: "intermediário",
    category: "Análise",
    completions: 1650,
  },
];

const difficultyColors: Record<string, string> = {
  iniciante: "bg-green-500/10 text-green-700 dark:text-green-400",
  intermediário: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  avançado: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function DigitalLabs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Laboratórios Digitais</h1>
        <p className="text-muted-foreground text-lg">
          Pratique cenários do mundo real em simulações sem riscos
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar laboratórios..."
            className="pl-10"
            data-testid="input-search-labs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover-elevate h-full flex flex-col" data-testid={`card-lab-${index}`}>
              <div className="h-40 bg-gradient-to-br from-chart-3/20 to-chart-3/5 rounded-t-md flex items-center justify-center">
                <FlaskConical className="h-16 w-16 text-chart-3/40" />
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg leading-tight">{lab.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${difficultyColors[lab.difficulty]}`}
                  >
                    {lab.difficulty}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {lab.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{lab.completions.toLocaleString()} conclusões</span>
                </div>
                <Link href={`/dashboard/labs/${lab.id}`}>
                  <Button className="w-full" data-testid={`button-start-lab-${index}`}>
                    Iniciar Simulação
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
