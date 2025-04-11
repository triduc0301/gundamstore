import React from "react";
import Hero from "../components/sections/Hero";
import CategoryList from "../components/layout/CategoryList";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import UpcomingProducts from "../components/sections/UpcomingProducts";
import PopularProducts from "../components/sections/PopularProducts";
import DiscountedProducts from "../components/sections/DiscountedProducts";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <CategoryList />
          </div>
          {/* Featured Products */}
          <div className="lg:w-3/4">
            <FeaturedProducts />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <PopularProducts />
        <DiscountedProducts />
        <UpcomingProducts />
      </div>
    </div>
  );
};

export default Home;
