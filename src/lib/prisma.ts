import { PrismaClient } from "@prisma/client";
console.log("PRISMA DATABASE_URL:", process.env.DATABASE_URL);
export const prisma = new PrismaClient();
