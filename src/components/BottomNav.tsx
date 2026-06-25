import React from 'react';
import { useApp } from '../context/AppContext';
import { Tab } from '../types';
import { Home, CreditCard, Crown, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItem {
  tab: Tab;
  label: string;
  icon?: React.ComponentType<any>;
  color: string; // Dynamic highlight color for active state glow
}

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: NavItem[] = [
    { tab: 'home', label: 'Home', icon: Home, color: 'text-amber-500' },
    { tab: 'cards', label: 'Cards', icon: CreditCard, color: 'text-purple-600' },
    { tab: 'pay', label: 'UPI', color: 'text-emerald-500' }, // custom-drawn central button
    { tab: 'rewards', label: 'Rewards', icon: Crown, color: 'text-rose-500' },
    { tab: 'more', label: 'More', icon: LayoutGrid, color: 'text-sky-500' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-100 px-1 py-3 flex items-center justify-around pb-safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
      <div className="w-full flex items-center justify-between px-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          const Icon = item.icon;

          // Special Custom Layout for UPI Center Button
          if (item.tab === 'pay') {
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab('pay')}
                className="flex flex-col items-center justify-center -mt-6 relative cursor-pointer select-none shrink-0"
                id="nav-tab-pay"
              >
                {/* Beautiful glowing background ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-[#1E5C41] opacity-70 blur-[8px] animate-pulse" />
                
                {/* The deep black core circular button */}
                <div className="relative w-14 h-14 rounded-full bg-neutral-900 border-2 border-neutral-800 flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                  <span className="text-[11px] font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-[#A7E2C4] via-emerald-200 to-teal-100 tracking-tighter italic">
                    UPI
                  </span>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-0.5 animate-bounce" />
                </div>
                
                {/* Label below */}
                <span className={`text-[9px] mt-2 font-sans tracking-widest uppercase font-extrabold text-center ${
                  isActive ? 'text-neutral-900' : 'text-neutral-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className="flex flex-col items-center justify-center py-1 flex-1 relative cursor-pointer select-none group"
              id={`nav-tab-${item.tab}`}
            >
              {/* Icon with glowing effect on active */}
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="glowCircle"
                    className="absolute -inset-2 rounded-full bg-neutral-100 blur-md"
                  />
                )}
                
                {Icon && (
                  <Icon
                    className={`w-5 h-5 stroke-[1.8] transition-all duration-300 relative z-10 ${
                      isActive 
                        ? 'text-neutral-900 scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]' 
                        : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                  />
                )}
              </div>
              
              {/* Capitalized labels */}
              <span
                className={`text-[8.5px] mt-2.5 font-sans tracking-widest text-center transition-all duration-300 font-extrabold ${
                  isActive 
                    ? 'text-neutral-900' 
                    : 'text-neutral-400 group-hover:text-neutral-500'
                }`}
              >
                {item.label}
              </span>

              {/* Minimal Active Bar Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-1.5 w-6 h-0.5 bg-neutral-900 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
