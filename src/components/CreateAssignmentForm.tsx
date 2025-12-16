"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAssignmentForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create assignment. Make sure you are logged in as a teacher.");
      return;
    }

    setData({ title: "", description: "", dueDate: "" });

router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Assignment Title
        </label>
        <input
          required
          value={data.title}
          onChange={(e) =>
            setData({ ...data, title: e.target.value })
          }
          placeholder="e.g. React Hooks Deep Dive"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          required
          rows={4}
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          placeholder="Explain the assignment requirements..."
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <input
          required
          type="date"
          value={data.dueDate}
          onChange={(e) =>
            setData({ ...data, dueDate: e.target.value })
          }
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Assignment"}
      </button>
    </form>
  );
}
