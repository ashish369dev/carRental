import Vue from 'vue';
import App from './App.vue';
import buefy from 'buefy';
import 'vue-material-design-icons/styles.css';
import 'buefy/dist/buefy.css';
import 'bulma/css/bulma.css';
import VeeValidate from 'vee-validate';



Vue.config.productionTip = false
Vue.use(buefy,{
  defaultIconPack:'mdi'
});
Vue.use(VeeValidate);
// Register it globally

new Vue({
  render: h => h(App),
}).$mount('#app')
