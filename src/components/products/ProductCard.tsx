import React from "react";
import { Link } from "react-router-dom";
import { GunplaProduct } from "../../services/api";
import GunplaImage from "../common/GunplaImage";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProductCardProps {
  product: GunplaProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();

  return (
    <div className="group">
      <div className="aspect-square bg-gray-900 rounded-sm overflow-hidden relative">
        <GunplaImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-50 transition-opacity duration-300"
        />
        {/* More Info Button - Appears on hover */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="bg-black/70 text-white px-6 py-2 rounded-sm hover:bg-[#CD7F32] transition-colors duration-300">
            {t("common.buttons.moreInfo")}
          </span>
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        <Link
          to={`/product/${product.id}`}
          className="text-sm hover:text-gray-300 block"
        >
          {product.name}
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{product.modelNumber}</span>
          <p className="text-sm font-medium text-[#CD7F32]">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
