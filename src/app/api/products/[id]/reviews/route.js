import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { name, rating, comment } = await request.json();

    if (!name || !rating || !comment) {
      return Response.json(
        { success: false, error: "Name, rating, and comment are required." },
        { status: 400 },
      );
    }

    const product = await Product.findOne({ slug: id });
    if (!product) {
      return Response.json(
        { success: false, error: "Product not found." },
        { status: 404 },
      );
    }

    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.push({ name, rating, comment });

    // Recalculate the average rating
    const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = total / product.reviews.length;

    await product.save();

    return Response.json({
      success: true,
      product: JSON.parse(JSON.stringify(product)),
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
