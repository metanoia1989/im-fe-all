<template>
  <view class="cs-message-item" :style="itemStyle">
    <view class="from-name">{{ fromName }}</view>
    <view class="c-frame" :class="{ 'self-c': message.isMyself, 'other-c': !message.isMyself }">
      <view class="avatar" v-if="!message.isMyself">
        <image :src="friendHead" mode="aspectFill" />
      </view>
      <view class="container">
        <view class="container-text" v-if="message.body.type === 'text'" v-html="textMessage"></view>

        <view class="image" v-if="message.body.type === 'image'">
          <image :src="message.body.url" @click="imgPreview" mode="aspectFill"  />
        </view>

        <view class="video" v-if="message.body.type === 'video'">
        </view>
      </view>
      <view class="avatar" v-if="message.isMyself">
        <image :src="userInfo.photo" mode="aspectFill"  />
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import defaultUser from '@/static/images/head.png';
import emoji from '@/services/emoji.js';

export default {
  name: 'MessageItem',
  data() {
    return {
      defaultUser: defaultUser
    };
  },
  props: {
    conversationId: [Number, String],
    scroll: Object,
    message: Object
  },
  created() {
    if (
      !this.message.isMyself &&
      this.activeConversation.type === 'groupchat' &&
      !this.userInfoList.some(item => item.userId === this.message.fromId)
    ) {
      this.getUserInfo();
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('im', ['activeConversation', 'userInfoList']),
    textMessage() {
      if (this.message.body.type === 'text') {
        return emoji.transform(this.message.body.msg);
      }
      return '';
    },
    fromName() {
      if (this.message.isMyself) {
        return this.userInfo.nickname + ' ' + this.message.createdAt;
      }
      return this.message.createdAt + ' ' + this.fromUserInfo.nickname;
    },
    fromUserInfo() {
      if (this.activeConversation.type === 'chat') {
        return this.activeConversation.info;
      }
      return this.userInfoList.find(item => item.userId === this.message.fromId) || { name: '' };
    },
    itemStyle() {
      return {
        'text-align': this.message.isMyself ? 'right' : 'left'
      };
    },
    config() {
      if (this.message.body.type !== 'video') {
        return {};
      }
      return {
        width: 4,
        height: 3,
        id: this.message.body.url,
        ignores: ['play', 'volume'],
        whitelist: [
          ua => {
            return /Android/gi.test(ua);
          }
        ],
        controlsList: [],
        videoInit: true,
        fluid: true,
        url: this.message.body.url
      };
    },
    friendHead() {
      if (this.fromUserInfo.photo) {
        return this.fromUserInfo.photo;
      }

      return this.defaultUser;
    },
    myselfHead() {
      if (this.userInfo.photo) {
        return this.userInfo.photo;
      }
      return this.defaultUser;
    }
  },
  components: {
  },
  methods: {
    ...mapMutations('im', ['addUserInfo']),
    getUserInfo() {
      this.$http
        .get(this.$urls.restful.userInfo + `/${this.message.fromId}`, {})
        .then(data => {
          this.addUserInfo(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    imgPreview() {
    }
  }
};
</script>

<style lang="scss">
$self-b: #fff;
$other-b: #fff;

.cs-message-item {
  margin: 5px 10px;
  .from-name {
    color: #ccc;
    font-size: 12px;
    margin-bottom: 10px;
  }
  > .c-frame {
    display: flex;
    &.other-c {
      .container-text {
        text-align: left;
      }
      .container {
        margin-left: 15px;
        background-color: $other-b;
      }
      .container::before {
        width: 0;
        position: absolute;
        top: 15px;
        border-style: solid;
        content: '';
        left: -12px;
        border-color: transparent $other-b;
        border-width: 0 12px 12px 0;
      }
    }
    &.self-c {
      .container-text {
        text-align: left;
      }
      justify-content: flex-end;
      .container {
        margin-right: 15px;
        background-color: $self-b;
      }
      .container::before {
        width: 0;
        position: absolute;
        top: 15px;
        border-style: solid;
        content: '';
        right: -12px;
        border-color: transparent $self-b;
        border-width: 0 0 12px 12px;
      }
    }
    > .avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      img {
        background-color: #fff;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    > .container {
      font-size: 14px;
      padding: 1px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: auto;
      height: auto;
      border-radius: 5px;
      position: relative;
      .container-text {
        line-height: 20px;
        padding: 0 5px;
        display: inline-block;
        img {
          width: 16px;
          height: 16px;
        }
      }
      > .image {
        width: 150px;
        height: 100px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      > .video {
        width: 65%;
      }
      > .loc {
        width: 200px;
        height: 150px;
        .label {
          font-size: 12px;
          line-height: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .allmap {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
