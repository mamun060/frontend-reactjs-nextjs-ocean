
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link href={`/products/${product.id}`}>
        <div>
          <img src='/images/products/product-2.png' alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
