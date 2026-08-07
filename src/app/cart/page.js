"use client";

import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  // Empty array representing live cart state
  const [cartItems, setCartItems] = useState([]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Review your items before proceeding to checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl border border-[#1F2937] space-y-4">
          <p className="text-[#9CA3AF] text-base">
            Your cart is currently empty.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white hover:bg-[#7C3AED] transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-5 rounded-2xl glass-panel border border-[#1F2937]"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8B5CF6] font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#9CA3AF]">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[#9CA3AF]">
                    Qty: {item.quantity}
                  </span>
                  <p className="text-lg font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="p-6 rounded-2xl glass-panel border border-[#1F2937] h-fit space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-[#9CA3AF]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#1F2937] pt-3 flex justify-between font-bold text-white text-base">
                <span>Total</span>
                <span className="text-[#8B5CF6]">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 block text-center rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
