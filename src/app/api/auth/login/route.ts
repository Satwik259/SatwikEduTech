import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ error: "Invalid" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return Response.json({ error: "Invalid" }, { status: 401 });

  const token = signToken({ id: user.id, role: user.role });

  return new Response(JSON.stringify(user), {
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
    },
  });
}
