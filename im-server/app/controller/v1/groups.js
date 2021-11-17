const Controller = require('egg').Controller;

class GroupController extends Controller {
  async index() {
    const { ctx } = this;

    // 注意这里需要经过两次查询
    const user = await ctx.model.User.findByPk(ctx.state.user.id);
    let data = await user.getGroups();

    data = data.map(item => {
      item.photo = ctx.helper.getFileUrl(item.photo)
      return item;
    });

    ctx.body = {
      statusCode: '0',
      errorMessage: null,
      data: data
    };
  }

  async show() {
    const { ctx } = this;
    const group = await ctx.model.Group.findByPk(ctx.params.id);
    const users = await group.getUsers()
    group.users = users

    ctx.body = {
      statusCode: '0',
      errorMessage: null,
      data: group
    };
  }
}

module.exports = GroupController;
