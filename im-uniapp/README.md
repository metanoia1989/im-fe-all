

## uniapp-scaffold 简介

使用 [uniapp-scaffold](https://github.com/mukuashi/uniapp-scaffold) 脚手架进行开发。


### Dev | 开发姿势

> VSCode + 小程序IDE + HbuilderX(可选，可通过修改目录，与cli方式切换)
> VSCode开发，HbuilderX实时编译（可视化菜单操作），小程序IDE实时预览
> cd projectName => git clone 此项目 => 基于此项目进行业务开发;

#### ① HbuilderX IDE 方式

1. 工具，先下载各平台开发工具（IDE）https://uniapp.dcloud.io/quickstart

2. 在 Hbuilder 中导入当前项目（uni-app 类型），修改或更新当前配置，manifest.json 和 pages.json（尤其注意要添加对应平台的 appid，在开发者后台配置 request、downloadFile 域名）;

3. 配置插件，菜单栏点击插件管理可以安装当前项目所需要的插件和 loader，（scss、babel、es6 等），yarn（步骤 3 不分先后）;

4. 菜单栏【运行】到对应开发的平台，不习惯当前IDE的可以切换到VSCode，同步开发，实时编译;

#### ② CLI工程方式
持续集成参考文档：https://ask.dcloud.net.cn/article/35750
##### HBuilderX 工程转换为 vue-cli 工程

> vue-cli 版更新频率较高，当需要使用一些新特性时可以转换为 vue-cli 工程

步骤：
1. 将 HBuilderX 工程内的文件（除 unpackage、node_modules 目录）拷贝至 vue-cli 工程内 src 目录
2. 在 vue-cli 工程内重新安装 npm 依赖（如果之前使用了 npm 依赖的话）


### Structure | 结构

``` 
├── uniapp-scaffold          # your project name
│ ├── /config/               # 业务基础/全局/国际化/皮肤配置等
│ ├── /components/           # 公共组件库: 基础 + 部分高复用业务组件
│ ├── /mixins/               # index已默认全局混入，其他可按需业务自行注入
│ ├── /pages/                # 主要业务页面（index.vue + index.scss）
│ ├── /services/             # 服务Service，建议按照业务模块拆分
│ ├── /styles/               # 全局样式 => core + mixin + function + theme...
│ ├── /store/                # 数据流（globalApp、业务数据等）
│ ├── /static/               # 项目图片、图标、字体及静态资源CDN、tabBar等
│ ├── /utils/                # lib、request、tool等
│ ├── /node_modules/         # npm依赖包
│ ├── /uni_modules/          # 存放[uni_module](/uni_modules)规范的插件
│ ├── /unpackage/            # 编译后多个平台的源码（dev开发版、dist生产版）
│ ├── /wxcomponents/         # 存放小程序组件的目录
│ ├── /platforms/            # 存放各平台专用页面的目录，[详见](https://uniapp.dcloud.io/platform?id=整体目录条件编译)
│ │──page.json               # 配置页面路由、导航条、选项卡等页面类信息
│ │──manifest.json           # 配置应用名称、appid、logo、版本等打包信息
│ │──main.js                 # Vue初始化入口文件
│ │──App.vue                 # 应用配置，用来配置App全局样式以及监听应用生命周期
```
### Guides | 参考资料

* [uni-app 文档](https://uniapp.dcloud.io)
* [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework)
* [头条小程序文档](https://microapp.bytedance.com/dev/cn/mini-app/develop/framework/basic-reference/introduction)
* [百度小程序文档](https://smartprogram.baidu.com/docs/develop/fuctionlist/list/)
* [支付宝小程序文档](https://opendocs.alipay.com/mini/developer)
* [airbnb javascript standard](https://github.com/airbnb/javascript)
* [Ant Design introduce](https://ant.design/docs/spec/introduce-cn)
* [JD Front-End Coding Guidelines](https://guide.aotu.io)
* [Taro · React 系小程序及多端统一开发解决方案](https://taro.aotu.io)
* [跨端开发框架深度横评之 2020 版](https://juejin.im/post/5e8e8d5a6fb9a03c6d3d9f42#heading-11)
* [使用 uni-app 开发小程序，比直接原生开发小程序好在哪里？](https://ask.dcloud.net.cn/article/36484)
* [跨端图表库uCharts仓库](https://gitee.com/uCharts/uCharts)
* [跨端图表库uCharts文档](http://doc.ucharts.cn)


### UI 库 | 组件

``` 
🐬
AdUI：Asako（浅子，作者的Home） Design（用户体验设计中心）旗下的UI组件库
一款集才华（规范）与颜值（专业）的用户体验设计组件库（基于微信视觉规范进一步封装的组件)
全局组件（@/components目录下）已开启easycom模式，可以不用像传统vue组件那样安装、引用、注册，可以直接在业务中使用（ad-xxx）

* 基础组件
  + ad-button
  + ad-avatar
  + ad-icon
  + ad-badge
  + ad-mask（遮罩，可自定义slot content及position）
  + ad-tag
  + ad-tips
  + ad-actionsheet（浮动面板，支持更强大的配置和淡入淡出动画）
  + ad-card
  + ad-spin（支持svg、img、css loading）
  + ad-calender（日历）
  + ad-text-animate（文字渐变动画）
  + ad-countup（数字递增及动画）
  + ad-tree（树结构）

* 业务组件
  + ad-author（一条数据/一个作者的丰富场景，头像、title、描述、额外插槽等）
  + ad-skeleton（骨架屏）
  + ad-status（状态结果页）
  + ad-swiper（3D画廊幻灯片）
  + ad-sticky（滑动固定器）
  + ad-navbar（自定义导航栏）
  + ad-clock（计时器）
  + ad-interact（互动）
  + ad-map（个性化地图）
  + Poster（分享海报插件/wxcomponents/wxa-plugin-canvas）
  + more...

* 图表组件
  + ad-charts（支持个性化配置config/charts，类型支持折线图、柱状图、饼图等10+种）

// 使用方式
可以在任何视图层页面以ad-xxx引用
```

