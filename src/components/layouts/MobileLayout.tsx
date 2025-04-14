import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Perfect Grade", path: "/products/pg" },
    { name: "Master Grade", path: "/products/mg" },
    { name: "Real Grade", path: "/products/rg" },
    { name: "High Grade", path: "/products/hg" },
    { name: "SD Grade", path: "/products/sd" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Gundam Store" className="h-8" />
            <span className="text-xl font-bold text-white ml-2 hidden sm:block">
              Gundam Store
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <Link
              to="/cart"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingBagIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/profile"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`${
            isSearchOpen ? "h-16" : "h-0"
          } overflow-hidden transition-all duration-200 ease-in-out border-t border-gray-800`}
        >
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#CD7F32]"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-20 bg-black/95 backdrop-blur-sm transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 px-4 h-full overflow-y-auto">
          <nav className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Menu
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-[#CD7F32] text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <Link
                to="/login"
                className="block px-4 py-3 text-center bg-[#CD7F32] text-white rounded-lg hover:bg-[#B87333] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-black/95 backdrop-blur-sm mt-8">
        <div className="px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shipping"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-2">
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and new product
                launches.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-[#CD7F32]"
                />
                <button className="bg-[#CD7F32] text-white px-6 py-2 rounded-r-lg hover:bg-[#B87333] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Gundam Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileLayout;
