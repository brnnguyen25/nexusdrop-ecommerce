import Link from "next/link";

const FEATURED_PRODUCTS = [
  {
    id: "mech-keyboard",
    name: "Apex Pro Mini Mechanical Keyboard",
    category: "Peripherals",
    price: 149.99,
    rating: "4.9",
    image: "⌨️",
  },
  {
    id: "4k-oled-monitor",
    name: 'Monolith 32" 4K OLED 240Hz',
    category: "Displays",
    price: 799.99,
    rating: "5.0",
    image: "🖥️",
  },
  {
    id: "anc-headphones",
    name: "Aura Sound ANC Wireless Headphones",
    category: "Audio Tech",
    price: 249.99,
    rating: "4.8",
    image: "🎧",
  },
];

const CATEGORIES = [
  {
    name: "Audio Tech",
    count: "18 Items",
    icon: "🎧",
    href: "/products?category=audio",
  },
  {
    name: "Wearables",
    count: "12 Items",
    icon: "⌚",
    href: "/products?category=wearables",
  },
  {
    name: "Workspace Essentials",
    count: "34 Items",
    icon: "🖥️",
    href: "/products?category=workspace",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        {/* Left Hero Copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-semibold uppercase tracking-wider">
            <span>⚡ Engineered for Speed & Performance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Redefine Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#10B981]">
              Digital Lifestyle.
            </span>
          </h1>

          <p className="text-base text-[#9CA3AF] max-w-lg leading-relaxed">
            Discover curated high-performance hardware, mechanical peripherals,
            and desktop equipment designed for extreme speed and minimalist
            aesthetics.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
            >
              Explore Collection
            </Link>
            <Link
              href="/products?sort=featured"
              className="px-6 py-3.5 rounded-xl glass-panel text-white font-semibold text-sm hover:border-[#8B5CF6] transition-all"
            >
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Right Asymmetric Showcase Card */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#10B981] opacity-20 blur-2xl"></div>
          <div className="relative w-full aspect-square max-w-md glass-panel rounded-3xl p-8 flex flex-col justify-between overflow-hidden group">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                Featured Flagship
              </span>
              <span className="text-2xl font-black text-[#8B5CF6]">
                $799.99
              </span>
            </div>

            <div className="my-auto text-center text-9xl group-hover:scale-110 transition-transform duration-500">
              🖥️
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                Monolith 32&quot; 4K OLED
              </h3>
              <p className="text-xs text-[#9CA3AF]">
                240Hz Ultra-Low Latency Display
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Categories Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Trending Categories
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Explore gear tailored for your exact setup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-center gap-4 group"
            >
              <div className="text-4xl p-3 bg-[#0B0F19] rounded-xl border border-[#1F2937]">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-[#9CA3AF]">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Hardware</h2>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Hand-selected best sellers ready to ship.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#8B5CF6] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 w-full bg-[#0B0F19] rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform">
                  {product.image}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#8B5CF6]">
                    {product.category}
                  </span>
                  <span className="text-[#9CA3AF]">★ {product.rating}</span>
                </div>
                <h3 className="text-base font-semibold text-white mt-2 group-hover:text-[#8B5CF6] transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#1F2937]">
                <span className="text-xl font-bold text-white">
                  ${product.price}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#111827] group-hover:bg-[#8B5CF6] text-xs font-semibold text-white transition-colors border border-[#1F2937]">
                  Quick View
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
