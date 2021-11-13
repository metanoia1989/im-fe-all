import {
	RouterMount,
	createRouter,
	runtimeQuit
} from 'uni-simple-router';
import { BACK_URL } from './config/cachekey'
import store from './store'
import Cache from './utils/cache'

const whiteList = ['register', 'login', 'forget_pwd']
const scrollInfo = {};

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	APP: {
		animation: {}
	},
	h5: {
		scrollBehavior: (to, from, savedPosition) => {
			const XY = scrollInfo[to.name];
			if (XY) return XY;
			return {
				x: 0,
				y: 0
			};
		}
	},
	routerErrorEach: ({
		type,
		msg
	}) => {
		router.$lockStatus = false;
		// #ifdef APP-PLUS
		if (type === 3) {
			runtimeQuit();
		}
		// #endif
	},
	debugger: false,
	routes: [
		...ROUTES,
		{
			path: '*',
			redirect: (to) => {
				return {
					name: '404'
				}
			}
		},
	]
});


// 全局路由前置守卫
router.beforeEach((to, from, next) => {
	// #ifdef H5
	// tab页面的滚动缓存
	if (from.meta.keepScroll === true) {
		scrollInfo[from.name] = {
			x: window.scrollX,
			y: window.scrollY
		}
	}
	// #endif

	console.log(to,from, 'beforeEach---开始跳转')
	let index = whiteList.findIndex((item) => from.path.includes(item))
	if (index == -1 && !store.getters.user_token) {
		Cache.set(BACK_URL, from.fullPath)
	}
	if (to.meta.auth && !store.getters.user_token) {
		next('/pages/index/login');
		return
	} else {
		next()
	}

});

// 全局路由后置后卫
router.afterEach( (to, from, next) => {
});

export {
	router,
	RouterMount
}
