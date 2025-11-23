import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, FlaskConical, Briefcase, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: !!user && user.role === "admin",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { label: "Total de Usuários", value: data?.totalUsers || 0, icon: Users, color: "text-chart-1" },
    { label: "Total de Trilhas", value: data?.totalTrails || 0, icon: BookOpen, color: "text-chart-2" },
    { label: "Total de Labs", value: data?.totalLabs || 0, icon: FlaskConical, color: "text-chart-3" },
    { label: "Total de Oportunidades", value: data?.totalOpportunities || 0, icon: Briefcase, color: "text-chart-4" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground text-lg">
          Visão geral da plataforma NexusLab
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Estatísticas da Plataforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card data-testid={`card-admin-stat-${index}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários Recentes</CardTitle>
          <CardDescription>Últimos usuários cadastrados na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          {data?.recentUsers && data.recentUsers.length > 0 ? (
            <div className="space-y-4">
              {data.recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between p-4 border rounded-md" data-testid={`user-${u.id}`}>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{u.currentPosition} → {u.targetPosition}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Nenhum usuário cadastrado ainda</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
