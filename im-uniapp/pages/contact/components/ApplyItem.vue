<template>
  <view class="apply-item">
    <view class="avatar">
      <image :src="apply.from.userInfo.photo" mode="aspectFill" />
    </view>
    <view class="name-info">
      <view class="name">{{apply.from.userInfo.nickname}}</view>
      <view class="info">{{info}}</view>
    </view>
    <view class="operation">
      <view class="btn" @click="onClick">处理</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ApplyItem',
  components: {},
  props: {
    apply: Object
  },
  data() {
    return {};
  },
  computed: {
    info() {
      switch (this.apply.type) {
        case 'user':
          return '对方请求添加你为朋友';
        case 'group':
          return '对方请求入群';
        default:
          return '';
      }
    }
  },
  watch: {},
  created() {
    console.log("用户数据", this.apply)
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss">
.apply-item {
  display: flex;
  position: relative;
  background-color: #fff;
  flex-direction: row;

  .avatar {
    width: 40px;
    height: 40px;
    margin: 10px;
    flex-shrink: 0;
    image {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name-info {
    flex-grow: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      color: #2f2f2f;
      font-size: 18px;
    }
    .info {
      color: #b1b1b1;
      font-size: 16px;
    }
  }

  .operation {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      background-color: #07c160;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
    }
  }
}
</style>
