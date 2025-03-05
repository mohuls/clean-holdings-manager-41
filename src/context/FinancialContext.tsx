
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

// Define types for our financial data
export interface Income {
  id: string;
  amount: number;
  description: string;
  category: 'Daily Summary' | 'Monthly Summary';
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: 'Salaries' | 'Refunds for Customer Repairs' | 'Materials, Equipment, and Repairs' | 
             'Marketing and Advertising Expenses' | 'Unnecessary Expenses' | 'Office Expenses';
  date: string;
}

export interface Advance {
  id: string;
  name: 'Tzach' | 'Ben' | 'Roi' | 'Orel' | string;
  amount: number;
  description: string;
  paymentType: 'Check' | 'Cash' | 'Credit' | 'Bank Transfer';
  date: string;
}

export interface EmployeeSalary {
  id: string;
  date: string;
  employees: {
    [employeeName: string]: number;
  };
}

export interface Debt {
  id: string;
  clientName: string;
  amount: number;
  description: string;
  dueDate: string;
  updatedDate: string;
}

export interface FinancialData {
  incomes: Income[];
  expenses: Expense[];
  advances: Advance[];
  employeeSalaries: EmployeeSalary[];
  debts: Debt[];
  employees: string[];
}

interface FinancialContextType {
  data: FinancialData;
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addAdvance: (advance: Omit<Advance, 'id'>) => void;
  updateAdvance: (advance: Advance) => void;
  deleteAdvance: (id: string) => void;
  addEmployeeSalary: (salary: Omit<EmployeeSalary, 'id'>) => void;
  updateEmployeeSalary: (salary: EmployeeSalary) => void;
  deleteEmployeeSalary: (id: string) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (debt: Debt) => void;
  deleteDebt: (id: string) => void;
  addEmployee: (name: string) => void;
  deleteEmployee: (name: string) => void;
  isLoading: boolean;
  saveData: () => void;
}

// Initial/sample data
const initialData: FinancialData = {
  incomes: [],
  expenses: [],
  advances: [],
  employeeSalaries: [],
  debts: [],
  employees: ['Shelo', 'Avi', 'Shaked', 'Meir', 'Mai', 'Yaakov']
};

// Create a context for our financial data
const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

// Custom hook to use the financial context
export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

// Generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Financial provider component
export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FinancialData>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem('vip_financial_data');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error parsing saved data', error);
          toast.error('Error loading saved data');
        }
      }
      setIsLoading(false);
    };
    
    // Simulate a slight delay for loading
    const timer = setTimeout(() => {
      loadData();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  // Function to save data to localStorage
  const saveData = () => {
    try {
      localStorage.setItem('vip_financial_data', JSON.stringify(data));
      setHasChanges(false);
      toast.success('Data saved successfully');
    } catch (error) {
      console.error('Error saving data', error);
      toast.error('Error saving data');
    }
  };

  // Mark that we have unsaved changes
  const markChanges = () => {
    setHasChanges(true);
    // Auto-save data
    localStorage.setItem('vip_financial_data', JSON.stringify(data));
  };

  // Income methods
  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = { ...income, id: generateId() };
    setData(prev => ({
      ...prev,
      incomes: [...prev.incomes, newIncome]
    }));
    markChanges();
    toast.success('Income added successfully');
  };

  const updateIncome = (income: Income) => {
    setData(prev => ({
      ...prev,
      incomes: prev.incomes.map(i => i.id === income.id ? income : i)
    }));
    markChanges();
    toast.success('Income updated successfully');
  };

  const deleteIncome = (id: string) => {
    setData(prev => ({
      ...prev,
      incomes: prev.incomes.filter(i => i.id !== id)
    }));
    markChanges();
    toast.success('Income deleted successfully');
  };

  // Expense methods
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: generateId() };
    setData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense]
    }));
    markChanges();
    toast.success('Expense added successfully');
  };

  const updateExpense = (expense: Expense) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.map(e => e.id === expense.id ? expense : e)
    }));
    markChanges();
    toast.success('Expense updated successfully');
  };

  const deleteExpense = (id: string) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== id)
    }));
    markChanges();
    toast.success('Expense deleted successfully');
  };

  // Advance methods
  const addAdvance = (advance: Omit<Advance, 'id'>) => {
    const newAdvance = { ...advance, id: generateId() };
    setData(prev => ({
      ...prev,
      advances: [...prev.advances, newAdvance]
    }));
    markChanges();
    toast.success('Advance added successfully');
  };

  const updateAdvance = (advance: Advance) => {
    setData(prev => ({
      ...prev,
      advances: prev.advances.map(a => a.id === advance.id ? advance : a)
    }));
    markChanges();
    toast.success('Advance updated successfully');
  };

  const deleteAdvance = (id: string) => {
    setData(prev => ({
      ...prev,
      advances: prev.advances.filter(a => a.id !== id)
    }));
    markChanges();
    toast.success('Advance deleted successfully');
  };

  // Employee Salary methods
  const addEmployeeSalary = (salary: Omit<EmployeeSalary, 'id'>) => {
    // Check if a record for this date already exists
    const existingIndex = data.employeeSalaries.findIndex(s => s.date === salary.date);
    
    if (existingIndex >= 0) {
      // Update existing record
      const updatedSalaries = [...data.employeeSalaries];
      updatedSalaries[existingIndex] = {
        ...updatedSalaries[existingIndex],
        employees: {
          ...updatedSalaries[existingIndex].employees,
          ...salary.employees
        }
      };
      
      setData(prev => ({
        ...prev,
        employeeSalaries: updatedSalaries
      }));
    } else {
      // Add new record
      const newSalary = { ...salary, id: generateId() };
      setData(prev => ({
        ...prev,
        employeeSalaries: [...prev.employeeSalaries, newSalary]
      }));
    }
    
    markChanges();
    toast.success('Employee salary added successfully');
  };

  const updateEmployeeSalary = (salary: EmployeeSalary) => {
    setData(prev => ({
      ...prev,
      employeeSalaries: prev.employeeSalaries.map(s => s.id === salary.id ? salary : s)
    }));
    markChanges();
    toast.success('Employee salary updated successfully');
  };

  const deleteEmployeeSalary = (id: string) => {
    setData(prev => ({
      ...prev,
      employeeSalaries: prev.employeeSalaries.filter(s => s.id !== id)
    }));
    markChanges();
    toast.success('Employee salary deleted successfully');
  };

  // Debt methods
  const addDebt = (debt: Omit<Debt, 'id'>) => {
    const newDebt = { ...debt, id: generateId() };
    setData(prev => ({
      ...prev,
      debts: [...prev.debts, newDebt]
    }));
    markChanges();
    toast.success('Debt added successfully');
  };

  const updateDebt = (debt: Debt) => {
    setData(prev => ({
      ...prev,
      debts: prev.debts.map(d => d.id === debt.id ? debt : d)
    }));
    markChanges();
    toast.success('Debt updated successfully');
  };

  const deleteDebt = (id: string) => {
    setData(prev => ({
      ...prev,
      debts: prev.debts.filter(d => d.id !== id)
    }));
    markChanges();
    toast.success('Debt deleted successfully');
  };

  // Employee management methods
  const addEmployee = (name: string) => {
    if (data.employees.includes(name)) {
      toast.error('Employee already exists');
      return;
    }
    
    setData(prev => ({
      ...prev,
      employees: [...prev.employees, name]
    }));
    markChanges();
    toast.success('Employee added successfully');
  };

  const deleteEmployee = (name: string) => {
    setData(prev => ({
      ...prev,
      employees: prev.employees.filter(e => e !== name)
    }));
    markChanges();
    toast.success('Employee deleted successfully');
  };

  return (
    <FinancialContext.Provider
      value={{
        data,
        addIncome,
        updateIncome,
        deleteIncome,
        addExpense,
        updateExpense,
        deleteExpense,
        addAdvance,
        updateAdvance,
        deleteAdvance,
        addEmployeeSalary,
        updateEmployeeSalary,
        deleteEmployeeSalary,
        addDebt,
        updateDebt,
        deleteDebt,
        addEmployee,
        deleteEmployee,
        isLoading,
        saveData
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};
