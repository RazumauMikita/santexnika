export type Guarantee = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const GUARANTEES: Guarantee[] = [
  {
    id: "installation-quality",
    title: "Гарантия качества монтажа",
    description:
      "Установка сантехники и труб строго по ГОСТ. 2 года гарантии на монтаж. Профессиональная установка сантехники собственными монтажными бригадами.",
    image: "/images/garanties/warranty1.png",
  },
  {
    id: "deadlines",
    title: "Гарантия соблюдения сроков",
    description:
      "Сообщаем сроки работ заранее. Несколько бригад, большой запас инструмента и деталей на складе.",
    image: "/images/garanties/warranty2.png",
  },
  {
    id: "cleanliness",
    title: "Гарантия чистоты",
    description:
      "Осуществляем вынос старых труб, демонтированной сантехники и мусора.",
    image: "/images/garanties/warranty3.png",
  },
  {
    id: "plumbing-quality",
    title: "Гарантия качества сантехники и труб",
    description:
      "До 5 лет гарантии на нашу сантехнику и трубы. Высокая надёжность. Долгий срок службы. Комфорт в использовании. Вся продукция сертифицирована.",
    image: "/images/garanties/warranty4.png",
  },
];

export const GUARANTEE_CENTER_IMAGE = "/images/garanties/center.png";

export const GUARANTEE_ARROWS = {
  top: "/images/garanties/arrow-top.png",
  left: "/images/garanties/arrow-left.png",
  right: "/images/garanties/arrow-right.png",
  bottom: "/images/garanties/arrow-bottom.png",
} as const;
