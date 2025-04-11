import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-sm">
              <h2 className="text-2xl font-bold mb-6 text-[#CD7F32]">
                {t("contact.info.title")}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-[#CD7F32] mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">
                      {t("contact.info.address.title")}
                    </h3>
                    <p className="text-gray-400">
                      {t("contact.info.address.value")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-6 w-6 text-[#CD7F32] mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">
                      {t("contact.info.phone.title")}
                    </h3>
                    <p className="text-gray-400">
                      {t("contact.info.phone.value")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="h-6 w-6 text-[#CD7F32] mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">
                      {t("contact.info.email.title")}
                    </h3>
                    <p className="text-gray-400">
                      {t("contact.info.email.value")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-6 w-6 text-[#CD7F32] mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">
                      {t("contact.info.hours.title")}
                    </h3>
                    <p className="text-gray-400">
                      {t("contact.info.hours.value")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-900 p-8 rounded-sm">
              <h2 className="text-2xl font-bold mb-6 text-[#CD7F32]">
                {t("contact.map.title")}
              </h2>
              <div className="aspect-video bg-gray-800 rounded-sm">
                {/* Add your map component here */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424044708739!2d106.6974669!3d10.7775989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sYour%20Location!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#CD7F32]">
              {t("contact.form.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm px-4 py-2 focus:outline-none focus:border-[#CD7F32]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm px-4 py-2 focus:outline-none focus:border-[#CD7F32]"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2">
                  {t("contact.form.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm px-4 py-2 focus:outline-none focus:border-[#CD7F32]"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-sm px-4 py-2 focus:outline-none focus:border-[#CD7F32]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#CD7F32] text-white py-3 rounded-sm hover:bg-[#B87333] transition-colors"
              >
                {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
