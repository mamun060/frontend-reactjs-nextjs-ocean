import { notFound } from "next/navigation";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:3001/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const product = await response.json();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div>
          <img
            src={product.image || "/images/products/product-1.png"}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-4 text-2xl">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="text-lg mb-6">{product.category}</p>
          <p className="text-lg mb-6">{product.description}</p>

          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;