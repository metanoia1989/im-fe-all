/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 一些公共静态数据，减少server请求和业务模块里的重复定义，提高复用性
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-10 // Initial version.
 * @version 0.2 | 2020-03-26 // 添加海报配置.
 * @Date:   2019-07-10 10:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 14:34:34
 */
import verses from "./verses";

const domain = {
  api: "http://api.kquanr.com", // 通用api
  sinaimg: "https://lz.sinaimg.cn", // 新浪微博、绿洲
  mepai: "https://api.mepai.me",
  _500px: "https://500px.com.cn",
  lbs: 'https://apis.map.qq.com',
  weather: 'https://wis.qq.com',
  cloud: {
    studio: 'https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la',
    daily: 'https://6173-asako-daily-avyxm-1301749635.tcb.qcloud.la',
    living: 'https://6173-asako-living-o28nn-1301956907.tcb.qcloud.la'
  }
};

// 常用渐变色库
const gradients = [
  'linear-gradient(to bottom, #f78ca0 0%, #fb3c8f 100%)',
  'linear-gradient(to bottom, #f09819 0%, #ff5858 100%)',
  'linear-gradient(to bottom, #FBDA61 0%, #FF5ACD 100%)',
  'linear-gradient(to bottom, #ffb199 0%, #ff0844 100%)',
  'linear-gradient(to bottom, #68e0cf 0%, #209cff 100%)',
  'linear-gradient(to bottom, #0093E9 0%, #08AEEA 100%)',
  'linear-gradient(to bottom, #8ddad5 0%, #0ba360 100%)',
  'linear-gradient(to bottom, #3cba92 0%, #0ba360 100%)',
  'linear-gradient(to bottom, #88d3ce 0%, #6e45e2 100%)',
  'linear-gradient(to bottom, #e5b2ca 0%, #7028e4 100%)',
];

// 常用轮播静态图
const gallery = [
  '/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg',
  '/orj1080/967d9727ly3gc0whyclfoj20sg0sge0a.jpg',
  '/orj1080/967d9727ly3gc0whykstlj20sg0sgb29.jpg',
  '/orj1080/967d9727ly3gc0whywdupj20sg0sgb0l.jpg',
  '/orj1080/967d9727ly3gc0whysphij20sg0sgkcg.jpg',
  '/orj1080/967d9727ly3gc0whyiy96j20sg0sg1jj.jpg',
  '/orj1080/967d9727ly3gc0whz3i51j20sg0sgu0x.jpg',
  '/orj1080/967d9727ly3gc0whz6qvlj20sg0sghdt.jpg',
  '/orj1080/967d9727ly3gc0whz6yf1j20sg0sgkic.jpg',
].map(row => `${domain.sinaimg}${row}`);

// loading
const loading = [
  'loading_01.gif',
  'loading_02.gif',
  'loading_03.gif',
].map(row => `${domain.cloud.studio}/static/loading/${row}`);

// animate name list
const animations = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];

export default {
  // 谚语诗句
  verses,
  domain,
  gradients,
  gallery,
  loading,
  animations,
  // 语言类型
  languages: [
    {
      type: 'English',
      text: 'English',
    },
    {
      type: 'Chinese',
      text: '简体中文',
      abbr: '中文'
    },
  ],
  images: {
    loading: `${domain.cloud.studio}/static/images/loading_default.svg`,
    logo: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6kicJlR84fRiaDQnMciackIRDYXCN0tibZibGiadLWVYO2N3eg/0"
  },
  // 优先级 appid > path > target > url
  // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
};
