import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.json(
      { success: false, error: "Not authenticated." },
      { status: 401 },
    );
  }

  await dbConnect();
  const user = await User.findById(currentUser._id)
    .populate("cart.product")
    .lean();

  return Response.json({
    success: true,
    cart: JSON.parse(JSON.stringify(user.cart)),
  });
}

export async function POST(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.json(
      { success: false, error: "Not authenticated." },
      { status: 401 },
    );
  }

  await dbConnect();
  const { productId, quantity = 1 } = await request.json();

  const user = await User.findById(currentUser._id);
  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  await user.populate("cart.product");

  return Response.json({
    success: true,
    cart: JSON.parse(JSON.stringify(user.cart)),
  });
}

export async function PATCH(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.json(
      { success: false, error: "Not authenticated." },
      { status: 401 },
    );
  }

  await dbConnect();
  const { productId, quantity } = await request.json();

  const user = await User.findById(currentUser._id);

  if (quantity <= 0) {
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId,
    );
  } else {
    const item = user.cart.find(
      (item) => item.product.toString() === productId,
    );
    if (item) item.quantity = quantity;
  }

  await user.save();
  await user.populate("cart.product");

  return Response.json({
    success: true,
    cart: JSON.parse(JSON.stringify(user.cart)),
  });
}

export async function DELETE(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.json(
      { success: false, error: "Not authenticated." },
      { status: 401 },
    );
  }

  await dbConnect();
  const { productId } = await request.json();

  const user = await User.findById(currentUser._id);
  user.cart = user.cart.filter((item) => item.product.toString() !== productId);
  await user.save();
  await user.populate("cart.product");

  return Response.json({
    success: true,
    cart: JSON.parse(JSON.stringify(user.cart)),
  });
}
