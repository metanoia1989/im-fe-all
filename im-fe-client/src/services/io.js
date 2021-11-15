import http from '@/common/http';
import io from 'socket.io-client';
import store from '@/store';
import urls from '@/common/urls';
import config from '../../config/config';
import robotHead from '@/assets/images/robot.png';

// 处理消息体
const handleMessage = message => {
  // 在入口处直接添加isMyself
  message.isMyself = store.getters.userId === message.fromId;
};

const IoService = {
  socket: null,
  scroll: null,
  async getSocket() {
    const userId = store.getters.userId;
    this.socket = io(config.ioHost, {
      query: {
        scene: 'im',
        userId: userId
      },
      transports: ['websocket'],
      timeout: 5000
    });

    this.socket.on('connect', () => {
      console.log('socket连接成功，开始获取会话列表！');
      getConversationList();
    });

    this.socket.on('error', error => {
      console.log('socket连接出错', error);
    });

    // 有新消息
    this.socket.on('/v1/im/new-message', message => {
      handleMessage(message);
      message.shouldScroll = true;
      store.commit('im/newMessage', { message });
    });

    console.log('getSocket end');
  },
  connect() {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.getSocket();
    }
  },
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('socket断开成功！');
    }
  },
  // 发送消息
  sendMessage(message) {
    this.socket.emit('/v1/im/new-message', message);
  },
  // 请求聊天记录
  getMessageList({ conversationId, pageSize, pageNumber, init }) {
    this.socket.emit(
      '/v1/im/get-messages',
      {
        conversationId,
        pageSize,
        pageNumber
      },
      ({ count, conversationId, messages }) => {
        for (const message of messages) {
          handleMessage(message);
        }
        if (!init && messages[0]) {
          messages[0].shouldScroll = true;
        }
        store.commit('im/newMessages', { conversationId, messages, messageCount: count });
      }
    );
  },
  // join
  join(conversationId) {
    this.socket.emit('/v1/im/join', {
      conversationId
    });
  }
};

const getConversationList = () => {
  http
    .get(urls.restful.conversations, {})
    .then(conversationList => {
      for (const iterator of conversationList) {
        iterator.isActive = false;
        iterator.info = {
          name: ''
        };
        iterator.messageList = [];
        iterator.pageNumber = 2;
        iterator.pageSize = 10;
      }
      for (const conversation of conversationList) {
        IoService.getMessageList({
          conversationId: conversation.id,
          pageSize: conversation.pageSize,
          pageNumber: 1,
          init: true
        });
      }
      // 机器人的处理
      conversationList.unshift({
        info: {
          id: 'robot',
          name: 'robot',
          photo: robotHead
        },
        id: 'robot',
        isActive: false,
        type: 'robot',
        photo: '',
        messageList: [
          {
            body: { msg: '你好，我是智能机器人，我们聊天吧', type: 'text' },
            conversationId: 'robot',
            createdAt: '2020-07-17 15:11:04',
            fromId: 'robot',
            id: 0,
            toId: 2
          }
        ]
      });
      store.commit('im/updateConversationList', conversationList);
    })
    .catch(error => {
      console.log(error.errorMessage);
    });
};

export default IoService;
