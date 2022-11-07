import axios from "axios";

export const useHttp = () => {
  /** Получаю данные */
  const get = (url: string, config?: any) => {
    return axios.get(url, config);
  };

  /** Создаю ресурс */
  const post = (url: string, data?: any, config?: any) => {
    return axios.post(url, data, config);
  };

  /** Редактирую ресурс */
  const patch = (url: string, data?: any, config?: any) => {
    return axios.patch(url, data, config);
  };

  /** Перезаписываю ресурс (заменяю его полностью) */
  const put = (url: string, data?: any, config?: any) => {
    return axios.put(url, data, config);
  };

  /** Удаляю ресурс */
  const delete_ = (url: string, config?: any) => {
    return axios.delete(url, config);
  };

  /**
   * Отправляю и получаю только http-заголовки (тело отсутствует)
   * Служит для проверки существования ресурса, он полностью аналогичен GET, но без возврата тела ответа
   *  */
  const head = (url: string, config?: any) => {
    return axios.head(url, config);
  };

  /**
   * Служит для получения параметров для ресурса или для сервера в целом и при этом сам ресурс ни
   * как не затрагивается (то есть это более дешевая операция по сравнению с HEAD)
   *
   * Возвращает параметры в заголовке.
   * Список параметров зависит о ресурса и/или сервера.
   * Обычно это заголовок Allow, который описывает какие методы доступны для ресурса.
   */
  const options = (url: string, config?: any) => {
    return axios.options(url, config);
  };

  return { get, post, patch, head, delete_ };
};
