import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { gunplaApi, GunplaProduct } from "../../services/api";
import Loading from "../common/Loading";
import ProductSlider from "../products/ProductSlider";
import { useLanguage } from "../../contexts/LanguageContext";

const DiscountedProducts: React.FC = () => {
  const [products, setProducts] = useState<GunplaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await gunplaApi.getAllProducts();
        // Giả lập sản phẩm giảm giá bằng cách lấy 10 sản phẩm và thêm thông tin giảm giá
        const discounted = data.slice(0, 10).map((product) => ({
          ...product,
          originalPrice: product.price,
          price: product.price * 0.7, // Giảm giá 30%
          discountPercentage: 30,
        }));
        setProducts(discounted);
        setLoading(false);
      } catch (err) {
        setError(t("common.errors.failedToLoad"));
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="py-12 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            <span className="text-[#CD7F32]">
              {t("sections.special.titleHighlight")}
            </span>{" "}
            {t("sections.special.title")}
          </h2>
          <p className="text-gray-400">{t("sections.special.subtitle")}</p>
        </div>

        <ProductSlider
          products={products}
          itemsPerPage={3}
          renderItem={(product) => (
            <div className="relative group">
              {/* Sale Badge */}
              <div className="absolute -top-4 -right-4 z-20 w-20 h-20 transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-red-600 text-white rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl font-bold">-30%</div>
                    <div className="text-xs">{t("common.off")}</div>
                  </div>
                </div>
              </div>

              <ProductCard product={product} />

              {/* Price Section */}
              <div className="mt-4 text-center">
                <span className="text-gray-400 line-through text-lg">
                  ${product.originalPrice?.toFixed(2)}
                </span>
                <span className="text-[#CD7F32] text-2xl font-bold ml-4">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Timer Section */}
              <div className="mt-4 text-center text-gray-400">
                <p className="text-sm mb-2">
                  {t("sections.special.offerEnds")}
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-gray-800 px-3 py-2 rounded">
                    <span className="text-white font-bold">24</span>
                    <span className="text-xs block">
                      {t("common.time.hours")}
                    </span>
                  </div>
                  <div className="bg-gray-800 px-3 py-2 rounded">
                    <span className="text-white font-bold">59</span>
                    <span className="text-xs block">
                      {t("common.time.minutes")}
                    </span>
                  </div>
                  <div className="bg-gray-800 px-3 py-2 rounded">
                    <span className="text-white font-bold">59</span>
                    <span className="text-xs block">
                      {t("common.time.seconds")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DiscountedProducts;
