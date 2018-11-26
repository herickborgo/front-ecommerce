import Vue from 'vue'
import axios from 'axios'

const token = localStorage.getItem('Authorization')

const config = {
  baseURL: 'http://localhost:8081',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
}

const axiosInstance = axios.create(config)

const redirectToLogin = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('Authorization')
    return this
      .$router
      .replace('/login')
  }
  return response
}

// ---------- //

// axiosInstance.interceptors.request.use(
//   response => redirectToLogin(response)
// );
axiosInstance.interceptors.response.use(
  error => redirectToLogin(error)
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
