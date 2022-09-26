import { AxiosResponse } from 'axios';
import Vue from 'vue';

class HttpService {
  static async request(url: string, method: any, data?: any): Promise<any> {
    try {
      const response = await Vue.axios({ url, method, data });

      return response;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  static async get(url: string) {
    const response = await this.request(url, 'get');

    return response;
  }

  static async post(url: string, data: any) {
    const response = await this.request(url, 'post', data);

    return response;
  }

  static async put(url: string, data: any) {
    const response = await this.request(url, 'put', data);

    return response;
  }

  static async patch(url: string, data: any) {
    const response = await this.request(url, 'patch', data);

    return response;
  }

  static async delete(url: string) {
    const response = await this.request(url, 'delete');

    return response;
  }
}

export default HttpService;
