"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    loading,
    isLoggedIn,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#9CA3AF]">Loading your cart...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">
            Sign in to view your cart
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Your cart is tied to your account so it&apos;s there whenever you
            come back.
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

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Browse the collection to find something you&apos;ll love.
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
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="glass-panel p-4 rounded-2xl border border-[#1F2937] flex items-center gap-4"
            >
              <div className="relative h-20 w-20 bg-[#0B0F19] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-[#9CA3AF] text-center px-1">
                    No Image
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="text-sm font-semibold text-white hover:text-[#8B5CF6] transition-colors truncate block"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  ${item.product.price?.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1)
                  }
                  className="h-8 w-8 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors text-sm"
                >
                  -
                </button>
                <span className="text-sm font-bold text-white w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                  className="h-8 w-8 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors text-sm"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-bold text-white w-20 text-right">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-panel p-6 rounded-2xl border border-[#1F2937] h-fit space-y-4">
          <h2 className="text-base font-bold text-white border-b border-[#1F2937] pb-3">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm text-[#9CA3AF]">
            <span>Subtotal</span>
            <span className="text-white font-semibold">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-[#9CA3AF]">
            <span>Shipping</span>
            <span className="text-white font-semibold">Free</span>
          </div>
          <div className="border-t border-[#1F2937] pt-4 flex justify-between text-base font-bold text-white">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-bold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
