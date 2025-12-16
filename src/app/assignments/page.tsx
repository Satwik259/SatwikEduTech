import { AssignmentCard } from "@/components/AssignmentCard";
import CreateAssignmentForm from "@/components/CreateAssignmentForm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getUserRole() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const decoded: any = jwt.decode(token);
    return decoded?.role ?? null;
}

export default async function Page() {
    const role = await getUserRole();

    const res = await fetch("http://localhost:3000/api/assignments", {
        cache: "no-store",
    });
    const data = await res.json();

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                <header className="flex flex-col gap-3">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                         Assignments
                    </h1>
                    <p className="text-gray-600 max-w-xl">
                        Create, manage, and track assignments with role-based access and
                        AI-assisted feedback.
                    </p>
                </header>

                {role === "TEACHER" && (
                    <section className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50" />
                        <div className="relative p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                 Create New Assignment
                            </h2>
                            <CreateAssignmentForm />
                        </div>
                    </section>
                )}

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold">
                        Available Assignments
                    </h2>

                    {data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-white text-center">
                            <p className="text-gray-500">
                                No assignments have been created yet.
                            </p>
                            {role === "TEACHER" && (
                                <p className="text-sm text-gray-400 mt-2">
                                    Start by creating your first assignment above.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {data.map((a: any) => (
                                <AssignmentCard
                                    key={a.id}
                                    assignment={a}
                                    role={role}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
