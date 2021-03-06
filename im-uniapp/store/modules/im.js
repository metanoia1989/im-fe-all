import robotHead from '@/static/images/robot.png';

const state = {
  conversationList: [],
  loadFinish: false,
  friendList: [
    {
      userId: 'robot',
      photo: robotHead,
      nickname: 'robot'
    }
  ],
  socketConnected: false,
};

// getters
const getters = {
  conversationList(state) {
    return state.conversationList;
  },
  activeConversation(state) {
    return state.conversationList.find(item => item.isActive === true);
  },
  friendList(state) {
    return state.friendList;
  }
};

// mutations
const mutations = {
  // 单条新消息
  newMessage(state, { message, isPush = true }) {
    const index = state.conversationList.findIndex(conversation => conversation.id === message.conversationId);
    if (isPush) {
      state.conversationList[index].messageList.push(message);
    } else {
      state.conversationList[index].messageList.unshift(message);
    }

    // 调序，将这个会话排序上调
    const conversation = state.conversationList.splice(index, 1)[0];
    state.conversationList.unshift(conversation);
  },
  // 批量消息
  newMessages(state, { conversationId, messages, messageCount }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    for (const message of messages) {
      conversation.messageList.unshift(message);
    }
    conversation.messageCount = messageCount;
  },
  updateMessageScroll(state, { conversationId }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    conversation.messageList.find(message => message.shouldScroll).shouldScroll = false;
  },
  clearMessages(state, { conversationId }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    conversation.messageList = [];
    conversation.pageNumber = 1;
  },
  updateConversationList(state, conversationList) {
    state.conversationList = conversationList;
  },
  addConversation(state, conversation) {
    state.conversationList.unshift(conversation);
  },
  removeConversation(state, { conversationId }) {
    const conversationIndex = state.conversationList.findIndex(conversation => conversation.id === conversationId);
    state.conversationList.splice(conversationIndex, 1);
  },
  updateConversationInfo(state, { conversationId, info }) {
    state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    }).info = info;
  },
  activateConversation(state, { conversationId }) {
    const activeConversation = state.conversationList.find(conversation => conversation.isActive === true);
    if (activeConversation) {
      activeConversation.isActive = false;
    }
    const conversationIndex = state.conversationList.findIndex(conversation => conversation.id === conversationId);
    // 存在于会话列表
    if (!(conversationIndex === -1)) {
      const conversation = state.conversationList[conversationIndex];
      conversation.isActive = true;
      state.conversationList.splice(conversationIndex, 1);
      state.conversationList.unshift(conversation);
    }
  },
  addUserInfo(state, userInfo) {
    if (!state.friendList.some(item => item.userId === userInfo.userId)) {
      state.friendList.push(userInfo);
    }
  },
  increaseConversationPageNumber(state, { conversationId }) {
    state.conversationList.find(conversation => conversation.id === conversationId).pageNumber++;
  },
  toggleLoad(state, status) {
    state.loadFinish = status;
  },
  toggleSocketStatus(state, status) {
    state.socketConnected = status;
  }
};

// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
