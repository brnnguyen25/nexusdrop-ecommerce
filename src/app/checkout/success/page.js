import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

async function getOrderBySession(sessionId) {
  await dbConnect();
  const order = await Order.findOne({ stripeSessionId: sessionId }).lean();
  return order ? JSON.parse(JSON.stringify(order)) : null;
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  const order = sessionId ? await getOrderBySession(sessionId) : null;

  return (
    <div className="py-20 text-center space-y-6">
      <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937] space-y-4">
        <div className="mx-auto h-14 w-14 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-2xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-white">
          {order ? "Order Confirmed!" : "Processing your order..."}
        </h1>

        {order ? (
          <>
            <p className="text-sm text-[#9CA3AF]">
              Thank you for your purchase. A confirmation has been recorded on
              your account.
            </p>
            <div className="text-left glass-panel p-4 rounded-xl border border-[#1F2937] space-y-2 mt-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-xs text-[#9CA3AF]"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-[#1F2937] pt-2 flex justify-between text-sm font-bold text-white">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#9CA3AF]">
            Your payment is being confirmed. This page will reflect your order
            shortly — try refreshing in a moment.
          </p>
        )}

        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
