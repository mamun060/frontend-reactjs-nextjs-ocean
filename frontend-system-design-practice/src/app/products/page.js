import { products } from '@/lib/mock-data';
import ProductCard from '@/components/products/ProductCard';
import InfiniteProductsLoads from '@/components/infiniteScroll/InfiniteProductsLoads';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </div>
        <InfiniteProductsLoads />
    </div>
  );
}
