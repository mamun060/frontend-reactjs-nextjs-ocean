# Frontend System Design Practice – Day 07
## Topic: Redux Toolkit + RTK Query vs. Zustand vs. Context API

বড় স্কেল অ্যাপ্লিকেশনে স্টেট ম্যানেজমেন্টের সিদ্ধান্ত শুধুমাত্র "সহজ কোড" এর ওপর ভিত্তি করে নেওয়া হয় না, বরং এটি নির্ভর করে **Memory Footprint** এবং **Re-render Optimization** এর ওপর। এই রিপোজিটরিতে আমরা একটি পূর্ণাঙ্গ টেকনিক্যাল ব্রেকডাউন আলোচনা করেছি।

---

## Overview

একজন সিনিয়র ফ্রন্টেন্ড ইঞ্জিনিয়ার হিসেবে, স্কেলেবিলিটি এবং পারফরম্যান্স নিশ্চিত করতে আমাদের বুঝতে হবে কখন কোন টুলটি ব্যবহার করা যুক্তিযুক্ত। এই প্র্যাকটিস সেশনে আমরা মূলত **Redux Ecosystem** এর গভীরতর আর্কিটেকচার নিয়ে আলোচনা করেছি।

---

## Core Technical Concepts

### 1. Rendering Lifecycle: The "All-or-Nothing" Problem
Context API মূলত একটি **Dependency Injection** মেকানিজম।
* **The Issue:** যখন Context Value (Object) চেঞ্জ হয়, তখন রিঅ্যাক্ট `Object.is` চেক করে। যদি রেফারেন্স আলাদা হয়, তবে ওই Context-এর আন্ডারে থাকা সমস্ত Consumer Component রি-রেন্ডার হয়।
* **Technical Limitation:** `useMemo` শুধুমাত্র চাইল্ড কম্পোনেন্টের রেন্ডার আটকায়, কিন্তু যারা সরাসরি কন্ট্যাক্ট থেকে ডাটা `useContext` দিয়ে রিড করছে, তাদের রি-রেন্ডার আটকানো অসম্ভব।



### 2. Redux: Selective Subscription Model
Redux-এর প্রধান শক্তি হলো এর **Selector Pattern**।
* **How it works:** `useSelector` একটি নির্দিষ্ট স্টেটকে সাবস্ক্রাইব করে। যখন গ্লোবাল স্টোর আপডেট হয়, Redux ইন্টারনালি **Shallow Comparison** করে।
* **Optimization:** যদি স্টোরের অন্য কোনো অংশ পরিবর্তিত হয় যা ওই কম্পোনেন্ট ব্যবহার করছে না, তবে কম্পোনেন্টটি রি-রেন্ডার সিগন্যালই পাবে না। এটি বড় অ্যাপে হাজার হাজার অপ্রয়োজনীয় রেন্ডার থামিয়ে দেয়।



### 3. Redux Toolkit (RTK) & Immer
RTK স্টেট মিউটেশনকে সহজ করতে **Immer.js** ব্যবহার করে।
* **Predictable Immutability:** আমরা রিডিউসারে সরাসরি স্টেট মিউটেট করলেও (e.g., `state.count++`), Immer একটি প্রক্সি অবজেক্টের মাধ্যমে একটি নতুন **Immutable State** তৈরি করে। এটি টাইম-ট্রাভেল ডিবাগিং এবং স্টেটের প্রেডিক্টেবলিটি নিশ্চিত করে।

### 4. RTK Query: Server-State Revolution
বড় অ্যাপের ৮০% স্টেটই হলো সার্ভার ক্যাশ। RTK Query এটি ডিক্লারেটিভ লেভেলে হ্যান্ডেল করে।
* **Cache Management:** অটোমেটিক ক্যাশিং এবং **Request Deduplication** নিশ্চিত করে যেন একই ডাটার জন্য একাধিক নেটওয়ার্ক কল না হয়।
* **Tag-based Invalidation:** ডাটা মিউটেট হলে (e.g., Adding a post), নির্দিষ্ট ট্যাগ ইনভ্যালিড করার মাধ্যমে এটি অটোমেটিক ব্যাকগ্রাউন্ডে ডাটা রি-ফেচ করে UI সিঙ্ক রাখে।



---

## Decision Matrix

| Feature | Context API | Redux Toolkit | Zustand |
| :--- | :--- | :--- | :--- |
| **Primary Use Case** | Static/Low-frequency data | Complex/Enterprise Apps | Modular/High-perf apps |
| **Performance** | Coarse-grained (Broad) | Fine-grained (Selective) | Fine-grained (Pub/Sub) |
| **Server State** | Manual handling | RTK Query (Built-in) | Manual/React-Query |
| **Complexity** | Low | High (Structured) | Low |

---

## Best Practices for Large Scale Apps

1. **Normalization:** ডাটা ডুপ্লিকেশন এড়াতে `createEntityAdapter` ব্যবহার করুন। এটি $O(1)$ টাইম কমপ্লেক্সিটিতে ডাটা এক্সেস নিশ্চিত করে।
2. **Separation of Concerns:** সার্ভার স্টেট (API) এবং ক্লায়েন্ট স্টেট (UI) আলাদা রাখুন।
3. **Avoid Context for High-frequency updates:** যে ডাটা প্রতি সেকেন্ডে বা ঘনঘন চেঞ্জ হয়, তার জন্য কখনোই Context API ব্যবহার করবেন না।

---

## Conclusion

ইন্টারভিউতে বা সিস্টেম ডিজাইনে আপনার উত্তর হওয়া উচিত:
> "বড় স্কেল অ্যাপে আমি **Redux Toolkit** বেছে নিই কারণ এর আর্কিটেকচারাল রিজিডিটি এবং সিলেক্টিভ সাবস্ক্রিপশন বড় টিমে বাগ কমাতে সাহায্য করে। আর নেটওয়ার্কিং লেয়ারের জন্য **RTK Query** ব্যবহার করি ক্যাশিং এবং অটো-সিঙ্কিংয়ের সুবিধার জন্য।"

---
*Created by [Md Al Mamun](https://github.com/mamun060) as part of Frontend System Design Practice.*