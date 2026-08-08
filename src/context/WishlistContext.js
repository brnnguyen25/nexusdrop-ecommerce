"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  startTransition,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (res.status === 401) {
        startTransition(() => {
          setIsLoggedIn(false);
          setWishlist([]);
        });
        return;
      }
      const data = await res.json();
      if (data.success) {
        startTransition(() => {
          setIsLoggedIn(true);
          setWishlist(data.wishlist);
        });
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (res.status === 401) {
      return {
        success: false,
        error: "Please log in to save items to your wishlist.",
      };
    }
    const data = await res.json();
    if (data.success) setWishlist(data.wishlist);
    return data;
  };

  const isWishlisted = (productId) => wishlist.some((p) => p._id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isLoggedIn,
        toggleWishlist,
        isWishlisted,
        refetchWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
