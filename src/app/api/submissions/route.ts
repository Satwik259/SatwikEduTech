import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";
import { generateFeedback } from "@/lib/ai";

export async function POST(req: Request) {
  const user = authMiddleware(req, ["STUDENT"]);
  const { assignmentId, content } = await req.json();

  const submission = await prisma.submission.create({
    data: {
      assignmentId,
      studentId: user.id,
      content,
    },
  });

  try {
    const feedback = await generateFeedback(content);
    await prisma.submission.update({
      where: { id: submission.id },
      data: { aiFeedback: feedback },
    });
  } catch (err) {
    console.error("AI feedback failed", err);
  }

  return Response.json(submission, { status: 201 });
}
