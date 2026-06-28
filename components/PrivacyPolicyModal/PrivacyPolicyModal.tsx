"use client";

import Image from "next/image";
import { useEffect } from "react";
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
              Компания уважает ваше право и соблюдает конфиденциальность при
              заполнении, передаче и хранении ваших конфиденциальных сведений.
              Размещение заявки на сайте компании «Сантехника Витебск» означает
              ваше согласие на обработку данных.
            </p>
            <p>
              Под персональными данными подразумевается информация, относящаяся
              к субъекту персональных данных, в частности фамилия, имя и
              отчество, дата рождения, адрес, телефон, адрес электронной почты,
              семейное, имущественное положение и иные данные.
            </p>
            <p>
              Целью обработки персональных данных является оказание услуг для
              клиентов компании «Сантехника Витебск».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
