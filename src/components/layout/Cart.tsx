import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../../contexts/LanguageContext";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, total } =
    useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose(); // Close cart sidebar
    navigate("/checkout"); // Navigate to checkout page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-gray-800 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {t("cart.title")} ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center">{t("cart.empty")}</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-900 rounded-sm overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-lighten"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-[#CD7F32]">${item.price.toFixed(2)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-800 rounded-sm transition-colors"
                        aria-label={t("cart.quantity")}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-800 rounded-sm transition-colors"
                        aria-label={t("cart.quantity")}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={t("cart.remove")}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">{t("cart.total")}</span>
            <span className="text-xl font-bold text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#CD7F32] text-white py-3 rounded-sm hover:bg-[#B87333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
          >
            {t("cart.checkout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
