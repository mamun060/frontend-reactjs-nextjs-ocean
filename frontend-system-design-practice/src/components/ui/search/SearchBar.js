"use client";
import { useState } from 'react';
import useAutocomplete from "@/hooks/useAutocomplete";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { results, loading, error } = useAutocomplete(searchTerm);

  console.log(searchTerm);
  

  return (
    <div className="max-w-md mx-auto mt-10 relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items (e.g. apple)..."
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {loading && (
          <div className="absolute right-4 top-4 animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        )}
      </div>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li 
              key={item.id}
              className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-none transition-colors"
              onClick={() => {
                setSearchTerm(item.name); // Or whatever field your data has
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}