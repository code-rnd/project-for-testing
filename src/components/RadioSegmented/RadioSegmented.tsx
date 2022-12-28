import React, { FC, CSSProperties } from "react";

import { PaddingList } from "./RadioSegmented.constants";

import { cn } from "../../utils";

import s from "./RadioSegmented.module.scss";

export interface SegmentedProps {
  items: string[];
  /** Активный элемент */
  activeItem: string;

  /** Ширана элемента в массиве */
  widthItem?: number;

  onSelect: (item: string) => void;
}

export const RadioSegmented: FC<SegmentedProps> = (props) => {
  const { items, activeItem, widthItem = 198, onSelect } = props;

  /** Индекс активного элемента */
  const indexActiveEl = items.indexOf(activeItem);
  /** Вычисляю кол-во пикселей, для свига подсветки активного сегмента */
  const gapLeft =
    indexActiveEl === 0 ? PaddingList : widthItem * indexActiveEl + PaddingList;

  /** Стили для анимации подсветки активного сегмента */
  const animateStyle: CSSProperties = {
    width: widthItem,
    top: PaddingList + "px",
    bottom: PaddingList + "px",
    left: gapLeft + "px",
  };

  const listStyle: CSSProperties = { padding: PaddingList };
  const itemStyle: CSSProperties = { width: widthItem };

  const handleSelect = (segment: string) => {
    activeItem !== segment && onSelect(segment);
  };

  return (
    <div className={s.container}>
      <div className={s.list} style={listStyle}>
        {items.map((item) => (
          <div
            onClick={() => handleSelect(item)}
            className={cn([s.item, item === activeItem && s.isActive])}
            style={itemStyle}
            key={item}
          >
            {item}
          </div>
        ))}
        <div className={s.animateBlock} style={animateStyle} />
      </div>
    </div>
  );
};
