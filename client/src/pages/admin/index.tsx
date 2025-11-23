import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, BookOpen, FlaskConical, Briefcase } from "lucide-react";

const stats = [
  { label: "Total Users", value: 1240, icon: Users },
  { label: "Active Trails", value: 24, icon: BookOpen },
  { label: "Digital Labs", value: 18, icon: FlaskConical },
  { label: "Opportunities", value: 156, icon: Briefcase },
];

const trails = [
  { id: 1, title: "Advanced Leadership Skills", difficulty: "intermediate", modules: 8 },
  { id: 2, title: "Data-Driven Decision Making", difficulty: "advanced", modules: 10 },
  { id: 3, title: "Strategic Communication", difficulty: "beginner", modules: 6 },
];

const labs = [
  { id: 1, name: "Crisis Management Simulation", difficulty: "advanced", completions: 1240 },
  { id: 2, name: "Stakeholder Negotiation", difficulty: "intermediate", completions: 2150 },
  { id: 3, name: "Budget Allocation Challenge", difficulty: "intermediate", completions: 1890 },
];

const opportunities = [
  { id: 1, title: "Senior Product Manager", company: "TechCorp", applicants: 24 },
  { id: 2, title: "Product Manager", company: "InnovateLabs", applicants: 18 },
  { id: 3, title: "Associate Product Manager", company: "DataFlow Inc", applicants: 32 },
];

const users = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "user" },
  { id: 2, name: "Marcus Rodriguez", email: "marcus@example.com", role: "user" },
  { id: 3, name: "Emily Watson", email: "emily@example.com", role: "admin" },
];

export default function AdminPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground text-lg">
          Manage content and users across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="trails" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trails" data-testid="tab-trails">
            Learning Trails
          </TabsTrigger>
          <TabsTrigger value="labs" data-testid="tab-labs">
            Digital Labs
          </TabsTrigger>
          <TabsTrigger value="opportunities" data-testid="tab-opportunities">
            Opportunities
          </TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trails">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Learning Trails</CardTitle>
                  <CardDescription>Manage trails and modules</CardDescription>
                </div>
                <Button data-testid="button-add-trail">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Trail
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trails.map((trail) => (
                    <TableRow key={trail.id}>
                      <TableCell className="font-medium">{trail.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{trail.difficulty}</Badge>
                      </TableCell>
                      <TableCell>{trail.modules}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-edit-trail-${trail.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-delete-trail-${trail.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Digital Labs</CardTitle>
                  <CardDescription>Manage simulations and scenarios</CardDescription>
                </div>
                <Button data-testid="button-add-lab">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lab
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Completions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labs.map((lab) => (
                    <TableRow key={lab.id}>
                      <TableCell className="font-medium">{lab.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{lab.difficulty}</Badge>
                      </TableCell>
                      <TableCell>{lab.completions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-edit-lab-${lab.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-delete-lab-${lab.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Opportunities</CardTitle>
                  <CardDescription>Manage job listings</CardDescription>
                </div>
                <Button data-testid="button-add-opportunity">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Opportunity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp.title}</TableCell>
                      <TableCell>{opp.company}</TableCell>
                      <TableCell>{opp.applicants}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-edit-opp-${opp.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-delete-opp-${opp.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-edit-user-${user.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-delete-user-${user.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
