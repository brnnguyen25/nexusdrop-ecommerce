"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#7C3AED] shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <Image
        src="/cart-shopping-solid-full.svg"
        alt="Shopping Cart"
        width={18}
        height={18}
        className="brightness-0 invert"
      />
      <span>Cart</span>
      <span className="ml-1 inline-flex items-center justify-center rounded-full bg-white text-[#0B0F19] px-1.5 py-0.5 text-xs font-bold">
        {cartCount}
      </span>
    </Link>
  );
}
