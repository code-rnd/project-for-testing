import { useMemo, useState } from "react";

export function useMap<Key, Value>(initialValue?: Readonly<[[Key, Value]]>) {
  const [map] = useState(() => new Map(initialValue));

  const [size, setSize] = useState(map.size);

  const componentMap = useMemo(
    () => ({
      add(key: Key, value: Value): Map<Key, Value> {
        const result = map.set(key, value);
        setSize(map.size);

        return result;
      },
      has(key: Key): boolean {
        return map.has(key);
      },
      delete(key: Key): boolean {
        const result = map.delete(key);
        setSize(map.size);
        return result;
      },
      clear(): void {
        map.clear();
        setSize(0);
      },

      customMap<R>(mapper: (value: Value, key: Key) => R): R[] {
        const result: R[] = [];

        map.forEach((value, key) => {
          result.push(mapper(value, key));
        });

        return result;
      },

      get size(): number {
        return size;
      },
    }),
    [map, size]
  );

  return componentMap;
}
