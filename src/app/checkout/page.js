"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  // Dynamic order items state (initialized empty)
  const [orderItems, setOrderItems] = useState([]);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = orderItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return;
    // Order submission logic goes here
  };

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Checkout</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Complete your details to finalize your purchase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-8">
          {/* Step 1: Shipping Information */}
          <section className="glass-panel p-6 rounded-2xl space-y-4 border border-[#1F2937]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-[#8B5CF6] text-xs flex items-center justify-center">
                1
              </span>
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Step 2: Payment Details */}
          <section className="glass-panel p-6 rounded-2xl space-y-4 border border-[#1F2937]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-[#8B5CF6] text-xs flex items-center justify-center">
                2
              </span>
              Payment Gateway
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={orderItems.length === 0}
            className="w-full py-4 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:bg-[#1F2937] disabled:text-[#9CA3AF] disabled:cursor-not-allowed font-bold text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Complete Secure Order
          </button>
        </form>

        {/* Right Column: Order Summary */}
        <div className="glass-panel p-6 rounded-2xl h-fit space-y-6 border border-[#1F2937]">
          <h3 className="text-lg font-bold text-white border-b border-[#1F2937] pb-3">
            Order Summary
          </h3>

          {orderItems.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <p className="text-sm text-[#9CA3AF]">No items in checkout.</p>
              <Link
                href="/products"
                className="inline-block text-xs font-semibold text-[#8B5CF6] hover:underline"
              >
                Return to Shop →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-white"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 text-sm text-[#9CA3AF] border-t border-[#1F2937] pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-white">
                {shipping > 0 ? `$${shipping.toFixed(2)}` : "$0.00"}
              </span>
            </div>
            <div className="flex justify-between font-bold text-white text-base border-t border-[#1F2937] pt-3">
              <span>Total</span>
              <span className="text-[#8B5CF6]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
