import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useOrders } from "../../contexts/OrderContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { orders } = useOrders();

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;

  // Prepare data for charts
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: t("admin.dashboard.revenue"),
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "#CD7F32",
        backgroundColor: "rgba(205, 127, 50, 0.1)",
        fill: true,
      },
    ],
  };

  const ordersStatusData = {
    labels: [
      t("admin.orders.pending"),
      t("admin.orders.processing"),
      t("admin.orders.shipped"),
      t("admin.orders.delivered"),
    ],
    datasets: [
      {
        data: [pendingOrders, processingOrders, 15, 25],
        backgroundColor: ["#FCD34D", "#60A5FA", "#A78BFA", "#34D399"],
      },
    ],
  };

  const popularProductsData = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: t("admin.dashboard.sales"),
        data: [45, 35, 30, 25, 20],
        backgroundColor: "#CD7F32",
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("admin.dashboard.totalOrders")}
          </h3>
          <p className="text-3xl font-bold text-[#CD7F32]">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("admin.dashboard.revenue")}
          </h3>
          <p className="text-3xl font-bold text-[#CD7F32]">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("admin.dashboard.pendingOrders")}
          </h3>
          <p className="text-3xl font-bold text-[#CD7F32]">{pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("admin.dashboard.processingOrders")}
          </h3>
          <p className="text-3xl font-bold text-[#CD7F32]">
            {processingOrders}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t("admin.dashboard.salesChart")}
          </h3>
          <Line data={salesData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t("admin.dashboard.orderStatus")}
          </h3>
          <div className="w-2/3 mx-auto">
            <Doughnut data={ordersStatusData} />
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("admin.dashboard.popularProducts")}
        </h3>
        <Bar data={popularProductsData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
