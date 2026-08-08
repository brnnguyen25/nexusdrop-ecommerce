"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistHeartButton({ productId, className = "" }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  const handleClick = async (e) => {
    e.preventDefault(); // stops the click from also triggering a parent <Link>
    e.stopPropagation();
    await toggleWishlist(productId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center rounded-full transition-colors ${
        active ? "text-red-400" : "text-[#9CA3AF] hover:text-red-400"
      } ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
