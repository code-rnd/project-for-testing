import { FC, useEffect, useState } from "react";

import { objUpdate } from "./SymbolView.utils";
import { id_1, initialUser } from "./SymbolView.const";

import s from "../Counter/Counter.module.scss";
/**
 * Демонстрация (для наглядности вывожу результат операции в консоль):
 * Использую в качестве ключа - символ, что позвоялет добавлять необходимые поля в объект,
 * безопасно для остальных / сторонних обработчиков этого объекта, так как перезатереть новым ключом его нельзя,
 * а на уже существующие ключи он никак не повлияет
 *
 * Сводка:
 * Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов.
 * «Скрытые» свойства объектов.
 * Свойство защищено от случайной перезаписи или использования.
 */
export const SymbolView: FC = () => {
  const [user, setUser] = useState<any>(initialUser);

  const handleUpdate = () => {
    const nextUser = objUpdate({
      prevObj: user,
      nextValue: 1,
      key: id_1,
    });

    setUser(nextUser);
  };

  const handleReset = () => {
    setUser(initialUser);
  };

  useEffect(() => {
    console.log({ user, keys: Object.keys(user) });
  }, [user]);

  return (
    <div className={s.counter}>
      <h1>key symbol: {user[id_1] || "undefined"}</h1>
      <div className={s.controls}>
        <button onClick={handleUpdate}>update</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
};
