import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShopProduct } from '../types';
import { ShoppingCart, Star, Shield, HelpCircle, X, Check, ArrowRight, Coins, Percent, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShopTab: React.FC = () => {
  const { products, coins, buyProduct } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  
  // Checkout flow states
  const [buyProcessing, setBuyProcessing] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);

  const handleOpenDetail = (product: ShopProduct) => {
    setSelectedProduct(product);
    setBuySuccess(false);
    setBuyProcessing(false);
    setBuyError(null);
  };

  const handleConfirmPurchase = () => {
    if (!selectedProduct) return;

    if (coins < selectedProduct.costCoins) {
      setBuyError(`You need at least ${selectedProduct.costCoins.toLocaleString()} coins. Check the ledger and pay bills to get more!`);
      return;
    }

    setBuyProcessing(true);
    setTimeout(() => {
      const res = buyProduct(selectedProduct.id);
      setBuyProcessing(false);
      if (res.success) {
        setBuySuccess(true);
      } else {
        setBuyError(res.error || 'Checkout failed');
      }
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-28 text-left px-4 pt-6 bg-[#F5F6F8]">
      {/* Editorial Header */}
      <div>
        <h1 className="text-3xl font-serif font-extrabold text-neutral-900 tracking-tight leading-tight">
          Curated store
        </h1>
        <p className="text-xs text-neutral-500 mt-1.5 font-mono uppercase tracking-wider font-bold">
          Burn CRED coins for up to 40% discount on luxury labels
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((prod) => (
          <motion.div
            key={prod.id}
            whileHover={{ y: -3 }}
            onClick={() => handleOpenDetail(prod)}
            className="bg-white border border-neutral-100 p-4 rounded-3xl flex flex-col justify-between cursor-pointer group hover:border-neutral-200 shadow-[0_4px_12px_rgba(0,0,0,0.01)] text-left"
          >
            {/* Visual Container */}
            <div className="bg-neutral-50 border border-neutral-150 rounded-2xl h-36 flex items-center justify-center text-4xl mb-3 relative overflow-hidden group-hover:bg-neutral-100 transition-colors">
              <span className="drop-shadow-sm select-none">{prod.image}</span>
              {/* Star rating tag */}
              <div className="absolute top-2 left-2 bg-white text-[10px] font-sans font-bold border border-neutral-200 px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 text-neutral-700">
                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                <span>{prod.rating}</span>
              </div>
            </div>

            {/* Branding & Details */}
            <div className="space-y-1 text-left">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-extrabold block">
                {prod.brand}
              </span>
              <h3 className="text-xs font-sans font-bold text-neutral-800 line-clamp-2 leading-tight group-hover:text-black transition-colors">
                {prod.name}
              </h3>
            </div>

            {/* Price Segment */}
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-end justify-between">
              <div className="text-left">
                <p className="text-[10px] font-mono text-neutral-400 line-through">₹{prod.originalPrice.toLocaleString()}</p>
                <p className="text-sm font-sans font-extrabold text-neutral-800">₹{prod.memberPrice.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-mono px-2 py-0.5 rounded-lg border border-amber-200 font-extrabold">
                <Coins className="w-3 h-3" />
                <span>-{prod.costCoins / 1000}K</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety Shield */}
      <div className="bg-white border border-neutral-150 p-4 rounded-3xl flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
          <Percent className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-sans font-bold text-neutral-800 uppercase tracking-wider">Absolute brand clearance</h4>
          <p className="text-[11px] text-neutral-500 mt-0.5 font-medium leading-normal">We buy direct from brands to avoid broker commissions. 100% original product warranty.</p>
        </div>
      </div>

      {/* Product Detail Modal Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
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
                  <span className="text-[10px] font-mono text-amber-700 uppercase tracking-widest font-extrabold">{selectedProduct.brand}</span>
                  <h3 className="text-lg font-sans font-extrabold text-neutral-800 mt-0.5 uppercase leading-tight">{selectedProduct.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!buySuccess ? (
                <div className="space-y-4">
                  {/* Photo showcase */}
                  <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200 flex items-center justify-center text-6xl h-44 relative shadow-inner">
                    <span className="select-none">{selectedProduct.image}</span>
                    <span className="absolute bottom-3 right-3 bg-white text-[10px] font-mono border border-neutral-200 px-2 py-0.5 rounded text-neutral-400 font-bold">
                      Standard domestic delivery: free
                    </span>
                  </div>

                  {/* Rating, specs & terms */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#FAFAFA] p-3 rounded-2xl border border-neutral-150">
                      <p className="text-neutral-400 font-mono text-[9px] uppercase font-bold">Product rating</p>
                      <p className="text-sm font-sans font-bold text-neutral-800 mt-1 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 stroke-amber-500" />
                        <span>{selectedProduct.rating} / 5</span>
                      </p>
                    </div>
                    <div className="bg-[#FAFAFA] p-3 rounded-2xl border border-neutral-150">
                      <p className="text-neutral-400 font-mono text-[9px] uppercase font-bold">Category tag</p>
                      <p className="text-sm font-sans font-bold text-neutral-800 mt-1 uppercase">{selectedProduct.category}</p>
                    </div>
                  </div>

                  {/* Pricing segment */}
                  <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-neutral-150 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Special member rate</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xl font-mono font-bold text-neutral-800">₹{selectedProduct.memberPrice.toLocaleString()}</span>
                        <span className="text-xs text-neutral-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-amber-700 uppercase tracking-widest font-bold">Coin cost to burn</span>
                      <p className="text-sm font-mono font-bold text-amber-600 mt-0.5">{selectedProduct.costCoins.toLocaleString()} Coins</p>
                    </div>
                  </div>

                  {/* Errors */}
                  {buyError && (
                    <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl text-red-800 text-xs flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{buyError}</span>
                    </div>
                  )}

                  {/* Buy CTA */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmPurchase}
                    disabled={buyProcessing}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow"
                  >
                    {buyProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Deducting coins & reserving item...</span>
                      </>
                    ) : (
                      <span>Burn {selectedProduct.costCoins.toLocaleString()} coins & purchase</span>
                    )}
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-sans font-bold text-neutral-800">Purchase confirmed!</h4>
                    <p className="text-xs text-neutral-500 mt-1 font-medium">We have locked in your member purchase order for {selectedProduct.brand} {selectedProduct.name}.</p>
                    <p className="text-xs text-amber-600 font-mono font-bold mt-3">Burned {selectedProduct.costCoins.toLocaleString()} CRED coins successfully.</p>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
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
