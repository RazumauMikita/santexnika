export type Service = {
  id: string;
  title: string;
  price: string;
  priceFrom: boolean;
  priceSuffix?: string;
  image?: string;
};

export const SERVICES: Service[] = [
  {
    id: "sewer-cleaning",
    title: "Прочистка канализации",
    price: "40",
    priceFrom: true,
  },
  {
    id: "water-supply",
    title: "Монтаж водопровода",
    price: "60",
    priceFrom: true,
  },
  {
    id: "sewer-install",
    title: "Монтаж канализации",
    price: "60",
    priceFrom: true,
  },
  {
    id: "riser-replacement",
    title: "Замена стояков ХВС ГВС",
    price: "140",
    priceFrom: true,
  },
  {
    id: "toilet-install",
    title: "Установка унитаза",
    price: "70",
    priceFrom: true,
  },
  {
    id: "installation-frame",
    title: "Установка инсталляции",
    price: "120",
    priceFrom: true,
  },
  {
    id: "bath-install",
    title: "Установка ванны",
    price: "60",
    priceFrom: true,
  },
  {
    id: "radiator-install",
    title: "Монтаж радиатора отопления",
    price: "70",
    priceFrom: true,
  },
  {
    id: "sink-install",
    title: "Установка умывальника",
    price: "30",
    priceFrom: true,
  },
  {
    id: "washing-machine",
    title: "Подключение стиральной машины",
    price: "50",
    priceFrom: true,
  },
  {
    id: "boiler-install",
    title: "Установка бойлера",
    price: "120",
    priceFrom: true,
  },
  {
    id: "wall-chasing",
    title: "Штробление стен под трубы",
    price: "10",
    priceFrom: true,
    priceSuffix: " за погонный метр",
  },
];
