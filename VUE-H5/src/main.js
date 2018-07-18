// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from "jquery"
import store from "@/store/index"
import VueJsonp from "vue-jsonp"
import swiper from "@/swiper_v4.0/index"
import VueApp from "@/common/js/VueApp.js"
import Axios from "axios"
import VueAxios from "vue-axios"

import '@/common/css/style.css'

Vue.config.productionTip = false
Vue.use(VueJsonp);
Vue.use(VueAxios,Axios);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  $,
  store,
  swiper,
  components: {App},
  template: '<App/>'
})

VueApp();
