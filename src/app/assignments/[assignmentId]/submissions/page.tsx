import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-server";
import SubmissionRow from "@/components/SubmissionRow";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;

  await requireUser(["TEACHER"]);

  const submissions = await prisma.submission.findMany({
    where: { assignmentId },
    include: {
      student: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Submissions</h1>
        <p className="text-sm text-gray-500">
          {submissions.length} student
          {submissions.length !== 1 && "s"} submitted
        </p>
      </header>

      {submissions.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No submissions yet.
        </div>
      ) : (
        <div className="divide-y rounded-xl border bg-white">
          {submissions.map((s) => (
            <SubmissionRow key={s.id} submission={s} />
          ))}
        </div>
      )}
    </main>
  );
}
