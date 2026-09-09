// ============================================
// WealthFlow — Type Definitions
// ============================================

import { LucideIcon, Rocket, Shield, Home, Gift, TrendingUp, Building, Brain, Laptop, LineChart, Bitcoin, Palette } from 'lucide-react';

export type Category = 'growth' | 'stability' | 'essentials' | 'rewards';

export type GrowthAssetType =
  | 'index-fund'
  | 'real-estate'
  | 'reit'
  | 'skill'
  | 'online-biz'
  | 'stock'
  | 'crypto'
  | 'alternative';

export interface AllocationConfig {
  growth: number;
  stability: number;
  essentials: number;
  rewards: number;
}

export interface UserProfile {
  id: string;
  name: string;
  monthlyIncome: number;
  currency: string;
  currencySymbol: string;
  allocations: AllocationConfig;
  createdAt: string;
  isSetupComplete: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  subcategory: string;
  description: string;
  date: string;
  isRecurring: boolean;
}

export interface StabilityFund {
  targetAmount: number;
  currentAmount: number;
  monthlyBaseline: number;
  targetMonths: number;
  expenses: CoreExpense[];
}

export interface CoreExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
}

export interface GrowthAsset {
  id: string;
  name: string;
  type: GrowthAssetType;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  investedAmount: number;
  currentValue: number;
  monthlyContribution: number;
}

export interface JoyJar {
  balance: number;
  monthlyBudget: number;
  spending: JoySpending[];
}

export interface JoySpending {
  id: string;
  category: 'vacations' | 'hobbies' | 'nights-out' | 'gifts';
  amount: number;
  description: string;
  date: string;
}

export interface CompoundGrowthResult {
  year: number;
  totalInvested: number;
  totalValue: number;
  growth: number;
}

export interface ImpulseCheck {
  step: 'start' | 'impulse' | 'seven-day' | 'brand-value' | 'improve-life' | 'result';
  result?: 'buy' | 'dont-buy';
  reason?: string;
}

export const CATEGORY_CONFIG: Record<Category, {
  label: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  description: string;
  percentage: number;
}> = {
  growth: {
    label: 'Growth',
    icon: Rocket,
    color: 'var(--growth)',
    gradient: 'var(--gradient-growth)',
    description: 'Money that works for you',
    percentage: 25,
  },
  stability: {
    label: 'Stability',
    icon: Shield,
    color: 'var(--stability)',
    gradient: 'var(--gradient-stability)',
    description: 'Keeps you in the game',
    percentage: 15,
  },
  essentials: {
    label: 'Essentials',
    icon: Home,
    color: 'var(--essentials)',
    gradient: 'var(--gradient-essentials)',
    description: 'Feeds you, not your ego',
    percentage: 50,
  },
  rewards: {
    label: 'Rewards',
    icon: Gift,
    color: 'var(--rewards)',
    gradient: 'var(--gradient-rewards)',
    description: 'Keeps you sane',
    percentage: 10,
  },
};

export const GROWTH_ASSET_TYPES: Record<GrowthAssetType, {
  label: string;
  icon: LucideIcon;
  riskLevel: number;
  description: string;
}> = {
  'index-fund': {
    label: 'Index Funds',
    icon: TrendingUp,
    riskLevel: 1,
    description: 'Buy a slice of the whole market',
  },
  'real-estate': {
    label: 'Real Estate',
    icon: Home,
    riskLevel: 2,
    description: 'Rental property investments',
  },
  'reit': {
    label: 'REITs',
    icon: Building,
    riskLevel: 2,
    description: 'Real estate investment trusts',
  },
  'skill': {
    label: 'Skills',
    icon: Brain,
    riskLevel: 3,
    description: 'Fastest return on investment',
  },
  'online-biz': {
    label: 'Online Business',
    icon: Laptop,
    riskLevel: 4,
    description: 'Dropshipping, digital products',
  },
  'stock': {
    label: 'Individual Stocks',
    icon: LineChart,
    riskLevel: 4,
    description: 'Picking individual companies',
  },
  'crypto': {
    label: 'Crypto',
    icon: Bitcoin,
    riskLevel: 5,
    description: 'Bitcoin, Ethereum, etc.',
  },
  'alternative': {
    label: 'Alternatives',
    icon: Palette,
    riskLevel: 5,
    description: 'Gold, wine, sneakers, NFTs',
  },
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
];
