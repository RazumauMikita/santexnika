"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <div className={styles.topBarContacts}>
            <a href={SITE.phoneHref} className={styles.phone}>
              {SITE.phone}
            </a>
            <span className={styles.hours}>{SITE.workingHours}</span>
            <a href="#callback" className={styles.callbackBtn}>
              Заказать бесплатный звонок
            </a>
          </div>
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className={`container ${styles.mainBarInner}`}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C9.5 2 7.5 4 7.5 6.5V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8H16.5V6.5C16.5 4 14.5 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M9 14H15V16H9V14ZM9 17H13V19H9V17Z"
                  fill="var(--color-accent)"
                />
              </svg>
            </span>
            <span className={styles.logoText}>{SITE.name}</span>
          </Link>

          <nav className={styles.nav} aria-label="Основная навигация">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href={SITE.phoneHref} className={styles.mobilePhone}>
            {SITE.phone}
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuOverlay} onClick={closeMenu} />
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#callback" className={styles.mobileCallbackBtn} onClick={closeMenu}>
            Заказать бесплатный звонок
          </a>
          <p className={styles.mobileHours}>{SITE.workingHours}</p>
        </nav>
      </div>
    </header>
  );
}
