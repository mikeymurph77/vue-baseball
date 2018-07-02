import Vue from 'vue'
import App from './App.vue'

// Use Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import {CONSTANTS} from './constants.js';
Vue.mixin({
  data: function() {
    return {
      get combos() {
        return CONSTANTS.COMBOS;
      }
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
