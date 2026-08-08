import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import CartButton from "@/components/CartButton";

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2937] bg-[#0B0F19]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white flex items-center gap-1 group"
        >
          Nexus<span className="text-[#8B5CF6]">Drop</span>
          <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6] group-hover:animate-ping" />
        </Link>

        {/* Minimalist Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#9CA3AF]">
          <Link href="/products" className="transition-colors hover:text-white">
            Shop
          </Link>
          <Link href="/wishlist" className="transition-colors hover:text-white">
            Wishlist
          </Link>
          <Link href="/faq" className="transition-colors hover:text-white">
            FAQ
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact Us
          </Link>
          <Link href="/about" className="transition-colors hover:text-white">
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-1.5 text-xs text-[#9CA3AF] w-44 justify-between mr-2">
            <span>Search gear...</span>
            <kbd className="bg-[#1F2937] text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
              ⌘K
            </kbd>
          </div>

          {/* Auth-aware section */}
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg bg-[#111827] border border-[#1F2937] px-3.5 py-2 text-sm font-medium text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6] transition-all"
              >
                <Image
                  src="/user-solid-full.svg"
                  alt="User Account"
                  width={18}
                  height={18}
                  className="brightness-0 invert opacity-80"
                />
                <span>{user.name.split(" ")[0]}</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-[#111827] border border-[#1F2937] px-3.5 py-2 text-sm font-medium text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6] transition-all"
            >
              <Image
                src="/user-solid-full.svg"
                alt="User Account"
                width={18}
                height={18}
                className="brightness-0 invert opacity-80"
              />
              <span>Sign In</span>
            </Link>
          )}

          <CartButton />
        </div>
      </nav>
    </header>
  );
}
