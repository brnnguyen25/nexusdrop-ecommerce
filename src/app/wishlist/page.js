"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import WishlistHeartButton from "@/components/WishlistHeartButton";

export default function WishlistPage() {
  const { wishlist, loading, isLoggedIn } = useWishlist();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#9CA3AF]">Loading your wishlist...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">
            Sign in to view your wishlist
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Save items you love and find them here anytime.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">
        Your Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="glass-panel p-5 rounded-2xl border border-[#1F2937] flex flex-col justify-between"
          >
            <Link href={`/products/${product.slug}`}>
              <div className="relative h-44 w-full bg-[#0B0F19] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
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
              <h3 className="text-base font-semibold text-white mt-1 hover:text-[#8B5CF6] transition-colors">
                {product.name}
              </h3>
            </Link>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#1F2937]">
              <span className="text-lg font-bold text-white">
                ${product.price?.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(product._id, 1)}
                className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
