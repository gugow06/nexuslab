import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/components/app-sidebar";
import { AIChat } from "@/components/ai-chat";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import DashboardHome from "@/pages/dashboard/home";
import CareerRoadmap from "@/pages/dashboard/career-roadmap";
import LearningTrails from "@/pages/dashboard/trails";
import TrailDetail from "@/pages/dashboard/trail-detail";
import DigitalLabs from "@/pages/dashboard/labs";
import LabDetail from "@/pages/dashboard/lab-detail";
import SkillsPassport from "@/pages/dashboard/skills-passport";
import Community from "@/pages/dashboard/community";
import Wellbeing from "@/pages/dashboard/wellbeing";
import Marketplace from "@/pages/dashboard/marketplace";
import AdminPanel from "@/pages/admin/index";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={DashboardHome} />
      <Route path="/dashboard/career" component={CareerRoadmap} />
      <Route path="/dashboard/trails" component={LearningTrails} />
      <Route path="/dashboard/trails/:id" component={TrailDetail} />
      <Route path="/dashboard/labs" component={DigitalLabs} />
      <Route path="/dashboard/labs/:id" component={LabDetail} />
      <Route path="/dashboard/skills" component={SkillsPassport} />
      <Route path="/dashboard/community" component={Community} />
      <Route path="/dashboard/wellbeing" component={Wellbeing} />
      <Route path="/dashboard/marketplace" component={Marketplace} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </div>
      <AIChat />
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard">
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/career">
              <DashboardLayout>
                <CareerRoadmap />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/trails">
              <DashboardLayout>
                <LearningTrails />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/trails/:id">
              <DashboardLayout>
                <TrailDetail />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/labs">
              <DashboardLayout>
                <DigitalLabs />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/labs/:id">
              <DashboardLayout>
                <LabDetail />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/skills">
              <DashboardLayout>
                <SkillsPassport />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/community">
              <DashboardLayout>
                <Community />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/wellbeing">
              <DashboardLayout>
                <Wellbeing />
              </DashboardLayout>
            </Route>
            <Route path="/dashboard/marketplace">
              <DashboardLayout>
                <Marketplace />
              </DashboardLayout>
            </Route>
            <Route path="/admin">
              <DashboardLayout>
                <AdminPanel />
              </DashboardLayout>
            </Route>
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
