import axios from "axios";

export const useHttp = () => {
  const get = (url: string, config?: any) => {
    return axios.get(url, config);
  };

  const post = (url: string, data?: any, config?: any) => {
    return axios.post(url, data, config);
  };

  const patch = (url: string, data?: any, config?: any) => {
    return axios.patch(url, data, config);
  };

  const delete_ = (url: string, config?: any) => {
    return axios.delete(url, config);
  };

  const head = (url: string, config?: any) => {
    return axios.head(url, config);
  };

  return { get, post, patch, head, delete_ };
};
