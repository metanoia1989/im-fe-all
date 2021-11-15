import createPersistedState from 'vuex-persistedstate';

export default [
  createPersistedState({
    storage: {  // 存储方式定义
      getItem: (key) => uni.getStorageSync(key), // 获取
      setItem: (key, value) => uni.setStorageSync(key, value), // 存储
      removeItem: (key) => uni.removeStorageSync(key) // 删除
    }
  }),
];
