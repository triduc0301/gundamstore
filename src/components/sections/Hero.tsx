import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockProducts, GunplaProduct } from "../../data/mockData";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const products = mockProducts.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <div className="relative bg-black text-white min-h-[80vh]">
      {/* Main Content */}
      <div className="container mx-auto px-4 min-h-[80vh] relative">
        {products.map((product: GunplaProduct, index: number) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-700 transform ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index < currentSlide
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="grid grid-cols-12 gap-8 h-full items-center">
              {/* Left Content */}
              <div className="col-span-12 lg:col-span-5 space-y-6 z-20">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  {product.name}
                </h1>
                <p className="text-[#CD7F32] text-xl lg:text-2xl font-medium">
                  {product.grade}
                </p>
                <p className="text-gray-400 text-base lg:text-lg">
                  {product.description}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block bg-[#CD7F32] text-white px-8 py-3 text-lg hover:bg-[#B87333] transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Content - Image */}
              <div className="col-span-12 lg:col-span-7 relative h-full flex items-center justify-end">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[60vh] w-auto object-contain mix-blend-lighten cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {products.map((_: GunplaProduct, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-[#CD7F32]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
