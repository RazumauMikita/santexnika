import { getBelarusPhoneError, getNameError } from "@/lib/belarusPhone";
import { getSpamError, isBotSubmission } from "@/lib/formSpamGuard";
import { FORM, SITE } from "@/lib/constants";

export type SubmitCallbackResult =
  | { success: true }
  | { success: false; error: string };

type SubmitCallbackOptions = {
  honeypot?: string;
  formOpenedAt?: number;
  service?: string;
};

export async function submitCallbackForm(
  name: string,
  phone: string,
  options: SubmitCallbackOptions = {},
): Promise<SubmitCallbackResult> {
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const honeypot = options.honeypot ?? "";
  const formOpenedAt = options.formOpenedAt ?? 0;
  const service = options.service?.trim() ?? "";

  if (isBotSubmission(honeypot)) {
    return { success: true };
  }

  const spamError = getSpamError(honeypot, formOpenedAt);

  if (spamError && spamError !== "spam") {
    return { success: false, error: spamError };
  }

  const nameError = getNameError(trimmedName);
  const phoneError = getBelarusPhoneError(trimmedPhone);

  if (nameError) {
    return { success: false, error: nameError };
  }

  if (phoneError) {
    return { success: false, error: phoneError };
  }

  if (!FORM.accessKey) {
    return { success: false, error: "Сервис отправки не настроен" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: FORM.accessKey,
        subject: service
          ? `Заявка — ${service} — ${trimmedName}`
          : `Заявка с сайта ${SITE.name} — ${trimmedName}`,
        from_name: SITE.name,
        name: trimmedName,
        phone: trimmedPhone,
        service: service || undefined,
        botcheck: "",
      }),
    });

    if (!response.ok) {
      return { success: false, error: "Не удалось отправить заявку" };
    }

    const data = (await response.json()) as { success?: boolean; message?: string };

    if (!data.success) {
      return { success: false, error: "Не удалось отправить заявку" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Не удалось отправить заявку" };
  }
}
