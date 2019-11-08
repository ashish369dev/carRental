import Vue from 'vue'
import App from './App.vue'
import buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'

Vue.config.productionTip = false
Vue.use(buefy)
new Vue({
  render: h => h(App),
}).$mount('#app')
