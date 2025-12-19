"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email/username or password");
      return;
    }

    router.push("/");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md bg-gray-300 p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <div className="w-[70%]">
            <label className="block  text-black text-sm mb-1">Email or Username</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-[70%]">
            <label className="block  text-black  text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full  text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-[70%] bg-blue-600 text-black  text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}
