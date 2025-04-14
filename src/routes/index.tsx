import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/common/Loading";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import Cart from "../components/layout/Cart";

// Lazy load các pages
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const AdminProfile = React.lazy(() => import("../pages/admin/AdminProfile"));
const Checkout = React.lazy(() => import("../pages/Checkout"));
const OrderConfirmation = React.lazy(
  () => import("../pages/OrderConfirmation")
);

// Admin pages
const AdminLayout = React.lazy(
  () => import("../components/layout/AdminLayout")
);
const AdminDashboard = React.lazy(
  () => import("../pages/admin/AdminDashboard")
);
const AdminProducts = React.lazy(() => import("../pages/admin/AdminProducts"));
const AdminCategories = React.lazy(
  () => import("../pages/admin/AdminCategories")
);
const AdminOrders = React.lazy(() => import("../pages/admin/AdminOrders"));

const AppRoutes: React.FC = () => {
  const { t } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>

      {/* Thêm Bottom Navigation cho mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden z-50">
        <div className="grid grid-cols-4 gap-1">
          <Link to="/" className="flex flex-col items-center py-3">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">{t("nav.home")}</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center py-3">
            <ShoppingBagIcon className="h-6 w-6" />
            <span className="text-xs mt-1">{t("nav.products")}</span>
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center py-3"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs mt-1">{t("nav.cart")}</span>
          </button>
          <Link to="/profile" className="flex flex-col items-center py-3">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">{t("nav.profile")}</span>
          </Link>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </Suspense>
  );
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.about.title")}
            </h3>
            <p className="text-gray-400">{t("footer.about.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2">{/* Links */}</ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.contact.title")}
            </h3>
            {/* Contact info */}
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <form className="flex">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 bg-black border border-gray-800 rounded-l-sm px-4 py-2"
              />
              <button className="bg-[#CD7F32] text-white px-4 rounded-r-sm">
                {t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 Gundam Store. {t("footer.rights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social media icons */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppRoutes;
