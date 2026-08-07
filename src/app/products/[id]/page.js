import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import ProductDetailClient from "@/components/ProductDetailClient";

async function getProduct(slug) {
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // "id" is the URL segment name; its value is actually the product's slug
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="glass-panel p-12 rounded-2xl max-w-lg mx-auto border border-[#1F2937]">
          <h2 className="text-xl font-bold text-white">Product Not Found</h2>
          <p className="text-xs text-[#9CA3AF] mt-2">
            The requested item could not be loaded or is currently unavailable.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#7C3AED] transition-all"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
