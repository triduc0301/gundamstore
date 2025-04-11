import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronDownIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Cart from "./Cart";
import AuthModal from "./AuthModal";

const Navbar: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const manufacturers = [
    "Bandai",
    "Dragon Momoko",
    "Daban Model",
    "Motor King",
    "Super Nova",
    "Metal Build",
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-16">
              <Link to="/" className="text-4xl font-bold text-white">
                GUNDAM
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-white hover:text-[#CD7F32] transition-colors"
                >
                  {t("common.navigation.home")}
                </Link>
                <div className="relative group">
                  <button
                    className="flex items-center space-x-1 text-white hover:text-[#CD7F32] transition-colors"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <span>{t("common.navigation.products")}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {/* Dropdown Menu */}
                  <div
                    className={`
                      absolute left-0 top-full mt-2
                      bg-black border border-gray-800
                      py-2 rounded-sm
                      transition-all duration-200
                      ${
                        isProductsOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }
                    `}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    {manufacturers.map((manufacturer) => (
                      <Link
                        key={manufacturer}
                        to={`/products/${manufacturer
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-6 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 whitespace-nowrap transition-colors"
                      >
                        {manufacturer}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  to="/about"
                  className="text-white hover:text-[#CD7F32] transition-colors"
                >
                  {t("common.navigation.about")}
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-[#CD7F32] transition-colors"
                >
                  {t("common.navigation.contact")}
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              <div
                className="relative group"
                onMouseEnter={() => setIsSearchFocused(true)}
                onMouseLeave={() => setIsSearchFocused(false)}
              >
                <div
                  className={`
                    absolute right-0 top-1/2 -translate-y-1/2
                    flex items-center
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isSearchFocused ? "w-64 opacity-100" : "w-0 opacity-0"}
                  `}
                >
                  <input
                    type="text"
                    placeholder={t("common.search.placeholder")}
                    className="
                      w-full bg-gray-900 text-white
                      pl-4 pr-10 py-2
                      rounded-sm
                      border border-gray-800
                      focus:outline-none focus:border-[#CD7F32]
                      placeholder-gray-500
                    "
                  />
                </div>
                <div
                  className={`
                    p-2 rounded-sm cursor-pointer
                    transition-all duration-300
                    ${isSearchFocused ? "bg-[#CD7F32]" : "hover:bg-gray-900"}
                  `}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Language Selector */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-[#CD7F32] transition-colors"
                >
                  <LanguageIcon className="h-6 w-6" />
                  <span className="hidden md:block uppercase">{language}</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-black border border-gray-800 rounded-sm shadow-lg py-2">
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors ${
                        language === "en" ? "text-[#CD7F32]" : ""
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("vi");
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors ${
                        language === "vi" ? "text-[#CD7F32]" : ""
                      }`}
                    >
                      Tiếng Việt
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-[#CD7F32] transition-colors"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#CD7F32] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-[#CD7F32] transition-colors"
                  >
                    <UserIcon className="h-6 w-6" />
                    <span className="hidden md:block">{user.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-sm shadow-lg py-2">
                      {isAdmin && (
                        <>
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors"
                          >
                            {t("common.auth.adminDashboard")}
                          </Link>
                          {/* <Link
                            to="/admin/profile"
                            className="block px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors"
                          >
                            {t("admin.profile.title")}
                          </Link> */}
                        </>
                      )}
                      {/* <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors"
                      >
                        {t("common.auth.profile")}
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors"
                      >
                        {t("common.auth.orders")}
                      </Link> */}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-white hover:text-[#CD7F32] hover:bg-gray-900 transition-colors"
                      >
                        {t("common.auth.logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-white hover:text-[#CD7F32] transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
              )}

              <button className="text-white hover:text-[#CD7F32] transition-colors md:hidden ml-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
