import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ChartBarIcon,
  CubeIcon,
  TagIcon,
  ShoppingBagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../../contexts/LanguageContext";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("admin.sidebar.accessDenied")}
          </h1>
          <p className="text-gray-400">{t("admin.sidebar.noPermission")}</p>
          <Link
            to="/"
            className="text-[#CD7F32] hover:text-[#B87333] mt-4 inline-block"
          >
            {t("admin.sidebar.returnHome")}
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: ChartBarIcon,
      label: t("admin.sidebar.dashboard"),
    },
    {
      path: "/admin/products",
      icon: CubeIcon,
      label: t("admin.sidebar.products"),
    },
    {
      path: "/admin/categories",
      icon: TagIcon,
      label: t("admin.sidebar.categories"),
    },
    {
      path: "/admin/orders",
      icon: ShoppingBagIcon,
      label: t("admin.sidebar.orders"),
    },
    {
      path: "/admin/profile",
      icon: UserIcon,
      label: t("admin.sidebar.profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-gradient-to-b from-gray-900 to-black min-h-screen fixed left-0 transition-all duration-300`}
        >
          {/* Header Section with Logo and Toggle */}
          <div className="relative h-16 border-b border-gray-800">
            {/* Logo Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className={`text-2xl font-bold bg-gradient-to-r from-[#CD7F32] to-[#B87333] bg-clip-text text-transparent transition-all duration-300 ${
                  !isSidebarOpen && "text-center text-xl"
                }`}
              >
                {isSidebarOpen
                  ? t("admin.sidebar.title")
                  : t("admin.sidebar.shortTitle")}
              </h1>
            </div>

            {/* Toggle Button Container */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="h-16 w-6 flex items-center justify-center bg-gradient-to-r from-gray-900 to-black hover:from-[#CD7F32] hover:to-[#B87333] transition-all duration-300"
              >
                {isSidebarOpen ? (
                  <ChevronLeftIcon className="h-4 w-4 text-white" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-sm mb-2 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <div className={`${!isSidebarOpen && "mx-auto"}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-8 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
