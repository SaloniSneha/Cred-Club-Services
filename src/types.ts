export type Tab = 'home' | 'cards' | 'pay' | 'rewards' | 'shop' | 'more';

export interface CreditCard {
  id: string;
  bank: string;
  type: 'visa' | 'mastercard' | 'rupay';
  number: string; // Masked e.g. "•••• •••• •••• 4829"
  cardholder: string;
  colorTheme: 'classic' | 'neon-purple' | 'emerald' | 'gold-platinum';
  balanceDue: number;
  dueDate: string;
  paidStatus: 'unpaid' | 'paid' | 'processing';
}

export interface Reward {
  id: string;
  partner: string;
  title: string;
  subtitle: string;
  costCoins: number;
  costGems: number;
  bgGradient: string;
  rewardType: 'giftcard' | 'gadget' | 'cashback';
  claimed: boolean;
  itemImage?: string;
  badge?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  memberPrice: number;
  costCoins: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export interface AppNotification {
  id: string;
  type: 'reward' | 'payment' | 'order' | 'coin_bonus';
  title: string;
  description: string;
  timestamp: string;
  amountText?: string;
}

export interface AppState {
  coins: number;
  gems: number;
  vouchers: number;
  activeTab: Tab;
  cards: CreditCard[];
  rewards: Reward[];
  products: ShopProduct[];
  notifications: AppNotification[];
  categoryPageId: string | null;
}
