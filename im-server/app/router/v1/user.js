module.exports = app => {
  const { router, controller } = app;

  // 更新密码
  router.post('/api/v1/userinfo/updatePwd', controller.v1.userInfo.updatePwd);
};
