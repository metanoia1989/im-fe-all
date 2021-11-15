module.exports = (options, app) => {
  return async function authenticate(ctx, next) {
    let { path } = ctx;
    let whileList = ['/api/v1/signup', '/api/v1/login', '/api/v1/passport/github', '/api/v1/passport/github/callback'];
    
    if (whileList.indexOf(path) !== -1) {
      await next()
      return
    }

    let token = ctx.headers.authorization ? ctx.headers.authorization.substring(7) : '';
    if (!token && ctx.query.token) token = ctx.query.token;
    try {
       const decode = await app.jwt.verify(token, app.config.jwt.secret)
       ctx.state.user = decode
    } catch (error) {
      ctx.body = {
        statusCode: '1',
        errorMessage: '请登录',
        data: ctx.headers
      };
      return;
    }
    await next()
  };
};
