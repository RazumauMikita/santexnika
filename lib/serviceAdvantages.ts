export type ServiceAdvantage = {
  id: string;
  title: string;
  image: string;
};

export const SERVICE_ADVANTAGES: ServiceAdvantage[] = [
  {
    id: "certified-masters",
    title: "Аттестованные мастера",
    image: "/images/services/egg1.png",
  },
  {
    id: "home-visit-price",
    title: "Выезд 20 руб.",
    image: "/images/services/egg2.png",
  },
  {
    id: "fair-prices",
    title: "Разумные цены, акции и скидки",
    image: "/images/services/egg3.png",
  },
  {
    id: "work-guarantee",
    title: "Даём гарантию на работы",
    image: "/images/services/egg4.png",
  },
  {
    id: "equipment-removal",
    title: "Демонтаж старого оборудования",
    image: "/images/services/egg5.png",
  },
  {
    id: "cleanup",
    title: "Уборка после работ",
    image: "/images/services/egg6.png",
  },
];
