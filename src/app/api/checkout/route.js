import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import stripe from "@/lib/stripe";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json(
        { success: false, error: "Not authenticated." },
        { status: 401 },
      );
    }

    await dbConnect();
    const user = await User.findById(currentUser._id).populate("cart.product");

    if (!user.cart || user.cart.length === 0) {
      return Response.json(
        { success: false, error: "Your cart is empty." },
        { status: 400 },
      );
    }

    const line_items = user.cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.price * 100), // Stripe expects cents, as an integer
      },
      quantity: item.quantity,
    }));

    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        userId: currentUser._id.toString(),
      },
    });

    return Response.json({ success: true, url: session.url });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
