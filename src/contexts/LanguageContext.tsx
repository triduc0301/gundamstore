import React, { createContext, useContext, useState } from "react";
import { vi } from "../locales/vi";
import { en } from "../locales/en";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = language === "vi" ? vi : en;

    for (const k of keys) {
      if (value[k] === undefined) {
        // Fallback to English if Vietnamese translation is missing
        if (language === "vi") {
          value = en;
          for (const fallbackKey of keys) {
            if (value[fallbackKey] === undefined) {
              return key;
            }
            value = value[fallbackKey];
          }
          return value;
        }
        return key;
      }
      value = value[k];
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
