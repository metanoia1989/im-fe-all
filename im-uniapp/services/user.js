import http from '@/utils/request';
import tools from '@/utils/tools';
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
   *
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
   *
   * @param {Object} params
   * @returns
   */
  updatePwd(params) {
    return http.post(urls.restful.userInfo + `/updatePwd`, params);
  },

  /**
   * 展示用户名片
   *
   * @param {Object} data 用户信息
   * @param {String} type 来源
   */
  showCard(data, type = 'contact') {
    store.commit('friend/updateCardUser', data);
    uni.navigateTo({
      url: `/pages/contact/card?type=${type}`
    })
  },

  /**
   * 处理好友申请
   *
   * @param {Number} applyId 申请ID
   * @param {Boolean} approval 是否通过申请
   */
  applyFriend(applyId, approval) {
    const params = { id: applyId, approval };
    http.post(urls.add.applyFriend, params)
      .then(data => {
        uni.showToast({ title: "操作完成", icon: "none" });
        store.commit('im/addConversation', {
          type: 'chat',
          id: data.conversationId,
          isActive: false,
          info: {
            name: ''
          },
          target: data.target,
          updatedAt:  tools.dateFormat('YYYY-mm-dd HH:MM:SS', new Date()),
          messageCount: 0,
          messageList: [],
          pageNumber: 2,
          pageSize: 10,
          refreshing: false,
          loading: false,
          finished: false
        });
        store.commit('im/activateConversation', {
          conversationId: data.conversationId
        })
      })
      .finally(() => {
        store.dispatch('friend/getApplies');
      });
  },

  /**
   * 处理入群申请
   *
   * @param {Number} applyId 申请ID
   * @param {Boolean} approval 是否通过申请
   */
  applyGroup(applyId, approval) {
    const params = { id: applyId, approval };
    http.post(urls.add.applyGroup, params)
      .then(data => {
        uni.showToast({ title: '操作完成', icon: 'none' });
      })
      .finally(() => {
        store.dispatch('friend/getApplies');
      });
  },
}

export default userService;
