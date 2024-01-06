// stores/counter.js
import { defineStore } from 'pinia'

export const useStore = defineStore('useStore', {
  state: () => {

    return {
      isLogin: "false",
      user: {},
      helloPinia: 'Hello Pinia!',
      uID: null,
      uName: '',
      ptRole: '',
      pName: '',
    }

  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    getUser: (state) => state.user,

  },
  actions: {
    setUser(user: any) {
      if (user) {
        this.user = user;
      } else {
        this.user = {}
      }
    }
  }
})