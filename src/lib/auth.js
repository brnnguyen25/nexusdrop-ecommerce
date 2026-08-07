import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const user = await User.findById(decoded.userId).select("-password").lean();
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    return null; // invalid or expired token
  }
}
