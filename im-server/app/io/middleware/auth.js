// 授权中间件处理
module.exports =  app => {
  return async (ctx, next) => {
    const { query } = ctx.socket.handshake;
    ctx.logger.info('connect: ', query);
    switch (query.scene) {
      case 'im':
        try {
          const token = ctx.query.token;
          const decode = await app.jwt.verify(token, app.config.jwt.secret)
          ctx.state.user = decode
        } catch (error) {
          ctx.socket.disconnect();
          ctx.logger.info('没有权限断开连接!', error);
          return;
        }
        ctx.service.im.connect(ctx.socket);
        ctx.logger.info('auth success: ', ctx.state.user);
        break;
      default:
        break;
    }
    await next();
    ctx.logger.info('disconnect: ', query);
    switch (query.scene) {
      case 'im':
        ctx.service.im.disconnect(ctx.socket);
        break;
      default:
        break;
    }
  };
};
