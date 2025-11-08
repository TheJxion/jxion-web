import { useState } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  FileText,
  RotateCcw,
  Info,
  ExternalLink,
  Code,
  Server,
} from "lucide-react";
import { content } from "../lib/content";

export default function Settings() {
  const [brandName, setBrandName] = useState("Noir Jewellery");
  const [currency, setCurrency] = useState("TRY");

  const handleResetData = () => {
    if (confirm(content.settings.danger.resetDescription)) {
      alert("Veriler sıfırlandı (Demo amaçlı - gerçek veriler etkilenmedi)");
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+905551234567"; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
      "Merhaba, Noir Admin Dashboard hakkında bilgi almak istiyorum."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href =
      "mailto:developer@noirjewellery.com?subject=Noir Admin Dashboard Support";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
          {content.settings.title}
        </h1>
        <p className="text-noir-gray-600 font-sans">
          {content.settings.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            {content.settings.brand.title}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                {content.settings.brand.brandName}
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                {content.settings.brand.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
              >
                <option value="TRY">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-gradient-to-br from-noir-gold/10 to-noir-gold/5 rounded-lg shadow-md p-6 border border-noir-gold/20">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6 flex items-center gap-2">
            <MessageCircle className="text-noir-gold" size={24} />
            {content.settings.contact.title}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-sans font-semibold text-noir-black mb-3">
                {content.settings.contact.developer}
              </h3>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-sans font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Phone size={20} />
                <span>{content.settings.contact.whatsapp}</span>
                <ExternalLink size={16} />
              </button>
            </div>
            <div>
              <button
                onClick={handleEmail}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-noir-black hover:bg-noir-gray-800 text-white rounded-lg font-sans font-semibold transition-all duration-200"
              >
                <Mail size={20} />
                <span>{content.settings.contact.email}</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6 flex items-center gap-2">
            <Server className="text-noir-gray-600" size={24} />
            {content.settings.system.title}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-noir-gray-100">
              <span className="font-sans text-sm text-noir-gray-600">
                {content.settings.system.version}
              </span>
              <span className="font-sans text-sm font-semibold text-noir-black">
                v0.1.0
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-noir-gray-100">
              <span className="font-sans text-sm text-noir-gray-600">
                {content.settings.system.environment}
              </span>
              <span className="font-sans text-sm font-semibold text-noir-black">
                Development
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-sans text-sm text-noir-gray-600">
                {content.settings.system.lastUpdated}
              </span>
              <span className="font-sans text-sm font-semibold text-noir-black">
                {new Date().toLocaleDateString("tr-TR")}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            Quick Links
          </h2>
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-noir-gray-50 hover:bg-noir-gray-100 rounded-lg transition-colors group"
            >
              <FileText
                size={20}
                className="text-noir-gray-600 group-hover:text-noir-gold transition-colors"
              />
              <span className="font-sans text-sm text-noir-black group-hover:text-noir-gold transition-colors">
                {content.settings.contact.documentation}
              </span>
              <ExternalLink
                size={16}
                className="ml-auto text-noir-gray-400 group-hover:text-noir-gold transition-colors"
              />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-noir-gray-50 hover:bg-noir-gray-100 rounded-lg transition-colors group"
            >
              <Code
                size={20}
                className="text-noir-gray-600 group-hover:text-noir-gold transition-colors"
              />
              <span className="font-sans text-sm text-noir-black group-hover:text-noir-gold transition-colors">
                API Documentation
              </span>
              <ExternalLink
                size={16}
                className="ml-auto text-noir-gray-400 group-hover:text-noir-gold transition-colors"
              />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-noir-gray-50 hover:bg-noir-gray-100 rounded-lg transition-colors group"
            >
              <Info
                size={20}
                className="text-noir-gray-600 group-hover:text-noir-gold transition-colors"
              />
              <span className="font-sans text-sm text-noir-black group-hover:text-noir-gold transition-colors">
                Help & Support
              </span>
              <ExternalLink
                size={16}
                className="ml-auto text-noir-gray-400 group-hover:text-noir-gold transition-colors"
              />
            </a>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
          <h2 className="text-xl font-serif font-semibold text-red-600 mb-6 flex items-center gap-2">
            <RotateCcw size={24} />
            {content.settings.danger.title}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-sans font-semibold text-noir-black mb-2">
                {content.settings.danger.resetData}
              </h3>
              <p className="text-sm text-noir-gray-600 font-sans mb-4">
                {content.settings.danger.resetDescription}
              </p>
              <button
                onClick={handleResetData}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-sans font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <RotateCcw size={18} />
                {content.settings.danger.resetButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-noir-gold hover:bg-[#FFC700] text-noir-black rounded-lg font-sans font-semibold transition-all duration-200 shadow-lg shadow-noir-gold/30">
          {content.settings.save}
        </button>
      </div>
    </div>
  );
}
