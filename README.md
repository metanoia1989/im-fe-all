# @hezhongfeng 开源的IM使用

[@hezhongfeng](https://github.com/hezhongfeng)的开源IM项目地址
* im-fe-client https://github.com/hezhongfeng/im-fe-client        
* im-server https://github.com/hezhongfeng/im-server      
* im-fe-admin https://github.com/hezhongfeng/im-fe-admin      

为什么使用开源IM而不是自己开发，因为对IM整个技术栈不熟悉，从零开始我搞不定，也没有这样充足的时间。  
先把这个用上了，再来考虑接下来的。二次开发需要的精力和技术远远小于从零开始。    

为什么要给老哥开发这个，聚集人气，能够让我挣点钱，有钱才有尊严。
并且可以搬运利用开源社区的力量，商城、视频等等搞起来。扩大技术视野，并且能够结交老哥们。      

im-server 服务端使用 
修改 im-server/config/config.default.js 的数据库密码，并且要创建对应的数据库。
在 app.js 和 app/schedule/baidu.js 中删除 ctx.service.baidu.getToken();


需要处理的事项：    
* [ ] 文件上传需要对接到腾讯云，不能直接传到服务器。
* [ ] 删除机器人聊天。
* [ ] 前端需要打包为 uniapp 才行，有转换处理的方案。    
* [ ] 完善自动化部署流程，优化开发效率，并不紧急。前期可以手动。    