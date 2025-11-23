import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Users, BookOpen, FlaskConical, Briefcase, Loader2, Pencil, Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import type { User, LearningTrail, TrailModule } from "@shared/schema";

// ===== SCHEMAS DE VALIDAÇÃO =====
const userEditSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  currentPosition: z.string().min(1, "Cargo atual é obrigatório"),
  targetPosition: z.string().min(1, "Cargo alvo é obrigatório"),
  role: z.enum(["user", "admin", "company"], {
    required_error: "Role é obrigatória",
  }),
});

const trailSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Dificuldade é obrigatória",
  }),
  category: z.string().min(1, "Categoria é obrigatória"),
  estimatedHours: z.coerce.number().min(1, "Horas estimadas devem ser maior que 0"),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.enum(["video", "text", "challenge", "quiz"], {
    required_error: "Tipo é obrigatório",
  }),
  content: z.object({
    body: z.string().optional(),
    videoUrl: z.string().optional(),
    questions: z.array(z.any()).optional(),
  }),
  order: z.coerce.number().min(0, "Ordem deve ser maior ou igual a 0"),
}).refine((data) => {
  if (data.type === "video") {
    return !!data.content.body && !!data.content.videoUrl;
  }
  if (data.type === "text") {
    return !!data.content.body;
  }
  if (data.type === "quiz") {
    return data.content.questions && data.content.questions.length > 0;
  }
  if (data.type === "challenge") {
    return !!data.content.body;
  }
  return true;
}, {
  message: "Conteúdo inválido para o tipo de módulo selecionado",
  path: ["content"],
});

type UserEditForm = z.infer<typeof userEditSchema>;
type TrailForm = z.infer<typeof trailSchema>;
type ModuleForm = z.infer<typeof moduleSchema>;

// ===== COMPONENTE DE EDIÇÃO DE USUÁRIO =====
function EditUserDialog({ user, open, onOpenChange }: { user: Omit<User, "password">; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const form = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      currentPosition: user.currentPosition,
      targetPosition: user.targetPosition,
      role: user.role,
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserEditForm) => {
      const res = await apiRequest("PUT", `/api/admin/users/${user.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Usuário atualizado",
        description: "As informações do usuário foram atualizadas com sucesso.",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-edit-user">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => updateUserMutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-user-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" data-testid="input-user-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo Atual</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-user-current-position" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo Alvo</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-user-target-position" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-user-role">
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="company">Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-edit-user">
                Cancelar
              </Button>
              <Button type="submit" disabled={updateUserMutation.isPending} data-testid="button-save-user">
                {updateUserMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ===== COMPONENTE DE CRIAÇÃO/EDIÇÃO DE TRILHA =====
function TrailDialog({ trail, open, onOpenChange }: { trail?: LearningTrail; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const isEdit = !!trail;

  const form = useForm<TrailForm>({
    resolver: zodResolver(trailSchema),
    defaultValues: {
      title: trail?.title || "",
      description: trail?.description || "",
      difficulty: trail?.difficulty || "beginner",
      category: trail?.category || "",
      estimatedHours: trail?.estimatedHours || 1,
    },
  });

  const createTrailMutation = useMutation({
    mutationFn: async (data: TrailForm) => {
      const res = await apiRequest("POST", "/api/admin/trails", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      toast({
        title: "Trilha criada",
        description: "A trilha foi criada com sucesso.",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateTrailMutation = useMutation({
    mutationFn: async (data: TrailForm) => {
      const res = await apiRequest("PUT", `/api/admin/trails/${trail!.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      toast({
        title: "Trilha atualizada",
        description: "A trilha foi atualizada com sucesso.",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: TrailForm) => {
    if (isEdit) {
      updateTrailMutation.mutate(data);
    } else {
      createTrailMutation.mutate(data);
    }
  };

  const isPending = createTrailMutation.isPending || updateTrailMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-trail">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Trilha" : "Adicionar Trilha"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Atualize as informações da trilha abaixo." : "Preencha os dados para criar uma nova trilha."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-trail-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="input-trail-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dificuldade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-trail-difficulty">
                        <SelectValue placeholder="Selecione a dificuldade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">Intermediário</SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-trail-category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas Estimadas</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="1" data-testid="input-trail-hours" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-trail">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} data-testid="button-save-trail">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ===== COMPONENTE DE CRIAÇÃO/EDIÇÃO DE MÓDULO =====
function ModuleDialog({ trailId, module, open, onOpenChange }: { trailId: number; module?: TrailModule; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const isEdit = !!module;

  const form = useForm<ModuleForm>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: module?.title || "",
      type: module?.type || "text",
      content: module?.content || { body: "" },
      order: module?.order || 0,
    },
  });

  const createModuleMutation = useMutation({
    mutationFn: async (data: ModuleForm) => {
      const res = await apiRequest("POST", `/api/admin/trails/${trailId}/modules`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      toast({
        title: "Módulo criado",
        description: "O módulo foi criado com sucesso.",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: async (data: ModuleForm) => {
      const res = await apiRequest("PUT", `/api/admin/trails/${trailId}/modules/${module!.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      toast({
        title: "Módulo atualizado",
        description: "O módulo foi atualizado com sucesso.",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ModuleForm) => {
    if (isEdit) {
      updateModuleMutation.mutate(data);
    } else {
      createModuleMutation.mutate(data);
    }
  };

  const isPending = createModuleMutation.isPending || updateModuleMutation.isPending;
  const moduleType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-module">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Módulo" : "Adicionar Módulo"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Atualize as informações do módulo abaixo." : "Preencha os dados para criar um novo módulo."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-module-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-module-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="challenge">Desafio</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordem</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" data-testid="input-module-order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {moduleType === "text" && (
              <FormField
                control={form.control}
                name="content.body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea {...field} data-testid="input-module-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {moduleType === "video" && (
              <FormField
                control={form.control}
                name="content.videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL do Vídeo</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-module-video-url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-module">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} data-testid="button-save-module">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// ===== COMPONENTE PRINCIPAL =====
export default function AdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Omit<User, "password"> | null>(null);
  const [trailDialogOpen, setTrailDialogOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState<LearningTrail | null>(null);
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<TrailModule | null>(null);
  const [moduleTrailId, setModuleTrailId] = useState<number | null>(null);
  const [expandedTrails, setExpandedTrails] = useState<Set<number>>(new Set());

  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalUsers: number;
    totalTrails: number;
    totalLabs: number;
    totalOpportunities: number;
    recentUsers: any[];
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: !!user && user.role === "admin",
  });

  const { data: users, isLoading: usersLoading } = useQuery<Omit<User, "password">[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.role === "admin",
  });

  const { data: trails, isLoading: trailsLoading } = useQuery<LearningTrail[]>({
    queryKey: ["/api/admin/trails"],
    enabled: !!user && user.role === "admin",
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiRequest("DELETE", `/api/admin/users/${userId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Usuário deletado",
        description: "O usuário foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteTrailMutation = useMutation({
    mutationFn: async (trailId: number) => {
      const res = await apiRequest("DELETE", `/api/admin/trails/${trailId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Trilha deletada",
        description: "A trilha foi removida com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteModuleMutation = useMutation({
    mutationFn: async ({ trailId, moduleId }: { trailId: number; moduleId: number }) => {
      const res = await apiRequest("DELETE", `/api/admin/trails/${trailId}/modules/${moduleId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/trails"] });
      toast({
        title: "Módulo deletado",
        description: "O módulo foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: trailsWithModules } = useQuery({
    queryKey: ["/api/admin/trails", Array.from(expandedTrails)],
    queryFn: async () => {
      const promises = Array.from(expandedTrails).map(async (trailId) => {
        const res = await fetch(`/api/admin/trails/${trailId}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch trail");
        return res.json();
      });
      return Promise.all(promises);
    },
    enabled: expandedTrails.size > 0,
  });

  const toggleTrailExpand = (trailId: number) => {
    const newExpanded = new Set(expandedTrails);
    if (newExpanded.has(trailId)) {
      newExpanded.delete(trailId);
    } else {
      newExpanded.add(trailId);
    }
    setExpandedTrails(newExpanded);
  };

  const getTrailModules = (trailId: number): TrailModule[] => {
    if (!trailsWithModules) return [];
    const trail = trailsWithModules.find((t: any) => t.id === trailId);
    return trail?.modules || [];
  };

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statsData = [
    { label: "Total de Usuários", value: stats?.totalUsers || 0, icon: Users, color: "text-chart-1" },
    { label: "Total de Trilhas", value: stats?.totalTrails || 0, icon: BookOpen, color: "text-chart-2" },
    { label: "Total de Labs", value: stats?.totalLabs || 0, icon: FlaskConical, color: "text-chart-3" },
    { label: "Total de Oportunidades", value: stats?.totalOpportunities || 0, icon: Briefcase, color: "text-chart-4" },
  ];

  const difficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
    };
    return labels[difficulty] || difficulty;
  };

  const roleLabel = (role: string) => {
    const labels: Record<string, string> = {
      user: "Usuário",
      admin: "Administrador",
      company: "Empresa",
    };
    return labels[role] || role;
  };

  const moduleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      video: "Vídeo",
      text: "Texto",
      challenge: "Desafio",
      quiz: "Quiz",
    };
    return labels[type] || type;
  };

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
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card data-testid={`card-admin-stat-${index}`}>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
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

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList data-testid="tabs-admin">
          <TabsTrigger value="users" data-testid="tab-users">Usuários</TabsTrigger>
          <TabsTrigger value="trails" data-testid="tab-trails">Trilhas de Aprendizado</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
              <CardDescription>Lista de todos os usuários cadastrados na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : users && users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cargo Atual</TableHead>
                      <TableHead>Cargo Alvo</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.currentPosition}</TableCell>
                        <TableCell>{u.targetPosition}</TableCell>
                        <TableCell>
                          <Badge variant={u.role === "admin" ? "default" : "secondary"} data-testid={`badge-role-${u.id}`}>
                            {roleLabel(u.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setSelectedUser(u);
                                setEditUserOpen(true);
                              }}
                              data-testid={`button-edit-user-${u.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  data-testid={`button-delete-user-${u.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-testid={`alert-delete-user-${u.id}`}>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja deletar o usuário {u.name}? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-testid={`button-cancel-delete-user-${u.id}`}>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteUserMutation.mutate(u.id)}
                                    data-testid={`button-confirm-delete-user-${u.id}`}
                                  >
                                    Deletar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-8">Nenhum usuário cadastrado ainda</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trails" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Trilhas</CardTitle>
                  <CardDescription>Lista de todas as trilhas de aprendizado disponíveis</CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setSelectedTrail(null);
                    setTrailDialogOpen(true);
                  }}
                  data-testid="button-add-trail"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Trilha
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {trailsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : trails && trails.length > 0 ? (
                <div className="space-y-2">
                  {trails.map((trail) => {
                    const isExpanded = expandedTrails.has(trail.id);
                    const modules = getTrailModules(trail.id);

                    return (
                      <div key={trail.id} className="border rounded-md" data-testid={`trail-${trail.id}`}>
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4 flex-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => toggleTrailExpand(trail.id)}
                              data-testid={`button-expand-trail-${trail.id}`}
                            >
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                            <div className="flex-1">
                              <h3 className="font-semibold">{trail.title}</h3>
                              <p className="text-sm text-muted-foreground">{trail.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" data-testid={`badge-difficulty-${trail.id}`}>
                                {difficultyLabel(trail.difficulty)}
                              </Badge>
                              <Badge variant="outline" data-testid={`badge-category-${trail.id}`}>
                                {trail.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{trail.estimatedHours}h</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setSelectedTrail(trail);
                                setTrailDialogOpen(true);
                              }}
                              data-testid={`button-edit-trail-${trail.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  data-testid={`button-delete-trail-${trail.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-testid={`alert-delete-trail-${trail.id}`}>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja deletar a trilha {trail.title}? Todos os módulos também serão removidos. Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-testid={`button-cancel-delete-trail-${trail.id}`}>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteTrailMutation.mutate(trail.id)}
                                    data-testid={`button-confirm-delete-trail-${trail.id}`}
                                  >
                                    Deletar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t p-4 bg-muted/50">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold">Módulos</h4>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setModuleTrailId(trail.id);
                                  setSelectedModule(null);
                                  setModuleDialogOpen(true);
                                }}
                                data-testid={`button-add-module-${trail.id}`}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Módulo
                              </Button>
                            </div>
                            {modules.length > 0 ? (
                              <div className="space-y-2">
                                {modules.map((module) => (
                                  <div
                                    key={module.id}
                                    className="flex items-center justify-between p-3 border rounded-md bg-background"
                                    data-testid={`module-${module.id}`}
                                  >
                                    <div className="flex items-center gap-4">
                                      <span className="text-sm font-medium text-muted-foreground">#{module.order}</span>
                                      <div>
                                        <p className="font-medium">{module.title}</p>
                                        <p className="text-sm text-muted-foreground">{moduleTypeLabel(module.type)}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                          setModuleTrailId(trail.id);
                                          setSelectedModule(module);
                                          setModuleDialogOpen(true);
                                        }}
                                        data-testid={`button-edit-module-${module.id}`}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            data-testid={`button-delete-module-${module.id}`}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent data-testid={`alert-delete-module-${module.id}`}>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Tem certeza que deseja deletar o módulo {module.title}? Esta ação não pode ser desfeita.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel data-testid={`button-cancel-delete-module-${module.id}`}>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => deleteModuleMutation.mutate({ trailId: trail.id, moduleId: module.id })}
                                              data-testid={`button-confirm-delete-module-${module.id}`}
                                            >
                                              Deletar
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">Nenhum módulo adicionado ainda</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Nenhuma trilha cadastrada ainda</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedUser && (
        <EditUserDialog
          user={selectedUser}
          open={editUserOpen}
          onOpenChange={setEditUserOpen}
        />
      )}

      <TrailDialog
        trail={selectedTrail || undefined}
        open={trailDialogOpen}
        onOpenChange={setTrailDialogOpen}
      />

      {moduleTrailId && (
        <ModuleDialog
          trailId={moduleTrailId}
          module={selectedModule || undefined}
          open={moduleDialogOpen}
          onOpenChange={setModuleDialogOpen}
        />
      )}
    </div>
  );
}
