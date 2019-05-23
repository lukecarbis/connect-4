import Vue from 'vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
