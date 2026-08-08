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
  const user = await User.findById(currentUser._id).populate("wishlist").lean();

  return Response.json({
    success: true,
    wishlist: JSON.parse(JSON.stringify(user.wishlist)),
  });
}

// Toggles: adds the product if not present, removes it if already there
export async function POST(request) {
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
  const alreadyWishlisted = user.wishlist.some(
    (id) => id.toString() === productId,
  );

  if (alreadyWishlisted) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();
  await user.populate("wishlist");

  return Response.json({
    success: true,
    wishlist: JSON.parse(JSON.stringify(user.wishlist)),
  });
}
