import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function POST(req: Request) {
  const user = authMiddleware(req, ["TEACHER"]);
  const { title, description, dueDate } = await req.json();

  const parsedDate = new Date(dueDate);

  if (isNaN(parsedDate.getTime())) {
    return Response.json(
      { error: "Invalid due date" },
      { status: 400 }
    );
  }

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
