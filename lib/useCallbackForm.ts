"use client";

import { useRef, useState } from "react";
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

export function useCallbackForm(service = "") {
  const { isSubmitting, runLocked } = useSubmitLock();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
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
          service: service || undefined,
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

  return {
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
  };
}
