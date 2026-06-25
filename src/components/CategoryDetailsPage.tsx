import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, ArrowRight, Sparkles, Shield, ChevronRight, Compass, Coins, 
  ShoppingBag, CreditCard, Wine, Castle, Hotel, Flame, Mountain, Palmtree, 
  Plane, Heart, Dog, TrendingUp, PieChart, CircleDollarSign, Wallet, 
  ShieldAlert, Umbrella, HeartHandshake, Smartphone, Headphones, Keyboard, 
  Droplets, Zap, Coffee, Apple, Layers, GraduationCap, BookOpen, Wifi, 
  Car, Key, GlassWater, Award, Sunset, Beer, Leaf, ChefHat, Footprints, 
  Sparkle, Search, CheckCircle2, Ticket, X, RefreshCw, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { categoriesData, L1Category, L2Category, L3Category } from '../data/categoriesData';

// Dynamic icon map resolution for Lucide icons
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Compass, Coins, ShoppingBag, CreditCard, Wine, 
  Castle, Hotel, Flame, Mountain, Palmtree, Plane, 
  Heart, Dog, TrendingUp, PieChart, CircleDollarSign, 
  Wallet, ShieldAlert, Umbrella, HeartHandshake, Smartphone, 
  Headphones, Keyboard, Sparkles, Droplets, Zap, 
  Coffee, Apple, Gift: Ticket, Utensils: ChefHat, Layers, 
  GraduationCap, BookOpen, Wifi, Car, Key, 
  GlassWater, Award, Sunset, Beer, Leaf, 
  ChefHat, Footprints, Sparkle
};

export const CategoryDetailsPage: React.FC = () => {
  const { categoryPageId, setCategoryPageId, addCoins, coins } = useApp();
  
  // Find the current category structure
  const currentL1 = categoriesData.find(c => c.id === categoryPageId) || categoriesData[0];

  // Specific state inside this separate page
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeL3, setActiveL3] = useState<L3Category | null>(null);
  const [simulationStep, setSimulationStep] = useState<'details' | 'processing' | 'success'>('details');
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [customSelectValue, setCustomSelectValue] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');
  const [customDate, setCustomDate] = useState<string>('2026-06-30');

  // Sync default select values when L3 item changes
  useEffect(() => {
    if (activeL3) {
      setCustomSelectValue(activeL3.meta.value || (activeL3.meta.options?.[0] || ''));
      setCustomInputValue('');
      setSimulationStep('details');
    }
  }, [activeL3]);

  // Open simulation
  const openL3Modal = (l3: L3Category) => {
    setActiveL3(l3);
  };

  // Run simulation
  const startSimulation = () => {
    if (!activeL3) return;

    setSimulationStep('processing');
    
    const messages = [
      'Establishing Secure Tunnel...',
      'Validating Member Handshake...',
      'Authorizing Digital Gateway Nodes...',
      'Signing Off on Ledger Block...'
    ];

    let currentMsgIndex = 0;
    setLoadingMessage(messages[0]);

    const interval = setInterval(() => {
      currentMsgIndex++;
      if (currentMsgIndex < messages.length) {
        setLoadingMessage(messages[currentMsgIndex]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setSimulationStep('success');
      // Award coins on success!
      addCoins(1500);
    }, 2400);
  };

  // Get filtered L2 & L3 subcategories specifically for this category details view
  const getFilteredSubcategories = () => {
    if (!searchQuery.trim()) return currentL1.subcategories;

    return currentL1.subcategories.map(l2 => {
      const filteredL3s = l2.subcategories.filter(l3 => 
        l3.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l3.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l3.queries.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...l2, subcategories: filteredL3s };
    }).filter(l2 => l2.subcategories.length > 0);
  };

  const filteredL2s = getFilteredSubcategories();

  // Map theme colors to CSS colors
  const themeColors: { [key: string]: { text: string; bg: string; border: string; glow: string; pill: string } } = {
    amber: {
      text: 'text-amber-600',
      bg: 'bg-amber-100/60',
      border: 'border-amber-200',
      glow: 'shadow-amber-500/5',
      pill: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    emerald: {
      text: 'text-emerald-700',
      bg: 'bg-emerald-100/60',
      border: 'border-emerald-200',
      glow: 'shadow-emerald-500/5',
      pill: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    sky: {
      text: 'text-sky-700',
      bg: 'bg-sky-100/60',
      border: 'border-sky-200',
      glow: 'shadow-sky-500/5',
      pill: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    indigo: {
      text: 'text-indigo-700',
      bg: 'bg-indigo-100/60',
      border: 'border-indigo-200',
      glow: 'shadow-indigo-500/5',
      pill: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    rose: {
      text: 'text-rose-700',
      bg: 'bg-rose-100/60',
      border: 'border-rose-200',
      glow: 'shadow-rose-500/5',
      pill: 'bg-rose-50 text-rose-800 border-rose-200'
    }
  };

  const activeColors = themeColors[currentL1.colorTheme] || themeColors.amber;

  return (
    <div className="space-y-6 pb-28 text-left bg-[#F5F6F8] min-h-screen">
      {/* Editorial Navigation Top Bar */}
      <div className="px-4 pt-5 flex items-center justify-between border-b border-neutral-100 pb-3 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <button 
          onClick={() => setCategoryPageId(null)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/50 text-neutral-800 transition-all cursor-pointer font-bold text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-extrabold flex items-center gap-1.5">
          <Sparkle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>CRED exclusive page</span>
        </span>
      </div>

      {/* Hero Category Subcategories Branding Banner */}
      <div className="px-4">
        <div className={`p-6 rounded-3xl bg-gradient-to-br ${
          currentL1.id === 'escapes' ? 'from-[#1c1203] via-[#0f0a02] to-neutral-950 border-amber-900/30' :
          currentL1.id === 'cash_mint' ? 'from-[#031c12] via-[#020f0a] to-neutral-950 border-emerald-900/30' :
          currentL1.id === 'store' ? 'from-[#03151c] via-[#020a0f] to-neutral-950 border-sky-900/30' :
          currentL1.id === 'max' ? 'from-[#0d071c] via-[#07040f] to-neutral-950 border-indigo-900/30' :
          'from-[#1c030d] via-[#0f0207] to-neutral-950 border-rose-900/30'
        } border shadow-[0_12px_36px_rgba(0,0,0,0.12)] relative overflow-hidden text-left`}>
          {/* Atmospheric Glow */}
          <div className={`absolute -top-1/2 -right-1/4 w-72 h-72 rounded-full bg-gradient-to-br ${
            currentL1.id === 'escapes' ? 'from-amber-500/15 to-orange-500/5 blur-3xl' :
            currentL1.id === 'cash_mint' ? 'from-emerald-500/15 to-teal-500/5 blur-3xl' :
            currentL1.id === 'store' ? 'from-sky-500/15 to-blue-500/5 blur-3xl' :
            currentL1.id === 'max' ? 'from-purple-500/15 to-indigo-500/5 blur-3xl' :
            'from-rose-500/15 to-pink-500/5 blur-3xl'
          }`} />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest border ${
                currentL1.id === 'escapes' ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' :
                currentL1.id === 'cash_mint' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' :
                currentL1.id === 'store' ? 'bg-sky-950/40 text-sky-300 border-sky-500/30' :
                currentL1.id === 'max' ? 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30' :
                'bg-rose-950/40 text-rose-300 border-rose-500/30'
              }`}>
                {currentL1.description}
              </span>
              
              <span className="text-[9.5px] font-mono text-neutral-400 font-extrabold uppercase tracking-wider">
                {currentL1.subcategories.length} core segments
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-extrabold text-white tracking-tight">
                {currentL1.name}
              </h3>
              <p className="text-neutral-400 font-sans text-[11.5px] mt-1.5 font-medium leading-relaxed max-w-sm">
                Unlock premier member privileges, direct ledger bookings, and secure zero-commission financial solutions designed for Saloni.
              </p>
            </div>

            {/* Direct List of Subcategories */}
            <div className="pt-3 border-t border-neutral-800/60">
              <p className="text-[8.5px] font-sans text-neutral-500 uppercase tracking-widest font-extrabold mb-2">
                Available segments
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentL1.subcategories.map(sub => (
                  <span 
                    key={sub.id}
                    className={`px-2.5 py-1 rounded-lg text-[9.5px] font-sans font-bold border flex items-center gap-1.5 ${
                      currentL1.id === 'escapes' ? 'bg-amber-500/5 text-amber-200 border-amber-500/20' :
                      currentL1.id === 'cash_mint' ? 'bg-emerald-500/5 text-emerald-200 border-emerald-500/20' :
                      currentL1.id === 'store' ? 'bg-sky-500/5 text-sky-200 border-sky-500/20' :
                      currentL1.id === 'max' ? 'bg-indigo-500/5 text-indigo-200 border-indigo-500/20' :
                      'bg-rose-500/5 text-rose-200 border-rose-500/20'
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full ${
                      currentL1.id === 'escapes' ? 'bg-amber-400' :
                      currentL1.id === 'cash_mint' ? 'bg-emerald-400' :
                      currentL1.id === 'store' ? 'bg-sky-400' :
                      currentL1.id === 'max' ? 'bg-indigo-400' :
                      'bg-rose-400'
                    }`} />
                    <span>{sub.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="px-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm hover:border-neutral-300 transition-all">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input 
            type="text" 
            placeholder={`Search within ${currentL1.name}...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-[12px] text-neutral-800 placeholder-neutral-400 focus:outline-none w-full font-mono font-bold"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-neutral-400 hover:text-black px-2 font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* EXCLUSIVES AND SUBCATEGORIES LIST */}
      <div className="px-4 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
          <h4 className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest font-extrabold">
            Explore all billing & privileges
          </h4>
          <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono font-extrabold uppercase">
            Safe sandbox
          </span>
        </div>

        {/* Categories list */}
        <div className="space-y-6">
          {filteredL2s.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-xs font-mono">
              No matching offerings found for "{searchQuery}".
            </div>
          ) : (
            filteredL2s.map(l2 => (
              <div key={l2.id} className="space-y-3">
                <div className="flex items-center gap-2 pl-1">
                  <span className="text-[9px] font-sans tracking-widest uppercase text-neutral-400 font-extrabold">
                    {l2.name}
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {l2.subcategories.map(l3 => {
                    const L3Icon = IconMap[l3.iconName] || HelpCircle;
                    
                    return (
                      <motion.button
                        whileTap={{ scale: 0.99 }}
                        onClick={() => openL3Modal(l3)}
                        key={l3.id}
                        className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-all rounded-2xl p-4 cursor-pointer text-left flex items-start gap-3.5 relative overflow-hidden group"
                      >
                        <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-transparent group-hover:${activeColors.text.replace('text-', 'bg-')} transition-all`} />
                        
                        <div className={`w-9 h-9 rounded-full ${activeColors.bg} ${activeColors.text} border ${activeColors.border} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                          <L3Icon className="w-4.5 h-4.5 stroke-[2]" />
                        </div>

                        <div className="flex-1 min-w-0 pr-1 text-left">
                          <p className="text-[12px] font-sans font-bold tracking-wide text-neutral-800 group-hover:text-black transition-colors leading-tight">
                            {l3.name}
                          </p>
                          <p className="text-[10.5px] text-neutral-400 line-clamp-1 mt-1 font-sans font-semibold leading-relaxed flex items-center gap-1">
                            <span className="text-neutral-300 font-bold">Query:</span> 
                            <span className="italic">"{l3.queries[0]}"</span>
                          </p>
                        </div>

                        <div className="self-center shrink-0 ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:text-neutral-800 group-hover:border-neutral-300 transition-all">
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* HIGH-FIDELITY DETAILED INTERACTIVE DRAWER MODAL */}
      <AnimatePresence>
        {activeL3 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveL3(null)}
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 rounded-t-3xl p-6 z-55 text-left max-h-[92vh] overflow-y-auto scrollbar-none text-[#0A0A0A]"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-start border-b border-neutral-100 pb-4 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full border ${activeColors.pill} font-bold`}>
                      {currentL1.name}
                    </span>
                    <span className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                      • {activeL3.actionType} sandbox
                    </span>
                  </div>
                  <h3 className="text-xl font-sans font-extrabold text-neutral-800 mt-1.5 tracking-tight break-words">
                    {activeL3.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveL3(null)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* DETAILS PANEL (Step 1) */}
              {simulationStep === 'details' && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <p className="text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">
                      Platform prompts / intentions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeL3.queries.map((q, idx) => (
                        <span 
                          key={idx} 
                          className="text-[11px] font-mono text-neutral-600 bg-neutral-50 border border-neutral-150 px-2.5 py-1 rounded-lg font-bold"
                        >
                          "{q}"
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 text-xs text-neutral-600 leading-relaxed font-medium">
                    {activeL3.description}
                  </div>

                  <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 space-y-4">
                    <p className="text-[10px] font-sans text-emerald-700 uppercase tracking-widest flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Input simulated credentials</span>
                    </p>

                    {/* SELECT DROPDOWN */}
                    {activeL3.meta.options && activeL3.meta.options.length > 0 && (
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono text-neutral-500 font-bold">
                          Select {activeL3.meta.label}:
                        </label>
                        <select
                          value={customSelectValue}
                          onChange={(e) => setCustomSelectValue(e.target.value)}
                          className="w-full bg-white border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-800 focus:outline-none focus:border-emerald-500 font-mono cursor-pointer font-bold shadow-sm"
                        >
                          {activeL3.meta.options.map((opt, i) => (
                            <option key={i} value={opt} className="bg-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* AMOUNT */}
                    {(activeL3.actionType === 'investment' || activeL3.id === 'digital_gold' || activeL3.id === 'rent_payments' || activeL3.id === 'tuition_fees' || activeL3.id === 'fastag_recharge') && (
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono text-neutral-500 font-bold">
                          {activeL3.placeholder}:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs text-neutral-400 font-mono font-bold">₹</span>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={customInputValue}
                            onChange={(e) => setCustomInputValue(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-xl py-2 pl-6 pr-3 text-xs text-neutral-800 focus:outline-none focus:border-emerald-500 font-mono font-bold shadow-sm"
                          />
                        </div>
                      </div>
                    )}

                    {/* TEXT INPUT */}
                    {(!activeL3.meta.options && activeL3.actionType !== 'investment' && activeL3.id !== 'digital_gold' && activeL3.id !== 'rent_payments' && activeL3.id !== 'tuition_fees' && activeL3.id !== 'fastag_recharge') && (
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono text-neutral-500 font-bold">
                          Provide details:
                        </label>
                        <input
                          type="text"
                          placeholder={activeL3.placeholder}
                          value={customInputValue}
                          onChange={(e) => setCustomInputValue(e.target.value)}
                          className="w-full bg-white border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-800 focus:outline-none focus:border-emerald-500 font-mono font-bold shadow-sm"
                        />
                      </div>
                    )}

                    {/* SCHEDULE DATE */}
                    {(activeL3.actionType === 'booking' || activeL3.actionType === 'reservation') && (
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono text-neutral-500 font-bold">
                          Booking date:
                        </label>
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          className="w-full bg-white border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-800 focus:outline-none focus:border-emerald-500 font-mono font-bold shadow-sm"
                        />
                      </div>
                    )}

                    <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-neutral-400">Sandbox privilege rate:</span>
                      <span className={`font-extrabold ${activeColors.text}`}>
                        {activeL3.actionType === 'booking' && '40% Coin cashback'}
                        {activeL3.actionType === 'investment' && '9.5% Gold standard'}
                        {activeL3.actionType === 'purchase' && 'D2C exclusive rate'}
                        {activeL3.actionType === 'billpay' && '0% Direct routing'}
                        {activeL3.actionType === 'reservation' && 'Priority privilege link'}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={startSimulation}
                    className="w-full py-3.5 rounded-xl font-sans font-bold text-white text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 cursor-pointer shadow-md"
                  >
                    <span>Execute safe sandbox checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              )}

              {/* PROCESSING STEP */}
              {simulationStep === 'processing' && (
                <div className="text-center py-12 space-y-6 animate-fadeIn">
                  <div className="relative w-16 h-16 mx-auto">
                    <RefreshCw className="w-16 h-16 text-emerald-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono text-neutral-800 font-bold">{loadingMessage}</p>
                    <p className="text-[11px] text-neutral-400 font-bold">Securing zero-commission routing layer</p>
                  </div>
                </div>
              )}

              {/* SUCCESS TICKET RECEIPT */}
              {simulationStep === 'success' && (
                <div className="space-y-5 animate-scaleUp">
                  <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden relative shadow-md text-[#0A0A0A]">
                    <div className={`p-4 ${activeColors.bg} border-b border-neutral-100 flex items-center justify-between`}>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-bold">
                          Clearance verified
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                        REC ID: {Math.floor(200000 + Math.random() * 800000)}
                      </span>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="text-center py-1">
                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                          Sandbox record saved
                        </p>
                        <h4 className="text-base font-sans font-extrabold text-neutral-800 mt-1">
                          {activeL3.name}
                        </h4>
                      </div>

                      <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs font-mono font-bold">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Class:</span>
                          <span className="text-neutral-700">{currentL1.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Credential / plan:</span>
                          <span className="text-neutral-800 text-right max-w-[200px] truncate">
                            {customSelectValue || activeL3.meta.options?.[0] || 'Member Default'}
                          </span>
                        </div>
                        {customInputValue && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Allocation param:</span>
                            <span className="text-neutral-800 text-right truncate">
                              {customInputValue}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Timestamp:</span>
                          <span className="text-neutral-700">2026-06-25 03:15:00 UTC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Member ID:</span>
                          <span className="text-neutral-800 font-sans font-extrabold">SALONI SNEHA</span>
                        </div>
                      </div>

                      <div className="relative border-t border-dashed border-neutral-200 my-4 -mx-5 flex items-center justify-between">
                        <div className="absolute left-0 -ml-2 w-4 h-4 bg-[#F5F6F8] rounded-full border border-neutral-200" />
                        <div className="absolute right-0 -mr-2 w-4 h-4 bg-[#F5F6F8] rounded-full border border-neutral-200" />
                      </div>

                      <div className="bg-[#EAF9F1] border border-[#A7E2C4]/50 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="text-left">
                            <p className="text-[10px] font-mono text-emerald-800 uppercase tracking-widest font-bold">
                              On-ledger bonus
                            </p>
                            <p className="text-[10.5px] text-neutral-600 mt-0.5 font-medium">
                              +1,500 coins earned!
                            </p>
                          </div>
                        </div>
                        <span className="text-emerald-700 font-mono text-xs font-bold">+1,500</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveL3(null)}
                    className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow"
                  >
                    Done
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
