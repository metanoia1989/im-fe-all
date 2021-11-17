import http from '@/utils/request';
import urls from '@/common/urls';
import store from '@/store';

const userService = {
  /**
   * 获取用户信息
   */
  getUserInfo() {
    const userInfo = store.state.user.userInfo;
    http.get(urls.restful.userInfo + `/${userInfo.id}`).then(data => {
      store.commit('user/updateUserInfo', {
        userInfo: data
      });
    });
  },

  /**
   * 更新用户信息
   * @param {Object} params
   * @returns
   */
  updateUserInfo(params) {
    const userInfo = store.state.user.userInfo;
    const data = Object.assign({}, userInfo, params)
    return http.put(urls.restful.userInfo + `/${userInfo.id}`, data)
      .then(() => {
        store.commit('user/updateUserInfo', {
          userInfo: data
        });
      });
  },

  /**
   * 更新密码
   * @param {Object} params
   * @returns
   */
  updatePwd(params) {
    return http.post(urls.restful.userInfo + `/updatePwd`, params);
  },

  /**
   * 展示用户名片
   * @param {Object} data 用户信息
   * @param {String} type 来源
   */
  showCard(data, type = 'contact') {
    store.commit('friend/updateCardUser', data);
    uni.navigateTo({
      url: `/pages/contact/card?type=${type}`
    })
  },
}

export default userService;
