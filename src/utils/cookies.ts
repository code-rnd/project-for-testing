/** Контроллер для взаимодейтсвия с куками */
class Cookies {
  /** Хранилище куков:  мапа [ключ, значение] */
  private cookies: Map<string, string> = new Map<string, string>();

  constructor() {
    /** Синхронизация куков при инициализации */
    this.sync();
  }

  /** Маппинг актуальных куков в хранилище
   *  Синхронизация вызывается автоматически после любых мутаций куки */
  private sync() {
    const cookiesString = document.cookie;

    cookiesString?.split("; ")?.forEach((item) => {
      const values = item.split("=");

      const key = values.at(0) || "";
      const value = values.at(1) || "";

      /** Иттеративно сетаю куки в хранилище */
      this.cookies.set(key, value);
    });
  }

  /** Возвращаю куку по ключу */
  public get(key: string): string | undefined {
    this.sync();
    return this.cookies.get(key);
  }

  /** Возвращаю все куки */
  public getAll(type: "string" | "object" = "string") {
    this.sync();

    switch (type) {
      case "object":
        return Object.fromEntries(this.cookies);
      default:
        return this.cookies;
    }
  }

  /** Записываю куку по ключу */
  public set<T>(key: string, values: T) {
    /** Если строка, то записываю как строку */
    if (typeof values === "string") {
      document.cookie = `${key}=${values}`;
    } else {
      /** Если объект, то записываю как JSON */
      document.cookie = `${key}=${objectToStringForCookie(values)}`;
    }

    this.sync();
  }

  /** Удаляю куку по ключу */
  public remove(key: string) {
    /** Этот флаг используется для очистки значения в куки */
    const removeFlag = "max-age=-1";

    document.cookie = `${key}=; ${removeFlag};`;
    this.sync();
  }
}

export const cookies = new Cookies();

/** Привожу объект в строку, для записи в куки
 *  формат: { [key]:[value], ... } */
const objectToStringForCookie = <T>(object: T): string => {
  const entriesList = Object.entries(object as [string]);
  const entriesListLength = entriesList?.length;

  if (!entriesListLength) {
    return "";
  }

  return entriesList.reduce((acc, curr, index) => {
    const isFirst = index === 0;
    const isLast = index === entriesListLength - 1;

    return (
      acc +
      (isFirst ? "{" : ",") +
      curr.reduce((acc, curr, index) => {
        const isFirst = index === 0;

        return acc + (isFirst ? "" : ":") + curr;
      }) +
      (isLast ? "}" : "")
    );
  }, "");
};
