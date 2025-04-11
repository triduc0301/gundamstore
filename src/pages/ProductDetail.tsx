import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { gunplaApi, GunplaProduct } from "../services/api";
import { useCart } from "../contexts/CartContext";
import Loading from "../components/common/Loading";
import GunplaImage from "../components/common/GunplaImage";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<GunplaProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await gunplaApi.getProductById(id);
          setProduct(data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="text-gray-400 hover:text-[#CD7F32]">
            {t("common.navigation.home")}
          </Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-[#CD7F32]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-900 rounded-sm overflow-hidden">
            <GunplaImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-lighten"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl text-[#CD7F32]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {t("product.details.modelNumber")}
                  </h3>
                  <p className="text-gray-400">{product.modelNumber}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {t("product.details.series")}
                  </h3>
                  <p className="text-gray-400">{product.series}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {t("product.details.grade")}
                  </h3>
                  <p className="text-gray-400">{product.grade}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {t("product.details.manufacturer")}
                  </h3>
                  <p className="text-gray-400">{product.manufacturer}</p>
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {t("product.details.description")}
                  </h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg">{t("common.cart.quantity")}:</span>
              <div className="flex items-center border border-gray-700 rounded-sm">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-800 transition-colors"
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-center bg-transparent border-x border-gray-700 py-2"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-800 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-8 rounded-sm transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#CD7F32] hover:bg-[#B87333]"
              }`}
            >
              {addedToCart
                ? t("common.cart.addedToCart")
                : t("common.cart.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
