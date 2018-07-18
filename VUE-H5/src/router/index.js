import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ChatRoom from '@/components/ChatRoom'
import addFriends from "@/components/addFriends"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'addFriends',
      component:addFriends
    },
    {
      path: '/home',
      name: 'home',
      component:Home
    },
    {
      path: '/ChatRoom',
      name: 'chat-room',
      component:ChatRoom
    }
  ]
})
