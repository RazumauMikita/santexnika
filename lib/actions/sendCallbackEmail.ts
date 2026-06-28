"use server";

import { randomUUID } from "crypto";
import { getBelarusPhoneError, getNameError } from "@/lib/belarusPhone";
import { SITE } from "@/lib/constants";
import { getResend } from "@/lib/resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatFromAddress(fromEmail: string) {
  if (fromEmail.includes("<")) {
    return fromEmail;
  }

  return `${SITE.name} <${fromEmail}>`;
}

export type SendCallbackResult =
  | { success: true }
  | { success: false; error: string };

export async function sendCallbackEmail(
  name: string,
  phone: string,
): Promise<SendCallbackResult> {
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();

  const nameError = getNameError(trimmedName);
  const phoneError = getBelarusPhoneError(trimmedPhone);

  if (nameError) {
    return { success: false, error: nameError };
  }

  if (phoneError) {
    return { success: false, error: phoneError };
  }

  const resend = getResend();
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!resend || !fromEmail || !toEmail) {
    return { success: false, error: "Сервис отправки не настроен" };
  }

  const { data, error } = await resend.emails.send(
    {
      from: formatFromAddress(fromEmail),
      to: [toEmail],
      subject: `Заявка с сайта — ${trimmedName}`,
      html: `
        <h2>Новая заявка на обратный звонок</h2>
        <p><strong>Имя:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(trimmedPhone)}</p>
      `,
    },
    { idempotencyKey: `callback/${randomUUID()}` },
  );

  if (error) {
    console.error("Resend error:", error.message);
    return { success: false, error: "Не удалось отправить заявку" };
  }

  console.log("Resend email sent:", data?.id);

  return { success: true };
}
