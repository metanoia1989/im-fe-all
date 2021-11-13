'use strict';

exports.io = {
  enable: true,
  package: 'egg-socket.io'
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

exports.validate = {
  enable: true,
  package: 'egg-validate'
};

exports.session = {
  key: 'IM_SESS',
  maxAge: 1 * 3600 * 1000
};

exports.passport = {
  enable: true,
  package: 'egg-passport'
};

// exports.passportGithub = {
//   enable: true,
//   package: 'egg-passport-github'
// };

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}