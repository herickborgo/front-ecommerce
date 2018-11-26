import BaseService from '@/services/BaseService'

export default class CategoryService extends BaseService {
  constructor () {
    super('/backoffice/categories')
  }

  getAll () {
    const uri = this.getUrl('all')

    return this
      .$axios
      .get(`${uri}`)
  }
}
