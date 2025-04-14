import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "../contexts/OrderContext";
import { useLanguage } from "../contexts/LanguageContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const { t } = useLanguage();
  const [order, setOrder] = useState(
    orderId ? getOrderById(orderId) : undefined
  );

  useEffect(() => {
    if (orderId) {
      setOrder(getOrderById(orderId));
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t("orderConfirmation.notFound")}
          </h1>
          <Link
            to="/"
            className="text-[#CD7F32] hover:text-[#B36A1A] transition-colors"
          >
            {t("common.navigation.backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t("orderConfirmation.thankYou")}
            </h1>
            <p className="text-gray-600">
              {t("orderConfirmation.orderNumber")}: {order.id}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("orderConfirmation.orderDetails")}
            </h2>
            <div className="space-y-4">
              {order.items.map(
                (item: {
                  id: string;
                  image: string;
                  name: string;
                  quantity: number;
                  price: number;
                }) => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">
                        {t("cart.quantity")}: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between mb-2">
                <span>{t("checkout.subtotal")}</span>
                <span>${order.total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t("checkout.shipping")}</span>
                <span>
                  {order.shippingMethod === "express"
                    ? "$10.00"
                    : t("checkout.free")}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>{t("checkout.total")}</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("checkout.shippingInfo")}
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">{t("checkout.fullName")}:</span>{" "}
                  {order.shippingInfo.fullName}
                </p>
                <p>
                  <span className="font-medium">{t("checkout.email")}:</span>{" "}
                  {order.shippingInfo.email}
                </p>
                <p>
                  <span className="font-medium">{t("checkout.phone")}:</span>{" "}
                  {order.shippingInfo.phone}
                </p>
                <p>
                  <span className="font-medium">{t("checkout.address")}:</span>{" "}
                  {order.shippingInfo.address}
                </p>
                <p>
                  <span className="font-medium">{t("checkout.city")}:</span>{" "}
                  {order.shippingInfo.city}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.postalCode")}:
                  </span>{" "}
                  {order.shippingInfo.postalCode}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("orderConfirmation.deliveryInfo")}
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">
                    {t("checkout.shippingMethod")}:
                  </span>{" "}
                  {order.shippingMethod === "express"
                    ? t("checkout.express")
                    : t("checkout.standard")}
                </p>
                <p>
                  <span className="font-medium">
                    {t("checkout.estimatedDelivery")}:
                  </span>{" "}
                  {order.shippingMethod === "express"
                    ? "1-2 " + t("checkout.days")
                    : "3-5 " + t("checkout.days")}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block bg-[#CD7F32] text-white px-8 py-3 rounded-md hover:bg-[#B36A1A] transition-colors"
            >
              {t("common.navigation.backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
