import Vue from 'vue';
import Vuex from 'vuex';

import config from '@/config';
import auth from './modules/auth'
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    app: {
      ...config,
    },
  },
  mutations: {
    // 更新某个key-value，module对应模块，type更新的第一个key，next为可选的第二个key,value为更新的值
    commonUpdate(state, payload) {
      const { module, type, next, value } = payload;
      if (next) {
        state[module][type][next] = {
          ...state[type][next],
          ...value,
        };
      } else {
        state[module][type] = {
          ...state[type],
          ...value,
        };
      }
    },
  },
  actions: {},
  modules: {
    auth,
    user,
    im
  },
});
