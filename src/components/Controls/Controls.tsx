import { FC } from "react";

import { ThemesType } from "../../types";

import s from "./Controls.module.scss";
import { cn } from "../../utils";

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
