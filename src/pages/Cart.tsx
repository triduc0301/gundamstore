import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";

const Cart: React.FC = () => {
  const { t } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } =
    useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">{t("cart.empty")}</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#CD7F32] text-white px-6 py-2 rounded-md hover:bg-[#B36A1A] transition-colors"
            >
              {t("cart.continueShopping")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{t("cart.title")}</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    {t("cart.clearAll")}
                  </button>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b last:border-b-0 flex items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-4 w-24 text-right">
                      <p className="font-medium">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {t("cart.orderSummary")}
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("cart.subtotal")}</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("cart.shipping")}</span>
                    <span>{t("cart.free")}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>{t("cart.total")}</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 bg-[#CD7F32] text-white py-3 rounded-md hover:bg-[#B36A1A] transition-colors"
                >
                  {t("cart.checkout")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
