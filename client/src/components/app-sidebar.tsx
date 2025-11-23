import { Home, Map, BookOpen, FlaskConical, Award, Users, Briefcase, Heart, Settings, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    group: "Overview",
  },
  {
    title: "Career Roadmap",
    url: "/dashboard/career",
    icon: Map,
    group: "Learn",
  },
  {
    title: "Learning Trails",
    url: "/dashboard/trails",
    icon: BookOpen,
    group: "Learn",
  },
  {
    title: "Digital Labs",
    url: "/dashboard/labs",
    icon: FlaskConical,
    group: "Learn",
  },
  {
    title: "Skills Passport",
    url: "/dashboard/skills",
    icon: Award,
    group: "Progress",
  },
  {
    title: "Community 1%",
    url: "/dashboard/community",
    icon: Users,
    group: "Community",
  },
  {
    title: "Marketplace",
    url: "/dashboard/marketplace",
    icon: Briefcase,
    group: "Opportunities",
  },
  {
    title: "Well-being",
    url: "/dashboard/wellbeing",
    icon: Heart,
    group: "Health",
  },
];

const adminItems = [
  {
    title: "Admin Panel",
    url: "/admin",
    icon: Shield,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">NexusLab</h1>
            <p className="text-xs text-muted-foreground">Career Excellence</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`sidebar-link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid="sidebar-link-admin"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
