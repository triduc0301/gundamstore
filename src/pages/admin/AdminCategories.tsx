import React, { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      // Implement delete logic here
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <button
          onClick={handleAddCategory}
          className="bg-[#CD7F32] text-white px-4 py-2 rounded-sm hover:bg-[#B87333] transition-colors flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-900 rounded-sm overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-[#CD7F32] text-white p-1 rounded-sm hover:bg-[#B87333]"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white p-1 rounded-sm hover:bg-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-400">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-sm w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-sm border border-gray-700 focus:border-[#CD7F32] focus:outline-none"
                />
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
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#CD7F32] text-white px-4 py-2 rounded-sm hover:bg-[#B87333] transition-colors"
                >
                  {editingCategory ? "Update" : "Add"} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
