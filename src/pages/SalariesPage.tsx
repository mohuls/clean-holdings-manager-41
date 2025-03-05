
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CreditCard, Users, UserMinus, MessageSquareText } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SalariesPage = () => {
  // Sample data for the table
  const employees = ["Shelo", "Avi", "Shaked", "Meir", "Mai", "Yaakov"];
  const dates = ["1.1.25", "2.1.25", "3.1.25", "4.1.25", "5.1.25"];

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
              <Link to="/" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100">
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
              <Link to="/salaries" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600">
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
            <h1 className="text-3xl font-bold text-gray-800">Field Employee Salaries</h1>
            <p className="text-gray-500">Manage employee salary records</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Salary Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Field Employee Daily Salaries</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {employees.map((employee) => (
                    <TableHead key={employee}>{employee}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dates.map((date) => (
                  <TableRow key={date}>
                    <TableCell className="font-medium">{date}</TableCell>
                    {employees.map((employee) => (
                      <TableCell key={`${date}-${employee}`}>
                        <input 
                          type="number" 
                          className="w-20 p-1 border rounded" 
                          placeholder="0"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalariesPage;
