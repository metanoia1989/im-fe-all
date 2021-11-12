# @hezhongfeng 开源的IM使用

[@hezhongfeng](https://github.com/hezhongfeng)的开源IM项目地址
* im-fe-client https://github.com/hezhongfeng/im-fe-client        
* im-server https://github.com/hezhongfeng/im-server      
* im-fe-admin https://github.com/hezhongfeng/im-fe-admin      

im-uniapp 客户端：  
* 使用[uniapp-scaffold](https://github.com/mukuashi/uniapp-scaffold)脚手架        
* 使用[uni-nvue-chat](https://github.com/wzJun1/uni-nvue-chat)进行二开
* 参考学习[阿里ChatUI](https://chatui.io/)设计规范

为什么使用开源IM而不是自己开发，因为对IM整个技术栈不熟悉，从零开始我搞不定，也没有这样充足的时间。  
先把这个用上了，再来考虑接下来的。二次开发需要的精力和技术远远小于从零开始。    

为什么要给老哥开发这个，聚集人气，能够让我挣点钱，有钱才有尊严。
并且可以搬运利用开源社区的力量，商城、视频等等搞起来。扩大技术视野，并且能够结交老哥们。      

im-server 服务端使用        
修改 im-server/config/config.default.js 的数据库密码，并且要创建对应的数据库。      
在 app.js 和 app/schedule/baidu.js 中删除 ctx.service.baidu.getToken();     
在 public 目录下创建 upload 目录，不然现有的文件上传会报错。   

直接用uniapp重写，然后再来体验聊天的完整流程：
* [ ] 好友申请、添加、拒绝、拉黑等操作
* [ ] 群组创建、退出、管理等操作

紧急处理的事项：    
* [ ] 文件上传需要对接到腾讯云，不能直接传到服务器。
* [ ] 删除客户端机器人聊天。
* [ ] 去掉客户端背景的说明
* [ ] 客户端点击+号无效，反而出现在了我的页面
* [ ] 客户端需要打包为 uniapp 才行，有转换处理的方案。需要一些时间来重写。      
* [ ] 添加默认加入群组，所有用户都自动加入，避免后续申请。
* [ ] Todo改为发现，
* [ ] 将机器人选项改为公告，所有的更新都在这里发布。
* [ ] 添加客服会话，我这边能够直接看，或者类似传统的反馈机制【减少工作量】
* [ ] 聊天页面，表情需直接用微信的表情，加上贴吧泡泡表情，并且附带emoji
* [ ] 允许发送视频、录音，现在是没有的，这个需要调用系统API 
* [ ] 添加朋友圈，朋友圈功能后续来做

不紧急的事项
* [ ] 添加公告频道，后续发送公告之类，新闻
* [ ] 添加仿微信的公众号应用，给红牛哥来发送新闻。  
* [ ] 完善自动化部署流程，优化开发效率，并不紧急。前期可以手动。    
* [ ] 添加群组搜索功能，方便检索群组
* [ ] 添加应用列表，发布我创建的产品，提供增值服务。