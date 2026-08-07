"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const registerData = await registerRes.json();

      if (!registerData.success) {
        setError(registerData.error || "Registration failed.");
        return;
      }

      // Automatically log the user in right after successful registration
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();

      if (!loginData.success) {
        // Registration worked, but auto-login failed — send them to login manually
        router.push("/login");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[#1F2937] bg-[#111827] space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-sm text-[#9CA3AF]">Join NexusDrop today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-semibold transition-colors mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-[#9CA3AF]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#8B5CF6] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
