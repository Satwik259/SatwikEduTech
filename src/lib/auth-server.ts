import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function requireUser(roles: string[] = []) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token) as any;

  if (roles.length && !roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
