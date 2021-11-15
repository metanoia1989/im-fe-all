import axios from 'axios';
import Promise from './promise-finally';

// 默认的全局处理拦截
const responseHandle = function(response) {
  return new Promise(function(resolve, reject) {
    const data = response.data;
    if (data.statusCode === '0') {
      resolve(data.data);
    } else {
      reject(data);
    }
  });
};

function setToken() {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
}

export default {
  async get(url, params = {}) {
    setToken();
    const response = await axios.get(url, { params: params });
    return responseHandle(response);
  },
  async post(url, params = {}) {
    console.log('触发了url是多少呢？', url);
    setToken();
    const response = await axios.post(url, params);
    return responseHandle(response);
  },
  async put(url, params = {}) {
    setToken();
    const response = await axios.put(url, params);
    return responseHandle(response);
  },
  async delete(url, params = {}) {
    setToken();
    const response = await axios.delete(url, { data: params });
    return responseHandle(response);
  }
};
