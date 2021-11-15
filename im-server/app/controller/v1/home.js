'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `hi, 欢迎${ctx.state.user ? ctx.state.user.username : '来访'}`;
  }
}

module.exports = HomeController;
