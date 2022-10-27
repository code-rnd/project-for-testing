import { FC, useEffect, useState } from "react";
import s from "./TextPrinting.module.scss";
import { useBroadcastChannel } from "../../hooks";

export const TextPrinting: FC = () => {
  const { postMessage, broadcastData } = useBroadcastChannel<string>("print");
  const [value, setValue] = useState(broadcastData || "");

  useEffect(() => postMessage(value), [value]);

  return (
    <div className={s.container}>
      <div className={s.display}>
        {broadcastData || <span style={{ opacity: 0.5 }}>placeholder</span>}
      </div>
      <input
        type="text"
        value={broadcastData}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="_"
      />
    </div>
  );
};
