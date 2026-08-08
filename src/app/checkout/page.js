"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, loading, isLoggedIn, cartTotal } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setRedirecting(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong.");
        setRedirecting(false);
        return;
      }

      window.location.href = data.url; // send the browser to Stripe's hosted page
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setRedirecting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#9CA3AF]">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">Sign in to check out</h2>
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
    <div className="py-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">
        Checkout
      </h1>

      <div className="glass-panel p-6 rounded-2xl border border-[#1F2937] space-y-4">
        <h2 className="text-sm font-bold text-white border-b border-[#1F2937] pb-3">
          Order Summary
        </h2>

        {cart.map((item) => (
          <div key={item.product._id} className="flex items-center gap-4">
            <div className="relative h-14 w-14 bg-[#0B0F19] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
              {item.product.image ? (
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-[9px] text-[#9CA3AF]">No Image</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{item.product.name}</p>
              <p className="text-xs text-[#9CA3AF]">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-white">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="border-t border-[#1F2937] pt-4 flex justify-between text-base font-bold text-white">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="text-xs text-red-400 text-center">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={redirecting}
        className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 font-bold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
      >
        {redirecting ? "Redirecting to secure checkout..." : "Pay with Stripe"}
      </button>

      <p className="text-center text-[10px] text-[#6B7280]">
        Payments are securely processed by Stripe. NexusDrop never sees or
        stores your card details.
      </p>
    </div>
  );
}
