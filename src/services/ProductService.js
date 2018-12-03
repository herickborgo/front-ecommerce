import BaseService from '@/services/BaseService'

export default class ProductService extends BaseService {
  constructor () {
    super('/backoffice')
  }
  index (params) {
    const uri = this.getUrl('products')

    return this
      .$axios
      .get(uri, { params })
  }

  show (id) {
    const uri = this.getUrl('products')

    return this
      .$axios
      .get(`${uri}/${id}`)
  }

  store (payload) {
    const uri = this.getUrl('products')

    return this
      .$axios
      .post(uri, payload)
  }

  update (id, payload) {
    const uri = this.getUrl('products')

    return this
      .$axios
      .put(`${uri}/${id}`, payload)
  }

  destroy (id) {
    const uri = this.getUrl('products')

    return this
      .$axios
      .delete(`${uri}/${id}`)
  }

  uploadCSV(file) {
    const url = this.getUrl('products/upload-csv');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('csv', file, file.name);

    return this
      .$axios
      .post(url, formData, config);
  }
}
