"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="py-6 max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm text-[#9CA3AF]">
          Have a question? Send us a message and we&apos;ll get back to you.
        </p>
      </div>

      {status === "success" ? (
        <div className="glass-panel p-8 rounded-2xl border border-[#1F2937] text-center space-y-2">
          <p className="text-sm font-semibold text-white">Message sent!</p>
          <p className="text-xs text-[#9CA3AF]">
            Thanks for reaching out — we&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 rounded-2xl border border-[#1F2937] space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1F2937] bg-[#0B0F19] text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              required
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-semibold transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
