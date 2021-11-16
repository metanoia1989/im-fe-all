import http from '@/utils/request';
import urls from '@/common/urls';
import store from '@/store';

export function getUserInfo() {
  const userInfo = store.state.user.userInfo;
  http.get(urls.restful.userInfo + `/${userInfo.id}`).then(data => {
    store.commit('user/updateUserInfo', {
      userInfo: data
    });
  });
}

export function updateUserInfo(params) {
  const userInfo = store.state.user.userInfo;
  const data = Object.assign({}, userInfo, params)
  return http.put(urls.restful.userInfo + `/${userInfo.id}`, data)
    .then(() => {
      store.commit('user/updateUserInfo', {
        userInfo: data
      });
    });
}

export function updatePwd(params) {
  return http.post(urls.restful.userInfo + `/updatePwd`, params);
}
