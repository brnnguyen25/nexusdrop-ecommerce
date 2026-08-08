import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexusDrop | Modern E-Commerce Platform",
  description:
    "Full-stack e-commerce application engineered for speed, scalability, and a modern shopping experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F9FAFB] selection:bg-[#8B5CF6] selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <NavBar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
