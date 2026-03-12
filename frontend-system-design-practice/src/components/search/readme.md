### 01. Design an autocomplete search with debouncing and caching.

### The Theory
**1.1. What is Debouncing? (ডিবউন্সিং কি?)**
- English: Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often. In search, it waits for the user to stop typing for a specific duration (e.g., 400ms) before making an API call.
- বাংলা: ডিবউন্সিং হলো এমন একটি পদ্ধতি যা নিশ্চিত করে যে কোনো ভারী কাজ (যেমন API কল) যেন বারবার না ঘটে। সার্চের ক্ষেত্রে, ইউজার টাইপ করা থামানোর পর নির্দিষ্ট সময় (যেমন ৪০০ms) অপেক্ষা করে তারপর সার্ভারে রিকোয়েস্ট পাঠানো হয়।

**1.2. In-Memory Caching (ইন-মেমরি ক্যাশিং)**
- English: Caching stores the results of previous searches in the browser's RAM. If a user deletes and re-types the same word, the system provides results instantly from memory instead of the network.
- বাংলা: ক্যাশিং হলো আগের করা সার্চের রেজাল্ট ব্রাউজারের র‍্যাম-এ (RAM) জমা রাখা। ইউজার যদি একই শব্দ আবার সার্চ করে, তবে সিস্টেম নেটওয়ার্ক ব্যবহার না করে মেমরি থেকে তাৎক্ষণিক রেজাল্ট দেখায়।
---

এই প্রজেক্টে আমরা ১০০,০০০ ডাটা হ্যান্ডেল করার জন্য একটি অপ্টিমাইজড অটোকমপ্লিট সার্চ তৈরি করেছি।

## টেকনিক্যাল ডিজাইন
- ১. **Debouncing (ডিবউন্সিং):** ইউজার দ্রুত টাইপ করলে প্রতিবার API কল না করে ৪০০ms অপেক্ষা করা হয়। এতে নেটওয়ার্ক রিকোয়েস্ট অনেক কমে যায়।
- ২. **In-Memory Cache (ক্যাশিং):** `useRef` ব্যবহার করে আমরা গত করা সার্চগুলো সেভ রাখি, যাতে রিপিট সার্চে ডাটা ইনস্ট্যান্ট আসে।
- ৩. **Server-side Search:** `json-server` এর `?q=` কুয়েরি ব্যবহার করা হয়েছে। ডাটাবেজ লেভেলেই সার্চ হচ্ছে, তাই ব্রাউজারের মেমোরিতে প্রেশার পড়ছে না।

### 2: Implementation Logic (ইমপ্লিমেন্টেশন লজিক)
**2.1 Data Normalization (ডাটা নরমালাইজেশন)**
- English: We must handle extra spaces. Using Regex trim().replace(/\s+/g, ' '), we collapse multiple spaces into one.
- বাংলা: আমাদের অতিরিক্ত স্পেস হ্যান্ডেল করতে হবে। Regex ব্যবহার করে আমরা শুরু, শেষ এবং মাঝখানের একাধিক স্পেসকে একটি সিঙ্গেল স্পেসে রূপান্তর করি।

**2.2 Query Splitting (কুয়েরি স্প্লিটিং)**
- English: Searching for "Prac Test" as a single string might fail. We split it into ?q=Prac&q=Test to get better results from json-server.
- বাংলা: "Prac Test" লিখে সার্চ করলে অনেক সময় রেজাল্ট আসে না। তাই আমরা শব্দগুলোকে ভেঙে আলাদাভাবে সার্ভারে পাঠাই যাতে রেজাল্ট আরও একুরেট হয়।

### 3: The Master Code (মূল কোড)
```js
import { useState, useEffect, useRef } from 'react';

export default function useAutocomplete(query, delay = 400) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef({}); // Memory storage

  useEffect(() => {
    // Step 1: Normalize (স্পেস ক্লিন করা)
    const normalizedQuery = query.trim().replace(/\s+/g, ' ');

    if (!normalizedQuery || normalizedQuery.length < 2) {
      setResults([]);
      return;
    }

    // Step 2: Cache Check (ক্যাশ চেক করা)
    if (cache.current[normalizedQuery]) {
      setResults(cache.current[normalizedQuery]);
      return;
    }

    // Step 3: Set Delay (টাইমার সেট করা)
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const words = normalizedQuery.split(' ');
        const queryString = words.map(w => `q=${encodeURIComponent(w)}`).join('&');

        const response = await fetch(`http://localhost:3001/products?${queryString}&_limit=10`);
        const data = await response.json();

        // Save to Cache & Update UI
        cache.current[normalizedQuery] = data;
        setResults(data);
      } catch (err) {
        console.error("API Error", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    // Step 4: Cleanup (টাইমার রিসেট করা)
    return () => clearTimeout(timer);
  }, [query, delay]);

  return { results, loading };
}
```

### 4: Step-by-Step Workflow (ধাপে ধাপে কার্যপ্রণালী)
- 1. User Input: User types "Apple". React re-renders.
- 2. Timer: A 400ms timer starts.
- 3. Interrupt: User types "s" (Apples). Previous timer is killed, new 400ms starts.
- 4. Execution: User stops. Timer ends.
- 5. Cache Hit: Checks if "Apples" is in cache.current.
- 6. Fetch: If not, calls API with 100k data filter.
- 7. Commit: Saves result in Cache and shows on screen.