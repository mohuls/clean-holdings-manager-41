
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Define types for our financial data
type Income = {
  id: string;
  amount: number;
  description: string;
  category: "Daily Summary" | "Monthly Summary";
  date: string;
};

type Expense = {
  id: string;
  amount: number;
  description: string;
  category: "Salaries" | "Refunds for Customer Repairs" | "Materials, Equipment, and Repairs" | "Marketing and Advertising Expenses" | "Unnecessary Expenses" | "Office Expenses";
  date: string;
};

type Advance = {
  id: string;
  name: "Tzach" | "Ben" | "Roi" | "Orel";
  amount: number;
  description: string;
  paymentType: "Check" | "Cash" | "Credit" | "Bank Transfer";
  date: string;
};

type Employee = {
  id: string;
  name: string;
};

type SalaryEntry = {
  employeeId: string;
  date: string;
  amount: number;
};

type Debt = {
  id: string;
  clientName: string;
  amount: number;
  description: string;
  dueDate: string;
  updatedDate: string;
};

interface FinancialContextType {
  incomes: Income[];
  expenses: Expense[];
  advances: Advance[];
  employees: Employee[];
  salaries: SalaryEntry[];
  debts: Debt[];
  addIncome: (income: Omit<Income, "id">) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  addAdvance: (advance: Omit<Advance, "id">) => void;
  addEmployee: (name: string) => void;
  addSalary: (salary: SalaryEntry) => void;
  addDebt: (debt: Omit<Debt, "id">) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  updateAdvance: (id: string, advance: Partial<Advance>) => void;
  updateSalary: (employeeId: string, date: string, amount: number) => void;
  updateDebt: (id: string, debt: Partial<Debt>) => void;
  deleteIncome: (id: string) => void;
  deleteExpense: (id: string) => void;
  deleteAdvance: (id: string) => void;
  deleteEmployee: (id: string) => void;
  deleteDebt: (id: string) => void;
  saveData: () => void;
  loadData: () => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [advances, setAdvances] = useState<Advance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "Shelo" },
    { id: "2", name: "Avi" },
    { id: "3", name: "Shaked" },
    { id: "4", name: "Meir" },
    { id: "5", name: "Mai" },
    { id: "6", name: "Yaakov" },
  ]);
  const [salaries, setSalaries] = useState<SalaryEntry[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);

  // Load data from localStorage on initial load
  useEffect(() => {
    loadData();
  }, []);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const saveData = () => {
    try {
      const data = {
        incomes,
        expenses,
        advances,
        employees,
        salaries,
        debts,
      };
      localStorage.setItem("financialData", JSON.stringify(data));
      toast("Data saved successfully", {
        description: "All financial data has been saved",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast("Error saving data", {
        description: "There was an error saving your data",
        variant: "destructive",
      });
    }
  };

  const loadData = () => {
    try {
      const savedData = localStorage.getItem("financialData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setIncomes(parsedData.incomes || []);
        setExpenses(parsedData.expenses || []);
        setAdvances(parsedData.advances || []);
        setEmployees(parsedData.employees || []);
        setSalaries(parsedData.salaries || []);
        setDebts(parsedData.debts || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast("Error loading data", {
        description: "There was an error loading your data",
        variant: "destructive",
      });
    }
  };

  // Income functions
  const addIncome = (income: Omit<Income, "id">) => {
    const newIncome = { ...income, id: generateId() };
    setIncomes([...incomes, newIncome]);
  };

  const updateIncome = (id: string, updatedIncome: Partial<Income>) => {
    setIncomes(
      incomes.map((income) =>
        income.id === id ? { ...income, ...updatedIncome } : income
      )
    );
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  // Expense functions
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: generateId() };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Advance functions
  const addAdvance = (advance: Omit<Advance, "id">) => {
    const newAdvance = { ...advance, id: generateId() };
    setAdvances([...advances, newAdvance]);
  };

  const updateAdvance = (id: string, updatedAdvance: Partial<Advance>) => {
    setAdvances(
      advances.map((advance) =>
        advance.id === id ? { ...advance, ...updatedAdvance } : advance
      )
    );
  };

  const deleteAdvance = (id: string) => {
    setAdvances(advances.filter((advance) => advance.id !== id));
  };

  // Employee functions
  const addEmployee = (name: string) => {
    const newEmployee = { id: generateId(), name };
    setEmployees([...employees, newEmployee]);
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    // Also remove any salary entries for this employee
    setSalaries(salaries.filter((salary) => salary.employeeId !== id));
  };

  // Salary functions
  const addSalary = (salary: SalaryEntry) => {
    // Check if there's already an entry for this employee on this date
    const existingIndex = salaries.findIndex(
      (s) => s.employeeId === salary.employeeId && s.date === salary.date
    );

    if (existingIndex >= 0) {
      // Update existing entry
      const updatedSalaries = [...salaries];
      updatedSalaries[existingIndex] = salary;
      setSalaries(updatedSalaries);
    } else {
      // Add new entry
      setSalaries([...salaries, salary]);
    }
  };

  const updateSalary = (employeeId: string, date: string, amount: number) => {
    const existingIndex = salaries.findIndex(
      (s) => s.employeeId === employeeId && s.date === date
    );

    if (existingIndex >= 0) {
      // Update existing entry
      const updatedSalaries = [...salaries];
      updatedSalaries[existingIndex].amount = amount;
      setSalaries(updatedSalaries);
    } else {
      // Add new entry
      setSalaries([...salaries, { employeeId, date, amount }]);
    }
  };

  // Debt functions
  const addDebt = (debt: Omit<Debt, "id">) => {
    const newDebt = { ...debt, id: generateId() };
    setDebts([...debts, newDebt]);
  };

  const updateDebt = (id: string, updatedDebt: Partial<Debt>) => {
    setDebts(
      debts.map((debt) =>
        debt.id === id ? { ...debt, ...updatedDebt } : debt
      )
    );
  };

  const deleteDebt = (id: string) => {
    setDebts(debts.filter((debt) => debt.id !== id));
  };

  return (
    <FinancialContext.Provider
      value={{
        incomes,
        expenses,
        advances,
        employees,
        salaries,
        debts,
        addIncome,
        addExpense,
        addAdvance,
        addEmployee,
        addSalary,
        addDebt,
        updateIncome,
        updateExpense,
        updateAdvance,
        updateSalary,
        updateDebt,
        deleteIncome,
        deleteExpense,
        deleteAdvance,
        deleteEmployee,
        deleteDebt,
        saveData,
        loadData,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error("useFinancial must be used within a FinancialProvider");
  }
  return context;
};
