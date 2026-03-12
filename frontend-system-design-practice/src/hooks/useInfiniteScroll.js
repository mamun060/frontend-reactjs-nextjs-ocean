import { useState, useEffect, useRef, useCallback } from 'react';

export default function useInfiniteScroll(pageNumber) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // json-server pagination: _page and _limit
        const response = await fetch(
          `http://localhost:3001/products?_page=${pageNumber}&_limit=10`
        );
        const data = await response.json();

        // If no more data is returned, stop further calls
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prev) => [...prev, ...data]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  return { items, loading, hasMore };
}