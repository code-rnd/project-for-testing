import { CSSProperties, FC, useMemo, useState } from "react";

import { useTouch } from "../../hooks";

import s from "./Gallery.module.scss";

const cards = [
  {
    id: 1,
    src: "https://images.generated.photos/J5N2J8lIeBqGe5lZPyBzW4a-MNVktw1VCdyg2Om0dYo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wOTgwMDAxLnBu/Zw.png",
    name: "Ann",
    age: 28,
  },
  {
    id: 2,
    src: "https://images.generated.photos/s8tNg_trDe86I_kP2Nz46X30fv_stzCEU_taMyw4Wzw/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wNDA3NDA3LnBu/Zw.png",
    name: "Megan",
    age: 23,
  },
  {
    id: 3,
    src: "https://images.generated.photos/DwE2iSjGwsSrPgW8NOtp4BhGo6CiNhFPpTK-JCMxadY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wMzEyMzIzLnBu/Zw.png",
    name: "Oshu",
    age: 29,
  },
  {
    id: 4,
    src: "https://images.generated.photos/J5N2J8lIeBqGe5lZPyBzW4a-MNVktw1VCdyg2Om0dYo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wOTgwMDAxLnBu/Zw.png",
    name: "Karla",
    age: 31,
  },
  {
    id: 5,
    src: "https://images.generated.photos/s8tNg_trDe86I_kP2Nz46X30fv_stzCEU_taMyw4Wzw/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wNDA3NDA3LnBu/Zw.png",
    name: "Karmen",
    age: 25,
  },
  {
    id: 6,
    src: "https://images.generated.photos/DwE2iSjGwsSrPgW8NOtp4BhGo6CiNhFPpTK-JCMxadY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudF92My92/M18wMzEyMzIzLnBu/Zw.png",
    name: "Jenifer",
    age: 25,
  },
];

export const Gallery: FC = () => {
  return (
    <div className={s.container}>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
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
}
const Card: FC<CardProps> = (props) => {
  const { card } = props;
  const { id, age, src, name } = card;

  const [extraStyle, setExtraStyle] = useState<CSSProperties>({});

  const onSwipeLeft = () => {
    setExtraStyle({ left: -150 + "%", transition: "all .8s" });
  };

  const onSwipeRight = () => {
    setExtraStyle({ left: 150 + "%", transition: "all .8s" });
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
      key={id}
    >
      <img src={src} alt="photo random human" />
      <div className={s.description}>
        <div className={s.name}>{name}</div>
        <div className={s.age}>{age}</div>
      </div>
    </div>
  );
};
