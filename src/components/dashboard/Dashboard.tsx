
import React, { useState } from 'react';
import { useFinancial } from '@/context/FinancialContext';
import {
  formatMonthYear,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateTotalAdvances,
  calculateTotalEmployeeSalaries,
  calculateTotalDebts,
  calculateExpensesByCategory,
  getCurrentMonthYear,
  formatCurrency
} from '@/utils/dateUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, CreditCard, Users, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const { data, isLoading } = useFinancial();
  const { month: currentMonth, year: currentYear } = getCurrentMonthYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full bg-background"></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const totalIncome = calculateTotalIncome(data.incomes, selectedMonth, selectedYear);
  const totalExpenses = calculateTotalExpenses(data.expenses, selectedMonth, selectedYear);
  const totalAdvances = calculateTotalAdvances(data.advances, selectedMonth, selectedYear);
  const totalSalaries = calculateTotalEmployeeSalaries(data.employeeSalaries, selectedMonth, selectedYear);
  const totalDebts = calculateTotalDebts(data.debts);
  const expensesByCategory = calculateExpensesByCategory(data.expenses, selectedMonth, selectedYear);

  const expensePieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: name.length > 15 ? `${name.substring(0, 15)}...` : name,
    value
  }));

  const incomeVsExpenseData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  const previousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Generate years for the select dropdown
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold mb-4 sm:mb-0">Financial Dashboard</h1>
        
        <div className="flex items-center bg-card border border-border rounded-lg shadow-sm">
          <Button variant="ghost" size="icon" onClick={previousMonth} className="h-10 w-10">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center px-2">
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(parseInt(value))}
            >
              <SelectTrigger className="w-[110px] border-0 focus:ring-0">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-[100px] border-0 focus:ring-0">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="ghost" size="icon" onClick={nextMonth} className="h-10 w-10">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="col-span-1 dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
              Total Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingDown className="mr-2 h-5 w-5 text-rose-500" />
              Total Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-amber-500" />
              Total Monthly Advances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalAdvances)}</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              Total Monthly Salaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalSalaries)}</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <UserMinus className="mr-2 h-5 w-5 text-purple-500" />
              Total Monthly Debts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalDebts)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeVsExpenseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar dataKey="value" name="Amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Expense Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {expensePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No expense data for this period</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Field Employee Salaries - {formatMonthYear(selectedMonth, selectedYear)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Employee</th>
                  <th className="py-3 px-4 text-right">Monthly Salary</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((employee) => {
                  const employeeSalary = data.employeeSalaries
                    .filter((salary) => {
                      const date = new Date(salary.date);
                      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
                    })
                    .reduce((total, salary) => {
                      return total + (salary.employees[employee] || 0);
                    }, 0);

                  return (
                    <tr key={employee} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{employee}</td>
                      <td className="py-3 px-4 text-right font-medium">{formatCurrency(employeeSalary)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
