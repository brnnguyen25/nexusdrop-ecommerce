import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";

export async function POST(request) {
  const body = await request.text(); // raw body — required for signature verification
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return Response.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await dbConnect();

    const existingOrder = await Order.findOne({ stripeSessionId: session.id });
    if (existingOrder) {
      return Response.json({ received: true }); // already processed — Stripe can send duplicate events
    }

    const userId = session.metadata.userId;
    const user = await User.findById(userId).populate("cart.product");

    if (user && user.cart.length > 0) {
      const items = user.cart.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      await Order.create({
        user: userId,
        items,
        total,
        status: "paid",
        stripeSessionId: session.id,
      });

      user.cart = [];
      await user.save();
    }
  }

  return Response.json({ received: true });
}
