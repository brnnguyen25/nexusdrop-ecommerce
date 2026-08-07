import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductsPageClient from "@/components/ProductsPageClient";

async function getAllProducts() {
  await dbConnect();
  const products = await Product.find({}).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage({ searchParams }) {
  const products = await getAllProducts();
  const params = await searchParams;
  const initialCategory = params?.category || null;

  return (
    <ProductsPageClient products={products} initialCategory={initialCategory} />
  );
}
