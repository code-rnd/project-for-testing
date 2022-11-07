import { useMemo, useState } from "react";

export function useSet<T>(inititalValue?: Iterable<T>) {
  const [set] = useState<Set<T>>(() => new Set(inititalValue));
  const [size, setSize] = useState<number>(set.size);

  const componentSet = useMemo(
    () => ({
      add(value: T): Set<T> {
        const result = set.add(value);
        setSize(set.size);
        return result;
      },
      delete(value: T): boolean {
        const result = set.delete(value);
        setSize(set.size);
        return result;
      },
      clear(): void {
        set.clear();
        setSize(0);
      },
      has(value: T): boolean {
        return set.has(value);
      },
      map<R>(mapper: (value: T) => R): R[] {
        const result: R[] = [];

        set.forEach((item) => {
          result.push(mapper(item));
        });

        return result;
      },

      get size(): number {
        return size;
      },
    }),
    [set, size]
  );

  return componentSet;
}
