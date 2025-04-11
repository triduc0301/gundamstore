import React from "react";

const categories = [
  "High Grade",
  "Master Grade",
  "Real Grade",
  "Perfect Grade",
  "Other",
];

const CategoryList: React.FC = () => {
  return (
    <div className="bg-black">
      <h2 className="text-2xl font-bold mb-8">CATEGORIES</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replace(" ", "-")}`}
            className="flex items-center justify-between py-2 text-gray-300 hover:text-white border-b border-gray-800 transition-colors"
          >
            <span className="text-sm font-medium">{category}</span>
            <span className="text-lg">›</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
