import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Building2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const opportunities = [
  {
    id: 1,
    title: "Gerente de Produto Sênior",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "tempo-integral",
    experienceLevel: "sênior",
    requirements: ["Estratégia de Produto", "Análise de Dados", "Liderança de Equipe"],
    description: "Lidere iniciativas de produto para nossa plataforma principal que serve mais de 10M de usuários",
    matchScore: 92,
  },
  {
    id: 2,
    title: "Gerente de Produto",
    company: "InnovateLabs",
    location: "Remoto",
    type: "tempo-integral",
    experienceLevel: "pleno",
    requirements: ["Metodologias Ágeis", "Pesquisa com Usuários", "Gestão de Stakeholders"],
    description: "Impulsione o desenvolvimento de produtos em ambiente de startup dinâmico",
    matchScore: 85,
  },
  {
    id: 3,
    title: "Gerente de Produto Associado",
    company: "DataFlow Inc",
    location: "Nova York, NY",
    type: "tempo-integral",
    experienceLevel: "júnior",
    requirements: ["Estratégia de Produto", "Comunicação", "Análise"],
    description: "Junte-se ao nosso programa APM e aprenda com líderes do setor",
    matchScore: 78,
  },
  {
    id: 4,
    title: "Consultor de Produto",
    company: "Strategy Partners",
    location: "Remoto",
    type: "contrato",
    experienceLevel: "sênior",
    requirements: ["Planejamento Estratégico", "Estratégia de Negócios", "Gestão de Clientes"],
    description: "Ajude empresas Fortune 500 a transformar seus portfólios de produtos",
    matchScore: 88,
  },
  {
    id: 5,
    title: "Diretor de Produto",
    company: "GrowthTech",
    location: "Austin, TX",
    type: "tempo-integral",
    experienceLevel: "líder",
    requirements: ["Definição de Visão", "Liderança Multifuncional", "Gestão de P&L"],
    description: "Lidere a organização de produto e impulsione a estratégia de produto em toda a empresa",
    matchScore: 70,
  },
  {
    id: 6,
    title: "Estagiário de Gerência de Produto",
    company: "StartupX",
    location: "Boston, MA",
    type: "estágio",
    experienceLevel: "júnior",
    requirements: ["Agilidade de Aprendizado", "Comunicação", "Resolução de Problemas"],
    description: "Programa de estágio de verão com mentoria e experiência prática",
    matchScore: 82,
  },
];

const applications = [
  {
    id: 1,
    title: "Gerente de Produto Sênior",
    company: "TechCorp",
    status: "entrevista",
    appliedDate: "2024-05-10",
  },
  {
    id: 2,
    title: "Gerente de Produto",
    company: "InnovateLabs",
    status: "em-análise",
    appliedDate: "2024-05-12",
  },
];

const typeColors: Record<string, string> = {
  "tempo-integral": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "meio-período": "bg-green-500/10 text-green-700 dark:text-green-400",
  contrato: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  estágio: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

const statusColors: Record<string, string> = {
  candidatado: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "em-análise": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  entrevista: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  oferta: "bg-green-500/10 text-green-700 dark:text-green-400",
  rejeitado: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function Marketplace() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Mercado de Oportunidades</h1>
        <p className="text-muted-foreground text-lg">
          Descubra vagas que combinam com suas habilidades e aspirações
        </p>
      </div>

      <Tabs defaultValue="explore" className="space-y-6">
        <TabsList>
          <TabsTrigger value="explore" data-testid="tab-explore">
            Explorar
          </TabsTrigger>
          <TabsTrigger value="applications" data-testid="tab-applications">
            Minhas Candidaturas ({applications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar oportunidades..."
                className="pl-10"
                data-testid="input-search-opportunities"
              />
            </div>
          </div>

          <div className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover-elevate" data-testid={`card-opportunity-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-base">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {opportunity.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {opportunity.location}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {opportunity.matchScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Compatibilidade</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{opportunity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${typeColors[opportunity.type]}`}
                      >
                        {opportunity.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {opportunity.experienceLevel}
                      </Badge>
                      {opportunity.requirements.slice(0, 3).map((req, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {opportunity.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opportunity.requirements.length - 3} mais
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1" data-testid={`button-apply-${index}`}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Candidatar-se
                      </Button>
                      <Button variant="outline" data-testid={`button-details-${index}`}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Nenhuma candidatura ainda</p>
                <Button variant="outline">Explorar Oportunidades</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application, index) => (
                <Card key={application.id} className="hover-elevate" data-testid={`card-application-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{application.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-base">
                          <Building2 className="h-4 w-4" />
                          {application.company}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${statusColors[application.status]}`}
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Candidatado em {new Date(application.appliedDate).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
