import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setLanguage(language === "en" ? "vi" : "en")}
        className="bg-[#CD7F32] text-white px-4 py-2 rounded-full hover:bg-[#B87333] transition-colors shadow-lg"
      >
        {language === "en" ? "Tiếng Việt" : "English"}
      </button>
    </div>
  );
};

export default LanguageToggle;
