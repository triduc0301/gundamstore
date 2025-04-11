import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { GunplaProduct } from "../../services/api";
import { mockProducts } from "../../data/mockData";
import GunplaImage from "../../components/common/GunplaImage";

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

  useEffect(() => {
    // Load products from mockData
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
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  const SortIcon = ({ field }: { field: SortField }) => (
    <ChevronUpDownIcon
      className={`h-4 w-4 inline-block ml-1 cursor-pointer ${
        sortField === field
          ? "text-[#CD7F32]"
          : "text-gray-400 hover:text-[#CD7F32]"
      }`}
    />
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Products Management</h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-[#CD7F32] text-white px-4 py-2 rounded-sm hover:bg-[#B87333] transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, grade, or model number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-sm border border-gray-800 focus:outline-none focus:border-[#CD7F32]"
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Products Table */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-sm border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black bg-opacity-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Image
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name <SortIcon field="name" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Price <SortIcon field="price" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("stock")}
                >
                  Stock <SortIcon field="stock" />
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer"
                  onClick={() => handleSort("grade")}
                >
                  Grade <SortIcon field="grade" />
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-sm overflow-hidden">
                      <GunplaImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-lighten"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {product.modelNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#CD7F32]">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-sm text-sm ${
                        product.stock > 10
                          ? "bg-green-900/50 text-green-400"
                          : product.stock > 0
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.grade}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-sm w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    Model Number
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Grade</label>
                  <select className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none">
                    <option value="">Select Grade</option>
                    <option value="Master Grade">Master Grade</option>
                    <option value="Perfect Grade">Perfect Grade</option>
                    <option value="Real Grade">Real Grade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Stock</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Series</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Image</label>
                <input
                  type="file"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#CD7F32] text-white px-6 py-2 rounded-sm hover:bg-[#B87333] transition-colors"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
