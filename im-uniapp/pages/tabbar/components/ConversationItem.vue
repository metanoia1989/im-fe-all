<template>
  <uni-swipe-action class="swipe-action">
    <uni-swipe-action-item
      :threshold="80"
      :rightOptions="options"
      @click="swipeClick($event)"
      class="conversation-wrap">

      <view class="conversation-item" @click="onClick">
        <view class="avatar">
          <image :src="head" mode="aspectFill" />
        </view>
        <view class="left">
          <view class="name-time">
            <view class="name">{{ conversation.info.name || conversation.info.nickname }}</view>
            <view class="time">{{ $tools.formatChatTime(conversation.updatedAt) }}</view>
          </view>
          <view class="last-message">{{ lastMessage }}</view>
        </view>
      </view>
    </uni-swipe-action-item>
  </uni-swipe-action>
</template>

<script>
import IoService from '@/services/io.js';
import { mapMutations } from 'vuex';
import defaultHead from '@/static/images/head.png';
import defaultGroup from '@/static/images/group.png';

export default {
  name: 'ConversationItem',
  components: {},
  props: {
    conversation: Object
  },
  data() {
    return {
      defaultHead: defaultHead,
      defaultGroup: defaultGroup,
      options: [{
        text: '标为已读',
        style: {
          backgroundColor: '#4c4c4c'
        }
      }, {
        text: '删除',
        style: {
          backgroundColor: '#fa5151'
        }
      }],
    };
  },
  computed: {
    head() {
      if (this.conversation.info && this.conversation.info.photo) {
        return this.conversation.info.photo;
      }
      return this.conversation.type === 'chat' ? this.defaultHead : this.defaultGroup;
    },
    lastMessage() {
      let lastMessage = null;
      if (this.conversation.messageList.length > 0) {
        lastMessage = this.conversation.messageList[this.conversation.messageList.length - 1];
      }
      if (!lastMessage) {
        return '';
      }
      switch (lastMessage.body.type) {
        case 'text':
          return lastMessage.body.msg;
        case 'image':
          return '图片消息';
        case 'video':
          return '视频消息';
        case 'loc':
          return '定位消息';

        default:
          return '';
      }
    }
  },
  watch: {},
  created() {
    if (this.conversation.type === 'chat') {
      this.getUserInfo();
    }
    if (this.conversation.type === 'groupchat') {
      this.getGroupInfo();
    }
    IoService.join(this.conversation.id);
  },
  methods: {
    ...mapMutations('im', ['activateConversation', 'updateConversationInfo', 'removeConversation']),
    disabledConversation() {
      this.removeConversation({
        conversationId: this.conversation.id
      });
    },
    swipeClick: function(e) {
      if (this.conversation.type === 'robot') {
        return;
      }
      if (e.index === 0) { // 标为已读
      } else if (e.index === 1) { // 删除
        this.disabledConversation();
      }
    },
    onClick() {
      this.activateConversation({
        conversationId: this.conversation.id
      });
      setTimeout(() => {
        this.$router.push('/chat');
      }, 60);
    },
  }
};
</script>

<style lang="scss">
.conversation-wrap {
  height: 62px;
  .conversation-item {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 60px;
    padding: 11px 16px;
    box-sizing: border-box;

    .avatar {
      width: 49px;
      height: 49px;
      flex-shrink: 0;
      image {
        background-color: #fff;
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
    }

    .left {
      display: flex;
      flex-direction: column;
      width: calc(100% - 50px);
      position: relative;
      .name-time {
        display: flex;
        justify-content: space-between;
        .name {
          color: #2f2f2f;
          font-size: 16px;
        }
        .time {
          color: #d8d8d8;
          font-size: 14px;
        }
      }
      .last-message {
        color: #d8d8d8;
        font-size: 14px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0 solid #ebedf0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-bottom-width: 1px;
      }
    }
  }
  .van-button {
    height: 100%;
  }
}
</style>
