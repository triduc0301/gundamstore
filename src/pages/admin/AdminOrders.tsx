import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Mock data for orders
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  createdAt: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: "1",
        name: "RX-78-2 Gundam",
        price: 55.0,
        quantity: 1,
        image: "/images/rx78-2/rx78.png",
      },
    ],
    total: 55.0,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2024-03-15T10:30:00Z",
    shippingAddress: "123 Main St, City, Country",
  },
  // Add more mock orders here
];

type SortField = "id" | "customerName" | "total" | "status" | "createdAt";
type SortOrder = "asc" | "desc";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all"
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortOrders = (a: Order, b: Order) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;

    switch (sortField) {
      case "id":
        return multiplier * a.id.localeCompare(b.id);
      case "customerName":
        return multiplier * a.customerName.localeCompare(b.customerName);
      case "total":
        return multiplier * (a.total - b.total);
      case "status":
        return multiplier * a.status.localeCompare(b.status);
      case "createdAt":
        return (
          multiplier *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        );
      default:
        return 0;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/20";
      case "processing":
        return "text-blue-400 bg-blue-400/20";
      case "shipped":
        return "text-purple-400 bg-purple-400/20";
      case "delivered":
        return "text-green-400 bg-green-400/20";
      case "cancelled":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "text-green-400 bg-green-400/20";
      case "unpaid":
        return "text-red-400 bg-red-400/20";
      case "refunded":
        return "text-yellow-400 bg-yellow-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort(sortOrders);

  const SortIcon = ({ field }: { field: SortField }) => (
    <ChevronUpDownIcon
      className={`h-4 w-4 inline-block ml-1 cursor-pointer ${
        sortField === field
          ? "text-[#CD7F32]"
          : "text-gray-400 hover:text-[#CD7F32]"
      }`}
    />
  );

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Orders Management</h1>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as Order["status"] | "all")
            }
            className="bg-gray-900 text-white px-4 py-2 rounded-sm border border-gray-800 focus:outline-none focus:border-[#CD7F32]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by order ID, customer name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-sm border border-gray-800 focus:outline-none focus:border-[#CD7F32]"
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Orders Table */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-sm border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black bg-opacity-50">
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  Order ID <SortIcon field="id" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("customerName")}
                >
                  Customer <SortIcon field="customerName" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("total")}
                >
                  Total <SortIcon field="total" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon field="status" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Date <SortIcon field="createdAt" />
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white">{order.customerName}</div>
                      <div className="text-sm text-gray-400">
                        {order.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#CD7F32] font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Order Details - {selectedOrder.id}
                </h2>
                <p className="text-gray-400">
                  Placed on{" "}
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Customer Information
                </h3>
                <div className="space-y-2 text-gray-400">
                  <p>{selectedOrder.customerName}</p>
                  <p>{selectedOrder.customerEmail}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-400">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">
                Order Items
              </h3>
              <div className="bg-black bg-opacity-50 rounded-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-2 text-left text-gray-400">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-gray-400">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-gray-400">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-right text-gray-400">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr
                        key={item.productId}
                        className="border-b border-gray-800"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-800 rounded-sm overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain mix-blend-lighten"
                              />
                            </div>
                            <span className="text-white">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-400">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-gray-400">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-right text-[#CD7F32]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-800">
                      <td
                        colSpan={3}
                        className="px-4 py-4 text-right text-white"
                      >
                        Total
                      </td>
                      <td className="px-4 py-4 text-right text-[#CD7F32] font-bold">
                        ${selectedOrder.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Update Status:</span>
                <div className="flex space-x-2">
                  {[
                    "pending",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateOrderStatus(
                          selectedOrder.id,
                          status as Order["status"]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.status === status
                          ? getStatusColor(status as Order["status"])
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
