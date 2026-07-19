export const SITE = {
  name: "Сантехника Витебск",
  tagline: "Профессиональная сантехническая служба в Витебске и области",
  phone: "8 (033) 903-30-04",
  phoneHref: "tel:+375339033004",
  workingHours: "Время работы с 8.00 до 23.00",
  paymentMethods: "Наличный и безналичный расчёт",
} as const;

export const LEGAL = {
  ownerLabel: "ИП Гасаналиев А.Н.",
  unp: "391520935",
  email: "Vitebskiisania12300@gmail.com",
  legalAddress:
    "Витебская обл., аг. Бабиничи, ул. Калинина, д. 2, оф. 2",
  registrationDate: "29 июля 2025 г.",
} as const;

export const FORM = {
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
} as const;

export const NAV_LINKS = [
  { label: "Услуги", href: "/#services" },
  { label: "Объекты", href: "/#objects" },
  { label: "Прайс", href: "/price" },
  { label: "Гарантии", href: "/#guarantees" },
  { label: "Контакты", href: "/#contacts" },
] as const;
