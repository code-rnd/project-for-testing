import { FC, ReactNode } from "react";

export const View: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
