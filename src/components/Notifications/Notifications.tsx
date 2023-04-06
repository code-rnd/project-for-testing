import {
  CSSProperties,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { NotificationsList } from "./Notifications.const";

import s from "./Notifications.module.scss";

interface NotificationsProps {
  items: NotificationItem[];
}
export const Notifications: FC<NotificationsProps> = () => {
  const [list, setList] = useState(NotificationsList);

  const onItemRemove = useCallback((id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className={s.container}>
      {list.map((item) => {
        return (
          <NotificationItem
            {...item}
            onDelete={() => onItemRemove(item.id)}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export interface NotificationItem {
  id: number;
  icon: ReactElement;
  title: string;
  message: string;
  onDelete: () => void;
  onView: () => void;
}

const COUNT = 3_000;
const NotificationItem: FC<NotificationItem> = (props) => {
  const { id, icon, title, message, onDelete } = props;

  const timerStyle = useRef<NodeJS.Timer>();
  const timerRemove = useRef<NodeJS.Timer>();

  const autoAnimateTime = COUNT - (COUNT * 10) / 100 + id * 500;
  const autoRemoveTime = COUNT + id * 500;

  const [style, setStyle] = useState<CSSProperties>({});

  const handleRemove = useCallback(
    (count?: number) => {
      timerStyle.current = setTimeout(
        () => {
          setStyle({ opacity: 0 });
        },
        count ? count - (count * 50) / 100 : autoAnimateTime
      );

      timerRemove.current = setTimeout(
        () => {
          onDelete();
        },
        count ? count : autoRemoveTime
      );

      return () => {
        clearTimeout(timerStyle.current);
        clearTimeout(timerRemove.current);
      };
    },
    [onDelete]
  );
  //
  // useEffect(() => {
  //   handleRemove();
  // }, []);

  return (
    <div className={s.item} style={style}>
      <div className={s.icon}>{icon}</div>
      <div className={s.title}>
        {title} {id}
      </div>
      <div className={s.message}>{message}</div>
      <div className={s.close} onClick={() => handleRemove(600)}>
        Close
      </div>
      <div className={s.view} onClick={() => handleRemove(600)}>
        View
      </div>
    </div>
  );
};
