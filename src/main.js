import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import './plugins/vue-weetalert-2'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
