import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { GunplaProduct } from "../../services/api";

interface ProductSliderProps {
  products: GunplaProduct[];
  itemsPerPage: number;
  renderItem: (product: GunplaProduct) => React.ReactNode;
  gridCols?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  itemsPerPage,
  renderItem,
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      {/* Products Grid */}
      <div className="relative">
        <div className={`grid ${gridCols} gap-6`}>
          {currentProducts.map((product) => renderItem(product))}
          {currentProducts.length < itemsPerPage &&
            Array(itemsPerPage - currentProducts.length)
              .fill(null)
              .map((_, index) => (
                <div key={`empty-${index}`} className="invisible">
                  {renderItem(products[0])}
                </div>
              ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2 text-gray-400">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === index ? "bg-[#CD7F32]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
