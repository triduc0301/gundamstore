import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[80vh] bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-block bg-[#CD7F32] text-white px-8 py-3 rounded-sm hover:bg-[#B87333] transition-colors text-center"
            >
              {t("home.hero.shopNow")}
            </Link>
            <Link
              to="/about"
              className="inline-block border border-white text-white px-8 py-3 rounded-sm hover:bg-white hover:text-black transition-colors text-center"
            >
              {t("home.hero.learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
