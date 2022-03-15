import Vue from 'vue';

class ProductService {
  static async request(url, method, data) {
    const config = { url, method, data };
    try {
      const response = await Vue.axios(config);
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  static async get() {
    const response = await this.request('/products', 'get');

    return response;
  }

  static async post(data) {
    const response = await this.request('/products', 'post', data);

    return response;
  }

  static async put(data) {
    const { id } = data;
    const response = await this.request(`/${id}`, 'put', data);

    return response;
  }

  static async patch(data) {
    const { id } = data;
    const response = await this.request(`/products/${id}`, 'patch', data);

    return response;
  }

  static async delete(data) {
    const response = await this.request(`/products/${data.id}`, 'delete');

    return response;
  }
}

export default ProductService;
