"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  // Product state initialized as null (ready for dynamic DB/API fetching)
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // If no product data is loaded yet (Empty state)
  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">Product Not Found</h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            The requested item could not be loaded or is currently unavailable.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-6">
      {/* Left Column: Image Gallery */}
      <div className="space-y-4">
        <div className="relative h-96 w-full glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-[#1F2937]">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-[#9CA3AF]">No Image Available</span>
          )}
        </div>

        {/* Thumbnail Selector Strip */}
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`relative h-20 glass-panel rounded-xl overflow-hidden border transition-all ${
                  selectedImageIndex === i
                    ? "border-[#8B5CF6] ring-1 ring-[#8B5CF6]"
                    : "border-[#1F2937] hover:border-[#8B5CF6]"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Dynamic Details & Purchase Panel */}
      <div className="space-y-6">
        <div>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
              product.inStock
                ? "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20"
                : "text-red-400 bg-red-500/10 border-red-500/20"
            }`}
          >
            {product.inStock ? "In Stock — Ships within 24h" : "Out of Stock"}
          </span>

          <h1 className="text-3xl font-extrabold text-white mt-3">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mt-2">
            <p className="text-2xl font-bold text-[#8B5CF6]">
              ${(product.salePrice || product.price)?.toFixed(2)}
            </p>
            {product.salePrice && (
              <span className="text-sm text-[#9CA3AF] line-through">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
              Variant Option
            </label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedVariant === variant
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-white"
                      : "border-[#1F2937] bg-[#0B0F19] text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {variant.name || variant}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Stepper */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-10 w-10 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors"
            >
              -
            </button>
            <span className="text-sm font-bold text-white px-2">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-10 w-10 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            disabled={!product.inStock}
            className="flex-1 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#1F2937] disabled:text-[#9CA3AF] disabled:cursor-not-allowed font-bold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Add to Cart
          </button>
          <button
            disabled={!product.inStock}
            className="flex-1 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:bg-[#1F2937] disabled:text-[#9CA3AF] disabled:cursor-not-allowed font-bold text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Buy Now
          </button>
        </div>

        {/* Specifications Accordion */}
        <div className="border-t border-[#1F2937] pt-6 space-y-3">
          {product.specifications && (
            <details className="glass-panel p-4 rounded-xl cursor-pointer border border-[#1F2937]">
              <summary className="font-semibold text-white text-sm">
                Technical Specifications
              </summary>
              <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                {product.specifications}
              </p>
            </details>
          )}

          <details className="glass-panel p-4 rounded-xl cursor-pointer border border-[#1F2937]">
            <summary className="font-semibold text-white text-sm">
              Shipping & Returns
            </summary>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Free standard worldwide shipping on orders over $100. 30-day
              money-back guarantee.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
