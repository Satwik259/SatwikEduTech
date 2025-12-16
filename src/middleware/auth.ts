import { verifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export function authMiddleware(
  req: NextRequest,
  roles: string[] = []
) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const user = verifyToken(token) as any;

  if (roles.length && !roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
