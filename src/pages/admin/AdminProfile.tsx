import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const AdminProfile: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", icon: UserGroupIcon, label: t("admin.profile.users.title") },
    {
      id: "settings",
      icon: Cog6ToothIcon,
      label: t("admin.profile.settings.title"),
    },
    {
      id: "analytics",
      icon: ChartBarIcon,
      label: t("admin.profile.analytics.title"),
    },
    {
      id: "logs",
      icon: DocumentTextIcon,
      label: t("admin.profile.logs.title"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#CD7F32] p-6">
            <h1 className="text-2xl font-bold text-white">
              {t("admin.profile.title")}
            </h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#CD7F32] text-[#CD7F32]"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Users Management */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {t("admin.profile.users.title")}
                  </h2>
                  <button className="bg-[#CD7F32] text-white px-4 py-2 rounded hover:bg-[#B87333]">
                    {t("admin.profile.users.add")}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.id")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.name")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.email")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.role")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.status")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.users.columns.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Sample data - replace with actual data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Admin User
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          admin@example.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {t("admin.profile.users.roles.admin")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {t("admin.profile.users.status.active")}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-[#CD7F32] hover:text-[#B87333] mr-3">
                            {t("admin.profile.users.edit")}
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            {t("admin.profile.users.delete")}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  {t("admin.profile.settings.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">
                      {t("admin.profile.settings.general.title")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {t("admin.profile.settings.general.siteName")}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD7F32] focus:ring-[#CD7F32]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {t("admin.profile.settings.general.siteDescription")}
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD7F32] focus:ring-[#CD7F32]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">
                      {t("admin.profile.settings.security.title")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {t("admin.profile.settings.security.passwordPolicy")}
                        </label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#CD7F32] focus:ring-[#CD7F32] border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                              {t(
                                "admin.profile.settings.security.requireNumbers"
                              )}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#CD7F32] focus:ring-[#CD7F32] border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                              {t(
                                "admin.profile.settings.security.requireSpecialChars"
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  {t("admin.profile.analytics.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">
                      {t("admin.profile.analytics.users")}
                    </h3>
                    <div className="text-3xl font-bold text-[#CD7F32]">
                      1,234
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Total Users</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">
                      {t("admin.profile.analytics.sales")}
                    </h3>
                    <div className="text-3xl font-bold text-[#CD7F32]">
                      $45,678
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Total Sales</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">
                      {t("admin.profile.analytics.traffic")}
                    </h3>
                    <div className="text-3xl font-bold text-[#CD7F32]">
                      8,901
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Total Visits</p>
                  </div>
                </div>
              </div>
            )}

            {/* System Logs */}
            {activeTab === "logs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {t("admin.profile.logs.title")}
                  </h2>
                  <div className="flex space-x-4">
                    <button className="bg-[#CD7F32] text-white px-4 py-2 rounded hover:bg-[#B87333]">
                      {t("admin.profile.logs.download")}
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      {t("admin.profile.logs.clear")}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.logs.date")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.logs.level")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.logs.message")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("admin.profile.logs.type")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Sample log entry */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-03-20 14:30:45
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            INFO
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          User login successful
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Authentication
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
