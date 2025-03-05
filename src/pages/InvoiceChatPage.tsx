
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CreditCard, Users, UserMinus, MessageSquareText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvoiceChatPage = () => {
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
              <Link to="/invoice-chat" className="flex items-center p-2 rounded-lg bg-blue-50 text-blue-600">
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
            <h1 className="text-3xl font-bold text-gray-800">Invoice Chat</h1>
            <p className="text-gray-500">AI-powered invoice processing</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your invoice here, or 
                <Button variant="link" className="p-0 h-auto text-blue-500 font-normal text-sm">
                  browse
                </Button>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: PNG, JPG, PDF
              </p>
              
              <Button className="mt-6">
                <Upload className="mr-2 h-4 w-4" />
                Upload Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceChatPage;
