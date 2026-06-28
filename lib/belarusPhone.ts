const VALID_OPERATOR_CODES = [
  "15",
  "16",
  "17",
  "21",
  "22",
  "23",
  "24",
  "25",
  "29",
  "33",
  "44",
] as const;

export const BELARUS_PHONE_PLACEHOLDER = "+375 (29) ___-__-__";

export function normalizePhoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("80")) {
    digits = `375${digits.slice(2)}`;
  } else if (digits.startsWith("8")) {
    digits = `375${digits.slice(1)}`;
  } else if (digits.length > 0 && !digits.startsWith("375")) {
    digits = `375${digits}`;
  }

  return digits.slice(0, 12);
}

function formatFromDigits(digits: string) {
  const operator = digits.slice(3, 5);
  const block1 = digits.slice(5, 8);
  const block2 = digits.slice(8, 10);
  const block3 = digits.slice(10, 12);

  let formatted = `+375 (${operator}`;

  if (operator.length < 2) {
    return formatted;
  }

  formatted += ")";

  if (block1.length) {
    formatted += ` ${block1}`;
  }

  if (block2.length) {
    formatted += `-${block2}`;
  }

  if (block3.length) {
    formatted += `-${block3}`;
  }

  return formatted;
}

export function formatBelarusPhoneDisplay(digits: string) {
  if (!digits.length) {
    return "";
  }

  if (digits.length <= 3) {
    return "+375 (";
  }

  return formatFromDigits(digits);
}

export function isValidBelarusPhoneDigits(digits: string) {
  if (digits.length !== 12 || !digits.startsWith("375")) {
    return false;
  }

  const operator = digits.slice(3, 5);

  return VALID_OPERATOR_CODES.includes(
    operator as (typeof VALID_OPERATOR_CODES)[number],
  );
}

export function isValidBelarusPhone(value: string) {
  return isValidBelarusPhoneDigits(normalizePhoneDigits(value));
}

export function getBelarusPhoneErrorFromDigits(digits: string) {
  if (!digits.length) {
    return "Укажите телефон";
  }

  if (digits.length < 12) {
    return "Введите номер полностью";
  }

  if (!isValidBelarusPhoneDigits(digits)) {
    return "Неверный код оператора";
  }

  return null;
}

export function getBelarusPhoneError(value: string) {
  return getBelarusPhoneErrorFromDigits(normalizePhoneDigits(value));
}

export function getNameError(name: string) {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return "Имя должно быть не короче 2 символов";
  }

  if (!/^[\p{L}\s-]+$/u.test(trimmed)) {
    return "Имя может содержать только буквы";
  }

  return null;
}

export function removeLastPhoneDigit(digits: string) {
  if (digits.length <= 3) {
    return "375";
  }

  return digits.slice(0, -1);
}

export function appendPhoneDigit(digits: string, digit: string) {
  const next = (digits.length ? digits : "375") + digit;

  return next.slice(0, 12);
}
