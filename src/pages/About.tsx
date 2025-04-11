import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("about.hero.title")}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("about.hero.description")}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900 p-8 rounded-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#CD7F32]">
              {t("about.mission.title")}
            </h2>
            <p className="text-gray-400">{t("about.mission.description")}</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#CD7F32]">
              {t("about.vision.title")}
            </h2>
            <p className="text-gray-400">{t("about.vision.description")}</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("about.team.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div
                key={member}
                className="bg-gray-900 p-6 rounded-sm text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-800 rounded-full" />
                <h3 className="text-xl font-bold mb-2">
                  {t(`about.team.member${member}.name`)}
                </h3>
                <p className="text-[#CD7F32] mb-4">
                  {t(`about.team.member${member}.role`)}
                </p>
                <p className="text-gray-400">
                  {t(`about.team.member${member}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("about.values.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((value) => (
              <div
                key={value}
                className="bg-gray-900 p-6 rounded-sm text-center"
              >
                <div className="text-4xl mb-4 text-[#CD7F32]">
                  {t(`about.values.value${value}.icon`)}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t(`about.values.value${value}.title`)}
                </h3>
                <p className="text-gray-400">
                  {t(`about.values.value${value}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
