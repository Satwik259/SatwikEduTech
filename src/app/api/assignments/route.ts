import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  const user = authMiddleware(req, ["TEACHER"]);

  const { title, description, dueDate } = await req.json();

  const parsedDate = new Date(dueDate);

  const assignment = await prisma.assignment.create({
    data: {
      title,
      description,
      dueDate: parsedDate,
      createdBy: user.id,
    },
  });

  return Response.json(assignment, { status: 201 });
}

export async function GET() {
  const assignments = await prisma.assignment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(assignments);
}
