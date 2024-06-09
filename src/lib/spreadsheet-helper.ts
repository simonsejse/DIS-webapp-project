import { MonthlyFinanceDTO, SubcategoryDTO } from '@/types/types';
import { DateHelper } from './utils';

/**
 * Calculates the total price for a given month across all subcategories.
 *
 * @param subcategories - Array of subcategory objects which include monthly financial data.
 * @param month - The month for which to calculate the total price, in string format.
 * @returns The total price for the specified month.
 */
export const getMonthlyTotals = (
  subcategories: SubcategoryDTO[],
  month: string
): number => {
  return subcategories.reduce((sum, subcat) => {
    const monthlyFinance = subcat.monthlyFinances.find(
      (finance) => finance.month === month
    );
    return sum + (monthlyFinance ? getTransactionsTotal(monthlyFinance) : 0);
  }, 0);
};

/**
 * Calculates the total price of all transactions for a given monthly finance entry.
 *
 * @param monthfinance - An object representing the monthly finance data, which includes an array of transactions.
 * @returns The total price of all transactions for the given monthly finance entry.
 */
export const getTransactionsTotal = (
  monthfinance: MonthlyFinanceDTO | undefined
): number => {
  if (!monthfinance) return 0;
  return monthfinance.transactions.reduce(
    (sum, transaction) => sum + transaction.price,
    0
  );
};
