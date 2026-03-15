"use client";
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';

export default function InfiniteProductsLoads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { items, loading, hasMore } = useInfiniteScroll(page);

  // Intersection Observer Logic
  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className=" w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Products Infinite Scroll</h1>
      
      <div className="grid grid-cols-12 gap-4 w-full h-auto">
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
            <Link className='col-span-6 md:col-span-4 border' ref={lastItemRef}  key={item.id} href={`/products/${item?.id}`}>
            <div 
              className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-none flex flex-col justify-start gap-4"
              onClick={() => setSearchTerm(item.title)}
            >
              <div>
                <img src='/images/products/product-2.png' alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 uppercase">{item.category}</p>
              </div>
              <span className="text-blue-600 font-bold text-sm">${item.price}</span>
            </div>
            </Link>
            );
          } else {
            return (
              <Link className='col-span-6 md:col-span-4 border' key={item.id} href={`/products/${item?.id}`}>
            <div 
              className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-none flex flex-col justify-start gap-4 "
              onClick={() => setSearchTerm(item.title)}
            >
              <div>
                <img src='/images/products/product-2.png' alt={item?.name} className="w-ful object-cover mb-4 rounded" />
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 uppercase">{item.category}</p>
              </div>
              <span className="text-blue-600 font-bold text-sm">${item.price}</span>
            </div>
            </Link>
            );
          }
        })}
      </div>

      {loading && (
        <div className="py-10 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-blue-500 font-medium">Loading more posts...</p>
        </div>
      )}

      {!hasMore && <p className="text-center py-10 text-gray-400 italic">No more posts to show.</p>}
    </div>
  );
}