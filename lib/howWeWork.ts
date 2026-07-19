export type HowWeWorkStep = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const HOW_WE_WORK_STEPS: HowWeWorkStep[] = [
  {
    id: "application",
    title: "Заявка",
    description: "Оставляете ваши контакты на нашем сайте",
    image: "/images/howWeWorks/how1.png",
  },
  {
    id: "call",
    title: "Звонок",
    description: "Мы обсуждаем с вами вашу проблему",
    image: "/images/howWeWorks/how2.png",
  },
  {
    id: "visit",
    title: "Выезд",
    description: "При необходимости приезжаем на замер",
    image: "/images/howWeWorks/how3.png",
  },
  {
    id: "solutions",
    title: "Варианты решения",
    description: "Мы предлагаем варианты решения вашей проблемы",
    image: "/images/howWeWorks/how4.png",
  },
  {
    id: "installation",
    title: "Монтаж",
    description: "Мы проводим монтажные работы",
    image: "/images/howWeWorks/how5.png",
  },
  {
    id: "enjoyment",
    title: "Наслаждение",
    description: "Вы наслаждаетесь результатом",
    image: "/images/howWeWorks/how6.png",
  },
];

export const HOW_WE_WORK_SEPARATOR = "/images/howWeWorks/separate.png";
