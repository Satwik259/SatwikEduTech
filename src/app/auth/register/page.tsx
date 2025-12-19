"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm space-y-6">

        <header className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-500">
            Join EduFlow to manage and submit assignments
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Login navigation */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-black hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}
