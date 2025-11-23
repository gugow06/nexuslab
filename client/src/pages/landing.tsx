import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, TrendingUp, Award, Users, Briefcase, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Nexus.AI Mentor",
    description: "Obtenha orientação de carreira personalizada de nosso mentor com IA, adaptada aos seus objetivos e experiência.",
  },
  {
    icon: TrendingUp,
    title: "Roadmaps de Carreira",
    description: "Visualize seu caminho da posição atual até a função dos sonhos com passos claros e acionáveis.",
  },
  {
    icon: Award,
    title: "Passaporte de Habilidades",
    description: "Acompanhe e mostre suas competências com um portfólio de habilidades abrangente e verificável.",
  },
  {
    icon: Users,
    title: "Comunidade 1%",
    description: "Junte-se a uma comunidade de elite de grandes realizadores com gamificação, desafios e rankings.",
  },
  {
    icon: Briefcase,
    title: "Mercado de Oportunidades",
    description: "Acesse oportunidades de trabalho selecionadas que correspondem às suas habilidades e aspirações de carreira.",
  },
  {
    icon: Heart,
    title: "Acompanhamento de Bem-estar",
    description: "Mantenha o equilíbrio entre vida pessoal e profissional com rastreamento de humor e sugestões de bem-estar geradas por IA.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold">NexusLab</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" data-testid="link-login">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button data-testid="link-register">
                Começar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transforme Sua Carreira com Orientação de IA
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Junte-se aos 1% melhores profissionais com caminhos de aprendizado personalizados, simulações digitais e um ecossistema abrangente de habilidades.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" data-testid="button-hero-start">
                  Comece Sua Jornada <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" data-testid="button-hero-learn">
                Saiba Mais
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tudo Que Você Precisa Para Se Destacar</h2>
            <p className="text-lg text-muted-foreground">
              Uma plataforma abrangente projetada para transformação de carreira
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto Para Se Juntar aos 1% Melhores?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Comece sua transformação hoje com desenvolvimento de carreira com IA
          </p>
          <Link href="/register">
            <Button size="lg" data-testid="button-cta-signup">
              Criar Conta Gratuita <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Produto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Funcionalidades</li>
              <li>Preços</li>
              <li>Perguntas Frequentes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sobre</li>
              <li>Blog</li>
              <li>Carreiras</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentação</li>
              <li>Comunidade</li>
              <li>Suporte</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacidade</li>
              <li>Termos</li>
              <li>Segurança</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 NexusLab. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
