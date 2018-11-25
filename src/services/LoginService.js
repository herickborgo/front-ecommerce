import BaseService from '@/services/BaseService'

const tokenKey = 'Authorization'
const userId = 'UserId'

const saveToken = token => localStorage.setItem(tokenKey, token)

const removeAll = () => localStorage.clear()

export default class LoginService extends BaseService {
  constructor () {
    super('/auth')
  }

  static getToken () {
    return localStorage.getItem(tokenKey) || ''
  }

  static setToken (token) {
    saveToken(token)
  }

  static logout () {
    return removeAll()
  }

  static getUserId () {
    return localStorage.getItem(userId)
  }

  login (payload) {
    const url = this.getUrl()

    return this
      .$axios
      .post(url, payload)
  }
}
