"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CallbackModal } from "@/components/CallbackModal";
import { SITE, NAV_LINKS } from "@/lib/constants";
import logoImage from "@/public/images/logo.png";
import styles from "./Header.module.css";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleCallbackClick = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled || isMenuOpen ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} onClick={handleMenuClose}>
            <Image
              src={logoImage}
              alt={SITE.name}
              className={styles.logoImage}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Основная навигация">
            <ul className={styles.navList}>
              {NAV_LINKS.map((item) => (
                <li key={item.href} className={styles.navListItem}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.desktopContact}>
            <a className={styles.phone} href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <span className={styles.workingHours}>{SITE.workingHours}</span>
            <button
              type="button"
              className={styles.callbackBtn}
              onClick={() => setIsModalOpen(true)}
            >
              <span className={styles.callbackBtnLabel}>
                Заказать бесплатный
                <span className={styles.callbackBtnSecondLine}>звонок</span>
              </span>
            </button>
          </div>

          <button
            type="button"
            className={`${styles.burgerBtn} ${isMenuOpen ? styles.burgerBtnOpen : ""}`}
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <nav aria-label="Мобильная навигация">
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map((item) => (
                <li key={item.href} className={styles.mobileNavItem}>
                  <Link href={item.href} onClick={handleMenuClose}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileContact}>
            <a className={styles.mobilePhone} href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <span className={styles.mobileWorkingHours}>
              {SITE.workingHours}
            </span>
            <button
              type="button"
              className={styles.mobileCallbackBtn}
              onClick={handleCallbackClick}
            >
              <span className={styles.callbackBtnLabel}>
                Заказать бесплатный
                <span className={styles.callbackBtnSecondLine}>звонок</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
