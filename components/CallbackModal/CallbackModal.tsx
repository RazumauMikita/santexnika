"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormHoneypot } from "@/components/FormHoneypot";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { submitCallbackForm } from "@/lib/submitCallbackForm";
import { useSubmitLock } from "@/lib/useSubmitLock";
import {
  appendPhoneDigit,
  BELARUS_PHONE_PLACEHOLDER,
  formatBelarusPhoneDisplay,
  getBelarusPhoneErrorFromDigits,
  getNameError,
  normalizePhoneDigits,
  removeLastPhoneDigit,
} from "@/lib/belarusPhone";
import closeIcon from "@/public/icons/popup_close.png";
import lockIcon from "@/public/icons/lock_popup.png";
import styles from "./CallbackModal.module.css";

type CallbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const { isSubmitting, runLocked } = useSubmitLock();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const formOpenedAtRef = useRef(Date.now());

  const phone = formatBelarusPhoneDisplay(phoneDigits);

  const resetForm = useCallback(() => {
    setError("");
    setName("");
    setPhoneDigits("");
    setNameError("");
    setPhoneError("");
    setIsPrivacyOpen(false);
    setHoneypot("");
    formOpenedAtRef.current = Date.now();
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    formOpenedAtRef.current = Date.now();
    setHoneypot("");

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (isPrivacyOpen) return;

      handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isPrivacyOpen, handleClose]);

  if (!isOpen) return null;

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

        handleClose();
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Не удалось отправить заявку",
        );
      }
    });
  };

  const formError = error || nameError || phoneError;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} role="presentation">
        <div
          className={styles.modal}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Заказать обратный звонок"
        >
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Закрыть"
          >
            <Image src={closeIcon} alt="" width={22} height={22} />
          </button>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <FormHoneypot value={honeypot} onChange={setHoneypot} />

            <div className={styles.card}>
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
                  placeholder={BELARUS_PHONE_PLACEHOLDER}
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

              <p className={styles.formError}>{formError}</p>

              <div className={styles.privacy}>
                <span className={styles.lockIcon} aria-hidden="true">
                  <Image src={lockIcon} alt="" width={28} height={40} />
                </span>
                <button
                  type="button"
                  className={styles.privacyText}
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  Гарантируем сохранность ваших данных и обязуемся не передавать
                  их третьим лицам
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} junegullregular`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Оставить заявку"}
            </button>
          </form>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
