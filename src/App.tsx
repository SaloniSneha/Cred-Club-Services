import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { CardsTab } from './components/CardsTab';
import { PayTab } from './components/PayTab';
import { RewardsTab } from './components/RewardsTab';
import { ShopTab } from './components/ShopTab';
import { MoreTab } from './components/MoreTab';
import { CategoryDetailsPage } from './components/CategoryDetailsPage';
import { motion, AnimatePresence } from 'motion/react';

function MainAppContent() {
  const { activeTab, categoryPageId } = useApp();

  const renderActiveTab = () => {
    if (categoryPageId) {
      return <CategoryDetailsPage />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'cards':
        return <CardsTab />;
      case 'pay':
        return <PayTab />;
      case 'rewards':
        return <RewardsTab />;
      case 'shop':
        return <ShopTab />;
      case 'more':
        return <MoreTab />;
      default:
        return <RewardsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EBECEF] text-[#0A0A0A] font-sans flex items-center justify-center antialiased selection:bg-[#EAF9F1] selection:text-[#1E5C41] relative py-2 sm:py-6">
      {/* Outer elegant background grids / lights for desktop previewers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle glowing ambient lights */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#1E5C41]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-purple-500/[0.01] rounded-full blur-[140px]" />
      </div>

      {/* Styled Phone Frame Wrapper (Simulating mobile app on desktop, naturally fluid on mobile) */}
      <div className="relative z-10 flex flex-col max-w-md mx-auto w-full bg-[#F5F6F8] border border-neutral-300 rounded-none sm:rounded-[40px] overflow-hidden min-h-screen sm:min-h-[880px] sm:h-[880px] shadow-[0_24px_70px_rgba(0,0,0,0.06),_0_2px_10px_rgba(0,0,0,0.03)]">
        {/* Sticky Top Header */}
        <Header />

        {/* Scrollable Core Feed Area */}
        <main className="flex-1 overflow-y-auto scrollbar-none pb-24 bg-[#F5F6F8] text-[#0A0A0A]">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryPageId || activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
