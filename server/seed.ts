import { db } from "./db";
import { 
  skills, 
  learningTrails, 
  trailModules, 
  labs, 
  opportunities,
  challenges,
  achievements,
} from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed Skills
  const skillsData = [
    { name: "Product Strategy", category: "product", description: "Strategic planning and vision setting" },
    { name: "Data Analysis", category: "analytics", description: "Analyzing data to drive decisions" },
    { name: "User Research", category: "research", description: "Understanding user needs through research" },
    { name: "Agile Methodologies", category: "process", description: "Working in agile/scrum environments" },
    { name: "Stakeholder Management", category: "communication", description: "Managing stakeholder relationships" },
    { name: "Team Leadership", category: "leadership", description: "Leading and mentoring teams" },
    { name: "Strategic Planning", category: "strategy", description: "Long-term planning and execution" },
    { name: "Business Strategy", category: "strategy", description: "Business-level strategic thinking" },
    { name: "Communication", category: "communication", description: "Effective communication skills" },
    { name: "Problem Solving", category: "critical-thinking", description: "Analytical problem solving" },
  ];

  await db.insert(skills).values(skillsData).onConflictDoNothing();
  console.log("✓ Seeded skills");

  // Seed Learning Trails
  const trailsData = [
    {
      title: "Advanced Leadership Skills",
      description: "Develop the leadership competencies needed to inspire and guide high-performing teams",
      difficulty: "intermediate" as const,
      category: "leadership",
      estimatedHours: 20,
      thumbnail: "leadership",
    },
    {
      title: "Data-Driven Decision Making",
      description: "Master the art of using data analytics to drive strategic business decisions",
      difficulty: "advanced" as const,
      category: "analytics",
      estimatedHours: 25,
      thumbnail: "data",
    },
    {
      title: "Strategic Communication",
      description: "Learn to communicate effectively with stakeholders at all levels of an organization",
      difficulty: "beginner" as const,
      category: "communication",
      estimatedHours: 12,
      thumbnail: "communication",
    },
    {
      title: "Product Management Fundamentals",
      description: "Core principles and practices of successful product management",
      difficulty: "beginner" as const,
      category: "product",
      estimatedHours: 18,
      thumbnail: "product",
    },
    {
      title: "Agile Project Management",
      description: "Implement agile methodologies to deliver projects faster and more efficiently",
      difficulty: "intermediate" as const,
      category: "project-management",
      estimatedHours: 15,
      thumbnail: "agile",
    },
  ];

  const insertedTrails = await db.insert(learningTrails).values(trailsData).returning();
  console.log("✓ Seeded learning trails");

  // Seed Trail Modules for first trail
  if (insertedTrails.length > 0) {
    const modulesData = [
      {
        trailId: insertedTrails[0].id,
        title: "Introduction to Leadership",
        type: "video" as const,
        content: {
          body: "Leadership fundamentals content",
          videoUrl: "https://example.com/video",
        },
        order: 1,
      },
      {
        trailId: insertedTrails[0].id,
        title: "Building High-Performance Teams",
        type: "text" as const,
        content: {
          body: "Learn strategies for creating and maintaining effective teams. Team building content here.",
        },
        order: 2,
      },
      {
        trailId: insertedTrails[0].id,
        title: "Leadership Challenge",
        type: "challenge" as const,
        content: {
          body: "Apply your leadership knowledge in a real-world scenario. Leadership challenge scenario.",
        },
        order: 3,
      },
      {
        trailId: insertedTrails[0].id,
        title: "Leadership Assessment",
        type: "quiz" as const,
        content: {
          questions: [
            { question: "What is the most important quality of a leader?", options: ["Vision", "Communication", "Integrity", "All of the above"], answer: 3 }
          ],
        },
        order: 4,
      },
    ];

    await db.insert(trailModules).values(modulesData).onConflictDoNothing();
    console.log("✓ Seeded trail modules");
  }

  // Seed Labs
  const labsData = [
    {
      name: "Crisis Management Simulation",
      description: "Navigate a company through a major crisis situation",
      difficulty: "advanced" as const,
      category: "crisis-management",
      scenarioData: {
        scenario: "Your company is facing a major product recall. Make critical decisions to minimize damage.",
        decisions: [
          { id: "1", text: "Issue immediate public apology", impact: "High transparency", points: 25 },
          { id: "2", text: "Launch full investigation", impact: "Shows accountability", points: 30 },
          { id: "3", text: "Provide customer compensation", impact: "Builds trust", points: 25 },
          { id: "4", text: "Implement new safety protocols", impact: "Prevents future issues", points: 20 },
        ],
      },
    },
    {
      name: "Stakeholder Negotiation",
      description: "Practice negotiating with different stakeholders",
      difficulty: "intermediate" as const,
      category: "negotiation",
      scenarioData: {
        scenario: "Balance competing stakeholder interests in a product launch decision.",
        decisions: [
          { id: "1", text: "Prioritize marketing team's timeline", impact: "Faster launch", points: 20 },
          { id: "2", text: "Follow engineering team's quality standards", impact: "Better product", points: 30 },
          { id: "3", text: "Compromise on feature set", impact: "Balanced approach", points: 25 },
          { id: "4", text: "Seek executive alignment", impact: "Top-down decision", points: 25 },
        ],
      },
    },
    {
      name: "Budget Allocation Challenge",
      description: "Make strategic budget decisions under constraints",
      difficulty: "intermediate" as const,
      category: "finance",
      scenarioData: {
        scenario: "Allocate limited budget across multiple high-priority initiatives.",
        decisions: [
          { id: "1", text: "Invest in R&D", impact: "Long-term innovation", points: 25 },
          { id: "2", text: "Boost marketing spend", impact: "Short-term growth", points: 20 },
          { id: "3", text: "Hire more engineers", impact: "Increased capacity", points: 30 },
          { id: "4", text: "Improve infrastructure", impact: "Operational efficiency", points: 25 },
        ],
      },
    },
  ];

  await db.insert(labs).values(labsData).onConflictDoNothing();
  console.log("✓ Seeded labs");

  // Seed Opportunities
  const opportunitiesData = [
    {
      title: "Senior Product Manager",
      companyName: "TechCorp",
      location: "San Francisco, CA",
      type: "full-time" as const,
      experienceLevel: "senior" as const,
      description: "Lead product initiatives for our flagship platform serving 10M+ users",
      requirements: ["Product Strategy", "Data Analysis", "Team Leadership"],
    },
    {
      title: "Product Manager",
      companyName: "InnovateLabs",
      location: "Remote",
      type: "full-time" as const,
      experienceLevel: "mid" as const,
      description: "Drive product development in fast-paced startup environment",
      requirements: ["Agile Methodologies", "User Research", "Stakeholder Management"],
    },
    {
      title: "Associate Product Manager",
      companyName: "DataFlow Inc",
      location: "New York, NY",
      type: "full-time" as const,
      experienceLevel: "entry" as const,
      description: "Join our APM program and learn from industry leaders",
      requirements: ["Product Strategy", "Communication", "Analytics"],
    },
  ];

  await db.insert(opportunities).values(opportunitiesData).onConflictDoNothing();
  console.log("✓ Seeded opportunities");

  // Seed Challenges
  const challengesData = [
    {
      title: "Complete 3 Trail Modules",
      description: "Finish any 3 modules from your active trails",
      type: "daily" as const,
      xpReward: 150,
      target: 3,
      isActive: true,
    },
    {
      title: "Score 80+ on Any Lab",
      description: "Achieve a high score in a digital lab simulation",
      type: "daily" as const,
      xpReward: 200,
      target: 1,
      isActive: true,
    },
    {
      title: "Weekly Consistency",
      description: "Log in and complete activities for 7 consecutive days",
      type: "weekly" as const,
      xpReward: 500,
      target: 7,
      isActive: true,
    },
  ];

  await db.insert(challenges).values(challengesData).onConflictDoNothing();
  console.log("✓ Seeded challenges");

  // Seed Achievements
  const achievementsData = [
    {
      title: "First Steps",
      description: "Complete your first module",
      icon: "award",
      requirement: { type: "modules_completed", target: 1 },
    },
    {
      title: "Trail Blazer",
      description: "Complete your first learning trail",
      icon: "trending-up",
      requirement: { type: "trails_completed", target: 1 },
    },
    {
      title: "Lab Rat",
      description: "Complete 5 digital labs",
      icon: "zap",
      requirement: { type: "labs_completed", target: 5 },
    },
  ];

  await db.insert(achievements).values(achievementsData).onConflictDoNothing();
  console.log("✓ Seeded achievements");

  console.log("✅ Database seeding completed!");
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
