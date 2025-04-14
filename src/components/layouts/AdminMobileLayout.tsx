import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

interface AdminMobileLayoutProps {
  children: React.ReactNode;
}

const AdminMobileLayout: React.FC<AdminMobileLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin" },
    { name: "Products", icon: ShoppingBagIcon, path: "/admin/products" },
    { name: "Orders", icon: ClipboardDocumentListIcon, path: "/admin/orders" },
    { name: "Users", icon: UserGroupIcon, path: "/admin/users" },
    { name: "Analytics", icon: ChartBarIcon, path: "/admin/analytics" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/admin/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-20 bg-black/95 backdrop-blur-sm transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 px-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-[#CD7F32] text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-6 w-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="px-4 py-4">{children}</div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-sm border-t border-gray-800">
        <div className="grid grid-cols-4 h-16">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive(item.path)
                  ? "text-[#CD7F32]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminMobileLayout;
