import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, Sparkles, Shield, UserCheck, Share2, HelpCircle, Gift, DollarSign, 
  RefreshCw, X, Check, ChevronRight, Compass, Coins, ShoppingBag, CreditCard, 
  Wine, Castle, Hotel, Flame, Mountain, Palmtree, Plane, Heart, Dog, TrendingUp, 
  PieChart, CircleDollarSign, Wallet, ShieldAlert, Umbrella, HeartHandshake, 
  Smartphone, Headphones, Keyboard, Droplets, Zap, Coffee, Apple, Layers, 
  GraduationCap, BookOpen, Wifi, Car, Key, GlassWater, Award, Sunset, Beer, 
  Leaf, ChefHat, Footprints, Sparkle, Search, CheckCircle2, Ticket,
  FileText, Landmark, Gauge, MessageSquare, Copy, Send, Clock
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
  Coffee, Apple, Gift, Utensils: ChefHat, Layers, 
  GraduationCap, BookOpen, Wifi, Car, Key, 
  GlassWater, Award, Sunset, Beer, Leaf, 
  ChefHat, Footprints, Sparkle
};

interface HeroCategoryCard {
  id: string; // Maps to L1 ID
  title: string;
  subtitle: string;
  colorTheme: string;
  accentGradient: string;
  accentText: string;
}

export const HomeTab: React.FC = () => {
  const { coins, addCoins, setCategoryPageId, notifications } = useApp();
  const [showReferModal, setShowReferModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // Interactive Modal States for Quick Access
  const [activeModal, setActiveModal] = useState<'history' | 'balance' | 'cibil' | 'support' | 'refer' | null>(null);

  // States for bank balances
  const [balanceLoading, setBalanceLoading] = useState<Record<string, boolean>>({});
  const [balancesChecked, setBalancesChecked] = useState<Record<string, boolean>>({});

  // States for Cibil
  const [cibilUpdating, setCibilUpdating] = useState(false);
  const [cibilScore, setCibilScore] = useState(812);

  // States for referral copy
  const [referCopied, setReferCopied] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  // States for Live Support
  const [supportMessage, setSupportMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: 'Welcome Saloni, I am your CRED concierge desk. How can I help you today?', time: '3:44 PM' }
  ]);
  const [botTyping, setBotTyping] = useState(false);

  const handleCheckBalance = (bankKey: string) => {
    if (balanceLoading[bankKey]) return;
    setBalanceLoading(prev => ({ ...prev, [bankKey]: true }));
    setTimeout(() => {
      setBalanceLoading(prev => ({ ...prev, [bankKey]: false }));
      setBalancesChecked(prev => ({ ...prev, [bankKey]: true }));
    }, 1200);
  };

  const handleUpdateCibil = () => {
    if (cibilUpdating) return;
    setCibilUpdating(true);
    setTimeout(() => {
      setCibilUpdating(false);
      setCibilScore(821);
      addCoins(2500);
    }, 1500);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('cred.club/refer/saloni_sneha');
    setReferCopied(true);
    setTimeout(() => setReferCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setInviteEmail('');
    setTimeout(() => setInviteSent(false), 3000);
  };

  const handleSmartQuery = (queryText: string, botAnswer: string) => {
    if (botTyping) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: queryText, time: timeStr }]);
    setBotTyping(true);

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: botAnswer, time: timeStr }]);
      setBotTyping(false);
    }, 1000);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim() || botTyping) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userText = supportMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setSupportMessage('');
    setBotTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a valid query, Saloni. Let me route this to our premium concierge desk for direct clearance.",
        "Understood, Saloni. Your credit status and linked pipelines are healthy. Is there anything else?",
        "Your on-ledger coins are secure and can be burned on any active store curations instantly.",
        "Your reward dispatch order is undergoing final security compliance checks and will ship soon."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { sender: 'bot', text: randomResponse, time: timeStr }]);
      setBotTyping(false);
    }, 1100);
  };
  const [copiedLink, setCopiedLink] = useState(false);
  const [scoreCheckProgress, setScoreCheckProgress] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [creditScore, setCreditScore] = useState<number | null>(null);

  // Category Explorer States
  const [selectedL1Id, setSelectedL1Id] = useState<string>('max');
  const [activeL3, setActiveL3] = useState<L3Category | null>(null);
  const [simulationStep, setSimulationStep] = useState<'details' | 'processing' | 'success'>('details');
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  
  // Custom interactive state for selected option within subcategory
  const [customSelectValue, setCustomSelectValue] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');
  const [customDate, setCustomDate] = useState<string>('2026-06-30');
  
  // Search query state to quickly highlight/find any categories
  const [searchQuery, setSearchQuery] = useState<string>('');

  // View mode state ('all' displays all categories at once as card lists, 'tabs' is tab-by-tab)
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('all');

  // Promotional Claim State
  const [claimRewardName, setClaimRewardName] = useState<string | null>(null);
  const [claimProgress, setClaimProgress] = useState<'idle' | 'claiming' | 'success'>('idle');

  const handleShareReferral = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCheckCreditScore = () => {
    setScoreCheckProgress('scanning');
    setTimeout(() => {
      setCreditScore(812); // Premium high credit score
      setScoreCheckProgress('done');
      addCoins(2500);
    }, 2500);
  };

  const handleClaimReward = (rewardTitle: string, coinsCost: number) => {
    if (coins < coinsCost) {
      alert(`Insufficient CRED Coins! You Need ${coinsCost.toLocaleString()} Coins To Claim This Reward.`);
      return;
    }
    setClaimRewardName(rewardTitle);
    setClaimProgress('claiming');
    setTimeout(() => {
      setClaimProgress('success');
      addCoins(-coinsCost);
    }, 2000);
  };

  const currentL1 = categoriesData.find(c => c.id === selectedL1Id) || categoriesData[0];

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

  // Open the interactive bottom sheet for an L3 subcategory
  const openL3Modal = (l3: L3Category) => {
    setActiveL3(l3);
    setCustomSelectValue(l3.meta.value);
    setCustomInputValue('');
    setSimulationStep('details');
  };

  // Run the high-fidelity transaction simulation
  const startSimulation = () => {
    if (!activeL3) return;

    setSimulationStep('processing');
    
    const messages = [
      'Securing Direct Encrypted Connection...',
      'Authorizing Partner Credentials...',
      'Linking Secure Banking Gateway...',
      'Generating Smart Receipt...'
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
      // Award coins as user successfully completes a category action!
      addCoins(1500);
    }, 2400);
  };

  // Filter categories by search queries to let users quickly search terms like "Maldives"
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) return categoriesData;
    
    return categoriesData.map(l1 => {
      const filteredL2s = l1.subcategories.map(l2 => {
        const filteredL3s = l2.subcategories.filter(l3 => 
          l3.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l3.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l3.queries.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return { ...l2, subcategories: filteredL3s };
      }).filter(l2 => l2.subcategories.length > 0);
      
      return { ...l1, subcategories: filteredL2s };
    }).filter(l1 => l1.subcategories.length > 0);
  };

  const filteredCategories = getFilteredCategories();
  const searchResultsCount = filteredCategories.reduce(
    (acc, l1) => acc + l1.subcategories.reduce((acc2, l2) => acc2 + l2.subcategories.length, 0),
    0
  );

  // Hero carousel category configuration
  const heroCategories: HeroCategoryCard[] = [
    { 
      id: 'max', 
      title: 'Pay Bills', 
      subtitle: 'Rent, Gas & Utilities', 
      colorTheme: 'indigo',
      accentGradient: 'from-purple-500/10 to-indigo-500/5',
      accentText: 'text-indigo-600'
    },
    { 
      id: 'cash_mint', 
      title: 'Cash & Mint', 
      subtitle: '9.5% Secured Returns', 
      colorTheme: 'emerald',
      accentGradient: 'from-emerald-500/10 to-teal-500/5',
      accentText: 'text-emerald-700'
    },
    { 
      id: 'store', 
      title: 'Shop Store', 
      subtitle: 'Curated D2C Brands', 
      colorTheme: 'sky',
      accentGradient: 'from-sky-500/10 to-indigo-500/5',
      accentText: 'text-sky-600'
    },
    { 
      id: 'escapes', 
      title: 'Escapes Travel', 
      subtitle: 'Ultra-Luxury Getaways', 
      colorTheme: 'amber',
      accentGradient: 'from-amber-500/10 to-orange-500/5',
      accentText: 'text-amber-600'
    },
    { 
      id: 'dineout', 
      title: 'Gourmet Dineout', 
      subtitle: 'Michelin Star Reserve', 
      colorTheme: 'rose',
      accentGradient: 'from-rose-500/10 to-pink-500/5',
      accentText: 'text-rose-600'
    }
  ];

  return (
    <div className="space-y-6 pb-28 text-left bg-[#F5F6F8]">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6"
      >
        <p className="text-[10px] text-emerald-700 font-sans tracking-widest uppercase mb-1 flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> CRED member privilege
        </p>
        <h1 className="text-3xl font-serif font-extrabold text-neutral-900 tracking-tight leading-none mt-1">
          Welcome, Saloni
        </h1>
        <p className="text-neutral-500 font-sans text-xs mt-2 leading-relaxed font-medium">
          Explore and claim curated membership perks designed for absolute distinction.
        </p>
      </motion.div>

      {/* SCREENSHOT CUSTOM PILLS - Underneath Greeting */}
      <div className="px-4 flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
        <div className="bg-[#EAF9F1] border border-[#A7E2C4]/70 text-[#1E5C41] rounded-full px-4 py-2 flex items-center justify-center font-bold text-[11px] uppercase tracking-wider shadow-sm shrink-0">
          Unlocked for you
        </div>
        <button 
          onClick={() => {
            setScoreCheckProgress('idle');
            setShowScoreModal(true);
          }}
          className="bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 rounded-full px-4 py-2 flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-wider shadow-sm shrink-0 cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Check balance</span>
        </button>
      </div>

      {/* STUNNING HERO BANNER - CRED IndusInd Bank RuPay Card */}
      <div className="px-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-[#0C1220] via-[#0D1527] to-[#122A5E] rounded-3xl p-5 relative overflow-hidden border border-[#1E3A8A]/25 shadow-[0_12px_28px_rgba(18,42,94,0.14)] flex items-center justify-between"
        >
          {/* Credit Card mockup on Left */}
          <div className="w-1/3 shrink-0 relative h-28 flex items-center justify-center">
            {/* Elegant angled floating card */}
            <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-indigo-900 via-neutral-900 to-black border border-indigo-400/30 p-2 shadow-2xl rotate-[-8deg] transform -translate-x-1 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="text-[7px] font-sans text-indigo-300 font-extrabold uppercase">CRED</div>
                <div className="w-3.5 h-2.5 bg-amber-400/20 rounded-sm border border-amber-400/40" />
              </div>
              <div>
                <div className="text-[6px] text-neutral-400 font-mono">•••• •••• •••• 9281</div>
                <div className="text-[5px] text-neutral-500 font-mono uppercase mt-0.5">SALONI SNEHA</div>
              </div>
            </div>
            {/* Secondary backing card shadow */}
            <div className="w-24 h-16 rounded-lg bg-slate-900/40 border border-slate-800/40 absolute rotate-[6deg] transform translate-y-1 shadow-lg -z-10" />
          </div>

          {/* Card Pitch & Apply Button on Right */}
          <div className="w-2/3 pl-3 text-left flex flex-col justify-between h-full space-y-2">
            <div>
              <h3 className="text-[13px] font-sans font-extrabold text-white tracking-wide uppercase leading-tight">
                CRED IndusInd RuPay card
              </h3>
              <p className="text-[10px] text-slate-300 font-sans mt-0.5 leading-snug">
                Lifetime-free. For a limited time.<br />Earn 5% cash back online.
              </p>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  alert("Application Initialized! We've linked your Experian health metrics to your pre-approved application.");
                }}
                className="bg-gradient-to-r from-[#F7C948] to-[#F5B041] hover:from-[#F5B041] hover:to-[#E67E22] text-black font-sans font-extrabold text-[10px] tracking-wider px-4 py-2 rounded-lg shadow-lg shadow-amber-500/20 uppercase"
              >
                Apply now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CURATED CATEGORIES HORIZONTAL ICON MENU */}
      <div className="w-full space-y-3">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-extrabold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>CRED club services</span>
          </h2>
          <span className="text-[9px] text-neutral-400 font-mono tracking-wider font-extrabold uppercase">
            Scroll track
          </span>
        </div>

        {/* Horizontal Scrolling Menu with Icons & Text Labels */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth">
          {heroCategories.map((cat) => {
            const isActive = selectedL1Id === cat.id;
            const categoryData = categoriesData.find(c => c.id === cat.id);
            const IconComponent = categoryData ? (IconMap[categoryData.iconName] || Compass) : Compass;
            const colorConfig = themeColors[cat.colorTheme] || themeColors.amber;

            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setCategoryPageId(cat.id);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`snap-center shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 w-[78px] h-[86px] cursor-pointer select-none group relative ${
                  isActive 
                    ? 'bg-neutral-900 border-neutral-800 text-white shadow-md shadow-neutral-900/10' 
                    : 'bg-white border-neutral-150 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-200'
                }`}
                id={`hero-category-${cat.id}`}
              >
                {/* Visual Glow behind active items */}
                {isActive && (
                  <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-tr ${cat.accentGradient} opacity-20 blur-sm pointer-events-none`} />
                )}

                {/* Circular Icon Container */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : `${colorConfig.bg} ${colorConfig.text}`
                }`}>
                  <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>

                {/* Service Label */}
                <span className={`text-[8.5px] mt-2 font-sans tracking-tight font-extrabold text-center uppercase truncate w-full ${
                  isActive ? 'text-white font-black' : 'text-neutral-700 group-hover:text-neutral-950 font-bold'
                }`}>
                  {cat.title.replace(' Travel', '').replace(' Store', '').replace(' Dineout', '')}
                </span>

                {/* Minimal Active Dot Indicator */}
                {isActive && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 bg-[#A7E2C4] rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* VIBRANT REWARD CARDS SECTION - Styled as luxury floating showcases */}
      <div className="px-4 space-y-4">
        <h2 className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-bold">
          Exclusive member rewards
        </h2>

        {/* Promo Reward Card 1: MacBook Pro M3 Max */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-[#12082b] via-[#090518] to-black border border-purple-950/20 relative overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15)] group text-left"
        >
          {/* Neon background blur orb */}
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-36 h-36 rounded-full bg-indigo-600/10 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 flex-1">
              <span className="bg-purple-900/35 text-purple-300 border border-purple-500/30 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full font-bold">
                Limited reward
              </span>
              <h3 className="text-xl font-serif font-bold text-white tracking-tight leading-tight pt-1">
                MacBook Pro M3 Max
              </h3>
              <p className="text-neutral-400 text-[11px] leading-relaxed max-w-sm">
                Uncompromising supercharged performance styled in Space Black. Designed exclusively for high-value members.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 pt-1 font-bold">
                <Coins className="w-3.5 h-3.5" />
                <span>150,000 CRED coins required</span>
              </div>
            </div>

            {/* Laptop Mock */}
            <div className="relative w-44 h-28 mx-auto shrink-0 flex items-center justify-center scale-95 md:scale-100 transition-transform duration-500 group-hover:scale-105">
              <div className="absolute top-2 w-32 h-20 bg-neutral-900 rounded-t-lg border-2 border-neutral-700 shadow-xl overflow-hidden flex flex-col justify-between">
                <div className="w-full h-full bg-gradient-to-tr from-purple-800 via-pink-700 to-indigo-900 relative flex items-center justify-center p-1">
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 animate-pulse blur-sm" />
                  <span className="text-[7.5px] font-mono tracking-widest text-white/80 font-bold uppercase relative z-10">M3 MAX</span>
                </div>
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-b-sm" />
              <div className="absolute bottom-4 w-40 h-2 bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-b-md border-t border-neutral-600 shadow-2xl" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-neutral-700" />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClaimReward('MacBook Pro M3 Max', 150000)}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono uppercase text-[10px] tracking-widest font-extrabold rounded-2xl shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-colors cursor-pointer"
          >
            Claim now
          </motion.button>
        </motion.div>

        {/* Promo Reward Card 2: Soneva Jani Maldives Luxury Getaway */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-[#1b0c03] via-[#0d0701] to-black border border-amber-950/20 relative overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15)] group text-left"
        >
          {/* Coral / Amber background blur orb */}
          <div className="absolute top-[-25%] right-[-5%] w-48 h-48 rounded-full bg-amber-600/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-36 h-36 rounded-full bg-orange-600/10 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2 flex-1">
              <span className="bg-amber-900/30 text-amber-300 border border-amber-500/20 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full font-bold">
                Elite escape
              </span>
              <h3 className="text-xl font-serif font-bold text-white tracking-tight leading-tight pt-1">
                Soneva Jani Maldives
              </h3>
              <p className="text-neutral-400 text-[11px] leading-relaxed max-w-sm">
                Overwater sanctuaries with retractable roofs. Unlimited crystal blue lagoons & private butler services.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 pt-1 font-bold">
                <Coins className="w-3.5 h-3.5" />
                <span>250,000 CRED coins required</span>
              </div>
            </div>

            {/* Overwater Villa Mock */}
            <div className="relative w-44 h-28 mx-auto shrink-0 flex items-center justify-center scale-95 md:scale-100 transition-transform duration-500 group-hover:scale-105">
              <div className="absolute w-32 h-20 bg-gradient-to-tr from-teal-400/20 to-sky-400/10 rounded-xl border border-sky-400/20 flex flex-col justify-end p-1.5 overflow-hidden">
                <div className="w-full h-1/2 bg-gradient-to-t from-teal-500/30 to-teal-300/10 rounded" />
              </div>
              <div className="absolute bottom-6 left-12 w-1 h-8 bg-amber-800/80" />
              <div className="absolute bottom-6 left-20 w-1 h-10 bg-amber-800/80" />
              <div className="absolute bottom-6 left-28 w-1 h-8 bg-amber-800/80" />
              <div className="absolute bottom-10 w-24 h-2.5 bg-gradient-to-r from-amber-700 to-amber-900 rounded-sm shadow-md" />
              <div className="absolute bottom-12 w-18 h-10 bg-gradient-to-b from-amber-950 to-neutral-900 rounded-t-xl border-t border-amber-500/40 flex items-center justify-center" />
              <div className="absolute top-4 right-10 w-4 h-4 rounded-full bg-orange-500/40 blur-xs" />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClaimReward('Soneva Jani Maldives Resort', 250000)}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] text-black font-mono uppercase text-[10px] tracking-widest font-extrabold rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-colors cursor-pointer"
          >
            Claim now
          </motion.button>
        </motion.div>
      </div>

      {/* STARK LIGHT THEME ACTION DASHBOARD */}
      <div className="px-4 space-y-3">
        <h2 className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-bold">
          Quick action registry
        </h2>

        <div className="bg-white border border-neutral-150 rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
          {/* Action Row 1 */}
          <button 
            onClick={() => {
              setScoreCheckProgress('idle');
              setShowScoreModal(true);
            }}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50/80 transition-colors border-b border-neutral-100 cursor-pointer text-left"
          >
            <div>
              <p className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                Check Experian credit health
              </p>
              <p className="text-[10.5px] text-neutral-500 mt-0.5 font-medium">
                Retrieve official scores instantly. Zero registry score impact.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sky-600">
              <Shield className="w-4 h-4 shrink-0" />
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </div>
          </button>

          {/* Action Row 2 */}
          <button 
            onClick={() => setShowReferModal(true)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50/80 transition-colors border-b border-neutral-100 cursor-pointer text-left"
          >
            <div>
              <p className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                Claim referral gold coins
              </p>
              <p className="text-[10.5px] text-neutral-500 mt-0.5 font-medium">
                Distribute custom invite keys to secure 10,000 free coins.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <Gift className="w-4 h-4 shrink-0" />
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </div>
          </button>

          {/* Action Row 3 */}
          <button 
            onClick={() => {
              setSelectedL1Id('max');
              const element = document.getElementById('hero-category-max');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50/80 transition-colors border-b border-neutral-100 cursor-pointer text-left"
          >
            <div>
              <p className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                Verify housing society dues
              </p>
              <p className="text-[10.5px] text-neutral-500 mt-0.5 font-medium">
                Direct platform integration with MyGate and NoBroker.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-600">
              <Layers className="w-4 h-4 shrink-0" />
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </div>
          </button>

          {/* Action Row 4 */}
          <button 
            onClick={() => {
              setSelectedL1Id('cash_mint');
              const element = document.getElementById('hero-category-cash_mint');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50/80 transition-colors cursor-pointer text-left"
          >
            <div>
              <p className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                Track active wealth portfolio
              </p>
              <p className="text-[10.5px] text-neutral-500 mt-0.5 font-medium">
                Review automated investment yields and P2P loan performance.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <ChevronRight className="w-4 h-4 text-neutral-300" />
            </div>
          </button>
        </div>
      </div>

      {/* QUICK ACCESS SECTION (REPLACING SECURITY PLEDGE CARD) */}
      <div className="mt-8 mb-4 px-4 text-left">
        <h3 className="text-[11px] font-sans text-[#9E9E9E] uppercase tracking-[0.16em] font-extrabold mb-3">
          Quick access
        </h3>
        
        <div className="bg-white rounded-3xl border border-neutral-150 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
          {/* Row 1: payment history */}
          <div 
            onClick={() => setActiveModal('history')}
            className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <FileText className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
              <span className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                payment history
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </div>

          <div className="border-b border-dashed border-neutral-150 mx-5" />

          {/* Row 2: bank balance */}
          <div 
            onClick={() => setActiveModal('balance')}
            className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <Landmark className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
              <span className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                bank balance
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </div>

          <div className="border-b border-dashed border-neutral-150 mx-5" />

          {/* Row 3: CIBIL score */}
          <div 
            onClick={() => setActiveModal('cibil')}
            className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <Gauge className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
              <span className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                CIBIL score
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </div>

          <div className="border-b border-dashed border-neutral-150 mx-5" />

          {/* Row 4: contact support */}
          <div 
            onClick={() => setActiveModal('support')}
            className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
              <span className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                contact support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </div>

          <div className="border-b border-dashed border-neutral-150 mx-5" />

          {/* Row 5: refer and earn */}
          <div 
            onClick={() => setActiveModal('refer')}
            className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <Gift className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
              <span className="text-[12px] font-sans font-bold text-neutral-800 tracking-wide">
                refer and earn
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </div>
        </div>
      </div>

      {/* REFER & EARN MODAL */}
      <AnimatePresence>
        {showReferModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReferModal(false)}
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 rounded-t-3xl p-6 z-50 text-left text-[#0A0A0A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase tracking-tight">Refer friends, earn gold</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-normal font-medium">Receive 10,000 bonus CRED coins and exclusive blue gems instantly when they link their card.</p>
                </div>
                <button
                  onClick={() => setShowReferModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Your unique referral link</p>
                  <p className="text-xs font-mono text-emerald-700 mt-1 font-bold">cred.club/refer/saloni_sneha</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareReferral}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-sans font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </motion.button>
              </div>

              <div className="space-y-3 mb-4 text-xs text-neutral-500 font-medium">
                <div className="flex gap-2 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Friend gets 5,000 CRED coins immediately upon card linking.</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>You receive entry tickets for exclusive Sunday MacBook draws.</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CREDIT SCORE CHECK MODAL */}
      <AnimatePresence>
        {showScoreModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScoreModal(false)}
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 rounded-t-3xl p-6 z-50 text-left text-[#0A0A0A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase tracking-tight">Official credit profile</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-normal font-medium">Scan CRIF and Experian records securely using government-backed gateways.</p>
                </div>
                <button
                  onClick={() => setShowScoreModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {scoreCheckProgress === 'idle' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-200">
                    <Shield className="w-8 h-8 animate-pulse" />
                  </div>
                  <p className="text-sm text-neutral-800 font-sans font-bold">Ready for secure identification query</p>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">We will fetch Experian records with zero impact on your official score.</p>
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckCreditScore}
                    className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer shadow-md"
                  >
                    <span>Authorize & query CRIF score</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              {scoreCheckProgress === 'scanning' && (
                <div className="text-center py-10 space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <RefreshCw className="w-16 h-16 text-sky-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-sky-600 font-mono text-xs font-bold">
                      CRIF
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 font-sans font-bold">Decrypting secure gateway packages...</p>
                    <p className="text-xs text-neutral-500 mt-1 font-medium">Connecting to Experian registry nodes</p>
                  </div>
                </div>
              )}

              {scoreCheckProgress === 'done' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex flex-col items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                    <span className="text-2xl font-mono font-extrabold leading-none">812</span>
                    <span className="text-[8px] uppercase font-mono tracking-wider font-extrabold mt-1">Excellent</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 font-sans font-bold">CRIF score pulled successfully</p>
                    <p className="text-xs text-emerald-600 mt-1 font-mono font-bold">+2,500 bonus CRED coins credited for health check!</p>
                  </div>
                  
                  <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 text-xs text-neutral-600 space-y-2 text-left font-medium">
                    <div className="flex justify-between">
                      <span>On-time payments:</span>
                      <span className="text-emerald-600 font-mono font-bold">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credit age:</span>
                      <span className="text-neutral-800 font-mono font-bold">4 Years 2 Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active queries:</span>
                      <span className="text-neutral-800 font-mono font-bold">0 (Low Risk)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowScoreModal(false)}
                    className="mt-4 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-2.5 rounded-xl border border-neutral-800 cursor-pointer shadow"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CLAIMING PROGRESS MODAL */}
      <AnimatePresence>
        {claimRewardName && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (claimProgress === 'success') setClaimRewardName(null); }}
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 rounded-t-3xl p-6 z-50 text-left text-[#0A0A0A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase tracking-tight">Reward redemption</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-normal font-medium">Processing member privilege verification.</p>
                </div>
                {claimProgress === 'success' && (
                  <button
                    onClick={() => setClaimRewardName(null)}
                    className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {claimProgress === 'claiming' && (
                <div className="text-center py-10 space-y-4">
                  <RefreshCw className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                  <p className="text-xs font-mono text-neutral-400 font-bold">Verifying member coin ledger reserves...</p>
                </div>
              )}

              {claimProgress === 'success' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-bold text-neutral-800">Privilege successfully claimed!</h4>
                    <p className="text-xs text-neutral-500 mt-2 font-medium leading-relaxed">
                      You have successfully claimed {claimRewardName}. The dedicated concierge team will contact you for shipping & custom curation within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setClaimRewardName(null)}
                    className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow"
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QUICK ACCESS INTERACTIVE MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl border border-neutral-100 text-left"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div>
                <h3 className="text-sm font-sans font-extrabold text-neutral-800">
                  {activeModal === 'history' && 'Payment history'}
                  {activeModal === 'balance' && 'Bank balance'}
                  {activeModal === 'cibil' && 'CIBIL score'}
                  {activeModal === 'support' && 'Contact support'}
                  {activeModal === 'refer' && 'Refer and earn'}
                </h3>
                <p className="text-[10px] text-neutral-400 font-sans mt-0.5 font-medium leading-relaxed">
                  {activeModal === 'history' && 'Review recent ledger actions and statement clearances'}
                  {activeModal === 'balance' && 'Check available funds across verified linked accounts'}
                  {activeModal === 'cibil' && 'Official credit bureau rating and history'}
                  {activeModal === 'support' && 'Settle queries with our instant priority concierge'}
                  {activeModal === 'refer' && 'Invite friends to the credit club and unlock gold coins'}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* PAYMENT HISTORY */}
              {activeModal === 'history' && (
                <div className="space-y-3.5">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 space-y-2">
                      <Clock className="w-8 h-8 text-neutral-300 mx-auto" />
                      <p className="text-xs text-neutral-500 font-bold">No entries found in ledger</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className="bg-neutral-50 border border-neutral-150 p-4 rounded-2xl flex items-start justify-between gap-3 text-left animate-fadeIn"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-sans font-bold text-neutral-800 leading-snug">
                            {notif.title}
                          </p>
                          <p className="text-[10.5px] text-neutral-500 leading-relaxed font-medium">
                            {notif.description}
                          </p>
                          <span className="text-[9.5px] font-mono text-neutral-400 block pt-1">
                            {notif.timestamp}
                          </span>
                        </div>
                        {notif.amountText && (
                          <span className={`text-xs font-mono font-extrabold shrink-0 ${
                            notif.amountText.startsWith('+') ? 'text-emerald-600' : 'text-neutral-800'
                          }`}>
                            {notif.amountText}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* BANK BALANCE */}
              {activeModal === 'balance' && (
                <div className="space-y-3">
                  {[
                    { id: 'b1', bankName: 'Axis Bank Savings', accNo: 'xxxx 9482', initialBalance: '₹1,48,250' },
                    { id: 'b2', bankName: 'HDFC Premium Salary', accNo: 'xxxx 1104', initialBalance: '₹3,84,120' },
                    { id: 'b3', bankName: 'ICICI Wealth Account', accNo: 'xxxx 7720', initialBalance: '₹52,900' },
                  ].map((bank) => (
                    <div 
                      key={bank.id}
                      className="bg-neutral-50 border border-neutral-150 p-4 rounded-2xl flex items-center justify-between gap-3 text-left"
                    >
                      <div>
                        <p className="text-xs font-sans font-bold text-neutral-800">
                          {bank.bankName}
                        </p>
                        <p className="text-[10px] font-mono text-neutral-400 mt-0.5">
                          Account {bank.accNo}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        {balancesChecked[bank.id] ? (
                          <span className="text-xs font-mono font-extrabold text-emerald-700 animate-fadeIn">
                            {bank.initialBalance}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCheckBalance(bank.id)}
                            disabled={balanceLoading[bank.id]}
                            className="bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            {balanceLoading[bank.id] ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Checking</span>
                              </>
                            ) : (
                              <span>Check balance</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-start gap-2.5 text-left mt-2">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-mono text-emerald-800 uppercase font-bold">Secure connection verified</p>
                      <p className="text-[10px] text-neutral-500 leading-normal font-medium mt-0.5">
                        Direct connection to national payment gateway ensures zero log trace on public networks.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CIBIL SCORE */}
              {activeModal === 'cibil' && (
                <div className="space-y-5 text-center">
                  {/* Score gauge visual */}
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        stroke="#f3f4f6" 
                        strokeWidth="8" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        stroke="#059669" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={263}
                        strokeDashoffset={263 - (263 * (cibilScore / 900))}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-mono font-extrabold text-neutral-800">{cibilScore}</span>
                      <span className="text-[10px] font-sans text-neutral-400 font-extrabold uppercase tracking-widest mt-0.5">Score</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-extrabold uppercase mt-1 tracking-wider">Excellent</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
                    Your Experian CRIF status is excellent. You are in the top 4% of domestic high-net-worth credit consumers.
                  </p>

                  <div className="bg-neutral-50 border border-neutral-150 p-4 rounded-2xl text-xs text-neutral-600 space-y-2.5 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>On-time payments:</span>
                      <span className="text-emerald-600 font-mono font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Credit utilization rate:</span>
                      <span className="text-emerald-600 font-mono font-bold">14% (Low)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active queries:</span>
                      <span className="text-neutral-800 font-mono font-bold">0 (Low risk)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateCibil}
                    disabled={cibilUpdating}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow"
                  >
                    {cibilUpdating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Querying bureau gateways...</span>
                      </>
                    ) : (
                      <>
                        <span>Query fresh CIBIL score</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* CONTACT SUPPORT */}
              {activeModal === 'support' && (
                <div className="space-y-4 flex flex-col h-[520px]">
                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto space-y-3.5 p-1 border border-neutral-100 rounded-2xl bg-neutral-50/50 p-3 max-h-[330px]">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-neutral-900 text-white rounded-br-none text-right' 
                            : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none text-left'
                        }`}>
                          <p className="font-medium font-sans">{msg.text}</p>
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 mt-1 px-1">
                          {msg.time}
                        </span>
                      </div>
                    ))}
                    {botTyping && (
                      <div className="flex flex-col items-start">
                        <div className="bg-white border border-neutral-200 text-neutral-500 rounded-2xl p-3 text-xs rounded-bl-none">
                          <div className="flex gap-1 items-center py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Smart Suggestions */}
                  <div className="space-y-1.5">
                    <p className="text-[9.5px] font-sans text-neutral-400 uppercase tracking-widest font-extrabold text-left px-1">
                      Platform prompts:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { q: "Where is my MacBook bounty?", a: "Your entry ticket is securely written on-ledger. The draw happens this Sunday. We will notify you instantly." },
                        { q: "How do I claim reward cashback?", a: "Tapping claim now on any eligible cashback banner instantly triggers a direct routing link to your credit card." },
                        { q: "Is my bank connection secure?", a: "Absolutely. We use 100% end-to-end encrypted tunnels built under strict compliance rules. Your credentials never touch our memory servers." }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSmartQuery(item.q, item.a)}
                          disabled={botTyping}
                          className="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-600 text-[10.5px] py-1.5 px-3 rounded-full text-left font-medium transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {item.q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Input Field */}
                  <form onSubmit={handleSendCustomMessage} className="flex gap-2 pt-2 border-t border-neutral-100">
                    <input
                      type="text"
                      placeholder="Type your query here..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      disabled={botTyping}
                      className="flex-1 bg-white border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-800 focus:outline-none focus:border-neutral-800 font-sans shadow-sm disabled:opacity-50 font-semibold"
                    />
                    <button
                      type="submit"
                      disabled={!supportMessage.trim() || botTyping}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl px-3 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* REFER AND EARN */}
              {activeModal === 'refer' && (
                <div className="space-y-4">
                  {/* Referral link box */}
                  <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 text-left space-y-3">
                    <div>
                      <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Your referral link</p>
                      <p className="text-xs font-mono text-emerald-800 mt-1 font-bold">cred.club/refer/saloni_sneha</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyReferral}
                      className="w-full bg-white hover:bg-neutral-50 border border-neutral-250 text-neutral-800 font-sans font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs transition-colors"
                    >
                      {referCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Referral rewards cards list */}
                  <div className="space-y-2.5 text-left text-xs text-neutral-600">
                    <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl flex gap-3 items-start">
                      <Gift className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sans font-bold text-neutral-800">10,000 CRED coins bonus</p>
                        <p className="text-[10.5px] text-neutral-500 font-medium mt-0.5 leading-relaxed">
                          Credited directly to your member ledger as soon as your referee links their first card.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl flex gap-3 items-start">
                      <Shield className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sans font-bold text-neutral-800">MacBook bounty draw entries</p>
                        <p className="text-[10.5px] text-neutral-500 font-medium mt-0.5 leading-relaxed">
                          Secure 5 active entry tokens automatically for our elite Sunday setups draw.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Send Direct invite */}
                  <form onSubmit={handleSendInvite} className="space-y-2 pt-2 border-t border-neutral-100 text-left">
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest">
                      Invite direct keys:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter friend's email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1 bg-white border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-800 focus:outline-none focus:border-neutral-800 font-sans shadow-sm"
                      />
                      <button
                        type="submit"
                        className="bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer shadow-md shrink-0"
                      >
                        Send invite
                      </button>
                    </div>
                    {inviteSent && (
                      <p className="text-[10.5px] text-emerald-600 font-bold mt-1 animate-fadeIn">
                        Success! Invitation clearance keys dispatched.
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
