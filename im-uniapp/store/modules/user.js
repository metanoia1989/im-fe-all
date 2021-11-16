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
		updateUser(state, {
			k,
			v
		}) {
			if (state.user) {
				state.user[k] = v
				uni.setStorageSync('user', state.user)
			}
		}
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
		updateUser({ state, dispatch }, res) {
			// 存到状态中
			state.user = res
			// 存储到本地存储中
			uni.setStorageSync('user', res)
			uni.setStorageSync('uid', res._id)
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
