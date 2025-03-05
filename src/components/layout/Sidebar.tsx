
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, TrendingDown, CreditCard, Users, UserMinus, MessageSquareText } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-10">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">VIP Financial System</h1>
        <p className="text-sm text-gray-500">Clean Holdings</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/income" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/income") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              <span>Income</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/expenses" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/expenses") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <TrendingDown className="mr-3 h-5 w-5" />
              <span>Expenses</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/advances" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/advances") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              <span>Advances</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/salaries" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/salaries") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              <span>Field Employee Salaries</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/debts" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/debts") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <UserMinus className="mr-3 h-5 w-5" />
              <span>Client Debts</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/invoice-chat" 
              className={`flex items-center p-2 rounded-lg ${
                isActive("/invoice-chat") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquareText className="mr-3 h-5 w-5" />
              <span>Invoice Chat</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
