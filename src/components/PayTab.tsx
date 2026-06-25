import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Home, Lightbulb, Smartphone, Wifi, GraduationCap, X, Wallet, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PayTab: React.FC = () => {
  const { cards, payCardBill, addNotification, coins, setCategoryPageId } = useApp();
  const [activePaymentMode, setActivePaymentMode] = useState<string | null>(null);
  
  // Payment States
  const [landlordName, setLandlordName] = useState('');
  const [landlordUpi, setLandlordUpi] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '');
  const [payProcessing, setPayProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const handleOpenPayment = (mode: string) => {
    setActivePaymentMode(mode);
    setPaySuccess(false);
    setPayProcessing(false);
    setLandlordName('');
    setLandlordUpi('');
    setRentAmount('');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(rentAmount);
    if (isNaN(amt) || amt <= 0) return;

    setPayProcessing(true);
    setTimeout(() => {
      setPayProcessing(false);
      setPaySuccess(true);
      
      const selectedCard = cards.find(c => c.id === selectedCardId);
      const bankName = selectedCard ? selectedCard.bank : 'Linked Card';

      // Record transaction
      addNotification(
        'payment',
        `${activePaymentMode} paid successfully`,
        `Transferred ₹${amt.toLocaleString()} to ${landlordName || 'recipient'} via ${bankName}.`,
        `₹${amt.toLocaleString()}`
      );
    }, 2200);
  };

  return (
    <div className="space-y-6 pb-28 text-left px-4 pt-6 bg-[#F5F6F8]">
      {/* Editorial Header */}
      <div>
        <h1 className="text-3xl font-serif font-extrabold text-neutral-900 tracking-tight leading-tight">
          Home for all your<br />payments
        </h1>
        <p className="text-xs text-neutral-500 mt-1.5 font-mono uppercase tracking-wider font-bold">
          Safe, instant and credited with 1:1 member coins
        </p>
      </div>

      {/* Main Feature Banner */}
      <div className="bg-white border border-neutral-150 rounded-3xl p-5 relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
        {/* Abstract design elements */}
        <div className="absolute right-4 bottom-4 w-28 h-20 border border-neutral-200 rounded-xl rotate-12 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-16 h-12 bg-neutral-50 rounded border border-neutral-200 relative flex flex-col justify-between p-2">
            <div className="w-4 h-1 bg-neutral-200 rounded" />
            <div className="w-8 h-1 bg-amber-400/50 rounded" />
          </div>
        </div>

        <div className="max-w-[70%] text-left">
          <h2 className="text-base font-sans font-extrabold text-neutral-800 leading-snug">All your payments.<br />One click away.</h2>
          <p className="text-neutral-500 text-[11px] mt-1 font-medium">With instant settlement guarantees and refund protection mechanisms.</p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCategoryPageId('max')}
            className="mt-4 bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-xs py-2 px-4 rounded-xl cursor-pointer shadow"
          >
            View bills
          </motion.button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest font-extrabold">Rent and education</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Rent Payment */}
          <motion.div
            whileTap={{ scale: 0.99 }}
            onClick={() => setCategoryPageId('max')}
            className="bg-white border border-neutral-100 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-neutral-200 transition-all group shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-sans font-extrabold text-neutral-800 group-hover:text-black transition-colors">Rent payment</p>
                <p className="text-[10.5px] text-neutral-400 mt-0.5 font-medium">Pay your housing society or flat rent.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-800 transition-colors" />
          </motion.div>

          {/* Education Fees */}
          <motion.div
            whileTap={{ scale: 0.99 }}
            onClick={() => setCategoryPageId('max')}
            className="bg-white border border-neutral-100 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-neutral-200 transition-all group shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-sans font-extrabold text-neutral-800 group-hover:text-black transition-colors">Education fees</p>
                <p className="text-[10.5px] text-neutral-400 mt-0.5 font-medium">Direct transfers to institutes and school accounts.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-800 transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Bill & Utilities Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest font-extrabold">Quick utilities</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Electricity */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => setCategoryPageId('max')}
            className="bg-white border border-neutral-100 p-4 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-200 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          >
            <Lightbulb className="w-5 h-5 text-amber-500 mb-2" />
            <span className="text-[10.5px] font-sans font-bold text-neutral-700">Electricity</span>
          </motion.div>

          {/* Mobile */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => setCategoryPageId('max')}
            className="bg-white border border-neutral-100 p-4 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-200 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          >
            <Smartphone className="w-5 h-5 text-purple-600 mb-2" />
            <span className="text-[10.5px] font-sans font-bold text-neutral-700">Mobile</span>
          </motion.div>

          {/* Broadband */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => setCategoryPageId('max')}
            className="bg-white border border-neutral-100 p-4 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-200 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          >
            <Wifi className="w-5 h-5 text-emerald-600 mb-2" />
            <span className="text-[10.5px] font-sans font-bold text-neutral-700">Broadband</span>
          </motion.div>
        </div>
      </div>

      {/* Payment Processing Drawer Modal */}
      <AnimatePresence>
        {activePaymentMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePaymentMode(null)}
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
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 uppercase leading-tight">Secure transfer: {activePaymentMode}</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Get up to 100% cashback matching CRED powerplay rules.</p>
                </div>
                <button
                  onClick={() => setActivePaymentMode(null)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!paySuccess ? (
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Recipient / landlord name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={landlordName}
                        onChange={(e) => setLandlordName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-neutral-800 font-sans text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">UPI ID or account no.</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ramesh@upi"
                        value={landlordUpi}
                        onChange={(e) => setLandlordUpi(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-xl text-neutral-800 font-mono text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Transfer amount</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-neutral-400 font-sans font-bold">₹</span>
                      <input
                        type="number"
                        required
                        min={100}
                        placeholder="Amount to send"
                        value={rentAmount}
                        onChange={(e) => setRentAmount(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 pl-8 pr-4 py-3 rounded-xl text-neutral-800 font-mono text-sm focus:outline-none focus:border-emerald-500 font-bold"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1.5 block font-medium">
                      Minimum secure transfer amount: ₹100.
                    </span>
                  </div>

                  {/* Fund source selector */}
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Select funding source</label>
                    <select
                      value={selectedCardId}
                      onChange={(e) => setSelectedCardId(e.target.value)}
                      className="w-full bg-white border border-neutral-200 p-3 rounded-xl text-neutral-800 font-mono text-sm focus:outline-none focus:border-emerald-500 font-bold shadow-sm cursor-pointer"
                    >
                      {cards.map((card) => (
                        <option key={card.id} value={card.id}>
                          {card.bank} ({card.number})
                        </option>
                      ))}
                    </select>
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
                        <span>Verifying receiver nodes...</span>
                      </>
                    ) : (
                      <span>Initiate transfer via CRED gateway</span>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-bold text-neutral-800">Transfer cleared instantly</h4>
                    <p className="text-xs text-neutral-500 mt-1 font-medium">₹{parseFloat(rentAmount).toLocaleString()} sent to {landlordName}. Recipient notified.</p>
                    <p className="text-xs text-emerald-600 font-mono font-bold mt-3">Check your ledger for your cashback entry tick!</p>
                  </div>

                  <button
                    onClick={() => setActivePaymentMode(null)}
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
