import { useCallback, useEffect, useState } from "react";

/**
 * хук для работы с событием 'storage' (слушаю изменения локалсторедж в рамках одного домена);
 * тем самым, могу получать и синхронизировать актуальность данных между вкладками / окнами
 *
 * Важно: событие срабатывает на всех остальных объектах window,
 * где доступно хранилище, кроме того окна, которое его вызвало.
 *
 * доступные методы:
 * -
 *
 * доступные состояния:
 * storageData: string
 *
 * пример использования хука:
 * const { storageData } = useStorageChannel("age");
 *
 * const age = storageData; - получаю данные в другом окне / вкладке
 */

export const useStorageChannel = (keyName: string) => {
  const [storageData, setStorageData] = useState("");

  const handleStorage = useCallback(
    ({ key, newValue }: StorageEvent) => {
      if (key === keyName) {
        setStorageData(newValue || "");
      }
    },
    [keyName]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { storageData };
};
