import { VirtualListItemModel } from "./VirtualListItem";

const FirstNames = [
  "Rob",
  "Ann",
  "Ron",
  "Harry",
  "Voland",
  "Bob",
  "Alex",
  "Grinch",
  "Jhony",
];
const SecondNames = [
  "Williams",
  "Polina",
  "Dilon",
  "Potter",
  "Vakuelnko",
  "Ponomarenko",
  "Shevchenko",
  "Grinvich",
  "Boy",
];
const Colors = [
  "#DB4D4C",
  "#FF944D",
  "#FEB84D",
  "#FFDB70",
  "#B7DB4B",
  "#71B84C",
  "#4EB8B8",
  "#4CB7DB",
  "#4C94DA",
  "#4D71DB",
  "#9370DA",
  "#B871B8",
  "#DA94DA",
  "#FF7294",
  "#FFADC4",
  "#6AD19E",
];

const Messages = [
  "Двигаюсь в твою сторону",
  "Понял принял",
  "Как и договаривались",
  "Задержусь за 30 минут",
  "Прогреваю машину",
  "Зайди в магазин, купи продуктов",
  "Зарплата через неделю",
];
const rndGenNumber = (max: number = 2, min: number = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const InitialList: VirtualListItemModel[] = Array.from(
  { length: 10_000 },
  (_, x) => ({
    id: x + 1,
    color: Colors[rndGenNumber(Colors.length - 1, 0)],
    firstName: FirstNames[rndGenNumber(FirstNames.length - 1, 0)],
    middleName: SecondNames[rndGenNumber(SecondNames.length - 1, 0)],
    lastMessage: Messages[rndGenNumber(Messages.length - 1, 0)],
    lastDateTime: new Date(),
    isRead: !!rndGenNumber(1, 0),
    isOnline: !!rndGenNumber(1, 0),
  })
);
