import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OrderProvider } from "./contexts/OrderContext";
import AppRoutes from "./routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col bg-black text-white">
                <Navbar />
                <main className="flex-grow pt-16">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
