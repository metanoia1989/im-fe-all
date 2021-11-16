const Controller = require('egg').Controller;

class UserInfoController extends Controller {
  // GET
  async show() {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    let userInfo = await user.getUserInfo({ raw: true });
    userInfo = {
      ...userInfo,
      photo: ctx.helper.getFileUrl(userInfo.photo),
      username: user.username,
    }
    ctx.body = {
      statusCode: '0',
      errorMessage: null,
      data: userInfo
    };
  }

  // PUT
  async update() {
    const { ctx } = this;
    const id = ctx.state.user.id;
    let { nickname, photo, sign } = ctx.request.body;
    photo = ctx.helper.setFileUrl(photo);
    const userInfo = await ctx.model.UserInfo.findByPk(id);
    await userInfo.update({
      nickname,
      photo,
      sign
    });
    ctx.body = {
      statusCode: '0',
      errorMessage: null,
      data: {}
    };
  }

  /**
   * 更新用户密码
   */
  async updatePwd() {
    const { ctx, service } = this;
    const params = ctx.request.body;

    try {
      const createRule = {
        oldPassword: { type: 'string', min: 4 },
        newPassword: { type: 'string', min: 4 },
        passwordConfirmation : { type: 'string', min: 4, compare: 'newPassword' },
      };
      ctx.validate(createRule, params);
    } catch (error) {
      ctx.body = {
        statusCode: '1',
        errorMessage: '参数校验失败'
      };
      return;
    }

    const id = ctx.state.user.id;
    await service.user.updatePwd({ id, ...params });
  }
}

module.exports = UserInfoController;
