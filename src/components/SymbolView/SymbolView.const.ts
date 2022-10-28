export const ID_DESCRIPTION = "id";

/**
 * Создаем два символа, с одинаковым описанием,
 * при это они все ровно остаются уникальными
 * */
export const id_1 = Symbol(ID_DESCRIPTION);
export const id_2 = Symbol(ID_DESCRIPTION);

/** Инициализация юзера */
export const initialUser = {
  id: 1,
  age: 18,
  country: "USA",
  phone: "+7 (001) 001 001",
};
