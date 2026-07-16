const MIN_SUBMIT_MS = 3000;

export function getSpamError(
  honeypot: string,
  formOpenedAt: number,
): string | null {
  if (honeypot.trim()) {
    return "spam";
  }

  if (Date.now() - formOpenedAt < MIN_SUBMIT_MS) {
    return "Подождите несколько секунд перед отправкой";
  }

  return null;
}

export function isBotSubmission(honeypot: string): boolean {
  return honeypot.trim().length > 0;
}
