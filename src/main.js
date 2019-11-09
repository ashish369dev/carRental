import Vue from 'vue';
import App from './App.vue';
import buefy from 'buefy';
import 'buefy/dist/buefy.css';
import 'bulma/css/bulma.css';
import { validate } from 'vee-validate';

Vue.config.productionTip = false
Vue.use(buefy);
// Register it globally
Vue.component(validate);

new Vue({
  render: h => h(App),
}).$mount('#app')
