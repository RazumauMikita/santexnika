"use client";

import Image from "next/image";
import { useState } from "react";
import { FormHoneypot } from "@/components/FormHoneypot";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { getNameError } from "@/lib/belarusPhone";
import { useCallbackForm } from "@/lib/useCallbackForm";
import lockIcon from "@/public/icons/lock.png";
import styles from "./HeroContactForm.module.css";

export function HeroContactForm() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const {
    name,
    setName,
    phone,
    nameError,
    setNameError,
    phoneError,
    honeypot,
    setHoneypot,
    isSubmitting,
    isSuccess,
    formError,
    handleSubmit,
    handlePhoneKeyDown,
    handlePhoneBeforeInput,
    handlePhonePaste,
    handlePhoneFocus,
    handlePhoneBlur,
    handlePhoneChange,
  } = useCallbackForm();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormHoneypot value={honeypot} onChange={setHoneypot} />

        <div className={styles.header}>
          <p className={styles.headerTop}>Получите</p>
          <p className={styles.headerMain}>бесплатную консультацию</p>
          <p className={styles.headerBottom}>мастера лично или по телефону</p>
        </div>

        <div className={styles.field}>
          <input
            type="text"
            name="name"
            className={`${styles.input} ${nameError ? styles.inputInvalid : ""}`}
            placeholder="Имя"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (nameError) {
                setNameError(getNameError(event.target.value) ?? "");
              }
            }}
            onBlur={() => setNameError(getNameError(name) ?? "")}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.field}>
          <input
            type="tel"
            name="phone"
            className={`${styles.input} ${phoneError ? styles.inputInvalid : ""}`}
            placeholder="Телефон"
            autoComplete="tel"
            inputMode="numeric"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            onBeforeInput={handlePhoneBeforeInput}
            onPaste={handlePhonePaste}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            disabled={isSubmitting}
          />
        </div>

        <p className={isSuccess ? styles.formSuccess : styles.formError}>
          {isSuccess ? "Заявка отправлена!" : formError}
        </p>

        <button
          type="submit"
          className={`${styles.submitBtn} junegullregular`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Получить консультацию"}
        </button>

        <div className={styles.privacy}>
          <span className={styles.lockIcon} aria-hidden="true">
            <Image src={lockIcon} alt="" width={14} height={14} />
          </span>
          <button
            type="button"
            className={styles.privacyText}
            onClick={() => setIsPrivacyOpen(true)}
          >
            Гарантируем конфиденциальность
          </button>
        </div>
      </form>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
