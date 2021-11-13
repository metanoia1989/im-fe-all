import app from "@/config";
import storage from "@/utils/storage";
import { isInPolygon, getRandomItem } from "@/utils";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      systemInfo: this.systemInfo,
    };
  },
  computed: {
    gradient() {
      return getRandomItem(app.gradients);
    },
    ...mapState({
      app: state => state.app
    })
  },
  methods: {
    ...mapMutations(["userInfoMutation"]),

    /**
     * 查询节点信息
     * 封装自uni的nodesRef.boundingClientRect，内部使用Promise，可以让用户同步获取节点信息
     * selector <String> 此参数为元素节点，可以是id或者class，比如"#user-name"，".box"
     * all <Boolean> 是否返回全部节点信息，当页面有多个相同selector的元素时，all为true，会以数组形式返回所有节点的信息(结果为数组，数组元素为对象)，否则只返回第一个节点的信息(结果为一个对象)
     */
    handleGetRect(selector, all) {
      return new Promise(resolve => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
    /**
     * 返回上一页
     */
    handleNavigateBack(params = { delta: 1 }) {
      uni.navigateBack(params);
    },
    /**
     *
     * @param {*} val 复制文本
     * @param {*} showToast 复制成功后是否展示toast
     */
    handleCommonCopy(val, showToast = true, icon = "success") {
      uni.setClipboardData({
        data: val,
        success: () => {
          uni.hideToast();
          if (showToast) {
            uni.showToast({
              title: val,
              icon
            });
          }
        }
      });
    },
  }
};
