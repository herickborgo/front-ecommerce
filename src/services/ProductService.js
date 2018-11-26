import BaseService from '@/services/BaseService'

export default class ProductService extends BaseService {
  constructor () {
    super('/backoffice')
  }
  index (currentPage = 1, search = '') {
    const uri = this.getUrl('products')

    return this
      .$axios
      .get(`${uri}?page=${currentPage}&per_page=10&search=${search}`)
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
}
