import { CSSProperties, FC, useMemo, useState } from "react";

import { useTouch } from "../../hooks";

import s from "./Gallery.module.scss";

const cards = Array.from({ length: 10 }, (_, x) => ({
  id: x,
}));

export const Gallery: FC = () => {
  return (
    <div className={s.container}>
      {cards.map(({ id }) => (
        <Card id={id} key={id} />
      ))}
    </div>
  );
};

interface CardProps {
  id: number;
}
const Card: FC<CardProps> = (props) => {
  const { id } = props;

  const [extraStyle, setExtraStyle] = useState<CSSProperties>({});

  const onSwipeLeft = () => {
    setExtraStyle({ left: -150 + "%", transition: "all .4s" });
  };

  const onSwipeRight = () => {
    setExtraStyle({ left: 150 + "%", transition: "all .4s" });
  };

  const { useStart, useMove, useEnd, move, ...meta } = useTouch({
    coords: { x: 200, y: 400 },
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
      {id}
    </div>
  );
};
