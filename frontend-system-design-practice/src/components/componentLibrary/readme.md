## 05. Design a reusable component library for a large team.

**Designing a reusable component library for a large team is a classic Senior Frontend system design challenge. It’s less about writing CSS and more about Developer Experience (DX), scalability, and governance.**

### 1. Theory: The Foundation (তাত্ত্বিক ভিত্তি)

**একটি সফল component library-র পেছনে মূল থিওরি হলো Atomic Design. এটি UI-কে ছোট ছোট ভাগে ভাগ করে যা পুনরায় ব্যবহার করা যায়।**

- Atoms: ক্ষুদ্রতম একক (Buttons, Inputs, Typography).
- Molecules: কয়েকটি Atoms মিলে তৈরি হয় (Search Bar = Input + Button).
- Organisms: জটিল UI সেকশন (Navbar, Sidebar, Product Card).
- Design Tokens: এটিই সবচেয়ে গুরুত্বপূর্ণ থিওরি। Colors, Spacing, এবং Font sizes-কে সরাসরি hardcode না করে variables হিসেবে রাখা হয়।
---
### 2. Why and How (কেন এবং কিভাবে)
**Why? (কেন প্রয়োজন?)**
যখন একটি বড় টিমে ১০+ ইঞ্জিনিয়ার থাকে, তখন সবাই যদি আলাদাভাবে Button বা Modal বানায়, তবে কোডবেস অগোছালো হয়ে যায়।

- Avoid Redundancy: একই কোড বারবার লেখা বন্ধ করতে।
- Brand Identity: ব্র্যান্ডের লুক অ্যান্ড ফিল বজায় রাখতে।
- Accessibility (A11y): একবার স্ক্রিন রিডার সাপোর্ট এড করলে সব অ্যাপে তা কাজ করবে।

**How to Build it? (কিভাবে তৈরি করবেন?)**
একজন Senior Engineer হিসেবে আপনার approach হওয়া উচিত নিচের ধাপগুলোতে:

**Step 1: Selection of Tech Stack**
- Core: React/Next.js (যেহেতু আমাদের প্রাইমারি স্ট্যাক)।
- Styling: Tailwind CSS বা Styled Components। বড় টিমের জন্য Tailwind-ভিত্তিক CVA (Class Variance Authority) খুব জনপ্রিয় কারণ এটি variant হ্যান্ডেল করতে সহজ।
- Documentation: Storybook ব্যবহার করা মাস্ট। এটি ছাড়া অন্য ডেভেলপাররা বুঝবে না কোন প্রপস দিয়ে কি কাজ হয়।

**Step 2: Architecture & Distribution**
- Monorepo vs Polyrepo: সাধারণত Turborepo বা Nx ব্যবহার করে একটি Monorepo রাখা ভালো যাতে লাইব্রেরি এবং ডেমো অ্যাপ একসাথে থাকে।
- NPM Packaging: Rollup বা tsup দিয়ে কম্পোনেন্টগুলোকে বান্ডেল করে প্রাইভেট NPM রেজিস্ট্রিতে (যেমন: GitHub Packages) পাবলিশ করতে হবে।
- Tree Shaking: লাইব্রেরি এমনভাবে ডিজাইন করতে হবে যাতে ডেভেলপাররা পুরো লাইব্রেরি ইমপোর্ট না করে শুধু প্রয়োজনীয় অংশটুকু নিতে পারে (Dead code elimination)।

**Step 3: Design-to-Code Pipeline**
- Figma Sync: ডিজাইনারদের সাথে Figma Tokens ব্যবহার করে সিঙ্ক থাকতে হবে।
- Semantic Versioning (SemVer): ভার্সন কন্ট্রোল খুব সাবধানে করতে হবে যাতে v1.0.0 থেকে v2.0.0 তে গেলে কারো অ্যাপ ক্র্যাশ না করে। 