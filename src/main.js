// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import './plugins/vue-weetalert-2'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Theme from './scripts/theme.js'

Vue.use(Vuetify)
Vue.use(Theme)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
