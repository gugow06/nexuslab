// Referenced from blueprint: javascript_database
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import {
  users,
  skills,
  userSkills,
  careerRoutes,
  learningTrails,
  trailModules,
  userTrailProgress,
  labs,
  labResults,
  opportunities,
  applications,
  wellbeingLogs,
  userGamification,
  challenges,
  userChallenges,
  achievements,
  userAchievements,
  type User,
  type InsertUser,
  type Skill,
  type InsertSkill,
  type UserSkill,
  type InsertUserSkill,
  type CareerRoute,
  type InsertCareerRoute,
  type LearningTrail,
  type InsertLearningTrail,
  type TrailModule,
  type InsertTrailModule,
  type UserTrailProgress,
  type InsertUserTrailProgress,
  type Lab,
  type InsertLab,
  type LabResult,
  type InsertLabResult,
  type Opportunity,
  type InsertOpportunity,
  type Application,
  type InsertApplication,
  type WellbeingLog,
  type InsertWellbeingLog,
  type UserGamification,
  type InsertUserGamification,
  type Challenge,
  type InsertChallenge,
  type UserChallenge,
  type InsertUserChallenge,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;

  // Skills
  getAllSkills(): Promise<Skill[]>;
  getUserSkills(userId: string): Promise<(UserSkill & { skill: Skill })[]>;
  addUserSkill(data: InsertUserSkill): Promise<UserSkill>;
  updateUserSkill(id: number, level: number): Promise<UserSkill | undefined>;

  // Career Routes
  getCareerRoutes(userId: string): Promise<CareerRoute[]>;
  createCareerRoute(data: InsertCareerRoute): Promise<CareerRoute>;

  // Learning Trails
  getAllTrails(): Promise<LearningTrail[]>;
  getTrail(id: number): Promise<LearningTrail | undefined>;
  getTrailModules(trailId: number): Promise<TrailModule[]>;
  getUserTrailProgress(userId: string, trailId: number): Promise<UserTrailProgress | undefined>;
  updateTrailProgress(data: InsertUserTrailProgress): Promise<UserTrailProgress>;
  createTrail(data: InsertLearningTrail): Promise<LearningTrail>;
  createTrailModule(data: InsertTrailModule): Promise<TrailModule>;

  // Labs
  getAllLabs(): Promise<Lab[]>;
  getLab(id: number): Promise<Lab | undefined>;
  getUserLabResults(userId: string): Promise<(LabResult & { lab: Lab })[]>;
  submitLabResult(data: InsertLabResult): Promise<LabResult>;
  createLab(data: InsertLab): Promise<Lab>;

  // Opportunities & Applications
  getAllOpportunities(): Promise<Opportunity[]>;
  getUserApplications(userId: string): Promise<(Application & { opportunity: Opportunity })[]>;
  createApplication(data: InsertApplication): Promise<Application>;
  createOpportunity(data: InsertOpportunity): Promise<Opportunity>;

  // Wellbeing
  createWellbeingLog(data: InsertWellbeingLog): Promise<WellbeingLog>;
  getUserWellbeingHistory(userId: string, limit?: number): Promise<WellbeingLog[]>;

  // Gamification
  getUserGamification(userId: string): Promise<UserGamification | undefined>;
  updateUserXP(userId: string, xpDelta: number): Promise<UserGamification>;
  getLeaderboard(limit?: number): Promise<(UserGamification & { user: User })[]>;
  getActiveChallenges(): Promise<Challenge[]>;
  completeChallenge(userId: string, challengeId: number): Promise<UserChallenge>;

  // Admin - Users
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;

  // Admin - Trails
  updateTrail(id: number, data: Partial<InsertLearningTrail>): Promise<LearningTrail | undefined>;
  deleteTrail(id: number): Promise<void>;
  updateTrailModule(id: number, data: Partial<InsertTrailModule>): Promise<TrailModule | undefined>;
  deleteTrailModule(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // ===== USERS =====
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    // Initialize gamification for new user
    await db.insert(userGamification).values({ userId: user.id });
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // ===== SKILLS =====
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getUserSkills(userId: string): Promise<(UserSkill & { skill: Skill })[]> {
    const results = await db
      .select()
      .from(userSkills)
      .leftJoin(skills, eq(userSkills.skillId, skills.id))
      .where(eq(userSkills.userId, userId));

    return results.map((r) => ({
      ...r.user_skills,
      skill: r.skills!,
    }));
  }

  async addUserSkill(data: InsertUserSkill): Promise<UserSkill> {
    const [userSkill] = await db.insert(userSkills).values(data).returning();
    return userSkill;
  }

  async updateUserSkill(id: number, level: number): Promise<UserSkill | undefined> {
    const [userSkill] = await db
      .update(userSkills)
      .set({ level, updatedAt: new Date() })
      .where(eq(userSkills.id, id))
      .returning();
    return userSkill || undefined;
  }

  // ===== CAREER ROUTES =====
  async getCareerRoutes(userId: string): Promise<CareerRoute[]> {
    return await db
      .select()
      .from(careerRoutes)
      .where(eq(careerRoutes.userId, userId))
      .orderBy(desc(careerRoutes.createdAt));
  }

  async createCareerRoute(data: InsertCareerRoute): Promise<CareerRoute> {
    const [route] = await db.insert(careerRoutes).values(data).returning();
    return route;
  }

  // ===== LEARNING TRAILS =====
  async getAllTrails(): Promise<LearningTrail[]> {
    return await db.select().from(learningTrails).orderBy(learningTrails.title);
  }

  async getTrail(id: number): Promise<LearningTrail | undefined> {
    const [trail] = await db.select().from(learningTrails).where(eq(learningTrails.id, id));
    return trail || undefined;
  }

  async getTrailModules(trailId: number): Promise<TrailModule[]> {
    return await db
      .select()
      .from(trailModules)
      .where(eq(trailModules.trailId, trailId))
      .orderBy(trailModules.order);
  }

  async getUserTrailProgress(userId: string, trailId: number): Promise<UserTrailProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userTrailProgress)
      .where(and(eq(userTrailProgress.userId, userId), eq(userTrailProgress.trailId, trailId)));
    return progress || undefined;
  }

  async updateTrailProgress(data: InsertUserTrailProgress): Promise<UserTrailProgress> {
    const existing = await this.getUserTrailProgress(data.userId, data.trailId);

    if (existing) {
      const [updated] = await db
        .update(userTrailProgress)
        .set({
          completedModules: data.completedModules,
          progressPercentage: data.progressPercentage,
          lastAccessedAt: new Date(),
        })
        .where(eq(userTrailProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(userTrailProgress).values(data).returning();
      return created;
    }
  }

  async createTrail(data: InsertLearningTrail): Promise<LearningTrail> {
    const [trail] = await db.insert(learningTrails).values(data).returning();
    return trail;
  }

  async createTrailModule(data: InsertTrailModule): Promise<TrailModule> {
    const [module] = await db.insert(trailModules).values(data).returning();
    return module;
  }

  // ===== LABS =====
  async getAllLabs(): Promise<Lab[]> {
    return await db.select().from(labs).orderBy(labs.name);
  }

  async getLab(id: number): Promise<Lab | undefined> {
    const [lab] = await db.select().from(labs).where(eq(labs.id, id));
    return lab || undefined;
  }

  async getUserLabResults(userId: string): Promise<(LabResult & { lab: Lab })[]> {
    const results = await db
      .select()
      .from(labResults)
      .leftJoin(labs, eq(labResults.labId, labs.id))
      .where(eq(labResults.userId, userId))
      .orderBy(desc(labResults.completedAt));

    return results.map((r) => ({
      ...r.lab_results,
      lab: r.labs!,
    }));
  }

  async submitLabResult(data: InsertLabResult): Promise<LabResult> {
    const [result] = await db.insert(labResults).values(data).returning();
    return result;
  }

  async createLab(data: InsertLab): Promise<Lab> {
    const [lab] = await db.insert(labs).values(data).returning();
    return lab;
  }

  // ===== OPPORTUNITIES & APPLICATIONS =====
  async getAllOpportunities(): Promise<Opportunity[]> {
    return await db.select().from(opportunities).orderBy(desc(opportunities.createdAt));
  }

  async getUserApplications(userId: string): Promise<(Application & { opportunity: Opportunity })[]> {
    const results = await db
      .select()
      .from(applications)
      .leftJoin(opportunities, eq(applications.opportunityId, opportunities.id))
      .where(eq(applications.userId, userId))
      .orderBy(desc(applications.appliedAt));

    return results.map((r) => ({
      ...r.applications,
      opportunity: r.opportunities!,
    }));
  }

  async createApplication(data: InsertApplication): Promise<Application> {
    const [application] = await db.insert(applications).values(data).returning();
    return application;
  }

  async createOpportunity(data: InsertOpportunity): Promise<Opportunity> {
    const [opportunity] = await db.insert(opportunities).values(data).returning();
    return opportunity;
  }

  // ===== WELLBEING =====
  async createWellbeingLog(data: InsertWellbeingLog): Promise<WellbeingLog> {
    const [log] = await db.insert(wellbeingLogs).values(data).returning();
    return log;
  }

  async getUserWellbeingHistory(userId: string, limit: number = 30): Promise<WellbeingLog[]> {
    return await db
      .select()
      .from(wellbeingLogs)
      .where(eq(wellbeingLogs.userId, userId))
      .orderBy(desc(wellbeingLogs.createdAt))
      .limit(limit);
  }

  // ===== GAMIFICATION =====
  async getUserGamification(userId: string): Promise<UserGamification | undefined> {
    const [gamification] = await db
      .select()
      .from(userGamification)
      .where(eq(userGamification.userId, userId));
    return gamification || undefined;
  }

  async updateUserXP(userId: string, xpDelta: number): Promise<UserGamification> {
    let gamification = await this.getUserGamification(userId);
    
    if (!gamification) {
      const [created] = await db
        .insert(userGamification)
        .values({ userId, xp: xpDelta })
        .returning();
      gamification = created;
    } else {
      const newXP = gamification.xp + xpDelta;
      const newLevel = Math.floor(newXP / 1000) + 1; // Level up every 1000 XP

      const [updated] = await db
        .update(userGamification)
        .set({ 
          xp: newXP, 
          level: newLevel,
          lastActivityDate: new Date(),
        })
        .where(eq(userGamification.userId, userId))
        .returning();
      gamification = updated;
    }

    return gamification;
  }

  async getLeaderboard(limit: number = 10): Promise<(UserGamification & { user: User })[]> {
    const results = await db
      .select()
      .from(userGamification)
      .leftJoin(users, eq(userGamification.userId, users.id))
      .orderBy(desc(userGamification.xp))
      .limit(limit);

    return results.map((r) => ({
      ...r.user_gamification,
      user: r.users!,
    }));
  }

  async getActiveChallenges(): Promise<Challenge[]> {
    return await db.select().from(challenges).where(eq(challenges.isActive, true));
  }

  async completeChallenge(userId: string, challengeId: number): Promise<UserChallenge> {
    const [userChallenge] = await db
      .insert(userChallenges)
      .values({
        userId,
        challengeId,
        completed: true,
        completedAt: new Date(),
      })
      .returning();

    // Award XP for challenge
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, challengeId));
    if (challenge) {
      await this.updateUserXP(userId, challenge.xpReward);
    }

    return userChallenge;
  }

  // ===== ADMIN - USERS =====
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // ===== ADMIN - TRAILS =====
  async updateTrail(id: number, data: Partial<InsertLearningTrail>): Promise<LearningTrail | undefined> {
    const [trail] = await db
      .update(learningTrails)
      .set({ ...data } as any)
      .where(eq(learningTrails.id, id))
      .returning();
    return trail || undefined;
  }

  async deleteTrail(id: number): Promise<void> {
    await db.delete(learningTrails).where(eq(learningTrails.id, id));
  }

  async updateTrailModule(id: number, data: Partial<InsertTrailModule>): Promise<TrailModule | undefined> {
    const [module] = await db
      .update(trailModules)
      .set({ ...data } as any)
      .where(eq(trailModules.id, id))
      .returning();
    return module || undefined;
  }

  async deleteTrailModule(id: number): Promise<void> {
    await db.delete(trailModules).where(eq(trailModules.id, id));
  }
}

export const storage = new DatabaseStorage();
