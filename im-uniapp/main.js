import Vue from 'vue';
import App from './App';
import store from './store';
import mixins from './mixins';
import request from './utils/request';
import storage from './utils/storage';
import urls from './common/urls';
import { router, RouterMount } from './router.js'
import Cache from './utils/cache'

Vue.config.productionTip = false;

// 全局挂载后使用
Vue.prototype.$http = request;
Vue.prototype.$store = store;
Vue.prototype.$storage = storage;
Vue.prototype.$urls = urls;
Vue.prototype.$Cache = Cache

Vue.use(router)
Vue.mixin(mixins)

App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});

// #ifdef H5
RouterMount(app,router,'#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
