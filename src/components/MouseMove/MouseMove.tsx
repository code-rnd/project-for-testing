import { FC, CSSProperties, useMemo, useState, useCallback } from "react";

import { useTouch } from "../../hooks";

import s from "./MouseMove.module.scss";

let count = 1;

export const MouseMove: FC = () => {
  const [points, setPoints] = useState([{ id: 1 }]);

  const handleClick = useCallback(() => {
    count = count + 1;
    setPoints((prev) => [...prev, { id: count }]);
  }, []);

  return (
    <div className={s.container} onClick={handleClick}>
      {points.map(({ id }) => (
        <Point id={id} key={id} />
      ))}
    </div>
  );
};

const Point: FC<{ id: number }> = ({ id }) => {
  const { move, useStart, useEnd, useMove } = useTouch();

  const style: CSSProperties = useMemo(
    () => ({
      left: move.x + "px",
      top: move.y + "px",
    }),
    [move]
  );

  return (
    <div
      className={s.item}
      onMouseDown={useStart}
      onMouseMove={useMove}
      onMouseLeave={useEnd}
      onMouseUp={useEnd}
      onTouchStart={useStart}
      onTouchMove={useMove}
      onTouchEnd={useEnd}
      style={style}
    >
      {id}
    </div>
  );
};
