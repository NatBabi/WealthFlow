// ============================================
// WealthFlow — State Management (React Context)
// ============================================

'use client';

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import {
  UserProfile,
  Transaction,
  StabilityFund,
  GrowthAsset,
  JoyJar,
  Category,
  AllocationConfig,
  CoreExpense,
  JoySpending,
} from './types';
import { generateId } from './utils';

// ── State Shape ──
export interface AppState {
  user: UserProfile;
  transactions: Transaction[];
  stabilityFund: StabilityFund;
  growthAssets: GrowthAsset[];
  joyJar: JoyJar;
  activeTab: string;
  isLoaded: boolean;
}

const defaultUser: UserProfile = {
  id: generateId(),
  name: '',
  monthlyIncome: 0,
  currency: 'USD',
  currencySymbol: '$',
  allocations: { growth: 25, stability: 15, essentials: 50, rewards: 10 },
  createdAt: new Date().toISOString(),
  isSetupComplete: false,
};

const initialState: AppState = {
  user: defaultUser,
  transactions: [],
  stabilityFund: {
    targetAmount: 0,
    currentAmount: 0,
    monthlyBaseline: 0,
    targetMonths: 5,
    expenses: [],
  },
  growthAssets: [],
  joyJar: {
    balance: 0,
    monthlyBudget: 0,
    spending: [],
  },
  activeTab: 'dashboard',
  isLoaded: false,
};

// ── Actions ──
type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'SET_TAB'; payload: string }
  | { type: 'SETUP_USER'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_INCOME'; payload: number }
  | { type: 'UPDATE_ALLOCATIONS'; payload: AllocationConfig }
  | { type: 'ADD_TRANSACTION'; payload: Omit<Transaction, 'id'> }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_STABILITY_FUND'; payload: Partial<StabilityFund> }
  | { type: 'ADD_CORE_EXPENSE'; payload: Omit<CoreExpense, 'id'> }
  | { type: 'DELETE_CORE_EXPENSE'; payload: string }
  | { type: 'ADD_GROWTH_ASSET'; payload: Omit<GrowthAsset, 'id'> }
  | { type: 'UPDATE_GROWTH_ASSET'; payload: { id: string } & Partial<GrowthAsset> }
  | { type: 'DELETE_GROWTH_ASSET'; payload: string }
  | { type: 'ADD_JOY_SPENDING'; payload: Omit<JoySpending, 'id'> }
  | { type: 'DELETE_JOY_SPENDING'; payload: string }
  | { type: 'DEPOSIT_STABILITY'; payload: number }
  | { type: 'WITHDRAW_STABILITY'; payload: number }
  | { type: 'RESET_DATA' };

// ── Reducer ──
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...action.payload, isLoaded: true };

    case 'SET_TAB':
      return { ...state, activeTab: action.payload };

    case 'SETUP_USER': {
      const updatedUser = { ...state.user, ...action.payload, isSetupComplete: true };
      const income = updatedUser.monthlyIncome;
      const alloc = updatedUser.allocations;
      return {
        ...state,
        user: updatedUser,
        joyJar: {
          ...state.joyJar,
          monthlyBudget: income * (alloc.rewards / 100),
        },
      };
    }

    case 'UPDATE_INCOME': {
      const income = action.payload;
      const alloc = state.user.allocations;
      return {
        ...state,
        user: { ...state.user, monthlyIncome: income },
        joyJar: {
          ...state.joyJar,
          monthlyBudget: income * (alloc.rewards / 100),
        },
      };
    }

    case 'UPDATE_ALLOCATIONS': {
      const alloc = action.payload;
      const income = state.user.monthlyIncome;
      return {
        ...state,
        user: { ...state.user, allocations: alloc },
        joyJar: {
          ...state.joyJar,
          monthlyBudget: income * (alloc.rewards / 100),
        },
      };
    }

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: generateId() },
          ...state.transactions,
        ],
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'UPDATE_STABILITY_FUND':
      return {
        ...state,
        stabilityFund: { ...state.stabilityFund, ...action.payload },
      };

    case 'ADD_CORE_EXPENSE': {
      const newExpense = { ...action.payload, id: generateId() };
      const expenses = [...state.stabilityFund.expenses, newExpense];
      const baseline = expenses.reduce((sum, e) => sum + e.amount, 0);
      return {
        ...state,
        stabilityFund: {
          ...state.stabilityFund,
          expenses,
          monthlyBaseline: baseline,
          targetAmount: baseline * state.stabilityFund.targetMonths,
        },
      };
    }

    case 'DELETE_CORE_EXPENSE': {
      const expenses = state.stabilityFund.expenses.filter((e) => e.id !== action.payload);
      const baseline = expenses.reduce((sum, e) => sum + e.amount, 0);
      return {
        ...state,
        stabilityFund: {
          ...state.stabilityFund,
          expenses,
          monthlyBaseline: baseline,
          targetAmount: baseline * state.stabilityFund.targetMonths,
        },
      };
    }

    case 'ADD_GROWTH_ASSET':
      return {
        ...state,
        growthAssets: [...state.growthAssets, { ...action.payload, id: generateId() }],
      };

    case 'UPDATE_GROWTH_ASSET':
      return {
        ...state,
        growthAssets: state.growthAssets.map((a) =>
          a.id === action.payload.id ? { ...a, ...action.payload } : a
        ),
      };

    case 'DELETE_GROWTH_ASSET':
      return {
        ...state,
        growthAssets: state.growthAssets.filter((a) => a.id !== action.payload),
      };

    case 'DEPOSIT_STABILITY':
      return {
        ...state,
        stabilityFund: {
          ...state.stabilityFund,
          currentAmount: state.stabilityFund.currentAmount + action.payload,
        },
      };

    case 'WITHDRAW_STABILITY':
      return {
        ...state,
        stabilityFund: {
          ...state.stabilityFund,
          currentAmount: Math.max(0, state.stabilityFund.currentAmount - action.payload),
        },
      };

    case 'ADD_JOY_SPENDING': {
      const newSpending = { ...action.payload, id: generateId() };
      return {
        ...state,
        joyJar: {
          ...state.joyJar,
          balance: state.joyJar.balance - newSpending.amount,
          spending: [newSpending, ...state.joyJar.spending],
        },
      };
    }

    case 'DELETE_JOY_SPENDING': {
      const spending = state.joyJar.spending.find((s) => s.id === action.payload);
      return {
        ...state,
        joyJar: {
          ...state.joyJar,
          balance: state.joyJar.balance + (spending?.amount ?? 0),
          spending: state.joyJar.spending.filter((s) => s.id !== action.payload),
        },
      };
    }

    case 'RESET_DATA':
      return { ...initialState, isLoaded: true };

    default:
      return state;
  }
}

// ── Storage Helpers ──
const STORAGE_KEY = 'wealthflow_state';

function saveToStorage(state: AppState) {
  try {
    const { isLoaded, ...data } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail — localStorage might be full or unavailable
  }
}

function loadFromStorage(): AppState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return { ...parsed, isLoaded: true };
    }
  } catch {
    // Silently fail
  }
  return null;
}

// ── Context ──
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      dispatch({ type: 'LOAD_STATE', payload: saved });
    } else {
      dispatch({ type: 'LOAD_STATE', payload: { ...initialState, isLoaded: true } });
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (state.isLoaded) {
      saveToStorage(state);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// ── Selector Hooks ──
export function useAllocations() {
  const { state } = useApp();
  const income = state.user.monthlyIncome;
  const alloc = state.user.allocations;

  return {
    growthAmount: income * (alloc.growth / 100),
    stabilityAmount: income * (alloc.stability / 100),
    essentialsAmount: income * (alloc.essentials / 100),
    rewardsAmount: income * (alloc.rewards / 100),
    ...alloc,
  };
}

export function useCategorySpending(category: Category) {
  const { state } = useApp();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return state.transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.category === category && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}
