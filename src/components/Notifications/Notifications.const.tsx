import React from "react";

import { NotificationItem } from "./Notifications";
import { TelegramIcon } from "./icons";

export const NotificationsList: NotificationItem[] = Array.from(
  { length: 15 },
  (_, x) => ({
    id: x,
    title: "Telegram",
    icon: <TelegramIcon />,
    message: "You have a new message",
    onDelete: () => console.log("LEL"),
    onView: console.log,
  })
);
