import http from '@/utils/request';
import urls from '@/common/urls';

const state = {
  // 申请数量
  applyCount: 0,
  friendList: [],
  applyList: [],
  groupList: [],
  cardUser: null, // 名片卡用户
};

// getters
const getters = {
  friendList(state) {
    return state.friendList;
  },
  applyCount(state) {
    return state.applyCount;
  },
  applyList(state) {
    return state.applyList;
  },
  groupList(state) {
    return state.groupList;
  },
  cardUser(state) {
    return state.cardUser
  },
};

// mutations
const mutations = {
  updateFriendList(state, data) {
    state.friendList = data;
  },
  updateApply(state, { rows, count }) {
    state.applyList = rows;
    state.applyCount = count;
  },
  updateGroupList(state, data) {
    state.friendList = data;
  },
  updateCardUser(state, data) {
    state.cardUser = data;
  },
};

// actions
const actions = {
  getFriendList({ commit }) {
    http.get(urls.friend.friendList).then(data => {
      commit('updateFriendList', data);
    });
  },
  getGroupList({ commit }) {
    http.get(urls.friend.groupList).then(data => {
      commit('updateGroupList', data);
    })
  },
  getApplies({ commit }) {
    http.get(urls.friend.applyList).then(data => {
      commit('updateApply', data)
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
