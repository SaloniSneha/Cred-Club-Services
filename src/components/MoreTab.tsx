import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Landmark, 
  Gauge, 
  MessageSquare, 
  Gift, 
  ChevronRight, 
  X, 
  Clock, 
  RefreshCw, 
  Shield, 
  Copy, 
  Check, 
  Send, 
  Coins, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MoreTab: React.FC = () => {
  const { coins, cards, vouchers, rewards, addCoins, notifications } = useApp();
  
  // Interactive Modal States
  const [activeModal, setActiveModal] = useState<'history' | 'balance' | 'cibil' | 'support' | 'refer' | null>(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Carousel slide definitions
  const slides = [
    {
      id: 'indianoil',
      title: 'get 100% cashback on your utility bill',
      subtitle: 'IndianOil Axis credit card',
      badge: 'Fuel & Utility',
      type: 'indianoil',
    },
    {
      id: 'indusind',
      title: 'up to 5% unlimited cashback on UPI transactions',
      subtitle: 'CRED IndusInd Bank RuPay card',
      badge: 'UPI Premium',
      type: 'indusind',
    },
    {
      id: 'select',
      title: 'complimentary airport lounge access worldwide',
      subtitle: 'Axis Bank Select credit card',
      badge: 'Elite Lounge',
      type: 'select',
    },
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      setCibilScore(821); // simulate an increase or refresh
      addCoins(2500); // award some coins!
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

    // Append user message
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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-full bg-white pb-24 text-left font-sans">
      
      {/* 1. CAROUSEL AREA */}
      <div className="w-full px-4 pt-5 pb-4">
        {/* White Border Frame Container matching the screenshot */}
        <div className="bg-white border border-neutral-100 rounded-[32px] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* Slide Card Illustration */}
              <div className="relative w-full aspect-[16/10] bg-[#E0E2EC] rounded-[28px] overflow-hidden flex flex-col items-center justify-center">
                {/* IndianOil Axis Card Type Design */}
                {currentSlideData.type === 'indianoil' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C0E38] via-[#5C0324] to-[#2E0111] flex items-center justify-center p-4">
                    {/* Abstract layered beautiful waves in backdrop */}
                    <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-[#A21245]/20 blur-xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#B8174F]/15 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-[-40px] left-[-10px] w-80 h-32 bg-[#8F0C3B]/50 rounded-full transform -rotate-12 pointer-events-none" />
                    <div className="absolute bottom-[-60px] right-[-30px] w-96 h-40 bg-[#5C0322]/80 rounded-full transform rotate-6 shadow-2xl pointer-events-none" />
                    
                    {/* The Credit Card Graphic */}
                    <div className="w-[190px] h-[120px] bg-gradient-to-tr from-[#131313] via-[#2D1620] to-[#14080D] border border-neutral-800/40 rounded-xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative overflow-hidden transform rotate-[-4deg] flex flex-col justify-between">
                      {/* Wireless waves & metadata */}
                      <div className="flex justify-between items-start">
                        {/* vertical Credit Card label */}
                        <div className="text-[4px] tracking-[0.25em] text-neutral-400 font-mono uppercase transform rotate-[-90deg] origin-top-left translate-x-0.5 translate-y-3.5">
                          Credit Card
                        </div>
                        <div className="w-5 h-4 text-white/40 flex items-center justify-center">
                          {/* signal icon */}
                          <svg className="w-3.5 h-3.5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3c-1.2 0-2.4.2-3.6.7-.4.2-.6.6-.4 1 .2.4.6.6 1 .4 2.1-.8 4.3-.8 6.4 0 .4.2.8 0 1-.4.2-.4 0-.8-.4-1C14.4 3.2 13.2 3 12 3zm0 4c-.8 0-1.6.1-2.4.4-.4.2-.6.6-.4 1s.6.6 1 .4c1.1-.4 2.3-.4 3.4 0 .4.2.8 0 1-.4.2-.4 0-.8-.4-1C13.6 7.1 12.8 7 12 7zm0 4c-.4 0-.8.1-1.2.2-.4.2-.6.6-.4 1s.6.6 1 .4c.4-.1.8-.1 1.2 0 .4.2.8 0 1-.4.2-.4 0-.8-.4-1-.4-.1-.8-.2-1.2-.2zm0 4c-.2 0-.4.1-.6.2-.4.3-.4.8-.1 1.1l.7.7c.3.3.8.3 1.1-.1s.3-.8-.1-1.1l-.7-.7c-.1-.1-.3-.1-.3-.1z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Chip */}
                      <div className="w-5.5 h-4.5 bg-gradient-to-br from-[#F5D782] via-[#C5A358] to-[#F5D782] rounded-xs border border-[#8C6D39]/30 p-0.5 flex flex-col justify-between ml-3 -mt-2">
                        <div className="h-full w-full border border-black/10 rounded-2xs opacity-40" />
                      </div>

                      {/* Speedometer Gauge in Center Right */}
                      <div className="absolute right-2 top-3 w-18 h-18 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Gauge arc base */}
                          <path d="M 20 80 A 35 35 0 1 1 80 80" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.15" />
                          {/* Glowing colored overlay arc */}
                          <path d="M 20 80 A 35 35 0 1 1 72 37" fill="none" stroke="#EC4899" strokeWidth="5.5" strokeLinecap="round" />
                          {/* Center hub */}
                          <circle cx="50" cy="55" r="5" fill="#FFFFFF" />
                          {/* Speedometer pointer needle */}
                          <line x1="50" y1="55" x2="72" y2="38" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                          {/* Marks */}
                          <text x="14" y="90" fill="#FFFFFF" fontSize="10" fontWeight="black" opacity="0.7" fontFamily="sans-serif">E</text>
                          <text x="76" y="90" fill="#FFFFFF" fontSize="10" fontWeight="black" opacity="0.7" fontFamily="sans-serif">F</text>
                        </svg>
                      </div>

                      {/* RuPay Logo */}
                      <div className="flex justify-between items-end">
                        <span className="text-[5px] text-neutral-500 font-mono tracking-widest uppercase">Axis Bank</span>
                        <div className="text-[10px] font-sans font-black tracking-tighter text-white italic flex items-center gap-0.5">
                          RuPay<span className="text-[6px] align-super text-[#E0E2EC]">▶</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* IndusInd Card Type Design */}
                {currentSlideData.type === 'indusind' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#121625] via-[#0D101A] to-[#040508] flex items-center justify-center p-4">
                    {/* Abstract layered curves */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
                    
                    {/* The Credit Card Graphic */}
                    <div className="w-[190px] h-[120px] bg-gradient-to-br from-[#1C2030] to-[#0E1018] border border-sky-500/20 rounded-xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative overflow-hidden transform rotate-[3deg] flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[6px] font-mono tracking-widest text-sky-400/80 font-bold uppercase">CRED IndusInd</span>
                        <span className="text-[5px] text-neutral-500 font-mono">RuPay Select</span>
                      </div>
                      
                      {/* metallic lines */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent mt-1" />

                      <div className="w-5.5 h-4.5 bg-gradient-to-br from-[#E2D2A5] via-[#B89B5F] to-[#E2D2A5] rounded-xs border border-amber-600/20" />

                      <div className="flex justify-between items-end">
                        <span className="text-[5px] font-mono text-neutral-400">•••• •••• •••• 9281</span>
                        <span className="text-[9px] font-sans font-black text-white italic">RuPay</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Axis Select Card Type Design */}
                {currentSlideData.type === 'select' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#242424] via-[#121212] to-[#000000] flex items-center justify-center p-4">
                    {/* Abstract curves */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.03),transparent)]" />
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-neutral-600/20 blur-2xl pointer-events-none" />
                    
                    {/* The Credit Card Graphic */}
                    <div className="w-[190px] h-[120px] bg-gradient-to-tr from-[#2A2A2A] via-[#141414] to-[#0D0D0D] border border-neutral-700/30 rounded-xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.7)] relative overflow-hidden transform rotate-[-2deg] flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[6px] font-mono tracking-widest text-neutral-300 font-bold uppercase">SELECT</span>
                        <span className="text-[5px] text-rose-500 font-mono uppercase font-black">AXIS BANK</span>
                      </div>
                      
                      <div className="w-5.5 h-4.5 bg-gradient-to-br from-[#E0E0E0] via-[#9E9E9E] to-[#E0E0E0] rounded-xs opacity-80" />

                      <div className="flex justify-between items-end">
                        <span className="text-[5px] font-mono text-neutral-400">SALONI SNEHA</span>
                        <span className="text-[9px] font-sans font-bold text-white tracking-tighter italic">VISA</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. TEXT DESCRIPTION & APPLY BUTTON BELOW CAROUSEL */}
        <div className="mt-5 text-center px-4 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5"
            >
              <h2 className="text-[17px] font-sans font-extrabold text-neutral-900 tracking-tight leading-snug">
                {currentSlideData.title}
              </h2>
              <p className="text-xs text-neutral-500 font-medium tracking-normal">
                {currentSlideData.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Black Apply Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                alert(`Pre-approved clearance loaded for ${currentSlideData.subtitle}! Redirecting securely...`);
              }}
              className="bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              Apply now
            </motion.button>
          </div>

          {/* Slide Indicator Dots (exactly 6 dots like in the screenshot) */}
          <div className="flex items-center justify-center gap-1.5 pt-1.5">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              // Highlight based on currentSlide index (which has 3 slides, mapped repeating or first 3)
              const isActive = (currentSlide % 3) === (index % 3);
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index % 3)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-4 bg-neutral-400' : 'w-1.5 bg-neutral-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. QUICK ACCESS HEADER */}
      <div className="mt-6 mb-2">
        <h3 className="text-[11px] font-sans text-[#9E9E9E] uppercase tracking-[0.16em] font-extrabold px-6">
          Quick access
        </h3>
      </div>

      {/* 4. QUICK ACCESS LIST */}
      <div className="bg-white">
        {/* Row 1: payment history */}
        <div 
          onClick={() => setActiveModal('history')}
          className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <FileText className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
            <span className="text-[13px] font-sans font-bold text-neutral-800 tracking-wide">
              payment history
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
        </div>

        <div className="border-b border-dashed border-neutral-150 mx-6" />

        {/* Row 2: bank balance */}
        <div 
          onClick={() => setActiveModal('balance')}
          className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Landmark className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
            <span className="text-[13px] font-sans font-bold text-neutral-800 tracking-wide">
              bank balance
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
        </div>

        <div className="border-b border-dashed border-neutral-150 mx-6" />

        {/* Row 3: CIBIL score */}
        <div 
          onClick={() => setActiveModal('cibil')}
          className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Gauge className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
            <span className="text-[13px] font-sans font-bold text-neutral-800 tracking-wide">
              CIBIL score
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
        </div>

        <div className="border-b border-dashed border-neutral-150 mx-6" />

        {/* Row 4: contact support */}
        <div 
          onClick={() => setActiveModal('support')}
          className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
            <span className="text-[13px] font-sans font-bold text-neutral-800 tracking-wide">
              contact support
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
        </div>

        <div className="border-b border-dashed border-neutral-150 mx-6" />

        {/* Row 5: refer and earn */}
        <div 
          onClick={() => setActiveModal('refer')}
          className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Gift className="w-5 h-5 text-neutral-800 shrink-0 stroke-[1.8]" />
            <span className="text-[13px] font-sans font-bold text-neutral-800 tracking-wide">
              refer and earn
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
        </div>
      </div>

      {/* INTERACTIVE MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl border border-neutral-100"
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
                                <RefreshCw className="w-3 h-3 animate-spin" />
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
                      className="flex-1 bg-white border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-800 focus:outline-none focus:border-neutral-800 font-sans shadow-sm disabled:opacity-50"
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
                          <span className="text-emerald-700">Copied!</span>
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
