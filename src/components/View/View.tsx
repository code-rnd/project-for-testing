import { FC, ReactNode } from "react";
import s from "./View.module.scss";

export const View: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={s.view}>{children}</div>;
};
