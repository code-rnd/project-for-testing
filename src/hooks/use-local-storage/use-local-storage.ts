/**
 * хук для работы с локалсторедж (чтение/удаление/запись данных)
 *
 * доступные методы:
 * set<V>(key: string, value: V): void
 * get<T>(key: string): T
 * remove(key: string): void
 *
 * доступные состояния:
 * -
 *
 * пример использования хука:
 * const { set, get, clear } = useLocalStorage();
 *
 * set<number>("age", 1);
 * const age = get<string>("age");
 * clear("age");
 */

export const useLocalStorage = () => {
  const set = <V>(key: string, value: V): void =>
    localStorage.setItem(key, JSON.stringify(value));

  const get = <T>(key: string): T => {
    const value = localStorage.getItem(key);

    return !!value?.length ? JSON.parse(value) : value;
  };

  const remove = (key: string): void => localStorage.removeItem(key);

  return {
    set,
    get,
    remove,
  };
};
