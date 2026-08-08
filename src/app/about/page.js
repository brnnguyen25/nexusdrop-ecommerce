import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-6 space-y-12 max-w-3xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          About <span className="text-[#8B5CF6]">NexusDrop</span>
        </h1>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">
          NexusDrop is a full-stack e-commerce platform built for people who
          care about their setup — curated audio gear, mechanical peripherals,
          displays, and workspace essentials, chosen for performance and
          minimalist design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-[#1F2937] text-center space-y-2">
          <h3 className="text-sm font-bold text-white">Curated Selection</h3>
          <p className="text-xs text-[#9CA3AF]">
            Every product is chosen for quality and performance, not just
            quantity.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-[#1F2937] text-center space-y-2">
          <h3 className="text-sm font-bold text-white">Fast & Reliable</h3>
          <p className="text-xs text-[#9CA3AF]">
            Built on modern infrastructure for a fast, seamless shopping
            experience.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-[#1F2937] text-center space-y-2">
          <h3 className="text-sm font-bold text-white">Built With Care</h3>
          <p className="text-xs text-[#9CA3AF]">
            Designed and engineered end-to-end as a hands-on showcase project.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/products"
          className="inline-block rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white hover:bg-[#7C3AED] transition-all"
        >
          Explore the Collection
        </Link>
      </div>
    </div>
  );
}
