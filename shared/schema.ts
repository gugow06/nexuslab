import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean, serial, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ===== USERS TABLE =====
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["user", "admin", "company"] }).notNull().default("user"),
  avatar: text("avatar"),
  currentPosition: text("current_position"),
  targetPosition: text("target_position"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userSkills: many(userSkills),
  careerRoutes: many(careerRoutes),
  userTrailProgress: many(userTrailProgress),
  labResults: many(labResults),
  applications: many(applications),
  wellbeingLogs: many(wellbeingLogs),
  userGamification: many(userGamification),
  userChallenges: many(userChallenges),
  userAchievements: many(userAchievements),
}));

// ===== SKILLS TABLE =====
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  icon: text("icon"),
});

export const skillsRelations = relations(skills, ({ many }) => ({
  userSkills: many(userSkills),
}));

// ===== USER SKILLS TABLE =====
export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  skillId: integer("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  level: integer("level").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, { fields: [userSkills.userId], references: [users.id] }),
  skill: one(skills, { fields: [userSkills.skillId], references: [skills.id] }),
}));

// ===== CAREER ROUTES TABLE =====
export const careerRoutes = pgTable("career_routes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  currentPosition: text("current_position").notNull(),
  targetPosition: text("target_position").notNull(),
  steps: jsonb("steps").notNull().$type<Array<{ title: string; description: string; skills: string[]; timeframe: string }>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const careerRoutesRelations = relations(careerRoutes, ({ one }) => ({
  user: one(users, { fields: [careerRoutes.userId], references: [users.id] }),
}));

// ===== LEARNING TRAILS TABLE =====
export const learningTrails = pgTable("learning_trails", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty", { enum: ["beginner", "intermediate", "advanced"] }).notNull(),
  category: text("category").notNull(),
  thumbnail: text("thumbnail"),
  estimatedHours: integer("estimated_hours"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const learningTrailsRelations = relations(learningTrails, ({ many }) => ({
  modules: many(trailModules),
  userProgress: many(userTrailProgress),
}));

// ===== TRAIL MODULES TABLE =====
export const trailModules = pgTable("trail_modules", {
  id: serial("id").primaryKey(),
  trailId: integer("trail_id").notNull().references(() => learningTrails.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: text("type", { enum: ["video", "text", "challenge", "quiz"] }).notNull(),
  content: jsonb("content").notNull().$type<{ body?: string; videoUrl?: string; questions?: any[] }>(),
  order: integer("order").notNull(),
  skillsAwarded: jsonb("skills_awarded").$type<number[]>(),
});

export const trailModulesRelations = relations(trailModules, ({ one }) => ({
  trail: one(learningTrails, { fields: [trailModules.trailId], references: [learningTrails.id] }),
}));

// ===== USER TRAIL PROGRESS TABLE =====
export const userTrailProgress = pgTable("user_trail_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  trailId: integer("trail_id").notNull().references(() => learningTrails.id, { onDelete: "cascade" }),
  completedModules: jsonb("completed_modules").notNull().default(sql`'[]'::jsonb`).$type<number[]>(),
  progressPercentage: integer("progress_percentage").notNull().default(0),
  lastAccessedAt: timestamp("last_accessed_at").notNull().defaultNow(),
});

export const userTrailProgressRelations = relations(userTrailProgress, ({ one }) => ({
  user: one(users, { fields: [userTrailProgress.userId], references: [users.id] }),
  trail: one(learningTrails, { fields: [userTrailProgress.trailId], references: [learningTrails.id] }),
}));

// ===== LABS TABLE =====
export const labs = pgTable("labs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  scenarioData: jsonb("scenario_data").notNull().$type<{
    scenario: string;
    decisions: Array<{ id: string; text: string; impact: string; points: number }>;
  }>(),
  difficulty: text("difficulty", { enum: ["beginner", "intermediate", "advanced"] }).notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const labsRelations = relations(labs, ({ many }) => ({
  results: many(labResults),
}));

// ===== LAB RESULTS TABLE =====
export const labResults = pgTable("lab_results", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  labId: integer("lab_id").notNull().references(() => labs.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  decisions: jsonb("decisions").notNull().$type<string[]>(),
  feedback: text("feedback"),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const labResultsRelations = relations(labResults, ({ one }) => ({
  user: one(users, { fields: [labResults.userId], references: [users.id] }),
  lab: one(labs, { fields: [labResults.labId], references: [labs.id] }),
}));

// ===== OPPORTUNITIES TABLE =====
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  companyId: varchar("company_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: jsonb("requirements").notNull().$type<string[]>(),
  location: text("location"),
  type: text("type", { enum: ["full-time", "part-time", "contract", "internship"] }).notNull(),
  experienceLevel: text("experience_level", { enum: ["entry", "mid", "senior", "lead"] }).notNull(),
  companyName: text("company_name").notNull(),
  companyLogo: text("company_logo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const opportunitiesRelations = relations(opportunities, ({ many, one }) => ({
  applications: many(applications),
  company: one(users, { fields: [opportunities.companyId], references: [users.id] }),
}));

// ===== APPLICATIONS TABLE =====
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  opportunityId: integer("opportunity_id").notNull().references(() => opportunities.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["applied", "reviewing", "interview", "offer", "rejected"] }).notNull().default("applied"),
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, { fields: [applications.userId], references: [users.id] }),
  opportunity: one(opportunities, { fields: [applications.opportunityId], references: [opportunities.id] }),
}));

// ===== WELLBEING LOGS TABLE =====
export const wellbeingLogs = pgTable("wellbeing_logs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mood: integer("mood").notNull(),
  note: text("note"),
  aiSuggestion: text("ai_suggestion"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const wellbeingLogsRelations = relations(wellbeingLogs, ({ one }) => ({
  user: one(users, { fields: [wellbeingLogs.userId], references: [users.id] }),
}));

// ===== USER GAMIFICATION TABLE =====
export const userGamification = pgTable("user_gamification", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  lastActivityDate: timestamp("last_activity_date"),
});

export const userGamificationRelations = relations(userGamification, ({ one }) => ({
  user: one(users, { fields: [userGamification.userId], references: [users.id] }),
}));

// ===== CHALLENGES TABLE =====
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  xpReward: integer("xp_reward").notNull(),
  type: text("type", { enum: ["daily", "weekly", "achievement"] }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const challengesRelations = relations(challenges, ({ many }) => ({
  userChallenges: many(userChallenges),
}));

// ===== USER CHALLENGES TABLE =====
export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" }),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const userChallengesRelations = relations(userChallenges, ({ one }) => ({
  user: one(users, { fields: [userChallenges.userId], references: [users.id] }),
  challenge: one(challenges, { fields: [userChallenges.challengeId], references: [challenges.id] }),
}));

// ===== ACHIEVEMENTS TABLE =====
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: jsonb("requirement").notNull().$type<{ type: string; target: number }>(),
});

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

// ===== USER ACHIEVEMENTS TABLE =====
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade" }),
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, { fields: [userAchievements.userId], references: [users.id] }),
  achievement: one(achievements, { fields: [userAchievements.achievementId], references: [achievements.id] }),
}));

// ===== INSERT SCHEMAS =====
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertUserSkillSchema = createInsertSchema(userSkills).omit({ id: true, updatedAt: true });
export const insertCareerRouteSchema = createInsertSchema(careerRoutes).omit({ id: true, createdAt: true });
export const insertLearningTrailSchema = createInsertSchema(learningTrails).omit({ id: true, createdAt: true });
export const insertTrailModuleSchema = createInsertSchema(trailModules).omit({ id: true });
export const insertUserTrailProgressSchema = createInsertSchema(userTrailProgress).omit({ id: true, lastAccessedAt: true });
export const insertLabSchema = createInsertSchema(labs).omit({ id: true, createdAt: true });
export const insertLabResultSchema = createInsertSchema(labResults).omit({ id: true, completedAt: true });
export const insertOpportunitySchema = createInsertSchema(opportunities).omit({ id: true, createdAt: true });
export const insertApplicationSchema = createInsertSchema(applications).omit({ id: true, appliedAt: true, updatedAt: true });
export const insertWellbeingLogSchema = createInsertSchema(wellbeingLogs).omit({ id: true, createdAt: true });
export const insertUserGamificationSchema = createInsertSchema(userGamification).omit({ id: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true });
export const insertUserChallengeSchema = createInsertSchema(userChallenges).omit({ id: true, completedAt: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true, unlockedAt: true });

// ===== TYPES =====
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;
export type CareerRoute = typeof careerRoutes.$inferSelect;
export type InsertCareerRoute = z.infer<typeof insertCareerRouteSchema>;
export type LearningTrail = typeof learningTrails.$inferSelect;
export type InsertLearningTrail = z.infer<typeof insertLearningTrailSchema>;
export type TrailModule = typeof trailModules.$inferSelect;
export type InsertTrailModule = z.infer<typeof insertTrailModuleSchema>;
export type UserTrailProgress = typeof userTrailProgress.$inferSelect;
export type InsertUserTrailProgress = z.infer<typeof insertUserTrailProgressSchema>;
export type Lab = typeof labs.$inferSelect;
export type InsertLab = z.infer<typeof insertLabSchema>;
export type LabResult = typeof labResults.$inferSelect;
export type InsertLabResult = z.infer<typeof insertLabResultSchema>;
export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type WellbeingLog = typeof wellbeingLogs.$inferSelect;
export type InsertWellbeingLog = z.infer<typeof insertWellbeingLogSchema>;
export type UserGamification = typeof userGamification.$inferSelect;
export type InsertUserGamification = z.infer<typeof insertUserGamificationSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type UserChallenge = typeof userChallenges.$inferSelect;
export type InsertUserChallenge = z.infer<typeof insertUserChallengeSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
