"use client";

import { useState } from "react";

export default function SubmissionRow({ submission }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between"
      >
        <div>
          <p className="font-medium">
            {submission.student.name}
          </p>
          <p className="text-xs text-gray-500">
            Submitted on{" "}
            {new Date(submission.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className="text-sm text-indigo-600">
          {open ? "Hide" : "View"}
        </span>
      </div>

      {open && (
        <div className="mt-4 space-y-3 rounded-lg bg-gray-50 p-4">
          <div>
            <p className="text-sm font-semibold">Submission</p>
            <p className="text-sm text-gray-700">
              {submission.content}
            </p>
          </div>

          {submission.aiFeedback && (
            <div>
              <p className="text-sm font-semibold text-green-700">
                AI Feedback
              </p>
              <p className="text-sm text-green-800">
                {submission.aiFeedback}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
