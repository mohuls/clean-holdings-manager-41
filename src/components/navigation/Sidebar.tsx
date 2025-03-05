
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useFinancial } from '@/context/FinancialContext';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  UserMinus,
  MessageSquareText,
  LogOut,
  Save
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { saveData } = useFinancial();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/income',
      name: 'Income',
      icon: <TrendingUp size={20} />
    },
    {
      path: '/expenses',
      name: 'Expenses',
      icon: <TrendingDown size={20} />
    },
    {
      path: '/advances',
      name: 'Advances',
      icon: <CreditCard size={20} />
    },
    {
      path: '/salaries',
      name: 'Field Employee Salaries',
      icon: <Users size={20} />
    },
    {
      path: '/debts',
      name: 'Client Debts',
      icon: <UserMinus size={20} />
    },
    {
      path: '/invoice-chat',
      name: 'Invoice Chat',
      icon: <MessageSquareText size={20} />
    }
  ];

  const handleSaveAndLogout = () => {
    saveData();
    setTimeout(() => {
      logout();
    }, 500);
  };

  return (
    <aside className="bg-sidebar h-screen w-64 flex flex-col fixed left-0 top-0 z-30">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-medium text-sidebar-foreground">VIP Financial System</h1>
        <p className="text-xs text-sidebar-foreground/70">Clean Holdings</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
          onClick={saveData}
        >
          <Save size={16} />
          <span>Save Changes</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
          onClick={handleSaveAndLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
