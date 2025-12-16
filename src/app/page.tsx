import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">EduFlow</h1>
      <p className="text-gray-500">AI-assisted Assignment Platform</p>

      <div className="flex gap-4">
        <Link
          href="/auth/register"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Register
        </Link>

        <Link
          href="/auth/login"
          className="px-4 py-2 border rounded"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
