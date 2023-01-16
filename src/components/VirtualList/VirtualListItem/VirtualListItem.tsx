import { FC } from "react";

import { cn } from "../../../utils";
import { DoneIcon } from "./icons";

import s from "./VirtualListItem.module.scss";

export interface VirtualListItemModel {
  id: number;
  color: string;
  firstName: string;
  middleName: string;
  lastMessage: string;
  lastDateTime: Date;
  isRead: boolean;
  isOnline: boolean;
}

const getFullName = (
  firstName: string,
  middleName?: string,
  secondName?: string
): string => {
  return [firstName, middleName, secondName].filter(Boolean).join(" ");
};

const getShortName = (firstName: string, middleName?: string) => {
  return [
    firstName?.at(0)?.toLocaleUpperCase(),
    middleName?.at(0)?.toLocaleUpperCase(),
  ]
    .filter(Boolean)
    .join("");
};

const getFormatDate = (date: Date): string => {
  const currentDate = new Date(date);

  return currentDate.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const VirtualListItem: FC<VirtualListItemModel> = (props) => {
  const {
    id,
    firstName,
    middleName,
    lastMessage,
    lastDateTime,
    isRead,
    color,
    isOnline,
  } = props;

  const icon = isRead ? (
    <>
      <DoneIcon />
      <DoneIcon />
    </>
  ) : (
    <DoneIcon />
  );

  return (
    <div key={id} className={s.container}>
      <div className={s.icon} style={{ backgroundColor: color }}>
        {getShortName(firstName, middleName)}
        {isOnline && <div className={s.isOnline} />}
      </div>
      <div className={s.fullName}>{getFullName(firstName, middleName)}</div>
      <div className={cn([s.status, isRead && s.isRead])}>{icon}</div>
      <div className={s.lastDateTime}>{getFormatDate(lastDateTime)}</div>
      <div className={s.lastMessage}>{lastMessage}</div>
    </div>
  );
};
