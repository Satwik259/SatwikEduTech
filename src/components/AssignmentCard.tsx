"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AssignmentCard({ assignment, role }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitAssignment() {
    if (!content.trim()) return;

    setLoading(true);

    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignmentId: assignment.id,
        content,
      }),
    });

    setLoading(false);
    router.push("/my-submissions"); 
  }

  return (
    <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md space-y-3">
      <h3 className="text-lg font-semibold group-hover:text-indigo-600">
        {assignment.title}
      </h3>

      <p className="text-sm text-gray-600 line-clamp-3">
        {assignment.description}
      </p>

      <p className="text-xs text-gray-500">
        Due{" "}
        {new Date(assignment.dueDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      {role === "STUDENT" && (
        <div className="pt-2">
          <button
            onClick={() => setOpen(!open)}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Submit Assignment
          </button>

          {open && (
            <div className="mt-3 space-y-3">
              <textarea
                placeholder="Write your answer here or paste a GitHub / Docs link…"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={submitAssignment}
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      )}

      {role === "TEACHER" && (
        <button
          onClick={() =>
         router.push(`/assignments/${assignment.id}/submissions`)
          }
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:underline"
        >
          View Submissions →
        </button>
      )}
    </div>
  );
}
