import React from "react";
import { Link } from "react-router-dom";
import { GunplaProduct } from "../../services/api";
import GunplaImage from "../common/GunplaImage";

interface ProductCardProps {
  product: GunplaProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <div className="aspect-square bg-gray-900 rounded-sm overflow-hidden">
        <GunplaImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
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
