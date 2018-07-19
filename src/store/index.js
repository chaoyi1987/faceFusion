import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    setCookit(key,value,t) {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + ";expire="+ oDate.toGMTString();
    },
    getCookie(key) {
      let arr = document.cookie.split("; ");
      for (let i=0;i<arr.length;i++){
        let arrVal = arr[i].split("=");
        if (arrVal[0] == key){
          return decodeURI(arrVal[1]);
        }
      }
    }
  },
  mutations:{
    updateCount(state,payload) {
      state.setCookie = payload.setCookit;
    }
  }
});

export default store;
