import { FC, useCallback, useEffect } from "react";
import s from "./Counter.module.scss";
import { useLocalStorage, useStorageChannel } from "../../hooks";

const COUNT = "count";
export const Counter: FC = () => {
  const { set, get } = useLocalStorage();
  const { storageData } = useStorageChannel(COUNT);

  const handleAddCount = useCallback(() => {
    const prev = parseInt(get<string>(COUNT)) || 0;
    set(COUNT, prev + 1);
  }, [get, set]);

  const handleSubtractCount = useCallback(() => {
    const prev = parseInt(get<string>(COUNT)) || 0;
    set(COUNT, prev - 1);
  }, [get, set]);

  useEffect(() => set(COUNT, 0), []);

  return (
    <div className={s.counter}>
      <h1>{storageData || 0}</h1>
      <div className={s.controls}>
        <button onClick={handleAddCount}>Add</button>
        <button onClick={handleSubtractCount}>subtract</button>
      </div>
    </div>
  );
};
