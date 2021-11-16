const Service = require('egg').Service;

class userService extends Service {
  async getUserAttribute(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(id);
    let userInfo = await user.getUserInfo({ raw: true});
    userInfo = {
      ...userInfo,
      photo: ctx.helper.getFileUrl(userInfo.photo),
      username: user.username,
    }

    const roles = await user.getRoles().map(item => {
      delete item.user_role;
      return item;
    });
    const rights = [];
    for (const role of roles) {
      const tempRights = await role.getRights();
      rights.concat(tempRights);
      for (const right of tempRights) {
        if (!rights.some(item => item.id === right.id)) {
          delete right.role_role;
          right.get({
            plain: true
          });
          rights.push(right);
        }
      }
    }
    for (const role of roles) {
      role.get({
        plain: true
      });
    }
    return {
      userInfo,
      roles,
      rights
    };
  }

  async updatePwd({ id, oldPassword, newPassword }) {
    const { ctx } = this;

    const user = await ctx.model.User.findByPk(id);
    if (user.password !== ctx.helper.createPassword(oldPassword)) {
      ctx.body = {
        statusCode: '1',
        errorMessage: '原密码错误'
      };
      return;
    }
    await user.update({ 
      password: ctx.helper.createPassword(newPassword)
    });
    ctx.body = {
      statusCode: '0',
      errorMessage: null,
      data: {}
    };
  }
}

module.exports = userService;
