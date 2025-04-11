import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { gunplaApi, GunplaProduct } from "../../services/api";
import Loading from "../common/Loading";
import ProductSlider from "../products/ProductSlider";

const PopularProducts: React.FC = () => {
  const [products, setProducts] = useState<GunplaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await gunplaApi.getAllProducts();
        // Giả lập sản phẩm phổ biến bằng cách lấy ngẫu nhiên 10 sản phẩm
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError("Failed to load popular products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
          <span className="text-[#CD7F32] mr-2">⭐</span> POPULAR PRODUCTS
        </h2>
        <ProductSlider
          products={products}
          itemsPerPage={3}
          renderItem={(product: GunplaProduct) => (
            <div
              key={product.id}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <ProductCard product={product} />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-[#CD7F32] text-sm">
                  ★★★★★ (50+ reviews)
                </span>
                <span className="text-white text-sm">100+ sold</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PopularProducts;
