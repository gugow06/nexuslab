import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertLabResultSchema, insertWellbeingLogSchema, insertApplicationSchema, insertUserTrailProgressSchema, insertTrailModuleSchema, insertLearningTrailSchema, insertLabSchema, insertOpportunitySchema } from "@shared/schema";
import { z } from "zod";
import { generateCareerRoute, generateSkillRecommendations, generateLabFeedback, generateWellnessSuggestion, chatWithAI } from "./openai";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Helper for password hashing with bcrypt
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== AUTHENTICATION =====
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await hashPassword(data.password);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || !(await verifyPassword(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/user/profile", async (req, res) => {
    try {
      // TODO: Implement actual session management
      const userId = req.query.userId as string || "mock-user-id";
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // ===== AI FEATURES =====
  app.post("/api/ai/career-route", async (req, res) => {
    try {
      const { currentPosition, targetPosition, userId } = req.body;
      
      if (!currentPosition || !targetPosition) {
        return res.status(400).json({ error: "Current and target positions required" });
      }

      const userSkills = await storage.getUserSkills(userId || "mock-user-id");
      const skills = userSkills.map((us) => us.skill.name);

      const steps = await generateCareerRoute({
        currentPosition,
        targetPosition,
        skills,
      });

      if (userId) {
        await storage.createCareerRoute({
          userId,
          currentPosition,
          targetPosition,
          steps,
        });
      }

      res.json({ steps });
    } catch (error) {
      console.error("AI career route error:", error);
      res.status(500).json({ error: "Failed to generate career route" });
    }
  });

  app.post("/api/ai/skill-recommendations", async (req, res) => {
    try {
      const { currentPosition, targetPosition } = req.body;
      
      const recommendations = await generateSkillRecommendations({
        currentPosition,
        targetPosition,
      });

      res.json({ recommendations });
    } catch (error) {
      console.error("AI skill recommendations error:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages must be an array" });
      }

      const response = await chatWithAI(messages);
      res.json({ message: response });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  // ===== LEARNING TRAILS =====
  app.get("/api/trails", async (_req, res) => {
    try {
      const trails = await storage.getAllTrails();
      res.json(trails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trails" });
    }
  });

  app.post("/api/trails", async (req, res) => {
    try {
      const data = insertLearningTrailSchema.parse(req.body);
      const trail = await storage.createTrail(data);
      res.json(trail);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create trail" });
    }
  });

  app.get("/api/trails/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const trail = await storage.getTrail(id);
      
      if (!trail) {
        return res.status(404).json({ error: "Trail not found" });
      }

      const modules = await storage.getTrailModules(id);
      res.json({ ...trail, modules });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trail" });
    }
  });

  app.post("/api/trails/:id/progress", async (req, res) => {
    try {
      const trailId = parseInt(req.params.id);
      const data = insertUserTrailProgressSchema.parse({
        ...req.body,
        trailId,
      });

      const progress = await storage.updateTrailProgress(data);
      
      // Award XP for progress
      if (data.userId) {
        const xpReward = 50; // Base XP for module completion
        await storage.updateUserXP(data.userId, xpReward);
      }

      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.post("/api/trails/:id/modules", async (req, res) => {
    try {
      const trailId = parseInt(req.params.id);
      const data = insertTrailModuleSchema.parse({
        ...req.body,
        trailId,
      });

      const module = await storage.createTrailModule(data);
      res.json(module);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create module" });
    }
  });

  // ===== LABS =====
  app.get("/api/labs", async (_req, res) => {
    try {
      const labs = await storage.getAllLabs();
      res.json(labs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch labs" });
    }
  });

  app.post("/api/labs", async (req, res) => {
    try {
      const data = insertLabSchema.parse(req.body);
      const lab = await storage.createLab(data);
      res.json(lab);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create lab" });
    }
  });

  app.get("/api/labs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lab = await storage.getLab(id);
      
      if (!lab) {
        return res.status(404).json({ error: "Lab not found" });
      }

      res.json(lab);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lab" });
    }
  });

  app.post("/api/labs/:id/submit", async (req, res) => {
    try {
      const labId = parseInt(req.params.id);
      const lab = await storage.getLab(labId);
      
      if (!lab) {
        return res.status(404).json({ error: "Lab not found" });
      }

      const data = insertLabResultSchema.parse({
        ...req.body,
        labId,
      });

      // Generate AI feedback
      const feedback = await generateLabFeedback({
        labName: lab.name,
        score: data.score,
        decisions: data.decisions,
      });

      const result = await storage.submitLabResult({
        ...data,
        feedback,
      });

      // Award XP based on score
      if (data.userId) {
        const xpReward = Math.floor(data.score * 2); // 2 XP per point
        await storage.updateUserXP(data.userId, xpReward);
      }

      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit lab result" });
    }
  });

  // ===== SKILLS =====
  app.get("/api/skills", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      
      if (userId) {
        const userSkills = await storage.getUserSkills(userId);
        return res.json(userSkills);
      }

      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { level } = req.body;
      
      if (typeof level !== "number" || level < 0 || level > 100) {
        return res.status(400).json({ error: "Level must be between 0 and 100" });
      }

      const skill = await storage.updateUserSkill(id, level);
      
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }

      res.json(skill);
    } catch (error) {
      res.status(500).json({ error: "Failed to update skill" });
    }
  });

  // ===== OPPORTUNITIES & APPLICATIONS =====
  app.get("/api/opportunities", async (_req, res) => {
    try {
      const opportunities = await storage.getAllOpportunities();
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch opportunities" });
    }
  });

  app.post("/api/opportunities", async (req, res) => {
    try {
      const data = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity(data);
      res.json(opportunity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create opportunity" });
    }
  });

  app.post("/api/opportunities/:id/apply", async (req, res) => {
    try {
      const opportunityId = parseInt(req.params.id);
      const data = insertApplicationSchema.parse({
        ...req.body,
        opportunityId,
      });

      const application = await storage.createApplication(data);
      res.json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  app.get("/api/applications", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const applications = await storage.getUserApplications(userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // ===== WELLBEING =====
  app.post("/api/wellbeing/checkin", async (req, res) => {
    try {
      const data = insertWellbeingLogSchema.parse(req.body);
      
      // Generate AI suggestion
      const aiSuggestion = await generateWellnessSuggestion({
        mood: data.mood,
        note: data.note || undefined,
      });

      const log = await storage.createWellbeingLog({
        ...data,
        aiSuggestion,
      });

      res.json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create check-in" });
    }
  });

  app.get("/api/wellbeing/history", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 30;
      
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const history = await storage.getUserWellbeingHistory(userId, limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // ===== GAMIFICATION =====
  app.get("/api/gamification/xp", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const gamification = await storage.getUserGamification(userId);
      res.json(gamification || { xp: 0, level: 1, streak: 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch XP" });
    }
  });

  app.post("/api/gamification/xp", async (req, res) => {
    try {
      const { userId, xp } = req.body;
      
      if (!userId || typeof xp !== "number") {
        return res.status(400).json({ error: "userId and xp required" });
      }

      const gamification = await storage.updateUserXP(userId, xp);
      res.json(gamification);
    } catch (error) {
      res.status(500).json({ error: "Failed to update XP" });
    }
  });

  app.get("/api/gamification/leaderboard", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/gamification/challenges", async (_req, res) => {
    try {
      const challenges = await storage.getActiveChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenges" });
    }
  });

  app.post("/api/gamification/challenges/complete", async (req, res) => {
    try {
      const { userId, challengeId } = req.body;
      
      if (!userId || !challengeId) {
        return res.status(400).json({ error: "userId and challengeId required" });
      }

      const userChallenge = await storage.completeChallenge(userId, challengeId);
      res.json(userChallenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to complete challenge" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
