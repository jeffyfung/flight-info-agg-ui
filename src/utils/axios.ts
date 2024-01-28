import axios, { AxiosInstance, AxiosResponse } from "axios";

export class Axios {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      timeout: 300000, // 1500
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      withCredentials: true,
    });
  }

  async get<T>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    config = config || {};
    config.headers = config.headers || {};
    // config.headers["Origin"] = "https://flight-info-agg-ui-production.up.railway.app";

    return this.instance.post<T>(url, data, config);
  }
}

export const ax = new Axios();
