import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, TrendingUp, Award, Users, Briefcase, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Nexus.AI Mentor",
    description: "Get personalized career guidance from our AI-powered mentor, tailored to your goals and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Roadmaps",
    description: "Visualize your path from current position to dream role with clear, actionable steps.",
  },
  {
    icon: Award,
    title: "Skills Passport",
    description: "Track and showcase your competencies with a comprehensive, verifiable skills portfolio.",
  },
  {
    icon: Users,
    title: "Community 1%",
    description: "Join an elite community of high achievers with gamification, challenges, and leaderboards.",
  },
  {
    icon: Briefcase,
    title: "Opportunity Marketplace",
    description: "Access curated job opportunities matched to your skills and career aspirations.",
  },
  {
    icon: Heart,
    title: "Well-being Tracking",
    description: "Maintain work-life balance with mood tracking and AI-powered wellness suggestions.",
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
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button data-testid="link-register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
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
              Transform Your Career with AI-Powered Guidance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the top 1% of professionals with personalized learning paths, digital simulations, and a comprehensive skills ecosystem.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" data-testid="button-hero-start">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" data-testid="button-hero-learn">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive platform designed for career transformation
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
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Top 1%?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your transformation today with AI-powered career development
          </p>
          <Link href="/register">
            <Button size="lg" data-testid="button-cta-signup">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 NexusLab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
