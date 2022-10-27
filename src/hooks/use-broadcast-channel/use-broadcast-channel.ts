import { useCallback, useEffect, useState } from "react";

/**
 * хук для работы с браузерными контекстами: окно / вкладка,
 * для обмена данными между собой
 *
 * доступные методы:
 * postMessage<T>(message: T): void - записываю данные
 *
 * доступные состояния:
 * broadcastData: T - получаю данные в другом окне / вкладке
 *
 * пример использования хука:
 * const { postMessage, broadcastData } = useBroadcastChannel<{age: number}>("user-update");
 *
 * postMessage({ age: 18 }); - записываю данные
 * const { age } = broadcastData; - получаю данные в другом окне / вкладке
 */

export const useBroadcastChannel = <T>(nameChannel: string) => {
  const [broadcastData, setBroadcastData] = useState<T>();
  const bc = new BroadcastChannel(nameChannel);

  const postMessage = useCallback(
    (message: T) => {
      bc.postMessage(message);
    },
    [bc]
  );

  const readMessage = useCallback((e: MessageEvent<T>) => {
    setBroadcastData(e.data);
  }, []);

  useEffect(() => {
    bc.addEventListener("message", readMessage);

    return () => bc.removeEventListener("message", readMessage);
  }, [readMessage]);

  useEffect(() => () => bc.close());

  return { postMessage, broadcastData };
};
