// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

// Vuex Store
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)
export default new Vuetify({ })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
