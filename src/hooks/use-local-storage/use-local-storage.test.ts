import { useLocalStorage } from "./use-local-storage";

describe("Тестирование useLocalStorage", () => {
  const mockValueObj = { test: "test" };
  const mockValueString = "test";
  const mockKey = "testLocalStorage";

  test("Записываем объект и считываем результат", () => {
    const { set, get } = useLocalStorage();

    // Action
    set(mockKey, mockValueObj);
    const value = get<{ test: string }>(mockKey);

    expect(value).toEqual(mockValueObj);
  });

  test("Записываем строку и считываем результат", () => {
    const { set, get } = useLocalStorage();

    // Action
    set(mockKey, mockValueString);
    const value = get<string>(mockKey);

    expect(value).toBe(mockValueString);
  });

  test("Записываем, стираем объект и считываем результат", () => {
    const { set, remove, get } = useLocalStorage();

    // Action
    set(mockKey, mockValueObj);
    remove(mockKey);

    expect(get(mockKey)).toEqual(null);
  });
});
