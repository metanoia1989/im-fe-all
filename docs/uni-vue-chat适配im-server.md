
还是纯文本编辑起来比较舒服，轻量顺滑。

# uni-vue-chat

页面做的真漂亮，没话说。

三个tab页面：

/pages/tabbar/session 消息列表页			
/pages/tabbar/contact 好友列表页
/pages/tabbar/my 个人中心页				

其他页面

/pages/index/login 登录页面			
/pages/index/regist 注册页面		

/pages/group/createGroup 发起群聊页面		 	

/pages/contact/queryUsers 联系人添加好友页面 	
/pages/contact/groupList 群组列表页		
/pages/contact/applyList 好友申请页		

/pages/user/user 个人信息页面 		
/pages/user/form 个人信息字段编辑		

这些聊天的页面适配还好，还需要开发朋友圈的功能。
不过我这个朋友圈开发范围会大一些，默认为所有人可见，可以设置为仅好友可见，以及仅自己可见。
可以聊天、可以发动态，这样才算基本的聊天功能。

# 消息列表适配


页面地址 /pages/tabbar/session 
会话接口地址 /api/v1/conversations 

会话列表数据结构如下

```
{
	"id": 28,
	"type": "groupchat",
	"activeTime": "2021-11-15 18:50:46",
	"active": true,
	"createdAt": "2021-11-12 12:22:04",
	"updatedAt": "2021-11-15 18:50:46",
	"target": {
		"id": 2,
		"name": "往来无白丁",
		"photo": "/public/images/group.png",
		"introduction": "富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善",
		"disabled": false,
		"mute": false,
		"ownerId": 2,
		"createdAt": "2021-11-12 12:22:04",
		"updatedAt": "2021-11-12 12:22:04",
		"conversationId": 28,
		"user_group": {
			"createdAt": "2021-11-12 12:22:04",
			"updatedAt": "2021-11-12 12:22:04",
			"groupId": 2,
			"userId": 2
		}
	}
},{
	"id": 2,
	"type": "chat",
	"activeTime": "2021-11-15 18:49:26",
	"active": true,
	"createdAt": "2021-11-12 12:22:03",
	"updatedAt": "2021-11-15 18:49:27",
	"target": {
		"id": 4,
		"provider": "local",
		"username": "muteuser",
		"createdAt": "2021-11-12 12:22:01",
		"updatedAt": "2021-11-12 12:22:01",
		"userInfo": {
			"id": 4,
			"nickname": "muteuser",
			"photo": "/public/images/head3.png",
			"sign": "念念不忘，必有回响~",
			"createdAt": "2021-11-12 12:22:01",
			"updatedAt": "2021-11-12 12:22:01",
			"userId": 4
		}
	}
},
```

会话列表渲染搞定了，还是有些问题：
* [ ] 会话列表懒加载，只加载激活的会话，减轻请求压力
* [ ] 会话消息未读数，现在后端没有实现这个逻辑
* [ ] 会话消息群组头像，需要返回1~5个
* [ ] 滑动有BUG，被单个会话项捕捉，无法滑动。后续替换，不用这个组件。


# 聊天页面适配

/pages/chat/chat 好友聊天页面		
/pages/group/chatGroup 群组聊天页面     

两个页面 95% 的代码都是一样的，后面应该使用同一个页面来保证统一性。		

聊天的页面太复杂了，原有的代码影响我的逻辑，后续来重构，直接从空白代码开始，需要那些用那些。


# 其他页面适配
其他页面都比较简单，先适配这些逻辑不复杂的。

* [x] /pages/index/login 登录页面			
* [x] /pages/index/regist 注册页面	
* [x] /pages/tabbar/my 个人中心页	
* [x] /pages/user/user 个人信息页面 		
* [x] /pages/user/form 个人信息字段编辑	
* [ ] /pages/tabbar/contact 好友列表页
* [ ] /pages/group/createGroup 发起群聊页面		 	
* [ ] /pages/contact/queryUsers 联系人添加好友页面 	
* [ ] /pages/contact/groupList 群组列表页		
* [ ] /pages/contact/applyList 好友申请页		

今天来搞定剩下的这些页面	
好友列表，需要获取：群组列表、好友列表、好友申请列表	
不好弄，后端的架构我也不是很懂，自己构建新模块的能力的确很弱啊。

尽量简化，减少心智负担，因为已有的逻辑太大，我不好动手和重构。

用户协议 https://jibencaozuo.com/zh-Hans/bulletin/1 
隐私政策 https://jibencaozuo.com/zh-Hans/bulletin/5 
51Talk用户协议 https://sale.51talk.com/agree/app?product_type=user_agreement
51Talk个人信息保护政策 https://sale.51talk.com/agree/version?v=20210810175320 

uParse 富文本解析组件 https://ext.dcloud.net.cn/plugin?id=183 
uni-app富文本渲染方案rich-text、uparse、v-html简单解析 https://www.cnblogs.com/huihuihero/p/12978903.html 


tui.editor markdown 编辑组件
codemirror 在线编辑器 
我不是穷人，只是待富者。

找个编程兼职看看，没那么多保障，但是最起码时间一点，而且是多劳多得。
大公司要求太严格，中小工资搞的跟外包没啥区别，并且酬劳很低。
自习完，把自己的简历包装一下，然后投递兼职的，主动过去联系。

或者专门针对好点的公司，做面试准备。给人做兼职，也是一个不错的理由。
起码要有个拿的出手的项目来说服人才行，这个聊天的一定要搞定。


uni-app项目：在uni-popup弹框组件中引用uni-list 列表无法滑动 https://www.jianshu.com/p/6ec274e28cfc 
后面直接把 uni-list-item 替换掉，自己来写个组件，解决这个问题。
因为设置了 disableScroll 导致无法滑动


这个到时候，iOS上只能是网页了。
并且检测如果是微信访问，就跳转一个引导页，引导浏览器访问。
如果是安卓，就强制要求下载APP。

  