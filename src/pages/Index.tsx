
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRightCircle, TrendingUp, TrendingDown, CreditCard, Users, UserMinus, MessageSquareText } from "lucide-react";

// Dummy data for initial rendering
const data = [
  { name: "January", income: 4000, expenses: 2400 },
  { name: "February", income: 3000, expenses: 1398 },
  { name: "March", income: 2000, expenses: 9800 },
  { name: "April", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "June", income: 2390, expenses: 3800 },
];

const expenseData = [
  { name: "Salaries", value: 35 },
  { name: "Refunds", value: 10 },
  { name: "Materials", value: 25 },
  { name: "Marketing", value: 15 },
  { name: "Unnecessary", value: 5 },
  { name: "Office", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

const Index = () => {
  const [currentMonth, setCurrentMonth] = useState("June");
  const [currentYear, setCurrentYear] = useState("2023");

  // Calculate summary data
  const totalIncome = 25000;
  const totalExpenses = 18000;
  const totalAdvances = 5000;
  const totalSalaries = 12000;
  const totalDebts = 8000;

  // Employee data
  const employees = [
    { name: "Shelo", salary: 2500 },
    { name: "Avi", salary: 2300 },
    { name: "Shaked", salary: 2700 },
    { name: "Meir", salary: 2000 },
    { name: "Mai", salary: 2200 },
    { name: "Yaakov", salary: 2400 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-10">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">VIP Financial System</h1>
          <p className="text-sm text-gray-500">Clean Holdings</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600">
                <span className="mr-3">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/income" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <TrendingUp className="mr-3 h-5 w-5" />
                <span>Income</span>
              </Link>
            </li>
            <li>
              <Link to="/expenses" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <TrendingDown className="mr-3 h-5 w-5" />
                <span>Expenses</span>
              </Link>
            </li>
            <li>
              <Link to="/advances" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <CreditCard className="mr-3 h-5 w-5" />
                <span>Advances</span>
              </Link>
            </li>
            <li>
              <Link to="/salaries" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <Users className="mr-3 h-5 w-5" />
                <span>Field Employee Salaries</span>
              </Link>
            </li>
            <li>
              <Link to="/debts" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <UserMinus className="mr-3 h-5 w-5" />
                <span>Client Debts</span>
              </Link>
            </li>
            <li>
              <Link to="/invoice-chat" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <MessageSquareText className="mr-3 h-5 w-5" />
                <span>Invoice Chat</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Overview of your financial data</p>
          </div>
          
          <div className="flex space-x-4">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            
            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" /> +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Advances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAdvances.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Salaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSalaries.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Client Debts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDebts.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Monthly comparison for {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4F46E5" />
                    <Bar dataKey="expenses" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>By category for {currentMonth} {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Employee Salary Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Field Employee Salaries - {currentMonth} {currentYear}</CardTitle>
                <CardDescription>Real-time salary updates</CardDescription>
              </div>
              <Link to="/salaries" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                View All <ArrowRightCircle className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <div key={employee.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{employee.name}</span>
                    <span className="text-gray-700">${employee.salary}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${(employee.salary / 3000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
