"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Order History" },
  { id: "addresses", label: "Saved Addresses" },
  { id: "settings", label: "Account Settings" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic user and order history states (initialized empty for API / Auth integration)
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [orders, setOrders] = useState([]);

  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-white">
          Account Dashboard
        </h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Manage your orders, preferences, and personal details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="glass-panel p-4 rounded-2xl h-fit space-y-2 border border-[#1F2937]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "text-[#9CA3AF] hover:bg-[#111827] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Main Dynamic Content Pane */}
        <main className="md:col-span-3 glass-panel p-6 rounded-2xl border border-[#1F2937] min-h-[400px]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-3">
                Account Summary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F2937]">
                  <span className="text-xs text-[#9CA3AF] font-semibold uppercase">
                    Profile Name
                  </span>
                  <p className="text-base font-bold text-white mt-1">
                    {user.name || "Not set"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F2937]">
                  <span className="text-xs text-[#9CA3AF] font-semibold uppercase">
                    Email Address
                  </span>
                  <p className="text-base font-bold text-white mt-1">
                    {user.email || "Not set"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F2937]">
                <h3 className="text-sm font-bold text-white mb-3">
                  Recent Orders
                </h3>
                {orders.length === 0 ? (
                  <p className="text-xs text-[#9CA3AF]">
                    No recent purchases found.
                  </p>
                ) : (
                  <p className="text-xs text-[#9CA3AF]">
                    Showing latest {orders.length} orders.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-3">
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="text-sm text-[#9CA3AF]">
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="border border-[#1F2937] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm text-[#9CA3AF]">
                    <thead className="bg-[#111827] text-xs font-semibold text-white uppercase border-b border-[#1F2937]">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-[#1F2937]/50 hover:bg-[#111827]/50"
                        >
                          <td className="p-4 font-mono text-white">
                            #{order.id}
                          </td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-white">
                            ${order.total?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-3">
                Saved Addresses
              </h2>
              <div className="text-center py-12 space-y-2">
                <p className="text-sm text-[#9CA3AF]">
                  No saved shipping addresses.
                </p>
                <button className="text-xs text-[#8B5CF6] hover:underline font-semibold">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ACCOUNT SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-3">
                Account Settings
              </h2>

              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9CA3AF] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white focus:border-[#8B5CF6] outline-none text-sm"
                  />
                </div>

                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
