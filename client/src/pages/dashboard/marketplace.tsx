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
    title: "Senior Product Manager",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "full-time",
    experienceLevel: "senior",
    requirements: ["Product Strategy", "Data Analysis", "Team Leadership"],
    description: "Lead product initiatives for our flagship platform serving 10M+ users",
    matchScore: 92,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Remote",
    type: "full-time",
    experienceLevel: "mid",
    requirements: ["Agile Methodologies", "User Research", "Stakeholder Management"],
    description: "Drive product development in fast-paced startup environment",
    matchScore: 85,
  },
  {
    id: 3,
    title: "Associate Product Manager",
    company: "DataFlow Inc",
    location: "New York, NY",
    type: "full-time",
    experienceLevel: "entry",
    requirements: ["Product Strategy", "Communication", "Analytics"],
    description: "Join our APM program and learn from industry leaders",
    matchScore: 78,
  },
  {
    id: 4,
    title: "Product Consultant",
    company: "Strategy Partners",
    location: "Remote",
    type: "contract",
    experienceLevel: "senior",
    requirements: ["Strategic Planning", "Business Strategy", "Client Management"],
    description: "Help Fortune 500 companies transform their product portfolios",
    matchScore: 88,
  },
  {
    id: 5,
    title: "Director of Product",
    company: "GrowthTech",
    location: "Austin, TX",
    type: "full-time",
    experienceLevel: "lead",
    requirements: ["Vision Setting", "Cross-functional Leadership", "P&L Management"],
    description: "Lead product organization and drive company-wide product strategy",
    matchScore: 70,
  },
  {
    id: 6,
    title: "Product Manager Intern",
    company: "StartupX",
    location: "Boston, MA",
    type: "internship",
    experienceLevel: "entry",
    requirements: ["Learning Agility", "Communication", "Problem Solving"],
    description: "Summer internship program with mentorship and hands-on experience",
    matchScore: 82,
  },
];

const applications = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "TechCorp",
    status: "interview",
    appliedDate: "2024-05-10",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    status: "reviewing",
    appliedDate: "2024-05-12",
  },
];

const typeColors: Record<string, string> = {
  "full-time": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "part-time": "bg-green-500/10 text-green-700 dark:text-green-400",
  contract: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  internship: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

const statusColors: Record<string, string> = {
  applied: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  reviewing: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  interview: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  offer: "bg-green-500/10 text-green-700 dark:text-green-400",
  rejected: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function Marketplace() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Opportunity Marketplace</h1>
        <p className="text-muted-foreground text-lg">
          Discover roles that match your skills and aspirations
        </p>
      </div>

      <Tabs defaultValue="explore" className="space-y-6">
        <TabsList>
          <TabsTrigger value="explore" data-testid="tab-explore">
            Explore
          </TabsTrigger>
          <TabsTrigger value="applications" data-testid="tab-applications">
            My Applications ({applications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
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
                        <p className="text-xs text-muted-foreground">Match Score</p>
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
                          +{opportunity.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1" data-testid={`button-apply-${index}`}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                      <Button variant="outline" data-testid={`button-details-${index}`}>
                        View Details
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
                <p className="text-muted-foreground mb-4">No applications yet</p>
                <Button variant="outline">Browse Opportunities</Button>
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
                      Applied {new Date(application.appliedDate).toLocaleDateString()}
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
