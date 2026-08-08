"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import WishlistHeartButton from "@/components/WishlistHeartButton";

const CATEGORIES = [
  { label: "Audio Tech", value: "audio" },
  { label: "Peripherals", value: "peripherals" },
  { label: "Displays", value: "displays" },
  { label: "Workspace Essentials", value: "workspace" },
];

export default function ProductsPageClient({ products, initialCategory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : [],
  );
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("best-sellers");

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat],
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => p.price <= maxPrice);

    const sorted = [...result];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sorted.sort((a, b) => b.rating - a.rating); // "best sellers" proxy
    }

    return sorted;
  }, [products, searchTerm, selectedCategories, maxPrice, sortBy]);

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6 glass-panel p-5 rounded-2xl h-fit border border-[#1F2937]">
          <h2 className="text-base font-bold text-white border-b border-[#1F2937] pb-3">
            Filters
          </h2>

          {/* Search */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-[#9CA3AF] tracking-wider">
              Search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear..."
              className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] transition-colors"
            />
          </div>

          {/* Category Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-[#1F2937]">
            <span className="text-xs font-semibold uppercase text-[#9CA3AF] tracking-wider">
              Categories
            </span>
            {CATEGORIES.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center justify-between text-sm text-[#9CA3AF] hover:text-white cursor-pointer select-none"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => handleCategoryToggle(cat.value)}
                    className="rounded border-[#1F2937] bg-[#0B0F19] text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  {cat.label}
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

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
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
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between border border-[#1F2937]"
                >
                  <div>
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
                      <WishlistHeartButton
                        productId={product._id}
                        className="absolute top-2 right-2 h-8 w-8 bg-[#0B0F19]/80 backdrop-blur-sm text-lg"
                      />
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
                        ${product.price?.toFixed(2)}
                      </span>
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
