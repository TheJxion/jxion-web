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
import styles from "./Settings.module.scss";

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
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          {content.settings.title}
        </h1>
        <p className={styles.headerSubtitle}>
          {content.settings.subtitle}
        </p>
      </div>

      <div className={styles.settingsGrid}>
        {/* Brand Settings */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {content.settings.brand.title}
          </h2>
          <div className={styles.cardContent}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                {content.settings.brand.brandName}
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                {content.settings.brand.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={styles.formSelect}
              >
                <option value="TRY">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>
            <MessageCircle className={styles.contactIcon} size={24} />
            {content.settings.contact.title}
          </h2>
          <div className={styles.cardContent}>
            <div>
              <h3 className={styles.formLabel}>
                {content.settings.contact.developer}
              </h3>
              <button
                onClick={handleWhatsApp}
                className={`${styles.contactButton} ${styles['contactButton--whatsapp']}`}
              >
                <Phone size={20} />
                <span>{content.settings.contact.whatsapp}</span>
                <ExternalLink size={16} />
              </button>
            </div>
            <div>
              <button
                onClick={handleEmail}
                className={`${styles.contactButton} ${styles['contactButton--email']}`}
              >
                <Mail size={20} />
                <span>{content.settings.contact.email}</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Server size={24} />
            {content.settings.system.title}
          </h2>
          <div className={styles.systemInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoRowLabel}>
                {content.settings.system.version}
              </span>
              <span className={styles.infoRowValue}>v0.1.0</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoRowLabel}>
                {content.settings.system.environment}
              </span>
              <span className={styles.infoRowValue}>Development</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoRowLabel}>
                {content.settings.system.lastUpdated}
              </span>
              <span className={styles.infoRowValue}>
                {new Date().toLocaleDateString("tr-TR")}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Quick Links</h2>
          <div className={styles.quickLinks}>
            <a href="#" className={styles.quickLink}>
              <FileText size={20} className={styles.quickLinkIcon} />
              <span className={styles.quickLinkText}>
                {content.settings.contact.documentation}
              </span>
              <ExternalLink size={16} className={styles.quickLinkExternal} />
            </a>
            <a href="#" className={styles.quickLink}>
              <Code size={20} className={styles.quickLinkIcon} />
              <span className={styles.quickLinkText}>API Documentation</span>
              <ExternalLink size={16} className={styles.quickLinkExternal} />
            </a>
            <a href="#" className={styles.quickLink}>
              <Info size={20} className={styles.quickLinkIcon} />
              <span className={styles.quickLinkText}>Help & Support</span>
              <ExternalLink size={16} className={styles.quickLinkExternal} />
            </a>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <h2 className={styles.dangerTitle}>
            <RotateCcw size={24} />
            {content.settings.danger.title}
          </h2>
          <div className={styles.dangerContent}>
            <div>
              <h3 className={styles.dangerSectionTitle}>
                {content.settings.danger.resetData}
              </h3>
              <p className={styles.dangerSectionDescription}>
                {content.settings.danger.resetDescription}
              </p>
              <button
                onClick={handleResetData}
                className={styles.dangerButton}
              >
                <RotateCcw size={18} />
                {content.settings.danger.resetButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={styles.saveButton}>
        <button className={styles.saveButtonAction}>
          {content.settings.save}
        </button>
      </div>
    </div>
  );
}
