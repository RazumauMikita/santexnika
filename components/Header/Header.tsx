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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            <Image
              src={logoImage}
              alt={SITE.name}
              className={styles.logoImage}
              priority
            />
          </Link>
          <nav>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.href} className={styles.navListItem}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.contact}>
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
        </div>
      </header>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
