"use client";
import useAutocomplete from '@/hooks/useAutocomplete';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchAutocomplete() {
  const [searchTerm, setSearchTerm] = useState('');
  const { results, loading } = useAutocomplete(searchTerm);

  return (
    <div className="max-w-xl mx-auto p-6 relative">
      <h2 className="text-xl font-bold mb-4">Product Search (100k Records)</h2>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search products (e.g. Marble, Pizza)..."
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && (
          <div className="absolute right-4 top-4 text-blue-500 text-sm animate-pulse">
            Searching...
          </div>
        )}
      </div>

      {/* সার্চ রেজাল্ট ড্রপডাউন */}
      {results.length > 0 && (
        <div className="absolute left-6 right-6 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 overflow-hidden">
          {results.map((item) => (
            <Link key={item.id} href={`/products/${item?.id}`}>
            <div 
              className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-none flex justify-between items-center"
              onClick={() => setSearchTerm(item.title)}
            >
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 uppercase">{item.category}</p>
              </div>
              <span className="text-blue-600 font-bold text-sm">${item.price}</span>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}