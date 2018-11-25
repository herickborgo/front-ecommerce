import Vue from 'vue'
import axios from 'axios'
import LoginService from '@/services/LoginService'

const token = LoginService.getToken();

const config = {
  baseURL: 'http://localhost:8081',
  headers: {
    Authorization: token
  }
}

const axiosInstance = axios.create(config)

const redirectToLogin = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('Authorization')
  }
  return response
}

// ---------- //

axiosInstance.interceptors.response.use(
  response => redirectToLogin(response)
);

Plugin.install = (VueInstance) => {
  const privateVueInstance = VueInstance
  privateVueInstance.axios = axiosInstance
  window.axios = axiosInstance

  Object.defineProperties(VueInstance.prototype, {
    axios: {
      get() {
        return axiosInstance
      },
    },
    $axios: {
      get() {
        return axiosInstance
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
