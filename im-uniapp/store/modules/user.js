import IoService from '@/services/io.js';

export default {
  namespaced: true,
	state: {
		userInfo: null,
    userId: null,
		systemInfo:[],
		token : ''
	},
  // getters
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    token(state) {
      return state.token;
    },
  },
	mutations: {
    updateUserInfo(state , { userInfo }) {
      state.userInfo = userInfo;
    },
	},
	actions: {
		// 登录后处理
		login({ state, dispatch }, { userInfo, id, token }) {
			// 存到状态中
			state.userInfo = userInfo ;
      state.userId = id;
			state.token = token;

      IoService.connect();
		},
		logout({ state, dispatch }) {
			state.userInfo = null
			state.userId = null
			state.token = null

      IoService.disconnect();

			// 清除本地存储数据
			uni.clearStorageSync();
			// 跳转到登录页
			uni.reLaunch({
				url: "/pages/index/login"
			})
		},
		initLogin({ state, dispatch }) {
      if (state.userInfo && (!IoService.socket || !IoService.socket.connected)) {
        IoService.connect();
      }
    },
	}
}
