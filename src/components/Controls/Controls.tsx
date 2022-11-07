import { FC, useEffect } from "react";

import { ThemesType } from "../../types";

import s from "./Controls.module.scss";
import { cn } from "../../utils";
import { useHttp } from "../../http";

export const Controls: FC<{
  onSelect: (name: ThemesType) => void;
  list: ThemesType[];
  activeControl: ThemesType;
}> = ({ onSelect, list, activeControl }) => {
  const { get } = useHttp();

  const fetchData = async () => {
    const { data } = await get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.list}>
      {list.map((name, index) => (
        <div
          onClick={() => onSelect(name)}
          className={cn([s.item, activeControl === name && s.active])}
          key={index}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
