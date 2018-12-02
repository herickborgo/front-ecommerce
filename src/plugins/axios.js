import Vue from 'vue'
import axios from 'axios'
import LoginService from '@/services/LoginService'

const token = localStorage.getItem('Authorization')

const config = {
  baseURL: 'http://localhost:8081',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
}

const axiosInstance = axios.create(config)

// ---------- //

axiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    const { response } = error
    if (response.status === 401) {
      console.log(response.status)
    }
    return Promise.reject(error)
  }
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
