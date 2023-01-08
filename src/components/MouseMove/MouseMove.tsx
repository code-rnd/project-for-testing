import { FC, CSSProperties, useMemo } from "react";

import { useTouch } from "../../hooks";

import s from "./MouseMove.module.scss";

export const MouseMove: FC = () => {
  const { move, useStart, useEnd, useMove } = useTouch();

  const style: CSSProperties = useMemo(
    () => ({
      left: move.x + "px",
      top: move.y + "px",
    }),
    [move]
  );

  return (
    <div className={s.container}>
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
      />
    </div>
  );
};
