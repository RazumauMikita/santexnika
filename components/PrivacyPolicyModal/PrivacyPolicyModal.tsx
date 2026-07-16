"use client";

import Image from "next/image";
import { useEffect } from "react";
import { LEGAL, SITE } from "@/lib/constants";
import closeIcon from "@/public/icons/popup_close.png";
import styles from "./PrivacyPolicyModal.module.css";

type PrivacyPolicyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PrivacyPolicyModal({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Image src={closeIcon} alt="" width={22} height={22} />
        </button>

        <div className={styles.card}>
          <h2 id="privacy-modal-title" className={styles.title}>
            Политика конфиденциальности
          </h2>
          <div className={styles.content}>
            <p>
              {LEGAL.ownerLabel} (УНП {LEGAL.unp}), далее — Оператор, уважает
              ваше право на конфиденциальность при заполнении, передаче и
              хранении персональных данных. Отправляя заявку на сайте «
              {SITE.name}», вы соглашаетесь на обработку указанных данных.
            </p>
            <p>
              Оператор обрабатывает персональные данные, которые вы
              добровольно указываете в форме: имя, номер телефона, а также иные
              сведения, переданные при обращении.
            </p>
            <p>
              Цель обработки — связь с вами, консультация и оказание услуг по
              заявке. Данные не передаются третьим лицам, за исключением
              случаев, предусмотренных законодательством Республики Беларусь.
            </p>
            <p>
              По вопросам обработки персональных данных обращайтесь:{" "}
              <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>, тел.{" "}
              <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
