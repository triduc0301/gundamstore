import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useOrders } from "../contexts/OrderContext";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeftIcon,
  CreditCardIcon,
  TruckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout: React.FC = () => {
  const { t } = useLanguage();
  const { cartItems, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [shippingInfo, setShippingInfo] = useState<ShippingForm>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate shipping info
    if (!shippingInfo.fullName)
      newErrors.fullName = t("checkout.errors.required");
    if (!shippingInfo.email) newErrors.email = t("checkout.errors.required");
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
      newErrors.email = t("checkout.errors.invalidEmail");
    if (!shippingInfo.phone) newErrors.phone = t("checkout.errors.required");
    if (!shippingInfo.address)
      newErrors.address = t("checkout.errors.required");
    if (!shippingInfo.city) newErrors.city = t("checkout.errors.required");
    if (!shippingInfo.postalCode)
      newErrors.postalCode = t("checkout.errors.required");

    // Validate payment info
    if (!paymentInfo.cardNumber)
      newErrors.cardNumber = t("checkout.errors.required");
    else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = t("checkout.errors.invalidCard");

    if (!paymentInfo.expiryDate)
      newErrors.expiryDate = t("checkout.errors.required");
    else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expiryDate))
      newErrors.expiryDate = t("checkout.errors.invalidExpiry");

    if (!paymentInfo.cvv) newErrors.cvv = t("checkout.errors.required");
    else if (!/^\d{3,4}$/.test(paymentInfo.cvv))
      newErrors.cvv = t("checkout.errors.invalidCvv");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/")
        .substr(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 4);
    }

    setPaymentInfo((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        userId: user.id,
        items: cartItems.map((item) => ({ ...item, orderId: "" })),
        total: total + (shippingMethod === "express" ? 10 : 0) + total * 0.1,
        status: "pending",
        shippingInfo,
        paymentInfo: {
          method: "credit_card",
          cardNumber: paymentInfo.cardNumber.replace(/\s/g, ""),
          expiryDate: paymentInfo.expiryDate,
        },
        shippingMethod,
      });

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Failed to create order:", error);
      setErrors({ submit: t("checkout.errors.failed") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t("checkout.backToCart")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping and Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.submit && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {errors.submit}
                </div>
              )}

              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <TruckIcon className="h-6 w-6 mr-2 text-[#CD7F32]" />
                  {t("checkout.shippingInfo")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.fullName")}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.address")}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.postalCode")}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.postalCode ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {t("checkout.shippingMethod")}
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) =>
                        setShippingMethod(
                          e.target.value as "standard" | "express"
                        )
                      }
                      className="h-4 w-4 text-[#CD7F32] focus:ring-[#CD7F32]"
                    />
                    <div className="ml-3">
                      <span className="block font-medium">
                        {t("checkout.standard")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t("checkout.estimatedDelivery")}: 3-5{" "}
                        {t("checkout.days")}
                      </span>
                    </div>
                    <span className="ml-auto font-medium">
                      {t("checkout.free")}
                    </span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) =>
                        setShippingMethod(
                          e.target.value as "standard" | "express"
                        )
                      }
                      className="h-4 w-4 text-[#CD7F32] focus:ring-[#CD7F32]"
                    />
                    <div className="ml-3">
                      <span className="block font-medium">
                        {t("checkout.express")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t("checkout.estimatedDelivery")}: 1-2{" "}
                        {t("checkout.days")}
                      </span>
                    </div>
                    <span className="ml-auto font-medium">$10.00</span>
                  </label>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCardIcon className="h-6 w-6 mr-2 text-[#CD7F32]" />
                  {t("checkout.paymentInfo")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("checkout.cardNumber")}
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      className={`w-full px-3 py-2 border ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("checkout.expiryDate")}
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentInfoChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("checkout.cvv")}
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentInfoChange}
                        className={`w-full px-3 py-2 border ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD7F32]`}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#CD7F32] text-white py-3 rounded-md hover:bg-[#B36A1A] transition-colors disabled:opacity-50"
              >
                {isSubmitting
                  ? t("checkout.processing")
                  : t("checkout.placeOrder")}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("checkout.orderSummary")}
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {t("cart.quantity")}: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t("checkout.items")}</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("checkout.shipping")}</span>
                    <span>
                      {shippingMethod === "standard"
                        ? t("checkout.free")
                        : "$10.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("checkout.tax")}</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>{t("checkout.grandTotal")}</span>
                    <span>
                      $
                      {(
                        total +
                        (shippingMethod === "express" ? 10 : 0) +
                        total * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
