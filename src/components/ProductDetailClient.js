"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

function StarRating({ value, size = "text-sm" }) {
  return (
    <span className={`${size} text-[#F59E0B]`}>
      {"★".repeat(Math.round(value))}
      <span className="text-[#374151]">
        {"★".repeat(5 - Math.round(value))}
      </span>
    </span>
  );
}

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const inStock = product.stock > 0;

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setAddedMessage(`Added ${quantity} × ${product.name} to your cart!`);
    } else {
      setAddedMessage(result.error || "Something went wrong.");
    }
    setTimeout(() => setAddedMessage(""), 2500);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!reviewName.trim() || !reviewComment.trim()) {
      setFormError("Please fill in your name and a comment.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${product.slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        setFormError(data.error || "Something went wrong.");
        return;
      }

      setReviewName("");
      setReviewRating(5);
      setReviewComment("");
      router.refresh(); // re-fetches the Server Component with the new review included
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="relative h-96 w-full glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-[#1F2937]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-[#9CA3AF]">No Image Available</span>
          )}
        </div>

        {/* Right: Details & Purchase Panel */}
        <div className="space-y-6">
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                inStock
                  ? "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20"
                  : "text-red-400 bg-red-500/10 border-red-500/20"
              }`}
            >
              {inStock ? "In Stock — Ships within 24h" : "Out of Stock"}
            </span>

            <h1 className="text-3xl font-extrabold text-white mt-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <StarRating value={product.rating} />
              <span className="text-xs text-[#9CA3AF]">
                ({product.reviews?.length || 0} review
                {product.reviews?.length === 1 ? "" : "s"})
              </span>
            </div>

            <p className="text-2xl font-bold text-[#8B5CF6] mt-3">
              ${product.price?.toFixed(2)}
            </p>

            <p className="text-sm text-[#9CA3AF] mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors"
              >
                -
              </button>
              <span className="text-sm font-bold text-white px-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-10 w-10 rounded-xl bg-[#0B0F19] border border-[#1F2937] text-white hover:border-[#8B5CF6] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#1F2937] disabled:text-[#9CA3AF] disabled:cursor-not-allowed font-bold text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Add to Cart
            </button>
            {addedMessage && (
              <p className="text-xs text-[#10B981] mt-2 text-center">
                {addedMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="space-y-6 border-t border-[#1F2937] pt-10">
        <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

        {/* Review List */}
        <div className="space-y-4">
          {!product.reviews || product.reviews.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">
              No reviews yet — be the first to share your thoughts.
            </p>
          ) : (
            product.reviews
              .slice()
              .reverse()
              .map((review, i) => (
                <div
                  key={i}
                  className="glass-panel p-4 rounded-xl border border-[#1F2937]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      {review.name}
                    </span>
                    <StarRating value={review.rating} size="text-xs" />
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
          )}
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="glass-panel p-5 rounded-2xl border border-[#1F2937] space-y-4 max-w-lg"
        >
          <h3 className="text-sm font-bold text-white">Leave a Review</h3>

          <div>
            <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
              Name
            </label>
            <input
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full mt-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
              Rating
            </label>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="w-full mt-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-[#9CA3AF]">
              Comment
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              className="w-full mt-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          {formError && <p className="text-xs text-red-400">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-sm font-bold text-white transition-all"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </section>
    </div>
  );
}
