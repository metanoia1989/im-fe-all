<img width="464" src="https://i.loli.net/2020/07/01/AmsnawZ29RbUqk8.png">

即时通讯应用, 包含[服务端](https://github.com/hezhongfeng/im-server)、[管理端](https://github.com/hezhongfeng/im-fe-admin)和[客户端](https://github.com/hezhongfeng/im-fe-client)

现已部署上线，欢迎体验[客户端](https://im-client.hezf.online/)和[管理端](https://im-admin.hezf.online/)

**请不要随意更改默认角色和权限，请有点爱心，别整一些很不文明的名字**

## 介绍

以 Ant Design Pro 为模板搭建，IM 服务的管理端

## 功能简介

1. 注册，登录，个人、群组聊天，个人信息编辑等基础功能
2. 申请添加好友和申请入群
3. 表情，图片，视频，定位信息支持
4. 聊天会话列表记录
5. 消息记录（微信的消息记录真实一言难尽）
6. 支持多点同时登录
7. 百度 UNIT 机器人自动聊天
8. 支持 github 一键登录
9. 管理端，进行角色和权限的管理，群状态管理（我也当一回马化腾）

## 安装依赖

```bash
yarn
```

### 启动调试

```bash
yarn dev
```

### Build

```bash
yarn build
```

## 从 Vue 全家桶切换过来的感悟

在使用 antd-design-pro 和 umi 之前，我是使用过 create-react-app 这个脚手架去学习 React 的语法的，感觉还不错，除了 this 绑定那里有点麻烦之外都挺好的。但是初始化完 V4 的 pro 的模板项目后我还是懵逼了。最主要的就是没有提供相关的文档说明，比如 src 下各个文件夹的作用和他们之间是如何让连接在一起工作的。下面我将以我的视角试着解释下各个文件夹的功能和怎么组合在一起工作的。

## 目录

项目的根目录没有什么可说的，和 @vue/cli 创建的不同，但是也能看懂，多了 ts 方面和 prettier 的配置，我自己添加了 cz，用来规范自己的提交信息格式。

## dva

这个是必须要介绍的内容，因为`pro`里面到处充斥着`connect`这样的写法，看起来一脸懵逼

官方的解释是`dva = React-Router + Redux + Redux-saga`，在我看来这个东西就属于一个路由+状态管理，只不过这个状态管理不好理解，这时候感觉 React 没有官方的工具就显得轮子多了，据我所知就有好几种状态管理的方案，有选择困难症的同学压力很大。

### Model

在我看来就是组件中的数据和方法，在 dva 中通过将 component 和 model 分离的方式来管理视图，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions。

model 中有一个全局的 namespace，这个让我感觉到了和 vuex 的不同，Vue 项目中只有很少的一部分会用到全局的数据（比如用户登录信息），而 dva 的理想状态下是所有页面的状态都放在全局下，统一管理，这个确实比 Vue 的方式要统一一些，不过代价不小，如果我们目前的项目页面状态都采用这种方式的话，应该会很难受。

#### state

就是一份 Model 的状态数据，通常表现为一个 javascript 对象（当然它可以是任何值）,操作的时候每次都要当作不可变数据（immutable data）来对待，保证每次都是全新对象，没有引用关系，这样才能保证 State 的独立性，便于测试和追踪变化。

#### dispatch

这个概念也比较容易理解，就是通过 dispatch 发起一个 action，这个 action 有两种，分为同步的 Reducers 和异步的 Effects(副作用），effects 流向 Reducers 最终改变 State。

#### subscription

订阅现在使用的比较少，没有搞懂具体使用场景。

#### effects

处理异步操作和业务逻辑，较常用的是 call 、 put 和 select

- call 用来发起异步逻辑的调用，比如 IO 操作或者 http 请求
- put 是用来触发 action 更新 state 的
- select 用于从 state 里获取数据

```
yield put({ type: 'todos/add', payload: 'Learn Dva' });
const result = yield call(fetch, '/todos');
const todos = yield select(state => state.todos);

```

### connect

model 和 Vuex 是很相似的，容易理解，connect 这个概念是以前没有遇到过的。 我第一时间看不明白，在去查看了 redux 的文档过后，我知道了是把 model 中的 state 通过 props 的方式传递给 component ，然后 component 通过 dispatch 来更新 state，注意这里一般都是页面级的 Component，由页面级的继续把 state 分发给纯组件。

下面分析下`src/pages/user/login/index.tsx`最后的 connect

```
export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
```

`login, loading`属于全局下的 dva state，然后通过`userLogin`和`submitting`注入到了`Login`组件中，供组件使用，下面就是在组件中通过 props 获取 connect 传进来的状态数据

```
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
```

<img width="464" src="https://i.loli.net/2020/06/18/JbBjWrUspduwRym.png">

## login

下面我将详细的分析一下 login 页面组件，为了简洁以下我已经把快捷登录和 tab 切换相关内容去掉了。

### LoginForm

首先看 login 页面组件 return 回来的组件，里面是 div 包裹着一个 LoginForm，然后只有一个事件绑定 onSubmit，就是提交事件。处理提交事件的回调是 handleSubmit，这个函数的参数格式有如下要求：

```
export interface LoginParamsType {
  userName: string;
  password: string;
}
```

这些数据又通过 dispatch 发送给了 `login/login`，这个 action 是一个 effect，登录验证是异步的，在 `src/models/login.ts`下可以找到 effect 的详情

```
  *login({ payload }, { call, put }) {
    const response = yield call(fakeAccountLogin, payload);
    yield put({
      type: 'changeLoginStatus',
      payload: response,
    });
    // Login successfully
    if (response.status === 'ok') {
      // ...
    }
  },
```

这里是从整体看了下 LoginForm 这个组件，他的作用目前看就是处理提交事件，至于 onSubmit 这个事件是怎么触发的，我们可以查看到 是通过 antd 的组件 form 发起的 onFinish 事件，值的 key 就取自 FormItem 的 name

### UserName 和 Password

这俩组件应该是差不多的，我门放在一起说，可以看到他俩是 LoginItem 对象的 value：

```
Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;
```

继续查看发现，LoginItems 这个对象上的 UserName 和 Password 是通过遍历 map.ts 来赋值的，通过生成一个 LoginItem 组件，这个组件是通过 LoginItemProps 组合的

```
<FormItem name={name} {...options}>
  <Input {...customProps} {...otherProps} />
</FormItem>
```

原本以为是很简单的，仔细追踪发现写的挺绕的，封装了很多层，都使用 LoginItemProps 做了约束，还有这句`export default LoginItems as LoginItemType`，上面明明已经有了`export interface LoginItemType`，而且在使用的时候还是当做 LoginItems 来使用的。目前没有感受到这么写的意图，两个输入框+一个提交按键，需要写这么多吗？

### 接口验证

UI 和 model 层面的大致逻辑搞懂了，那么下一步需要研究下，怎么去和后端 API 进行 mock 和真实的联调。

1. 组件事件处理函数发起 dispatch
2. model 的 effects 进行处理
3. service 发起 http 请求
4. mock 响应或者是真实的接口
5. http 响应数据 response，交给 effects 继续处理

## layouts

登录成功之后，会发现在进入到主页之前会有一个`/api/currentUser`请求，获取当前登录成功用户的基础信息，经过搜索发现是在`@/layouts/SecurityLayout`里面的生命周期钩子里面发起的：

```
  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }
```

这个组件看起来很熟悉了，因为这是我们遇到的为数不多的有状态的类组件，其余的都是属于`Stateless Functional Components`这也是 dva 比较推崇的一种组件形式。

经过后台接口返回数据的改造之后，我们已经可以正常进入到主页了，右上角也显示出了当前用户的 name 等信息，下面来看一下 pro-layout 是怎么起作用的。

### SecurityLayout

SecurityLayout 是一个比较传统的 React 组件（因为只有这一个我看起来很熟悉）

首先这一句我没看懂`React.Component<SecurityLayoutProps, SecurityLayoutState>`也没找到说明

```
  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin && window.location.pathname !== '/user/login') {
    return <Redirect to={`/user/login?${queryString}`} />;
  }
  return children;
```

这个组件的作用就是在组件没有 Mount 的时候返回 PageLoading，这个是 pro-layout 提供的,看了下属于全网页的 loading, componentDidMount 之后判断是否登录，不然就给你 redirect 到登录页，由于这个是除了登录页面的最顶层的 layout，所以可以保证其子路由下的任何页面都是必须登录后才可以访问的。下面开始分析下 BasicLayout

### BasicLayout

可以看到 组件 connect 后，传递给组件的有 settings 和 global.collapsed，前者没搞清楚，后者是配合全局菜单折叠的

最终 return 的是 ProLayout，包括左侧可折叠菜单栏 sider，顶部 header,正文 content 和 页脚 footer，和我以前封装的结构差不多。

注意正文区域是被 Authorized 组件包裹着的，通过 getAuthorityFromRouter 传入了当前路由所需的权限,继续看下 Authorized 是什么组件

补充一下：整体布局是很有问题，在我想把中间部分撑满的时候发现居然有下面的样式：

```
basicLayout-content .ant-pro-page-header-wrap {
    margin: -24px -24px 0;
}
```

#### Authorized

发现 Authorized 是由 getAuthority 函数返回的数据生成的

```
Authorized = RenderAuthorize(getAuthority());
```

查看 getAuthority 里面，是从 localStorage 读取的值（登录成功后写入的值）,RenderAuthorize 通过检查当前路由所需的 authority 和当前用户拥有的权限进行 check，通过了就没问题，不通过就显示 403 的 Result。这部分也是有些绕，看到后面已经看不懂了，但我可以猜出来。。。下面分析下 ProLayout 里面各种 render

#### render

1. menuHeaderRender 左上角的 logo 和 title
2. menuItemRender 自定义菜单项的 render 方法，就是真正的菜单，可以点击打开路由的
3. breadcrumbRender 自定义面包屑的数据，具体怎么使用的没看懂
4. itemRender 没有说明，经过测试发现是面包屑里面各个 item 的 render,如果 first，就返回一个可以到根路由的 Link
5. footerRender 页脚的 render
6. menuDataRender 过滤菜单数据的 render，例如有些需要权限的路由，这里的菜单数据需要把没有该权限的菜单过滤掉
7. rightContentRender 正文上部右侧，显示用户名，退出菜单等的位置

layout 的大概我们看完了，下一步继续看看正文的内容吧

## ProTable

主页目前是一个 welcome 页，暂时不需要处理他，所以直奔主题，看看列表管理页面，这才是我们的目标，也就是两个 layout`@/layouts/SecurityLayout`、`@/layouts/BasicLayout`嵌套着一个普通的列表页面`@/pages/ListTableList`

> ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑

### request

通过菜单打开这个路由后会发现这个列表页面会发起一个请求`queryRule`，通过查看 mock 数据我们知道了返回的数据模型是这样的：

```
const result = {
  data: dataSource,
  total: tableListDataSource.length,
  success: true,
  pageSize,
  current: parseInt(`${params.currentPage}`, 10) || 1,
};
```

这个请求的发起者是`ProTable`，然后返回的数据也在它的内部消化了，这种形式我还比较熟悉。

通过查找 mock 发现 ProTable 上的`request={(params) => queryRule(params)}`封装了列表的请求行为，然后找到同目录下的 service.ts,在这里调用了封装的`umi-request`

然后这里发现了一个问题，ProTable 上的 request 是提供三个参数的，第一个 params 会自带 pageSize 和 current,并且将 props 中的 params 也会带入其中,对应的 queryRule 的参数使用一个接口 TableListParams 给约束了，这俩对不上，比如想要获取当前页码，request 传出来的是 current，TableListParams 里面只有 currentPage 这个参数，导致想要发给后台做参数变形的时候无法拿到 current，最后我修改了 currentPage,变为 current 才可以顺利获取参数，没搞懂是模板错误还是我的理解有问题

在 service 中返回 promise 或者自定义的结构都可以，有如下的约束，我的后台返回的参数是需要做一下处理的

```
  const res = await request('/api/v1/admin/roles', {
    params: param,
  });
  return {
    data: res.data.rows,
    total: res.data.count,
    success: true,
  };
```

这样就完成了一次请求，然后后台返回的数据列表里面的 key 是 id，所以需要把 ProTable 上的 rowKey 改成 id，有利于 React 做 diff，可以看到有一些列没有显示内容，那可能就是 columns 的取值属性何后台返回的有差别，做一些修改即可

## 总体感受

目前也照葫芦画瓢把基础功能都完成了，主要是学习认识 umi、pro 和 dva 之前的关系和各自的使用方式，感觉 umi 的文档写的不是很好，感觉不是一伙人在做一样，没有很好的结合起来。React Hook 的感觉和 Vue3.0 的 API 有一点点像，但是整体思路还是不一样的，毕竟这俩我都没用真正的大规模的使用，尤其是针对复用的使用方式。TS 也快写成了 anyscript 稍微感觉有点麻烦，但是智能提示在多个接口之间传递数据还是很舒服的，可以很快速的发现一些拼写错误，但是结合我们目前的开发测试方式，感觉提升不是很大。

以上都是我的真实感受，随着时间的推移，我的感受也会随之改变。
