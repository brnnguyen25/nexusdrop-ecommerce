"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CATEGORIES = [
  "Peripherals",
  "Displays",
  "Audio Tech",
  "Workspace Essentials",
];

export default function ProductsPage() {
  // Live products state initialized empty (ready for MongoDB / API fetching)
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("best-sellers");

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1F2937] pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore Collection
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            High-performance hardware & workstation gear.
          </p>
        </div>

        {/* Sort Selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
        >
          <option value="best-sellers">Sort By: Best Sellers</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Two Column Layout: Sidebar Filters + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Sidebar Filters */}
        <aside className="space-y-6 glass-panel p-5 rounded-2xl h-fit border border-[#1F2937]">
          <h2 className="text-base font-bold text-white border-b border-[#1F2937] pb-3">
            Filters
          </h2>

          {/* Category Checkboxes */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase text-[#9CA3AF] tracking-wider">
              Categories
            </span>
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center justify-between text-sm text-[#9CA3AF] hover:text-white cursor-pointer select-none"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="rounded border-[#1F2937] bg-[#0B0F19] text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  {cat}
                </span>
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="space-y-3 pt-4 border-t border-[#1F2937]">
            <span className="text-xs font-semibold uppercase text-[#9CA3AF] tracking-wider">
              Price Range
            </span>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#8B5CF6]"
            />
            <div className="flex justify-between text-xs text-[#9CA3AF]">
              <span>$0</span>
              <span className="text-white font-semibold">${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Dynamic Product Cards Grid or Empty State */}
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl border border-[#1F2937] space-y-3">
              <p className="text-base text-white font-semibold">
                No products found
              </p>
              <p className="text-xs text-[#9CA3AF]">
                Check back soon or try clearing your active search filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id || product._id}
                  href={`/products/${product.slug || product.id}`}
                  className="group glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between border border-[#1F2937]"
                >
                  <div>
                    {/* Thumbnail Image Slot */}
                    <div className="relative h-44 w-full bg-[#0B0F19] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <span className="text-xs text-[#9CA3AF]">
                          No Image Preview
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                      {product.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-1 group-hover:text-[#8B5CF6] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#1F2937]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white">
                        ${(product.salePrice || product.price)?.toFixed(2)}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-[#9CA3AF] line-through">
                          ${product.price?.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-[#111827] group-hover:bg-[#8B5CF6] text-xs font-semibold text-white transition-colors border border-[#1F2937]">
                      + Add
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
