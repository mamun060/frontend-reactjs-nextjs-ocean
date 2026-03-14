"use client";
import React, { useState, useMemo, useEffect } from 'react';

// non-optimize component
const SlowProductItem = ({ name, price }) => {
  console.log(`%c[Slow] Rendering: ${name}`, 'color: #ef4444');
  
  // Fake heavy computation
  const start = performance.now();
  while (performance.now() - start < 2); 

  return (
    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl mb-3 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium text-neutral-50">{name}</span>
        <span className="text-sm bg-red-500/20 px-2 py-1 rounded text-white">${price}</span>
      </div>
      <p className="text-[14px] text-white mt-1 capitalize tracking-wider">Unnecessary Work</p>
    </div>
  );
};

// non-optimize component
const FastProductItem = React.memo(({ name, price }) => {
  console.log(`%c[Fast] Rendering: ${name}`, 'color: #10b981');
  
  return (
    <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl mb-3 shadow-sm hover:border-emerald-500/40 transition-all">
      <div className="flex justify-between items-center">
        <span className="font-medium text-emerald-100">{name}</span>
        <span className="text-sm bg-emerald-500/20 px-2 py-1 rounded text-emerald-400 font-mono">${price}</span>
      </div>
      <p className="text-[14px] text-emerald-500/60 mt-1 uppercase tracking-wider font-semibold">Optimized Output</p>
    </div>
  );
});


export default function PerformanceLab() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration Error ফিক্স করার জন্য useEffect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ডামি ডাটা - এটিকে useMemo তে রাখা হয়েছে যাতে এটি প্রতি রেন্ডারে নতুন রেফারেন্স না পায়
  const products = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    name: `Premium Product ${i + 1}`,
    price: Math.floor((i + 1) * 12.5)
  })), []);

  // optimize filtering
  const filteredOptimized = useMemo(() => {
    if (!query) return products;
    console.log("%c--- ⚡ Filtering Executed (Optimized) ---", "color: #3b82f6; font-weight: bold");
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, products]);

  // non-optimize filtering
  const filteredSlow = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  // Hydration শেষ না হওয়া পর্যন্ত লোডিং বা খালি স্টেট দেখানো ভালো প্র্যাকটিস
  if (!isMounted) return <div className="min-h-screen bg-[#0b0f1a]" />;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">
            Day 03: Performance Engineering
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            React <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Optimization Lab</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            একজন সিনিয়র ইঞ্জিনিয়ার যেভাবে অপ্রয়োজনীয় রেন্ডারিং হ্যান্ডেল করেন। নিচে পার্থক্যটি লাইভ দেখুন।
          </p>
        </div>

        {/* Toggle Switch UI */}
        <div className="flex flex-col items-center gap-6 mb-10 bg-[#161b2a]/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full"></div>
          
          <div className="flex items-center gap-6 z-10">
            <span className={`text-xs font-black tracking-tighter ${!isOptimized ? 'text-neutral-100' : 'text-neutral-400'}`}>LEGACY MODE</span>
            <button 
              onClick={() => setIsOptimized(!isOptimized)}
              className={`relative w-20 h-10 rounded-full transition-all duration-500 focus:outline-none p-1 shadow-inner ${isOptimized ? 'bg-emerald-600' : 'bg-red-600'}`}
            >
              <div className={`bg-white w-8 h-8 rounded-full shadow-lg transition-transform duration-500 ease-in-out ${isOptimized ? 'translate-x-10' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-black tracking-tighter ${isOptimized ? 'text-emerald-500' : 'text-slate-600'}`}>OPTIMIZED PRO</span>
          </div>

          {/* Interaction Zone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full z-10">
            <div className="group">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1 mb-2 block">Real-time Search</label>
              <input 
                type="text"
                placeholder="Search products..."
                className="w-full bg-[#0b0f1a] border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-white"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1 mb-2 block">State Isolation Test</label>
              <button 
                onClick={() => setCount(c => c + 1)}
                className="w-full py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-blue-400 font-bold rounded-2xl border border-slate-700 transition-all active:scale-95 flex items-center justify-center gap-3 group"
              >
                <span className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded-md flex items-center justify-center text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors">{count}</span>
                Re-render Parent
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-[#161b2a]/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 p-6 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full animate-pulse ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              {isOptimized ? 'Optimized Feed' : 'Unoptimized Feed'}
            </h3>
            <span className="text-[10px] bg-slate-800 px-3 py-1 rounded-full border border-slate-700 font-mono text-slate-400">
              ITEMS: {isOptimized ? filteredOptimized.length : filteredSlow.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar p-1">
            {isOptimized ? (
              filteredOptimized.map(p => <FastProductItem key={p.id} {...p} />)
            ) : (
              filteredSlow.map(p => <SlowProductItem key={p.id} {...p} />)
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}