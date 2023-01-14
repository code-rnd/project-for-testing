import {
  CSSProperties,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTouch } from "../../hooks";

import s from "./Gallery.module.scss";

const cards = [
  {
    id: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Sandra_Bullock_%289192365016%29_%28cropped%29.jpg",
    name: "Sandra",
    age: 28,
  },
  {
    id: 2,
    src: "https://assets.vogue.ru/photos/5dc54983548ac50008c4cafc/2:3/w_2560%2Cc_limit/b9e69a4742d190029239d12265a5e3da.jpg",
    name: "Julia",
    age: 23,
  },
  {
    id: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/800px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg",
    name: "Angelina",
    age: 29,
  },
  {
    id: 4,
    src: "https://www.gilan.com/wp-content/uploads/2020/09/penelope_cruz-1.jpg",
    name: "Penelope",
    age: 31,
  },
  {
    id: 5,
    src: "https://flxt.tmsimg.com/assets/283805_v9_ba.jpg",
    name: "Megan",
    age: 25,
  },
  {
    id: 6,
    src: "https://cdn.britannica.com/35/157835-050-0CD3A8A5/Jennifer-Lopez-2010.jpg",
    name: "Jenifer",
    age: 25,
  },
];

export const Gallery: FC = () => {
  const [list, setList] = useState(cards);
  const len = list.length;

  const first = list.at(0) as CardModel;
  const second = list.at(1) as CardModel;

  const timer = useRef<NodeJS.Timeout>();

  const removeItem = useCallback((id: number) => {
    timer.current = setTimeout(() => {
      setList((prev) => prev.filter((item) => item.id !== id));
    }, 200);

    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className={s.container}>
      {len >= 2 && (
        <>
          <Card card={second} removeCard={removeItem} key={second.id} />
          <Card card={first} removeCard={removeItem} key={first.id} />
        </>
      )}
      {len === 1 && (
        <Card card={first} removeCard={removeItem} key={first.id} />
      )}
    </div>
  );
};

interface CardModel {
  id: number;
  src: string;
  name: string;
  age: number;
}
interface CardProps {
  card: CardModel;
  removeCard: (id: number) => void;
}
const Card: FC<CardProps> = (props) => {
  const { card, removeCard } = props;
  const { id, age, src, name } = card;

  const [extraStyle, setExtraStyle] = useState<CSSProperties>({});

  const onSwipeLeft = () => {
    setExtraStyle({ left: -150 + "%", transition: "left .8s" });
    removeCard(id);
  };

  const onSwipeRight = () => {
    setExtraStyle({ left: 150 + "%", transition: "left .8s" });
    removeCard(id);
  };

  const { useStart, useMove, useEnd, move, ...meta } = useTouch({
    coords: { x: 210, y: 400 },
    isHorisontalOnly: true,
    onSwipeLeft,
    onSwipeRight,
  });

  const style: CSSProperties = useMemo(
    () => ({
      left: move.x + "px",
      top: move.y + "px",
      ...meta.style,
    }),
    [move, meta.style]
  );

  return (
    <div
      onMouseDown={useStart}
      onMouseMove={useMove}
      onMouseLeave={useEnd}
      onMouseUp={useEnd}
      onTouchStart={useStart}
      onTouchMove={useMove}
      onTouchEnd={useEnd}
      style={{ ...style, ...extraStyle }}
      className={s.card}
    >
      <img src={src} alt="photo random human" />
      <div className={s.description}>
        <div className={s.name}>{name}</div>
        <div>{age}</div>
      </div>
    </div>
  );
};
