import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ name, email, password, currentPosition, targetPosition });
      toast({
        title: "Conta criada!",
        description: "Bem-vindo ao NexusLab. Vamos começar sua jornada.",
      });
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Falha no cadastro",
        description: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold">NexusLab</span>
          </div>
          <CardTitle className="text-2xl">Criar uma conta</CardTitle>
          <CardDescription>
            Junte-se ao top 1% de profissionais transformando suas carreiras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                data-testid="input-password"
              />
              <p className="text-xs text-muted-foreground">
                Deve ter pelo menos 8 caracteres
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentPosition">Cargo Atual</Label>
              <Input
                id="currentPosition"
                type="text"
                placeholder="ex: Desenvolvedor Júnior"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
                required
                data-testid="input-currentPosition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetPosition">Cargo Almejado</Label>
              <Input
                id="targetPosition"
                type="text"
                placeholder="ex: Desenvolvedor Sênior"
                value={targetPosition}
                onChange={(e) => setTargetPosition(e.target.value)}
                required
                data-testid="input-targetPosition"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading} data-testid="button-register">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link href="/login">
              <a className="text-primary hover:underline" data-testid="link-login">
                Entrar
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
