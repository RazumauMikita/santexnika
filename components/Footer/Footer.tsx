"use client";

import { useState } from "react";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { LEGAL, SITE } from "@/lib/constants";
import styles from "./Footer.module.css";

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer id="contacts" className={styles.footer}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.block}>
            <p className={styles.title}>{SITE.name}</p>
            <p className={styles.text}>{LEGAL.ownerLabel}</p>
            <p className={styles.text}>УНП {LEGAL.unp}</p>
            <p className={styles.text}>
              Дата регистрации: {LEGAL.registrationDate}
            </p>
            {LEGAL.legalAddress ? (
              <p className={styles.text}>{LEGAL.legalAddress}</p>
            ) : null}
          </div>

          <div className={styles.block}>
            <p className={styles.title}>Контакты</p>
            <a className={styles.link} href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <a className={styles.link} href={`mailto:${LEGAL.email}`}>
              {LEGAL.email}
            </a>
            <p className={styles.text}>{SITE.workingHours}</p>
            <p className={styles.text}>Оплата: {SITE.paymentMethods}</p>
          </div>

          <div className={styles.block}>
            <button
              type="button"
              className={styles.policyBtn}
              onClick={() => setIsPrivacyOpen(true)}
            >
              Политика конфиденциальности
            </button>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {LEGAL.ownerLabel}
            </p>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
