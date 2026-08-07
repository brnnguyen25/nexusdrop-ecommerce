import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl border border-neutral-800 bg-neutral-900 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Welcome to the NexusDrop!
          </h1>
          <p className="text-sm text-neutral-400">
            Sign in to your NexusDrop account
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
