
import { format, parse, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { 
  Income, 
  Expense, 
  Advance, 
  EmployeeSalary, 
  Debt 
} from '@/context/FinancialContext';

// Format a date string as YYYY-MM-DD
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
};

// Format a date string for display
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};

// Format a month/year combination for display
export const formatMonthYear = (month: number, year: number): string => {
  const date = new Date(year, month - 1, 1);
  return format(date, 'MMMM yyyy');
};

// Check if a date is within a given month/year
export const isDateInMonth = (dateString: string, month: number, year: number): boolean => {
  const date = new Date(dateString);
  const start = startOfMonth(new Date(year, month - 1, 1));
  const end = endOfMonth(new Date(year, month - 1, 1));
  
  return isWithinInterval(date, { start, end });
};

// Filter data for a specific month/year
export const filterDataForMonth = <T extends { date: string }>(
  items: T[],
  month: number,
  year: number
): T[] => {
  return items.filter(item => isDateInMonth(item.date, month, year));
};

// Calculate total income for a specific month/year
export const calculateTotalIncome = (
  incomes: Income[],
  month: number,
  year: number
): number => {
  const filteredIncomes = filterDataForMonth(incomes, month, year);
  return filteredIncomes.reduce((total, income) => total + income.amount, 0);
};

// Calculate total expenses for a specific month/year
export const calculateTotalExpenses = (
  expenses: Expense[],
  month: number,
  year: number
): number => {
  const filteredExpenses = filterDataForMonth(expenses, month, year);
  return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculate total advances for a specific month/year
export const calculateTotalAdvances = (
  advances: Advance[],
  month: number,
  year: number
): number => {
  const filteredAdvances = filterDataForMonth(advances, month, year);
  return filteredAdvances.reduce((total, advance) => total + advance.amount, 0);
};

// Calculate total employee salaries for a specific month/year
export const calculateTotalEmployeeSalaries = (
  salaries: EmployeeSalary[],
  month: number,
  year: number
): number => {
  const filteredSalaries = filterDataForMonth(salaries, month, year);
  
  return filteredSalaries.reduce((total, salary) => {
    const employeeSalaries = Object.values(salary.employees);
    return total + employeeSalaries.reduce((sum, value) => sum + value, 0);
  }, 0);
};

// Calculate total employee salary per employee for a specific month/year
export const calculateEmployeeMonthlySalary = (
  salaries: EmployeeSalary[],
  employeeName: string,
  month: number,
  year: number
): number => {
  const filteredSalaries = filterDataForMonth(salaries, month, year);
  
  return filteredSalaries.reduce((total, salary) => {
    const employeeSalary = salary.employees[employeeName] || 0;
    return total + employeeSalary;
  }, 0);
};

// Calculate total debts
export const calculateTotalDebts = (debts: Debt[]): number => {
  return debts.reduce((total, debt) => total + debt.amount, 0);
};

// Calculate expenses by category for a specific month/year
export const calculateExpensesByCategory = (
  expenses: Expense[],
  month: number,
  year: number
): Record<string, number> => {
  const filteredExpenses = filterDataForMonth(expenses, month, year);
  
  return filteredExpenses.reduce((categories, expense) => {
    const { category, amount } = expense;
    categories[category] = (categories[category] || 0) + amount;
    return categories;
  }, {} as Record<string, number>);
};

// Get current month and year
export const getCurrentMonthYear = (): { month: number; year: number } => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear()
  };
};

// Format a number as currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('he-IL', { 
    style: 'currency', 
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
