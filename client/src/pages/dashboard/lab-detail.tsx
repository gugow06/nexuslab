import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const scenario = {
  title: "Simulação de Gerenciamento de Crise",
  description:
    "Sua equipe acabou de descobrir uma vulnerabilidade crítica de segurança 24 horas antes de um grande lançamento de produto. A vulnerabilidade afeta dados de usuários, mas corrigi-la requer atrasar o lançamento. As principais partes interessadas estão exigindo que você prossiga conforme planejado.",
  decisions: [
    {
      id: "delay-launch",
      text: "Atrasar o lançamento para corrigir a vulnerabilidade imediatamente",
      impact: "Protege os usuários, mas desaponta as partes interessadas e atrasa a receita",
      points: 100,
    },
    {
      id: "partial-fix",
      text: "Implementar um patch temporário e prosseguir com o lançamento",
      impact: "Mantém o cronograma, mas introduz débito técnico e risco",
      points: 60,
    },
    {
      id: "proceed-launch",
      text: "Prosseguir com o lançamento e corrigir o problema no próximo sprint",
      impact: "Mantém as partes interessadas felizes, mas expõe os usuários ao risco",
      points: 20,
    },
    {
      id: "limited-rollout",
      text: "Lançar para um grupo limitado de usuários enquanto corrige a vulnerabilidade",
      impact: "Equilibra risco e progresso, mas requer coordenação adicional",
      points: 85,
    },
  ],
};

export default function LabDetail() {
  const [selectedDecision, setSelectedDecision] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState("");

  const handleSubmit = () => {
    const decision = scenario.decisions.find((d) => d.id === selectedDecision);
    if (decision) {
      setScore(decision.points);
      setAiFeedback(
        `Com base em sua escolha de "${decision.text.toLowerCase()}", você demonstrou ${
          decision.points >= 80
            ? "excelente pensamento estratégico"
            : decision.points >= 60
            ? "bom julgamento com espaço para melhorias"
            : "uma decisão que pode precisar de reconsideração"
        }. ${
          decision.points >= 80
            ? "Esta abordagem equilibra a segurança do usuário com as necessidades do negócio de forma eficaz."
            : decision.points >= 60
            ? "Considere como equilibrar melhor ganhos de curto prazo com consequências de longo prazo."
            : "A confiança e a segurança do usuário devem ser priorizadas sobre métricas de negócio de curto prazo."
        }`
      );
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/labs">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Labs
          </Button>
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{scenario.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-red-500/10 text-red-700 dark:text-red-400">
                Avançado
              </Badge>
              <Badge variant="secondary">Liderança</Badge>
            </div>
          </div>
        </div>
      </div>

      {!submitted ? (
        <>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardHeader>
              <CardTitle>Cenário</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{scenario.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>O que você faria?</CardTitle>
              <CardDescription>
                Selecione sua decisão e envie para receber feedback gerado por IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedDecision} onValueChange={setSelectedDecision}>
                <div className="space-y-4">
                  {scenario.decisions.map((decision, index) => (
                    <Card
                      key={decision.id}
                      className={`hover-elevate cursor-pointer ${
                        selectedDecision === decision.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedDecision(decision.id)}
                      data-testid={`card-decision-${index}`}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value={decision.id} id={decision.id} />
                          <div className="flex-1">
                            <Label
                              htmlFor={decision.id}
                              className="text-base font-semibold cursor-pointer"
                            >
                              {decision.text}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-2">
                              {decision.impact}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
              <Button
                className="w-full mt-6"
                onClick={handleSubmit}
                disabled={!selectedDecision}
                data-testid="button-submit-decision"
              >
                Enviar Decisão
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <CardTitle>Simulação Completa!</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sua Pontuação</p>
                  <p className="text-4xl font-bold">{score}/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Feedback da IA</p>
                  <p className="leading-relaxed">{aiFeedback}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline" onClick={() => setSubmitted(false)} data-testid="button-try-again">
                Tentar Abordagem Diferente
              </Button>
              <Link href="/dashboard/labs">
                <Button className="w-full" variant="outline" data-testid="button-explore-labs">
                  Explorar Mais Labs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
