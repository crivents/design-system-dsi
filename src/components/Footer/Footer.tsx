import React from "react";
import type { ReactNode } from "react";
import type { FooterAddress, FooterInfo, FooterPartner } from "./Footer.types";
import Link from "../Link/Link";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface FooterProps {
  /** Identifiant unique */
  id?: string;
  /** URL du logo principal */
  logoUrl?: string;
  /** Texte alternatif du logo principal */
  logoAlt?: string;
  /** Composant logo personnalisé */
  logo?: ReactNode;
  /** Adresse postale */
  address?: FooterAddress;
  /** Zone d'interaction libre (liens, formulaires, boutons…) */
  interactions?: ReactNode;
  /** Logos partenaires (colonne droite) */
  partners?: FooterPartner[];
  /** Mention de copyright */
  copyright?: string;
  /** Liens et info de la page */
  infos?: FooterInfo[];
  /** Classes additionnelles */
  className?: string;
}

/* ==========================================================================
   COMPOSANT
   ========================================================================== */

const Footer: React.FC<FooterProps> = ({
  id = "main-footer",
  logoUrl,
  logoAlt = "Logo",
  logo,
  address,
  interactions,
  partners = [],
  infos = [],
  className = "",
}) => {
  const footerClasses = ["footer", className].filter(Boolean).join(" ");

  return (
    <footer id={id} className={footerClasses} role="contentinfo">
      <div className="footer__inner">
        {/* ============================================================
            Colonne 1 : Logo + adresse
            ============================================================ */}
        <div className="footer__section footer__section--brand">
          <div className="footer__logo-wrapper">
            {logo || (
              <a href="/" className="footer__logo-link">
                <img src={logoUrl} alt={logoAlt} className="footer__logo" />
              </a>
            )}
          </div>

          {address && (
            <address className="footer__address">
              <ul className="footer__address-lines">
                <li key="name" className="footer__address-name">
                  {address.name}
                </li>
                {address.lines.map((line, index) => (
                  <li key={index} className="footer__address-line">
                    {line}
                  </li>
                ))}
              </ul>

              {address.phone && (
                <Link
                  href={`tel:${address.phone.replace(/\s/g, "")}`}
                  className="footer__address-contact"
                  label={address.phone}
                  icon="Phone"
                />
              )}

              {address.email && (
                <Link
                  href={`mailto:${address.email}`}
                  className="footer__address-contact"
                  label={address.email}
                  icon="Mail"
                />
              )}
            </address>
          )}
        </div>

        {/* ============================================================
            Colonne 2 : Zone d'interaction libre
            ============================================================ */}
        <div className="footer__section footer__section--interactions">
          {infos.length > 0 && (
            <ul className="footer__infos">
              {infos.map((info) => (
                <li key={info.id} className="footer__infos-item">
                  {info.title && (
                    <p className="footer__info-title">{info.title}</p>
                  )}
                  {info.href ? (
                    <Link
                      href={info.href}
                      className="footer__infos-link"
                      label={info.label}
                      exertnal={true}
                    />
                  ) : (
                    <span className="footer__infos-link">{info.label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {interactions}
        </div>

        {/* ============================================================
            Colonne 3 : Logos FRANCE
            ============================================================ */}
        {partners.length > 0 && (
          <div className="footer__section footer__section--partners">
            <ul className="footer__partners-list">
              {partners.map((partner) => (
                <li key={partner.id} className="footer__partner">
                  {partner.href ? (
                    <a
                      href={partner.href}
                      className="footer__partner-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={partner.ariaLabel || partner.logoAlt}
                    >
                      <img
                        src={partner.logoUrl}
                        alt={partner.logoAlt}
                        className="footer__partner-logo"
                        width={100}
                        height={50}
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.logoUrl}
                      alt={partner.logoAlt}
                      className="footer__partner-logo"
                      width={100}
                      height={50}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
