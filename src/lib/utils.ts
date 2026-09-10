// ============================================
// WealthFlow — Utility Functions
// ============================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CompoundGrowthResult } from './types';

/**
 * Utility to merge tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Format currency with symbol
 */
export function formatCurrency(amount: number, symbol: string = '$'): string {
  const absAmount = Math.abs(amount);
  if (absAmount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (absAmount >= 1_000) {
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Calculate compound growth (the Billy vs Phil example)
 */
export function calculateCompoundGrowth(
  monthlyAmount: number,
  years: number,
  annualReturn: number = 0.10
): CompoundGrowthResult[] {
  const results: CompoundGrowthResult[] = [];
  const monthlyReturn = annualReturn / 12;
  let totalValue = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      totalValue = (totalValue + monthlyAmount) * (1 + monthlyReturn);
    }
    const totalInvested = monthlyAmount * 12 * year;
    results.push({
      year,
      totalInvested,
      totalValue: Math.round(totalValue),
      growth: Math.round(totalValue - totalInvested),
    });
  }

  return results;
}

/**
 * Calculate stability fund target (5 months of core expenses)
 */
export function calculateStabilityTarget(monthlyBaseline: number, months: number = 5): number {
  return monthlyBaseline * months;
}

/**
 * Calculate wealth score (0-100) based on allocation adherence
 */
export function calculateWealthScore(
  income: number,
  growthSpent: number,
  stabilitySpent: number,
  essentialsSpent: number,
  rewardsSpent: number,
  allocations: { growth: number; stability: number; essentials: number; rewards: number }
): number {
  if (income === 0) return 0;

  const idealGrowth = income * (allocations.growth / 100);
  const idealStability = income * (allocations.stability / 100);
  const idealEssentials = income * (allocations.essentials / 100);
  const idealRewards = income * (allocations.rewards / 100);

  const growthScore = idealGrowth > 0 ? Math.max(0, 1 - Math.abs(growthSpent - idealGrowth) / idealGrowth) : 0;
  const stabilityScore = idealStability > 0 ? Math.max(0, 1 - Math.abs(stabilitySpent - idealStability) / idealStability) : 0;
  const essentialsScore = idealEssentials > 0 ? Math.max(0, 1 - Math.abs(essentialsSpent - idealEssentials) / idealEssentials) : 0;
  const rewardsScore = idealRewards > 0 ? Math.max(0, 1 - Math.abs(rewardsSpent - idealRewards) / idealRewards) : 0;

  const weightedScore =
    growthScore * 0.35 +
    stabilityScore * 0.25 +
    essentialsScore * 0.25 +
    rewardsScore * 0.15;

  return Math.round(weightedScore * 100);
}

/**
 * Get current month string
 */
export function getCurrentMonth(): string {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Get days remaining in current month
 */
export function getDaysRemaining(): number {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate() - now.getDate();
}

/**
 * Format date string
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get percentage of month elapsed
 */
export function getMonthProgress(): number {
  const now = new Date();
  const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.round((now.getDate() / totalDays) * 100);
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
