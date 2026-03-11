import { useState, useEffect, useRef } from 'react';

export default function useAutocomplete(query, delay = 400) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef({});

  useEffect(() => {
    // ১. ক্লিন করা (অতিরিক্ত স্পেস কমানো)
    const normalizedQuery = query.trim().replace(/\s+/g, ' ');

    if (!normalizedQuery || normalizedQuery.length < 2) {
      setResults([]);
      return;
    }

    if (cache.current[normalizedQuery]) {
      setResults(cache.current[normalizedQuery]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // 🔥 আসল ট্রিক এখানে: 
        // যদি ইউজার "prac test" লেখে, আমরা সেটাকে ভেঙে ['prac', 'test'] করছি
        // এরপর ?q=prac&q=test এভাবে পাঠাচ্ছি। json-server তখন OR লজিক বা 
        // মাল্টিপল ফিল্টারিং করতে পারে (ভার্সন ভেদে)। 
        
        const words = normalizedQuery.split(' ');
        const queryString = words.map(word => `q=${encodeURIComponent(word)}`).join('&');

        const response = await fetch(
          `http://localhost:3001/products?${queryString}&_limit=10`
        );
        const data = await response.json();

        cache.current[normalizedQuery] = data;
        setResults(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return { results, loading };
}