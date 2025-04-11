import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/common/Loading";

// Lazy load các pages
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const AdminProfile = React.lazy(() => import("../pages/admin/AdminProfile"));

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
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
