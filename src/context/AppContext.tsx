import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tab, CreditCard, Reward, ShopProduct, AppNotification, AppState } from '../types';

interface AppContextProps extends AppState {
  setActiveTab: (tab: Tab) => void;
  claimReward: (rewardId: string) => { success: boolean; error?: string; rewardAmount?: number };
  payCardBill: (cardId: string, amount: number) => { success: boolean; error?: string };
  buyProduct: (productId: string) => { success: boolean; error?: string };
  addCreditCard: (card: Omit<CreditCard, 'id' | 'paidStatus'>) => void;
  addNotification: (type: AppNotification['type'], title: string, description: string, amountText?: string) => void;
  addCoins: (amount: number) => void;
  setCategoryPageId: (id: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialCards: CreditCard[] = [
  {
    id: 'card-1',
    bank: 'AXIS BANK RESERVE',
    type: 'visa',
    number: '•••• •••• •••• 9012',
    cardholder: 'SALONI SNEHA',
    colorTheme: 'classic',
    balanceDue: 48250,
    dueDate: 'In 5 Days',
    paidStatus: 'unpaid',
  },
  {
    id: 'card-2',
    bank: 'HDFC DINERS BLACK',
    type: 'mastercard',
    number: '•••• •••• •••• 4567',
    cardholder: 'SALONI SNEHA',
    colorTheme: 'gold-platinum',
    balanceDue: 12900,
    dueDate: 'In 12 Days',
    paidStatus: 'unpaid',
  },
  {
    id: 'card-3',
    bank: 'ICICI AMAZON PAY',
    type: 'rupay',
    number: '•••• •••• •••• 3284',
    cardholder: 'SALONI SNEHA',
    colorTheme: 'neon-purple',
    balanceDue: 3410,
    dueDate: 'In 2 Days',
    paidStatus: 'unpaid',
  },
];

const initialRewards: Reward[] = [
  {
    id: 'reward-amazon',
    partner: 'amazon',
    title: 'WIN A GIFT CARD UP TO',
    subtitle: '₹1,000',
    costCoins: 5000,
    costGems: 0,
    bgGradient: 'from-[#2e0854] via-[#1a0b36] to-[#0a001a]',
    rewardType: 'giftcard',
    claimed: false,
    badge: '10 Apr Exclusive',
  },
  {
    id: 'reward-macbook',
    partner: 'CRED bounty',
    title: 'WIN A MACBOOK SETUP',
    subtitle: 'worth ₹1 lakh',
    costCoins: 15000,
    costGems: 0,
    bgGradient: 'from-[#0d2a1d] via-[#071710] to-[#020705]',
    rewardType: 'gadget',
    claimed: false,
    badge: 'bounty prize',
  },
  {
    id: 'reward-cashback',
    partner: 'powerplay',
    title: 'upto ₹1000 cashback',
    subtitle: 'is waiting',
    costCoins: 3000,
    costGems: 0,
    bgGradient: 'from-[#421219] via-[#24080c] to-[#0d0002]',
    rewardType: 'cashback',
    claimed: false,
    badge: 'cashback superplay',
  },
];

const initialProducts: ShopProduct[] = [
  {
    id: 'prod-1',
    name: 'ATH-M50xBT2 Wireless Studio Headphones',
    brand: 'Audio-Technica',
    originalPrice: 19999,
    memberPrice: 11999,
    costCoins: 8000,
    image: '🎧',
    category: 'Audio',
    rating: 4.8,
    stock: 15,
  },
  {
    id: 'prod-2',
    name: 'Smart Temperature Control Mug 2',
    brand: 'Ember',
    originalPrice: 12999,
    memberPrice: 7999,
    costCoins: 5000,
    image: '☕',
    category: 'Smart Home',
    rating: 4.5,
    stock: 8,
  },
  {
    id: 'prod-3',
    name: 'Drop XL Premium Wireless Charger',
    brand: 'Native Union',
    originalPrice: 9999,
    memberPrice: 4999,
    costCoins: 4000,
    image: '⚡',
    category: 'Charging',
    rating: 4.6,
    stock: 20,
  },
  {
    id: 'prod-4',
    name: 'K2 V2 Wireless Mechanical Keyboard',
    brand: 'Keychron',
    originalPrice: 8999,
    memberPrice: 5999,
    costCoins: 3500,
    image: '⌨️',
    category: 'Peripherals',
    rating: 4.9,
    stock: 12,
  },
];

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'coin_bonus',
    title: 'Welcome Bonus Credited',
    description: 'You received 1,00,000 welcome CRED coins for verifying your account.',
    timestamp: 'Just now',
    amountText: '+1,00,000',
  },
  {
    id: 'notif-2',
    type: 'payment',
    title: 'HDFC Statement Cleared',
    description: 'Your previous month statement payment was processed instantly.',
    timestamp: '2 hours ago',
    amountText: '₹8,450.00',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(117479);
  const [gems, setGems] = useState<number>(3); // Give some starting gems for gameplay
  const [vouchers, setVouchers] = useState<number>(1); // Give 1 starting voucher
  const [activeTab, setActiveTab] = useState<Tab>('home'); // Default focus is Home tab
  const [categoryPageId, setCategoryPageId] = useState<string | null>(null); // Separate category detail page redirect
  const [cards, setCards] = useState<CreditCard[]>(initialCards);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [products] = useState<ShopProduct[]>(initialProducts);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const addNotification = (type: AppNotification['type'], title: string, description: string, amountText?: string) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type,
      title,
      description,
      timestamp: 'Just now',
      amountText,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
    addNotification('coin_bonus', 'CRED Coins Earned', `You received ${amount.toLocaleString()} CRED coins!`, `+${amount.toLocaleString()}`);
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return { success: false, error: 'Reward not found' };
    if (reward.claimed) return { success: false, error: 'Already claimed' };

    if (coins < reward.costCoins) {
      return { success: false, error: `Insufficient coins. Need ${reward.costCoins.toLocaleString()} coins.` };
    }

    setCoins((prev) => prev - reward.costCoins);
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, claimed: true } : r))
    );

    // Give some cool interactive reward back (e.g. random prize value or high-fives)
    let amountWon = 0;
    let titleStr = '';
    let descStr = '';

    if (reward.rewardType === 'giftcard') {
      amountWon = Math.floor(Math.random() * 500) + 100; // Win between ₹100 and ₹600
      titleStr = `Won ₹${amountWon} Amazon Gift Card`;
      descStr = `Your gift voucher has been mailed to you. ${reward.costCoins.toLocaleString()} coins spent.`;
      setVouchers((v) => v + 1);
    } else if (reward.rewardType === 'cashback') {
      amountWon = Math.floor(Math.random() * 250) + 50; // Win cashback
      titleStr = `Won ₹${amountWon} Cashback`;
      descStr = `Credited straight to your primary active card account!`;
    } else {
      // Gadget / Bounty
      titleStr = `bounty ticket secured!`;
      descStr = `You have entered the draw to win a MacBook Pro setup! Winner announced on Sunday.`;
      setGems((g) => g + 2); // give 2 gems
    }

    addNotification('reward', titleStr, descStr, amountWon > 0 ? `₹${amountWon}` : 'Ticket');

    return { success: true, rewardAmount: amountWon };
  };

  const payCardBill = (cardId: string, amount: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return { success: false, error: 'Card not found' };
    if (card.paidStatus === 'paid') return { success: false, error: 'Already fully paid' };

    // Update card payment
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const remaining = Math.max(0, c.balanceDue - amount);
          return {
            ...c,
            balanceDue: remaining,
            paidStatus: remaining === 0 ? 'paid' : 'unpaid',
          };
        }
        return c;
      })
    );

    // When paying bills, CRED awards coins equivalent to the amount paid (1:1 ratio!)
    const coinsRewarded = Math.floor(amount);
    setCoins((prev) => prev + coinsRewarded);

    addNotification(
      'payment',
      `${card.bank} Payment Successful`,
      `Thank you for paying ₹${amount.toLocaleString()}. You earned ${coinsRewarded.toLocaleString()} CRED coins instantly!`,
      `₹${amount.toLocaleString()}`
    );

    return { success: true };
  };

  const buyProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return { success: false, error: 'Product not found' };

    if (coins < product.costCoins) {
      return { success: false, error: `Insufficient coins. Need ${product.costCoins.toLocaleString()} coins.` };
    }

    setCoins((prev) => prev - product.costCoins);
    setVouchers((v) => v + 1);

    addNotification(
      'order',
      `Order Placed: ${product.name}`,
      `Burned ${product.costCoins.toLocaleString()} coins. Exclusive price ₹${product.memberPrice.toLocaleString()} paid via linked card.`,
      `₹${product.memberPrice.toLocaleString()}`
    );

    return { success: true };
  };

  const addCreditCard = (card: Omit<CreditCard, 'id' | 'paidStatus'>) => {
    const newCard: CreditCard = {
      ...card,
      id: `card-${Date.now()}`,
      paidStatus: 'unpaid',
    };
    setCards((prev) => [...prev, newCard]);
    addCoins(5000); // 5000 coins bonus for adding card!
    addNotification('coin_bonus', 'New Card Registered', `Earned 5,000 bonus coins for linking your card.`, '+5,000');
  };

  return (
    <AppContext.Provider
      value={{
        coins,
        gems,
        vouchers,
        activeTab,
        setActiveTab,
        categoryPageId,
        setCategoryPageId,
        cards,
        rewards,
        products,
        notifications,
        claimReward,
        payCardBill,
        buyProduct,
        addCreditCard,
        addNotification,
        addCoins,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
