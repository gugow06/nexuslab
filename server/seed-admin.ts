import { db } from "./db";
import { users } from "@shared/schema";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  const adminEmail = "admin@admin.com";
  const adminPassword = "admin123";
  
  // Check if admin already exists
  const existing = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);
  
  if (existing.length > 0) {
    console.log("Admin user already exists");
    return;
  }
  
  // Create admin user
  const hashedPassword = await hash(adminPassword, 10);
  
  await db.insert(users).values({
    email: adminEmail,
    password: hashedPassword,
    name: "Administrador",
    role: "admin",
    currentPosition: "Admin",
    targetPosition: "Admin",
  });
  
  console.log("✅ Admin user created successfully!");
  console.log("Email: admin@admin.com");
  console.log("Password: admin123");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Error seeding admin:", error);
  process.exit(1);
});
