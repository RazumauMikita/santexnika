export const SITE = {
  name: "Сантехника Витебск",
  tagline: "Профессиональная сантехническая служба в Витебске и области",
  phone: "8 (033) 6666-99-4",
  phoneHref: "tel:+375336666994",
  workingHours: "Время работы с 8.00 до 23.00",
} as const;

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Объекты", href: "#objects" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Гарантии", href: "#guarantees" },
  { label: "Контакты", href: "#contacts" },
] as const;
