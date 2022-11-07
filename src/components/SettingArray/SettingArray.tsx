import { FC } from "react";
import { useSet } from "../../hooks";

const NUMBERS_LIST = Array.from(
  {
    length: 10,
  },
  (_, k) => k + 1
);

export const SettingArray: FC = () => {
  const selectedItemsSet = useSet<number>();

  const handleSelect = (item: number) => {
    const has = selectedItemsSet.has(item);

    if (has) {
      selectedItemsSet.delete(item);
    } else {
      selectedItemsSet.add(item);
    }
  };

  return (
    <div>
      {NUMBERS_LIST.map((item) => (
        <button onClick={() => handleSelect(item)} key={item}>
          {item}
        </button>
      ))}
      <ul>
        {selectedItemsSet.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
