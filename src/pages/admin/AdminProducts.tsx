import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  AdjustmentsHorizontalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { GunplaProduct } from "../../services/api";
import { mockProducts } from "../../data/mockData";
import GunplaImage from "../../components/common/GunplaImage";
import { useLanguage } from "../../contexts/LanguageContext";

type SortField = "name" | "price" | "stock" | "grade";
type SortOrder = "asc" | "desc";

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<GunplaProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<GunplaProduct | null>(
    null
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const { t } = useLanguage();

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortProducts = (a: GunplaProduct, b: GunplaProduct) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;

    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "price":
        return multiplier * (a.price - b.price);
      case "stock":
        return multiplier * (a.stock - b.stock);
      case "grade":
        return multiplier * a.grade.localeCompare(b.grade);
      default:
        return 0;
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade =
        selectedGrade === "all" || product.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    })
    .sort(sortProducts);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: GunplaProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== productId)
      );
    }
  };

  const getStockColor = (stock: number) => {
    if (stock > 10) return "bg-green-900/50 text-green-400";
    if (stock > 0) return "bg-yellow-900/50 text-yellow-400";
    return "bg-red-900/50 text-red-400";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          {t("admin.sidebar.products")}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#CD7F32] text-white rounded-sm hover:bg-[#B87333] transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {t("admin.profile.users.addUser")}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t("admin.profile.users.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#CD7F32]"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-800">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("product.details.modelNumber")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("product.details.series")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("product.details.grade")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("common.cart.price")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("common.cart.quantity")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("admin.profile.users.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-900">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 object-contain mix-blend-lighten"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {product.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-gray-900 rounded-sm max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {t("admin.profile.users.addUser")}
              </h2>
              {/* Add your form fields here */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  {t("common.cancel")}
                </button>
                <button className="ml-3 px-4 py-2 bg-[#CD7F32] text-white rounded-sm hover:bg-[#B87333]">
                  {t("common.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
