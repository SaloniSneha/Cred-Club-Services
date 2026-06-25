import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reward } from '../types';
import { Sparkles, Trophy, Gift, ArrowRight, Zap, Coins, Ticket, HelpCircle, Check, Play, Lock, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RewardsTab: React.FC = () => {
  const { coins, rewards, claimReward } = useApp();
  const [activeScratchReward, setActiveScratchReward] = useState<Reward | null>(null);
  
  // Scratch Game State
  const [scratchDone, setScratchDone] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [scratchProgress, setScratchProgress] = useState(0); // 0 to 100
  const [claimError, setClaimError] = useState<string | null>(null);

  const handleClaimInitiate = (reward: Reward) => {
    if (reward.claimed) return;
    if (coins < reward.costCoins) {
      setClaimError(`You need at least ${reward.costCoins.toLocaleString()} CRED coins to enter. Current: ${coins.toLocaleString()}`);
      setTimeout(() => setClaimError(null), 4000);
      return;
    }

    // Process deduction
    const res = claimReward(reward.id);
    if (res.success) {
      setWinAmount(res.rewardAmount || null);
      setActiveScratchReward(reward);
      setScratchDone(false);
      setScratchProgress(0);
    }
  };

  const handleSimulateScratch = () => {
    // Increment scratch reveal percentage
    setScratchProgress(100);
    setScratchDone(true);
  };

  return (
    <div className="space-y-6 pb-28 text-left px-4 pt-6 bg-[#F5F6F8]">
      {/* Header and Date Badge */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif font-extrabold text-neutral-900 tracking-tight leading-tight">
            Win rewards<br />everyday
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 font-mono uppercase tracking-wider font-bold">
            Premium luxury curations & absolute cashback
          </p>
        </div>
        <span className="bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-sans px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
          10 Apr
        </span>
      </div>

      {/* Error alert toast */}
      <AnimatePresence>
        {claimError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-amber-800 text-xs flex items-center gap-2.5 shadow-sm font-semibold"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{claimError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Promotional Cards Feed */}
      <div className="space-y-6">
        {rewards.map((reward) => {
          const isAmazon = reward.id === 'reward-amazon';
          const isMacbook = reward.id === 'reward-macbook';

          return (
            <motion.div
              key={reward.id}
              className={`rounded-3xl relative overflow-hidden flex flex-col bg-gradient-to-b ${reward.bgGradient} border border-neutral-900/10 p-5 shadow-[0_10px_25px_rgba(0,0,0,0.12)] text-left`}
              whileHover={{ y: -3 }}
            >
              {/* Badge */}
              {reward.badge && (
                <div className="self-start mb-4">
                  <span className="bg-white/10 text-white/90 border border-white/20 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                    {reward.badge}
                  </span>
                </div>
              )}

              {/* Graphic/Illustration layout */}
              <div className="flex-1 flex justify-between gap-4 mb-6">
                <div className="space-y-2 text-left">
                  <p className="text-[10px] font-mono tracking-widest text-white/75 uppercase font-bold">
                    {reward.partner.toUpperCase()}
                  </p>
                  <h2 className="text-xl font-sans font-extrabold text-white tracking-tight leading-none uppercase">
                    {reward.title}
                  </h2>
                  <h3 className="text-2xl font-serif font-bold text-amber-400 tracking-tight mt-1">
                    {reward.subtitle}
                  </h3>
                </div>

                {/* Simulated Custom Premium Artwork based on Reward type */}
                <div className="w-24 h-24 rounded-2xl bg-black/40 border border-white/10 p-2 flex items-center justify-center relative overflow-hidden self-center select-none shrink-0">
                  {isAmazon && (
                    <div className="relative w-full h-full flex flex-col justify-between p-1.5">
                      <div className="text-white text-[9px] font-mono font-bold tracking-wider">AMAZON</div>
                      {/* Floating card graphics */}
                      <div className="absolute right-2 bottom-2 w-14 h-9 bg-neutral-900 border border-orange-500/20 rounded shadow-md rotate-12 flex items-center justify-center p-1">
                        <span className="text-[7px] font-mono text-amber-500 uppercase font-bold">pay gift</span>
                      </div>
                      <div className="absolute right-1 bottom-4 w-14 h-9 bg-neutral-950 border border-amber-500/30 rounded shadow-lg -rotate-6 flex items-center justify-center p-1">
                        <span className="text-[7px] font-mono text-white uppercase font-bold">amazon</span>
                      </div>
                    </div>
                  )}

                  {isMacbook && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center space-y-1">
                      <span className="text-3xl">💻</span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">setup bounty</span>
                    </div>
                  )}

                  {!isAmazon && !isMacbook && (
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-rose-400 mx-auto" />
                      <span className="text-[8px] font-mono text-rose-400 uppercase tracking-widest block mt-1.5">cashback</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom burn mechanics and Claim button */}
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-white/95 font-bold">
                    {reward.costCoins.toLocaleString()} coins entry
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: reward.claimed ? 1 : 1.02 }}
                  whileTap={{ scale: reward.claimed ? 1 : 0.98 }}
                  onClick={() => handleClaimInitiate(reward)}
                  disabled={reward.claimed}
                  className={`w-full sm:w-auto font-sans font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    reward.claimed
                      ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-default'
                      : 'bg-white hover:bg-neutral-100 text-black shadow-lg shadow-white/5'
                  }`}
                  id={`claim-reward-btn-${reward.id}`}
                >
                  {reward.claimed ? (
                    <>
                      <Check className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                      <span>Already entered</span>
                    </>
                  ) : (
                    <>
                      <span>Claim now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rewards Description Rule card */}
      <div className="bg-white border border-neutral-150 rounded-3xl p-5 text-xs text-neutral-500 space-y-2 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
        <h4 className="font-sans font-extrabold text-neutral-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Trophy className="w-3.5 h-3.5 text-purple-600" />
          <span>How credits work</span>
        </h4>
        <p className="leading-relaxed font-medium">
          Members earn 1 CRED coin for every rupee paid on statements or verified utility services. Coins are burned to enter premium bounty setups, claim luxury curation codes, or unlock scratch gift cards. Entries are secured on-ledger instantly.
        </p>
      </div>

      {/* Scratch Reveal Overlay Portal */}
      <AnimatePresence>
        {activeScratchReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            />

            {/* Interactive Scratch Card Board */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="bg-white border border-neutral-200 w-full max-w-sm rounded-3xl p-6 relative z-10 text-center overflow-hidden shadow-2xl text-[#0A0A0A]"
            >
              {/* Confetti Glow decoration */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-widest text-purple-600 uppercase font-bold">CRED interactive playground</p>
                <h3 className="text-lg font-sans font-extrabold text-neutral-800 mt-1 uppercase">Scratch & win member reward</h3>
                <p className="text-xs text-neutral-400 mt-0.5 font-semibold">Burn completed: {activeScratchReward.costCoins.toLocaleString()} coins</p>
              </div>

              {/* Scratch Box container */}
              <div className="w-64 h-64 mx-auto rounded-3xl border-2 border-neutral-200 bg-neutral-50 relative flex flex-col items-center justify-center select-none overflow-hidden group shadow-inner">
                {/* Visual underlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-200 shadow-sm">
                    <Trophy className="w-8 h-8 animate-bounce" />
                  </div>
                  
                  {winAmount ? (
                    <>
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Cash reward won</p>
                      <h4 className="text-3xl font-serif font-black text-amber-600 mt-1">₹{winAmount}</h4>
                      <p className="text-[10px] text-neutral-500 mt-1.5 leading-relaxed font-semibold">Voucher has been dispatched to your verified email ledger.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Entry confirmed</p>
                      <h4 className="text-xl font-sans font-extrabold text-neutral-800 mt-1 uppercase">Bounty ticket secured</h4>
                      <p className="text-[10px] text-emerald-600 mt-1.5 leading-relaxed font-bold">+2 blue gems credited to your member account.</p>
                    </>
                  )}
                </div>

                {/* Overlay scratch coating */}
                <AnimatePresence>
                  {!scratchDone && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleSimulateScratch}
                      className="absolute inset-0 bg-gradient-to-tr from-purple-800 via-indigo-900 to-slate-900 flex flex-col items-center justify-center cursor-pointer p-4 text-center"
                    >
                      {/* Holographic lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />
                      
                      <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white mb-3">
                        <Lock className="w-5 h-5 animate-pulse" />
                      </div>
                      <p className="text-sm font-sans font-bold text-white tracking-tight">Tap here to scratch coating</p>
                      <p className="text-[10px] text-white/70 mt-1 uppercase tracking-wider font-mono font-bold">Instant digital reveal</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer action */}
              <div className="mt-8">
                {scratchDone ? (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setActiveScratchReward(null)}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <span>Add to member ledger</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <button
                    onClick={() => handleSimulateScratch()}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3 rounded-xl border border-neutral-800 text-xs font-mono uppercase tracking-widest cursor-pointer shadow"
                  >
                    Reveal prize
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
