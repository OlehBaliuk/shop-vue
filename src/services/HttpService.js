import Vue from 'vue';

class HttpService {
  static async request(url, method, data) {
    try {
      const response = await Vue.axios({ url, method, data });

      return response;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  static async get(url, options) {
    const response = await this.request(url, 'get', options);

    return response;
  }

  static async post(url, data) {
    const response = await this.request(url, 'post', data);

    return response;
  }

  static async put(url, data) {
    const response = await this.request(url, 'put', data);

    return response;
  }

  static async patch(url, data) {
    const response = await this.request(url, 'patch', data);

    return response;
  }

  static async delete(url) {
    const response = await this.request(url, 'delete');

    return response;
  }
}

export default HttpService;
