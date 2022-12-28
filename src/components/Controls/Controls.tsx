import { FC } from "react";

import { ThemesType } from "../../types";
import { cn } from "../../utils";

import s from "./Controls.module.scss";

export const Controls: FC<{
  onSelect: (name: ThemesType) => void;
  list: ThemesType[];
  activeControl: ThemesType;
}> = ({ onSelect, list, activeControl }) => {
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
