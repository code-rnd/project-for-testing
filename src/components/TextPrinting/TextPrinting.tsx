import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import s from "./TextPrinting.module.scss";
import { useBroadcastChannel } from "../../hooks";

export const TextPrinting: FC = () => {
  const { postMessage, broadcastData } = useBroadcastChannel<string>("print");
  const [value, setValue] = useState(broadcastData || "");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  useEffect(() => postMessage(value), [value]);

  return (
    <div className={s.container}>
      <div className={s.display}>
        {broadcastData || <span style={{ opacity: 0.5 }}>placeholder</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="_"
      />
    </div>
  );
};
