import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard } from '../types';
import { Plus, Check, ShieldCheck, AlertCircle, Sparkles, CreditCard as CardIcon, X, Wallet, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CardsTab: React.FC = () => {
  const { cards, payCardBill, addCreditCard, coins } = useApp();
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  
  // Pay bill form states
  const [payAmount, setPayAmount] = useState<string>('');
  const [payProcessing, setPayProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // New card form states
  const [bankName, setBankName] = useState('');
  const [cardholder, setCardholder] = useState('SALONI SNEHA');
  const [cardNumber, setCardNumber] = useState('');
  const [cardTheme, setCardTheme] = useState<'classic' | 'neon-purple' | 'emerald' | 'gold-platinum'>('classic');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'rupay'>('visa');

  const handleOpenPay = (card: CreditCard) => {
    setSelectedCard(card);
    setPayAmount(card.balanceDue.toString());
    setPaySuccess(false);
    setPayProcessing(false);
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) return;

    const amt = parseFloat(payAmount);
    if (isNaN(amt) || amt <= 0 || amt > selectedCard.balanceDue) return;

    setPayProcessing(true);
    setTimeout(() => {
      payCardBill(selectedCard.id, amt);
      setPayProcessing(false);
      setPaySuccess(true);
    }, 2000);
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !cardNumber) return;

    // Mask card number like "•••• •••• •••• 1234"
    const last4 = cardNumber.slice(-4);
    const maskedNumber = `•••• •••• •••• ${last4 || '1122'}`;

    addCreditCard({
      bank: bankName.toUpperCase(),
      type: cardType,
      number: maskedNumber,
      cardholder: cardholder.toUpperCase(),
      colorTheme: cardTheme,
      balanceDue: Math.floor(Math.random() * 25000) + 3000,
      dueDate: 'In 18 Days',
    });

    // Reset forms
    setBankName('');
    setCardNumber('');
    setShowAddCard(false);
  };

  // Maps theme keys to Tailwind CSS class configurations
  const getThemeClasses = (theme: CreditCard['colorTheme']) => {
    switch (theme) {
      case 'neon-purple':
        return 'bg-gradient-to-br from-[#1d0e3a] via-[#0f071f] to-[#0A0614] border border-purple-500/30 text-purple-200 shadow-[0_12px_28px_rgba(147,51,234,0.12)]';
      case 'emerald':
        return 'bg-gradient-to-br from-[#0c261e] via-[#05130f] to-[#030A07] border border-emerald-500/30 text-emerald-200 shadow-[0_12px_28px_rgba(16,185,129,0.12)]';
      case 'gold-platinum':
        return 'bg-gradient-to-br from-[#292212] via-[#120f08] to-[#0A0804] border border-amber-500/30 text-amber-100 shadow-[0_12px_28px_rgba(245,158,11,0.12)]';
      case 'classic':
      default:
        return 'bg-gradient-to-br from-[#1F242E] via-[#11141B] to-black border border-slate-800 text-slate-200 shadow-[0_12px_28px_rgba(0,0,0,0.15)]';
    }
  };

  const totalOutstanding = cards.reduce((sum, c) => (c.paidStatus !== 'paid' ? sum + c.balanceDue : sum), 0);

  return (
    <div className="space-y-6 pb-28 text-left px-4 pt-6 bg-[#F5F6F8]">
      {/* Header Statement */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-extrabold text-neutral-900 tracking-tight">Your credit card club</h1>
          <p className="text-xs text-neutral-500 mt-1 font-mono uppercase tracking-wider font-bold">
            Total outstanding: <span className="text-neutral-800 font-extrabold">₹{totalOutstanding.toLocaleString()}</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddCard(true)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-sans font-bold py-2 px-3.5 rounded-xl flex items-center gap-1 cursor-pointer shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add card</span>
        </motion.button>
      </div>

      {/* Cards Scroll Feed */}
      <div className="space-y-4">
        {cards.map((card) => {
          const isPaid = card.paidStatus === 'paid';
          return (
            <motion.div
              layout
              key={card.id}
              className={`rounded-3xl p-6 relative overflow-hidden transition-all ${getThemeClasses(card.colorTheme)}`}
              whileHover={{ y: -3 }}
            >
              {/* Card Hologram Streak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
              
              {/* Bank Title & Network Brand */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
                    {card.bank}
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-wide">
                    {card.type.toUpperCase()} PREFERRED MEMBER
                  </span>
                </div>
                <div className="w-8 h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-white font-space">
                  {card.type === 'visa' && 'V'}
                  {card.type === 'mastercard' && 'MC'}
                  {card.type === 'rupay' && 'R'}
                </div>
              </div>

              {/* Card Chip & Metallic Hologram */}
              <div className="flex justify-between items-end mb-8">
                {/* Chip */}
                <div className="w-8 h-6 bg-gradient-to-tr from-amber-500/20 to-amber-200/20 border border-amber-500/40 rounded flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-0.5 bg-amber-500/20 absolute top-2" />
                  <div className="w-full h-0.5 bg-amber-500/20 absolute bottom-2" />
                  <div className="w-0.5 h-full bg-amber-500/20 absolute left-3" />
                </div>
                {/* Masked Card Number */}
                <p className="text-base sm:text-lg font-mono font-medium tracking-widest text-white">
                  {card.number}
                </p>
              </div>

              {/* Cardholder & Payment Status */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest">Cardholder</p>
                  <p className="text-xs font-space font-medium text-white mt-0.5">{card.cardholder}</p>
                </div>

                <div className="text-right">
                  {isPaid ? (
                    <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> Paid
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="text-right">
                        <p className="text-[9px] text-neutral-400 font-mono uppercase">due in {card.dueDate}</p>
                        <p className="text-sm font-mono font-bold text-white mt-0.5">₹{card.balanceDue.toLocaleString()}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOpenPay(card)}
                        className="bg-white text-black font-sans font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer shadow-sm"
                      >
                        Pay now
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Security Banner */}
      <div className="bg-white border border-neutral-150 p-4 rounded-3xl flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1E5C41] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-sans font-bold text-neutral-800 uppercase tracking-wider">CRED protect active</h4>
          <p className="text-[11px] text-neutral-500 mt-0.5 font-medium leading-normal">Automated statement checking via standard secure mail parsing. Safe and verified.</p>
        </div>
      </div>

      {/* Link Card Modal Drawer */}
      <AnimatePresence>
        {showAddCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCard(false)}
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
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase">Link your credit card</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium leading-normal">Get 5,000 CRED coins bonus instantly. Secure verification by RBI guidelines.</p>
                </div>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Bank name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AXIS Bank, ICICI, HDFC"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-neutral-800 font-sans text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Card number</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      placeholder="16-digit card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-neutral-800 font-mono text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Cardholder</label>
                    <input
                      type="text"
                      required
                      value={cardholder}
                      onChange={(e) => setCardholder(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-neutral-800 font-sans text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Card Type Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {(['visa', 'mastercard', 'rupay'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCardType(type)}
                      className={`p-2.5 rounded-xl text-xs font-mono border text-center transition-colors font-bold cursor-pointer ${
                        cardType === type ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-50 text-neutral-400 border-neutral-200'
                      }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Aesthetic card theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: 'classic', label: 'Classic' },
                      { key: 'neon-purple', label: 'Purple' },
                      { key: 'emerald', label: 'Emerald' },
                      { key: 'gold-platinum', label: 'Gold' },
                    ].map((th) => (
                      <button
                        key={th.key}
                        type="button"
                        onClick={() => setCardTheme(th.key as any)}
                        className={`p-2.5 rounded-xl text-xs font-sans border text-center transition-all font-bold cursor-pointer ${
                          cardTheme === th.key
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-400 border-neutral-200'
                        }`}
                      >
                        {th.label}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Verify and link card</span>
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bill Checkout Modal Drawer */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
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
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase">Pay credit card statement</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Paying: <span className="text-emerald-700 font-bold">{selectedCard.bank}</span></p>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

               {!paySuccess ? (
                <form onSubmit={handlePayBill} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Statement amount</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-neutral-400 font-sans font-bold">₹</span>
                      <input
                        type="number"
                        required
                        max={selectedCard.balanceDue}
                        min={1}
                        placeholder="Amount to pay"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 pl-8 pr-4 py-3 rounded-xl text-neutral-800 font-mono text-sm focus:outline-none focus:border-emerald-500 font-bold"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1.5 block font-medium leading-snug">
                      Max due: ₹{selectedCard.balanceDue.toLocaleString()} (1:1 coin rewards on checkout!)
                    </span>
                  </div>

                  {/* Payment Channel Options */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest mb-1 font-bold">Preferred checkout mode</p>
                    
                    <div className="bg-[#FAFAFA] border border-neutral-150 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:border-neutral-200 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-sans font-bold text-neutral-800">CRED unified UPI gateway</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">Verified instant clearing from bank account</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-300" />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={payProcessing}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow"
                  >
                    {payProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing instant clearance...</span>
                      </>
                    ) : (
                      <span>Proceed with UPI payment</span>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-bold text-neutral-800">Payment receipt confirmed</h4>
                    <p className="text-xs text-neutral-500 mt-1 font-medium">₹{parseFloat(payAmount).toLocaleString()} has been cleared directly with {selectedCard.bank}.</p>
                    <p className="text-xs text-emerald-600 font-mono font-bold mt-3">+{Math.floor(parseFloat(payAmount)).toLocaleString()} CRED coins earned instantly!</p>
                  </div>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-2.5 rounded-xl cursor-pointer shadow"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
