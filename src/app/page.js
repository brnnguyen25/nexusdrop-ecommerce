import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const CATEGORIES = [
  { name: "Audio Tech", href: "/products?category=audio" },
  { name: "Peripherals", href: "/products?category=peripherals" },
  { name: "Displays", href: "/products?category=displays" },
  { name: "Workspace Essentials", href: "/products?category=workspace" },
];

async function getFeaturedProducts() {
  await dbConnect();
  const products = await Product.find({}).sort({ rating: -1 }).limit(3).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const flagshipProduct = featuredProducts[0] || null;

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

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
            >
              Explore Collection
            </Link>
            <Link
              href="/products?sort=featured"
              className="px-6 py-3.5 rounded-xl glass-panel text-white font-semibold text-sm hover:border-[#8B5CF6] transition-all border border-[#1F2937]"
            >
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Right Asymmetric Showcase Card */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#10B981] opacity-20 blur-2xl"></div>
          <div className="relative w-full aspect-square max-w-md glass-panel border border-[#1F2937] rounded-3xl p-8 flex flex-col justify-between overflow-hidden group">
            {flagshipProduct ? (
              <>
                <div className="flex justify-between items-start z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                    Featured Flagship
                  </span>
                  <span className="text-2xl font-black text-[#8B5CF6]">
                    ${flagshipProduct.price?.toFixed(2)}
                  </span>
                </div>

                <div className="relative my-auto h-48 w-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  {flagshipProduct.image ? (
                    <Image
                      src={flagshipProduct.image}
                      alt={flagshipProduct.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs text-[#9CA3AF]">
                      No Preview Available
                    </span>
                  )}
                </div>

                <div className="space-y-1 z-10">
                  <h3 className="text-xl font-bold text-white">
                    {flagshipProduct.name}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    {flagshipProduct.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="m-auto text-center space-y-2">
                <p className="text-sm font-semibold text-white">
                  NexusDrop Flagship Collection
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  Premium gear dropping soon.
                </p>
              </div>
            )}
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
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#1F2937] flex items-center justify-between group"
            >
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-[#8B5CF6] font-semibold mt-1 inline-block">
                  Shop Category →
                </span>
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

        {featuredProducts.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-[#1F2937] space-y-3">
            <p className="text-sm font-semibold text-white">
              No featured items currently listed
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Browse our full catalog to discover available hardware.
            </p>
            <Link
              href="/products"
              className="inline-block rounded-xl bg-[#8B5CF6] px-5 py-2 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
            >
              View Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-[#1F2937] flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#0B0F19] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-xs text-[#9CA3AF]">
                        No Preview Available
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#8B5CF6]">
                      {product.category}
                    </span>
                    {product.rating && (
                      <span className="text-[#9CA3AF]">★ {product.rating}</span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mt-2 group-hover:text-[#8B5CF6] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#1F2937]">
                  <span className="text-xl font-bold text-white">
                    ${product.price?.toFixed(2)}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#111827] group-hover:bg-[#8B5CF6] text-xs font-semibold text-white transition-colors border border-[#1F2937]">
                    Quick View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
