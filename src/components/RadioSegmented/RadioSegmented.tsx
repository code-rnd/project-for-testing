import React, { FC, CSSProperties } from "react";

import { PaddingList } from "./RadioSegmented.constants";

import { cn } from "../../utils";

import s from "./RadioSegmented.module.scss";

export interface SegmentItem {
  name: string;
}
export interface SegmentedProps {
  items: SegmentItem[];
  /** Активный элемент */
  activeItem: SegmentItem;

  /** Ширана элемента в массиве */
  widthItem?: number;

  onSelect: (item: SegmentItem) => void;
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

  const handleSelect = (segment: SegmentItem) => {
    activeItem.name !== segment.name && onSelect(segment);
  };

  return (
    <div className={s.container}>
      <div className={s.list} style={listStyle}>
        {items.map((item) => (
          <div
            onClick={() => handleSelect(item)}
            className={cn([s.item, item === activeItem && s.isActive])}
            style={itemStyle}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
        <div className={s.animateBlock} style={animateStyle} />
      </div>
    </div>
  );
};
