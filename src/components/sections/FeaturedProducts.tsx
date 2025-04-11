import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { gunplaApi, GunplaProduct } from "../../services/api";
import Loading from "../common/Loading";
import ProductSlider from "../products/ProductSlider";
import { useNavigate } from "react-router-dom";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<GunplaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await gunplaApi.getAllProducts();
        setProducts(data.slice(0, 20)); // Lấy 20 sản phẩm
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string | number) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <span className="text-[#CD7F32] mr-2">★</span> FEATURED PRODUCTS
      </h2>
      <div className="min-h-[800px] grid grid-rows-[1fr,auto]">
        <div className="relative">
          <ProductSlider
            products={products}
            itemsPerPage={6}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            renderItem={(product) => (
              <div
                key={product.id}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={() => handleProductClick(product.id)}
              >
                <ProductCard product={product} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
