import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Coins, Gem, Ticket, X, Calendar, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { coins, gems, vouchers, notifications, addCoins } = useApp();
  const [showHistory, setShowHistory] = useState(false);
  const [dailyClaimed, setDailyClaimed] = useState(false);

  const handleDailyCheckIn = () => {
    if (dailyClaimed) return;
    addCoins(1000);
    setDailyClaimed(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 px-4 py-3.5 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        {/* Left: User Profile Icon with Real portrait */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(true)}
            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] focus:outline-none flex items-center justify-center relative bg-neutral-100"
            id="user-profile-button"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Saloni Sneha"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.button>
          
          <div className="hidden sm:block text-left">
            <p className="text-[10px] text-neutral-400 font-sans font-bold tracking-widest uppercase">Welcome back</p>
            <p className="text-xs text-neutral-800 font-sans font-bold tracking-wide">Saloni Sneha</p>
          </div>
        </div>

        {/* Center: "members exclusive" Pill Badge */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDailyCheckIn}
          className="bg-[#EAF9F1] border border-[#A7E2C4]/70 text-[#1E5C41] rounded-full px-4 py-1.5 flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider cursor-pointer shadow-[0_2px_8px_rgba(30,92,65,0.04)]"
          title={dailyClaimed ? "Members exclusive club active" : "Click to claim daily member bonus!"}
        >
          <Ticket className="w-3.5 h-3.5 text-[#1E5C41]" />
          <span>Members exclusive</span>
          {!dailyClaimed && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          )}
        </motion.button>

        {/* Right: Notification bell trigger with red badge */}
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(true)}
            className="w-10 h-10 rounded-full border border-neutral-100 bg-white shadow-sm flex items-center justify-center text-neutral-700 hover:text-black transition-colors relative"
            id="notification-history-trigger"
          >
            <Bell className="w-5 h-5 text-neutral-800" />
            <span className="absolute -top-1 -right-1 bg-[#EE5353] text-white text-[9px] font-mono font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              9
            </span>
          </motion.button>
        </div>
      </header>

      {/* Sub-Header Bar: Sleek Balance Tracker */}
      <div className="bg-white/85 backdrop-blur-sm border-b border-neutral-100/60 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-neutral-500 relative z-30">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-amber-600 transition-colors" onClick={handleDailyCheckIn}>
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span>CRED coins: <strong className="text-neutral-800 font-bold">{coins.toLocaleString()}</strong></span>
        </div>
        <div className="h-3 w-px bg-neutral-200" />
        <div className="flex items-center gap-1.5">
          <Gem className="w-3.5 h-3.5 text-sky-500" />
          <span>Gems: <strong className="text-neutral-800 font-bold">{gems}</strong></span>
        </div>
        <div className="h-3 w-px bg-neutral-200" />
        <div className="flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5 text-emerald-500" />
          <span>Vouchers: <strong className="text-neutral-800 font-bold">{vouchers}</strong></span>
        </div>
      </div>

      {/* Slide-over Drawer for Transactions and Notifications */}
      <AnimatePresence>
        {showHistory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/60 z-50 cursor-pointer"
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#FAFAFA] border-l border-neutral-200 shadow-2xl z-50 flex flex-col overflow-hidden text-[#0A0A0A]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-neutral-200 bg-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-sans font-extrabold text-neutral-800 flex items-center gap-2">
                    <span>CRED ledger</span>
                    <span className="text-[10px] bg-[#EAF9F1] text-[#1E5C41] px-2.5 py-0.5 rounded-full border border-[#A7E2C4] font-bold uppercase tracking-wider">Active</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 font-sans">Real-time ledger of your premium rewards and payments</p>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free daily claim banner */}
              {!dailyClaimed && (
                <div className="mx-5 mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-200 rounded-2xl flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Zap className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-neutral-800">Daily member bonus</p>
                      <p className="text-[11px] text-neutral-500">Claim 1,000 free coins instantly</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDailyCheckIn}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-sans font-bold py-1.5 px-3.5 rounded-xl shadow-md"
                  >
                    Claim
                  </motion.button>
                </div>
              )}

              {/* Ledger Feed */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 tracking-widest uppercase mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Activity log</span>
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-neutral-400 text-xs font-sans">No recent transactions recorded.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="bg-white border border-neutral-100 p-4 rounded-2xl flex items-start justify-between gap-4 hover:border-neutral-200 shadow-sm transition-all"
                    >
                      <div className="flex gap-3 text-left">
                        <div className="mt-0.5">
                          {notif.type === 'coin_bonus' && (
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                              <Coins className="w-4 h-4" />
                            </div>
                          )}
                          {notif.type === 'reward' && (
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center">
                              <Ticket className="w-4 h-4" />
                            </div>
                          )}
                          {notif.type === 'payment' && (
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-[#1E5C41] flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          {notif.type === 'order' && (
                            <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-600 flex items-center justify-center">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-neutral-800">{notif.title}</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{notif.description}</p>
                          <span className="text-[9px] text-neutral-400 font-mono mt-2 block">{notif.timestamp}</span>
                        </div>
                      </div>

                      {notif.amountText && (
                        <div className="text-right shrink-0">
                          <span
                            className={`font-mono font-bold text-xs ${
                              notif.amountText.startsWith('+') ? 'text-amber-600' : 'text-emerald-600'
                            }`}
                          >
                            {notif.amountText}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-neutral-200 bg-white flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>Account status: Platinum</span>
                <span>ID: CR-8291A</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
