import React, { useState } from "react";
import { useOrders, Order } from "../../contexts/OrderContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { format } from "date-fns";
import { parseISO } from "date-fns"; // Added to handle date parsing

const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all"
  );

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingInfo.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.shippingInfo.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">{t("admin.orders.title")}</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t("admin.orders.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as Order["status"] | "all")
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">{t("admin.orders.allStatuses")}</option>
            <option value="pending">{t("admin.orders.pending")}</option>
            <option value="processing">{t("admin.orders.processing")}</option>
            <option value="shipped">{t("admin.orders.shipped")}</option>
            <option value="delivered">{t("admin.orders.delivered")}</option>
            <option value="cancelled">{t("admin.orders.cancelled")}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.orderId")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.customer")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.total")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("admin.orders.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <p className="font-medium">{order.shippingInfo.fullName}</p>
                    <p>{order.shippingInfo.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as Order["status"]
                      )
                    }
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      {
                        pending: "bg-yellow-100 text-yellow-800",
                        processing: "bg-blue-100 text-blue-800",
                        shipped: "bg-purple-100 text-purple-800",
                        delivered: "bg-green-100 text-green-800",
                        cancelled: "bg-red-100 text-red-800",
                      }[order.status]
                    }`}
                  >
                    <option value="pending">{t("admin.orders.pending")}</option>
                    <option value="processing">
                      {t("admin.orders.processing")}
                    </option>
                    <option value="shipped">{t("admin.orders.shipped")}</option>
                    <option value="delivered">
                      {t("admin.orders.delivered")}
                    </option>
                    <option value="cancelled">
                      {t("admin.orders.cancelled")}
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(order.createdAt, "PPp")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => openOrderDetails(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {t("admin.orders.viewDetails")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {t("admin.orders.orderDetails")} - {selectedOrder.id}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">
                  {t("admin.orders.customerInfo")}
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">
                      {t("checkout.fullName")}:
                    </span>{" "}
                    {selectedOrder.shippingInfo.fullName}
                  </p>
                  <p>
                    <span className="font-medium">{t("checkout.email")}:</span>{" "}
                    {selectedOrder.shippingInfo.email}
                  </p>
                  <p>
                    <span className="font-medium">{t("checkout.phone")}:</span>{" "}
                    {selectedOrder.shippingInfo.phone}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  {t("admin.orders.shippingInfo")}
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">
                      {t("checkout.address")}:
                    </span>{" "}
                    {selectedOrder.shippingInfo.address}
                  </p>
                  <p>
                    <span className="font-medium">{t("checkout.city")}:</span>{" "}
                    {selectedOrder.shippingInfo.city}
                  </p>
                  <p>
                    <span className="font-medium">
                      {t("checkout.postalCode")}:
                    </span>{" "}
                    {selectedOrder.shippingInfo.postalCode}
                  </p>
                  <p>
                    <span className="font-medium">
                      {t("checkout.shippingMethod")}:
                    </span>{" "}
                    {selectedOrder.shippingMethod === "express"
                      ? t("checkout.express")
                      : t("checkout.standard")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">{t("admin.orders.items")}</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-500">
                        {t("cart.quantity")}: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span>{t("checkout.subtotal")}</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t("checkout.shipping")}</span>
                  <span>
                    {selectedOrder.shippingMethod === "express"
                      ? "$10.00"
                      : t("checkout.free")}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>{t("checkout.total")}</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
