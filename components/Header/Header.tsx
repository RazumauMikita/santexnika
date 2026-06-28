"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CallbackModal } from "@/components/CallbackModal";
import { SITE } from "@/lib/constants";
import logoImage from "@/public/images/logo.png";
import styles from "./Header.module.css";

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Объекты", href: "#objects" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Гарантии", href: "#guarantees" },
  { label: "Контакты", href: "#contacts" },
] as const;
const phone = "8 (033) 666-69-94";
const workingHours = "Время работы с 8.00 до 23.00";

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
              {navItems.map((item) => (
                <li key={item.href} className={styles.navListItem}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.desktopContact}>
            <span className={styles.phone}>{phone}</span>
            <span className={styles.workingHours}>{workingHours}</span>
            <button
              type="button"
              className={styles.callbackBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Заказать бесплатный звонок
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
              {navItems.map((item) => (
                <li key={item.href} className={styles.mobileNavItem}>
                  <Link href={item.href} onClick={handleMenuClose}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileContact}>
            <a className={styles.mobilePhone} href="tel:+375336666994">
              {phone}
            </a>
            <span className={styles.mobileWorkingHours}>{workingHours}</span>
            <button
              type="button"
              className={styles.mobileCallbackBtn}
              onClick={handleCallbackClick}
            >
              Заказать бесплатный звонок
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
