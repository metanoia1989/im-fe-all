let fs = require('fs')
let path = require('path')
let crypto = require('crypto');
const chalk = require('chalk')

// eslint-disable-next-line camelcase
let cache_file = 'cache_cdn.json'
let ignoreExts = [
  '.DS_Store'
]

// eslint-disable-next-line camelcase
function setCachedFiles (root_dir, data) {
  let p = path.join(root_dir, cache_file)
  fs.writeFileSync(p, JSON.stringify(data, null, 2))
}

// eslint-disable-next-line camelcase
function getCachedFiles (root_dir) {
  let p = path.join(root_dir, cache_file)
  let caches = {}
  if (fs.existsSync(p)) {
    caches = fs.readFileSync(p, 'utf-8')
    try {
      caches = JSON.parse(caches)
    } catch (e) {
      caches = {}
    }
  }
  return caches
}

function log (msg, color) {
  console.log(chalk[color](msg))
}

// eslint-disable-next-line camelcase
function loopDir (file, dir, root_dir, s_files) {
  // eslint-disable-next-line camelcase
  if (file === cache_file || ignoreExts.indexOf(file) > -1) {
    return
  }
  let fp = path.join(root_dir, dir, file)
  if (fs.statSync(fp).isFile()) {
    let ext = path.extname(file)
    if (ignoreExts.indexOf(ext) > -1) {
      return
    }
    // 读取一个Buffer
    let buffer = fs.readFileSync(path.join(root_dir, dir, file));
    let fsHash = crypto.createHash('md5');
    let md5 = fsHash.update(buffer).digest('hex');
    console.log('文件的MD5是：%s', md5);

    let f = path.join(dir, file)
    s_files.push({
      'filename': f,
      'md5': md5
    })
  } else {
    let files = fs.readdirSync(fp)
    files.forEach(function (fname) {
      loopDir(fname, path.join(dir, file), root_dir, s_files)
    })
  }
}

/**
 * 格式化日期
 * @param {string} fmt 日期格式化
 * @param {Date} date 日期
 * @returns 格式化后的日期
 */
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

/**
 * 格式化时间
 * @param {Date} time 时间
 * @returns
 */
function formatChatTime(time) {
  time = dateFormat("YY-mm-dd HH:MM:SS", new Date(time));
  var date = time.toString();
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];
  var d1 = new Date(year + '/' + month + '/' + day.split(" ")[0]);
  var d3 = new Date(date.replace(/-/g, "/"));
  var dd = new Date();
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  var d2 = new Date(y + '/' + m + '/' + d);
  var iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
  var hours = d3.getHours();
  var minutes = d3.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (iday == 0) {
    if (hours >= 12) {
      return "下午 " + hours + ":" + minutes;
    } else {
      return "上午 " + hours + ":" + minutes;;
    }
  } else if (iday == 1) {
    var dt = "";
    if (hours >= 12) {
      dt = "下午 " + hours + ":" + minutes;
    } else {
      dt = "上午 " + hours + ":" + minutes;;
    }
    return "昨天 " + dt;
  } else if (iday == 2) {
    var dt = "";
    if (hours >= 12) {
      dt = "下午 " + hours + ":" + minutes;
    } else {
      dt = "上午 " + hours + ":" + minutes;;
    }
    return "前天 " + dt;
  } else {
    return year + '/' + month + "/" + d1.getDate()
  }
}

function getGroupAvatarList(id) {
  var avatarList = [];
  if (id) {
    // let groups = this.getGroupById(id);
    // if (groups.group_users != undefined && groups.group_users.length) {
    //   groups.group_users.forEach((item) => {
    //     avatarList.push(item.avatar)
    //   })

    // }
  }
  return avatarList;
}

module.exports = {
  loopDir,
  cache_file,
  getCachedFiles,
  setCachedFiles,
  log,
  formatChatTime
}
