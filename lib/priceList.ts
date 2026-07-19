import { SERVICES, type Service } from "@/lib/services";

export type PriceItem = {
  id: string;
  title: string;
  price: string;
  priceFrom: boolean;
  unit: string;
};

export type PriceCategory = {
  id: string;
  title: string;
  items: PriceItem[];
};

function serviceToPriceItem(service: Service): PriceItem {
  return {
    id: service.id,
    title: service.title,
    price: service.price,
    priceFrom: service.priceFrom,
    unit: service.id === "wall-chasing" ? "за пог. м" : "шт.",
  };
}

export const PRICE_LIST: PriceCategory[] = [
  {
    id: "services",
    title: "",
    items: [
      {
        id: "home-visit",
        title: "Выезд на дом",
        price: "20",
        priceFrom: false,
        unit: "шт.",
      },
      ...SERVICES.map(serviceToPriceItem),
    ],
  },
];
