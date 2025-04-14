import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.about.title")}
            </h3>
            <p className="text-gray-400 mb-4">
              {t("footer.about.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#CD7F32]">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#CD7F32]">
                <GlobeAltIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#CD7F32]">
                <PhotoIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#CD7F32]">
                <VideoCameraIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-[#CD7F32]"
                >
                  {t("footer.links.products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-[#CD7F32]"
                >
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[#CD7F32]"
                >
                  {t("footer.links.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-[#CD7F32]"
                >
                  {t("footer.links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-[#CD7F32]"
                >
                  {t("footer.links.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-medium">Email:</span>{" "}
                support@gundamstore.com
              </li>
              <li className="text-gray-400">
                <span className="font-medium">
                  {t("footer.contact.phone")}:
                </span>{" "}
                +1 234 567 890
              </li>
              <li className="text-gray-400">
                <span className="font-medium">
                  {t("footer.contact.address")}:
                </span>{" "}
                123 Gundam Street, Tokyo, Japan
              </li>
              <li className="text-gray-400">
                <span className="font-medium">
                  {t("footer.contact.hours")}:
                </span>{" "}
                Mon - Fri, 9:00 - 18:00
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-gray-400 mb-4">
              {t("footer.newsletter.description")}
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 bg-black border border-gray-800 rounded-l-sm px-4 py-2 text-white focus:outline-none focus:border-[#CD7F32]"
              />
              <button className="bg-[#CD7F32] text-white px-6 py-2 rounded-r-sm hover:bg-[#B87333] transition-colors">
                {t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 Gundam Store. {t("footer.rights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/shipping"
                className="text-gray-400 hover:text-[#CD7F32]"
              >
                {t("footer.shipping")}
              </Link>
              <Link
                to="/returns"
                className="text-gray-400 hover:text-[#CD7F32]"
              >
                {t("footer.returns")}
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-[#CD7F32]">
                {t("footer.faq")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
