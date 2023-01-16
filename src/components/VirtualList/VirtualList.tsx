import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  UIEvent,
} from "react";
import { cn } from "../../utils";

import s from "./VirtualList.module.scss";

export interface InitialListItem {
  id: number;
  name: string;
}
export const initialList: InitialListItem[] = Array.from(
  { length: 100_000 },
  (_, x) => ({
    id: x + 1,
    name: "name_" + (x + 1),
  })
);

export const Element: FC<InitialListItem> = (props) => {
  const { name, id } = props;

  return (
    <div style={{ height: 20 }} key={id}>
      {name}
    </div>
  );
};

interface ItemModel<T extends { id: number } = { id: number }> {
  id: number;
}

interface ListModel<T extends ItemModel = ItemModel> {
  list: T[];
  /** Элемент списка */
  renderItem: FC<T>;
  /** Высота элемента списка */
  heightItem: number;
  /** Дельта элементов, для рендера вне видимости "до и после" */
  amount?: number;

  classnames?: string;
  style?: CSSProperties;
}

export const VirtualList: FC<ListModel> = (props) => {
  const { list, renderItem, heightItem, amount = 5, classnames, style } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const [viewHeight, setViewHeight] = useState(0);
  /** Индекс элемента в начале видимого списка */
  const [startIndex, setStartIndex] = useState(list[0].id - 1);

  /** Кол-во видимых элементов */
  const showCountItems = useMemo(
    () => Math.ceil(viewHeight / heightItem),
    [viewHeight, heightItem]
  );
  /** Индекс элемента в конце видимого списка */
  const [endIndex, setEndIndex] = useState(list[showCountItems].id - 1);

  const listLenght = useMemo(() => list.length, [list.length]);
  const heightAllList = useMemo(
    () => listLenght * heightItem,
    [listLenght, heightItem]
  );
  const heightUp = useMemo(
    () => startIndex * heightItem,
    [startIndex, heightItem]
  );
  const heightDown = useMemo(
    () => heightAllList - (showCountItems * heightItem + heightUp),
    [heightAllList, showCountItems, heightItem, heightUp]
  );

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;

      const countHiddenItemsTop = Math.round(scrollTop / heightItem);
      const countHiddenItemsBottom = countHiddenItemsTop + showCountItems;

      console.log(countHiddenItemsTop, amount);
      /** TODO: Косяк в конце расчетов */
      const start =
        countHiddenItemsTop > amount ? countHiddenItemsTop - amount : 0;
      const end =
        countHiddenItemsBottom < listLenght - amount
          ? countHiddenItemsBottom + amount
          : listLenght;

      setStartIndex(list[start].id - 1);
      setEndIndex(
        end >= listLenght ? list[listLenght - 1].id - 1 : list[end].id
      );
    },
    [heightItem, showCountItems, amount, listLenght]
  );

  const renderList = useMemo(
    () => list.slice(startIndex, endIndex),
    [list, startIndex, endIndex]
  );

  /** Инициализация высоты компонента */
  useEffect(() => {
    setViewHeight(ref.current?.clientHeight || 0);
  }, []);

  return (
    <div
      ref={ref}
      className={cn([s.list, classnames])}
      style={style}
      onScroll={onScroll}
    >
      <div className={s.up} style={{ height: heightUp }} />
      {renderList.map(renderItem)}
      <div className={s.down} style={{ height: heightDown }} />
    </div>
  );
};
