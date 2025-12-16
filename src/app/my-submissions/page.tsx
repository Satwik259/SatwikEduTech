import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function MySubmissionsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  if (decoded.role !== "STUDENT") {
    throw new Error("Forbidden");
  }

  const submissions = await prisma.submission.findMany({
    where: { studentId: decoded.id },
    include: { assignment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Submissions</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">
          You haven’t submitted any assignments yet.
        </p>
      ) : (
        submissions.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border bg-white p-5 space-y-3"
          >
            <div>
              <p className="font-semibold">
                {s.assignment.title}
              </p>
              <p className="text-xs text-gray-500">
                Submitted on{" "}
                {new Date(s.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Your Submission</p>
              <p className="text-sm text-gray-700">
                {s.content}
              </p>
            </div>

            {s.aiFeedback && (
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm font-semibold text-green-700">
                  AI Feedback
                </p>
                <p className="text-sm text-green-800">
                  {s.aiFeedback}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
}
