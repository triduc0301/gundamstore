import React from "react";
import {
  ChartBarIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
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
  ChartOptions,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useLanguage } from "../../contexts/LanguageContext";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();

  // Chart data configuration
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) =>
      t(`dashboard.charts.months.${month.toLowerCase()}`)
    ),
    datasets: [
      {
        label: t("dashboard.charts.salesOverview"),
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "#CD7F32",
        backgroundColor: "rgba(205, 127, 50, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) =>
      t(`dashboard.charts.days.${day.toLowerCase()}`)
    ),
    datasets: [
      {
        label: t("dashboard.charts.ordersOverview"),
        data: [12, 19, 15, 25, 22, 30, 18],
        backgroundColor: "rgba(205, 127, 50, 0.5)",
        borderColor: "#CD7F32",
        borderWidth: 1,
      },
    ],
  };

  // New chart data for inventory
  const inventoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) =>
      t(`dashboard.charts.months.${month.toLowerCase()}`)
    ),
    datasets: [
      {
        label: t("dashboard.charts.incomingStock"),
        data: [50, 75, 60, 85, 70, 90],
        backgroundColor: "rgba(52, 211, 153, 0.5)",
        borderColor: "#34D399",
        borderWidth: 1,
        stack: "stack",
      },
      {
        label: t("dashboard.charts.currentStock"),
        data: [120, 95, 110, 95, 105, 85],
        backgroundColor: "rgba(251, 191, 36, 0.5)",
        borderColor: "#FBB424",
        borderWidth: 1,
        stack: "stack",
      },
    ],
  };

  const stockStatusData = {
    labels: ["PG", "MG", "RG", "HG", "SD", "PB"],
    datasets: [
      {
        label: t("dashboard.charts.stockByGrade"),
        data: [85, 120, 75, 95, 45, 60],
        backgroundColor: [
          "rgba(205, 127, 50, 0.7)",
          "rgba(52, 211, 153, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(147, 51, 234, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  };

  // Chart options with legend
  const chartOptionsWithLegend: ChartOptions<"line" | "bar"> = {
    ...chartOptions,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
        },
      },
    },
  };

  const stats = [
    {
      name: t("dashboard.stats.totalSales"),
      value: "$128,500",
      change: "+12.5%",
      icon: CurrencyDollarIcon,
      color: "text-green-400",
    },
    {
      name: t("dashboard.stats.totalOrders"),
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCartIcon,
      color: "text-blue-400",
    },
    {
      name: t("dashboard.stats.totalCustomers"),
      value: "856",
      change: "+5.7%",
      icon: UserGroupIcon,
      color: "text-purple-400",
    },
    {
      name: t("dashboard.stats.conversionRate"),
      value: "3.2%",
      change: "+1.2%",
      icon: ChartBarIcon,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          {t("dashboard.title")}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-sm border border-gray-800 hover:border-[#CD7F32] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm font-medium ${stat.color} mt-1`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-gray-800 rounded-full">
                <stat.icon className="h-6 w-6 text-[#CD7F32]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-sm border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("dashboard.charts.salesOverview")}
          </h2>
          <div className="h-80">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-sm border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("dashboard.charts.ordersOverview")}
          </h2>
          <div className="h-80">
            <Bar data={ordersData} options={chartOptions} />
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-sm border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("dashboard.charts.inventoryFlow")}
          </h2>
          <div className="h-80">
            <Bar data={inventoryData} options={chartOptionsWithLegend} />
          </div>
        </div>

        {/* Stock Status Chart */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-sm border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("dashboard.charts.stockByGrade")}
          </h2>
          <div className="h-80">
            <Bar data={stockStatusData} options={chartOptionsWithLegend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
