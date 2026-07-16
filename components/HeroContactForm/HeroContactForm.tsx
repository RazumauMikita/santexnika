"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FormHoneypot } from "@/components/FormHoneypot";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { submitCallbackForm } from "@/lib/submitCallbackForm";
import { useSubmitLock } from "@/lib/useSubmitLock";
import {
  appendPhoneDigit,
  formatBelarusPhoneDisplay,
  getBelarusPhoneErrorFromDigits,
  getNameError,
  normalizePhoneDigits,
  removeLastPhoneDigit,
} from "@/lib/belarusPhone";
import lockIcon from "@/public/icons/lock.png";
import styles from "./HeroContactForm.module.css";

export function HeroContactForm() {
  const { isSubmitting, runLocked } = useSubmitLock();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const formOpenedAtRef = useRef(Date.now());

  const phone = formatBelarusPhoneDisplay(phoneDigits);
  const formError = error || nameError || phoneError;

  const resetForm = () => {
    setError("");
    setName("");
    setPhoneDigits("");
    setNameError("");
    setPhoneError("");
    setIsSuccess(false);
    setHoneypot("");
    formOpenedAtRef.current = Date.now();
  };

  const updatePhoneDigits = (nextDigits: string) => {
    setPhoneDigits(nextDigits);

    if (phoneError) {
      setPhoneError(getBelarusPhoneErrorFromDigits(nextDigits) ?? "");
    }
  };

  const handlePhoneKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      updatePhoneDigits(removeLastPhoneDigit(phoneDigits));
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      updatePhoneDigits(appendPhoneDigit(phoneDigits, event.key));
    }
  };

  const handlePhoneBeforeInput = (
    event: React.FormEvent<HTMLInputElement> & {
      nativeEvent: InputEvent;
    },
  ) => {
    const inputType = event.nativeEvent.inputType;

    if (
      inputType === "deleteContentBackward" ||
      inputType === "deleteContentForward"
    ) {
      event.preventDefault();
      updatePhoneDigits(removeLastPhoneDigit(phoneDigits));
    }
  };

  const handlePhonePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = normalizePhoneDigits(
      event.clipboardData.getData("text"),
    );
    updatePhoneDigits(pastedDigits.length <= 3 ? "375" : pastedDigits);
  };

  const handlePhoneFocus = () => {
    if (!phoneDigits.length) {
      setPhoneDigits("375");
    }
  };

  const handlePhoneBlur = () => {
    if (phoneDigits.length > 0 && phoneDigits.length <= 3) {
      setPhoneDigits("375");
    }

    setPhoneError(getBelarusPhoneErrorFromDigits(phoneDigits) ?? "");
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDigits = normalizePhoneDigits(event.target.value);
    updatePhoneDigits(nextDigits.length <= 3 ? "375" : nextDigits);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const nextNameError = getNameError(name);
    const nextPhoneError = getBelarusPhoneErrorFromDigits(phoneDigits);

    setNameError(nextNameError ?? "");
    setPhoneError(nextPhoneError ?? "");

    if (nextNameError || nextPhoneError) {
      return;
    }

    await runLocked(async () => {
      try {
        const result = await submitCallbackForm(name.trim(), phone, {
          honeypot,
          formOpenedAt: formOpenedAtRef.current,
        });

        if (!result.success) {
          throw new Error(result.error);
        }

        resetForm();
        setIsSuccess(true);
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Не удалось отправить заявку",
        );
      }
    });
  };

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
