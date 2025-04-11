import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { gunplaApi, GunplaProduct } from "../../services/api";
import Loading from "../common/Loading";
import ProductSlider from "../products/ProductSlider";

const UpcomingProducts: React.FC = () => {
  const [products, setProducts] = useState<GunplaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await gunplaApi.getAllProducts();
        // Lấy 10 sản phẩm cuối làm upcoming và thêm ngày release giả lập
        const upcomingProducts = data.slice(-10).map((product) => ({
          ...product,
          releaseDate: new Date(
            Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(), // Convert to ISO string
        }));
        setProducts(upcomingProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load upcoming products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
          <span className="text-[#CD7F32] mr-2">NEW</span> UPCOMING RELEASES
        </h2>
        <ProductSlider
          products={products}
          itemsPerPage={3}
          renderItem={(product) => (
            <div
              key={product.id}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                {/* Release Date Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-sm p-2 border border-[#CD7F32]">
                    <div className="text-[#CD7F32] text-xs font-medium">
                      Release Date
                    </div>
                    <div className="text-white text-sm font-bold">
                      {product.releaseDate &&
                        new Date(product.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                    </div>
                  </div>
                </div>
                <ProductCard product={product} />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#CD7F32] text-black px-3 py-1 rounded-sm text-sm font-semibold">
                    Coming Soon
                  </span>
                  <div className="text-gray-400 text-xs">
                    Pre-order Available
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

export default UpcomingProducts;
