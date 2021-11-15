// io packet消息的预处理
module.exports = app => {
  return async (ctx, next) => {
    ctx.logger.info('包数据', ctx.packet[0], ctx.packet[1]);
    try {
      const token = ctx.query.token;
      const decode = await app.jwt.verify(token, app.config.jwt.secret)
      ctx.state.user = decode
    } catch (error) {
      ctx.socket.disconnect();
      ctx.logger.info('没有权限断开连接!', error);
      return;
    }
    await next();
  };
};
