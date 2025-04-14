import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCart } from "../../contexts/CartContext";
import { GunplaProduct } from "../../services/api";

interface FeaturedProductsProps {
  products: GunplaProduct[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          {t("home.featured.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-sm overflow-hidden group"
            >
              <Link
                to={`/product/${product.id}`}
                className="block aspect-square"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-lighten transform group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-4">
                <Link
                  to={`/product/${product.id}`}
                  className="block text-white font-medium hover:text-[#CD7F32] transition-colors mb-2"
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-[#CD7F32] text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                      })
                    }
                    className="bg-[#CD7F32] text-white px-4 py-2 rounded-sm hover:bg-[#B87333] transition-colors"
                  >
                    {t("common.cart.addToCart")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
