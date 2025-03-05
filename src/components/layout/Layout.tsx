
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Layout;
