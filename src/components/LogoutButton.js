"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function LogoutButton() {
  const router = useRouter();
  const { refetchCart } = useCart();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refetchCart(); // re-checks auth state, which will now correctly return empty/logged-out
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-[#111827] border border-[#1F2937] px-3.5 py-2 text-sm font-medium text-[#9CA3AF] hover:text-white hover:border-red-500 transition-all"
    >
      Logout
    </button>
  );
}
