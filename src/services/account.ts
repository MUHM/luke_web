import { request, history } from 'ice';
import CryptoJS from 'crypto-js';
import { WebCache } from '@/utils/cache';

const aesKey = 'jedi_';
const cache = new WebCache();

export default {
  // 登录
  async login(params) {
    const result = await request.post('/api/account/login', params);
    return result;
  },
  // 修改密码
  async password(params) {
    const result = await request.post('/api/account/password', params);
    return result;
  },
  // 保存凭证
  async saveCredentials(info) {
    const infoStr = JSON.stringify(info);
    cache.setItem('credentials', CryptoJS.AES.encrypt(infoStr, aesKey));
  },
  // 获取姓名
  getTruename() {
    const credentials = this.getCredentials();
    if (!credentials) {
      return '';
    }
    return credentials.user.truename;
  },
  // 获取凭证
  getCredentials() {
    try {
      const info = CryptoJS.AES.decrypt(cache.getItem('credentials'), aesKey);
      return JSON.parse(info.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      if (!history.location.pathname.startsWith('/user/login')) {
        history.push({
          pathname: '/user/login',
          search: `?returnUrl=${location.href.replace(location.origin, '')}`,
        });
      }
      return null;
    }
  },
  // 获取凭证
  getToken() {
    try {
      const info = CryptoJS.AES.decrypt(cache.getItem('credentials'), aesKey);
      const credentials = JSON.parse(info.toString(CryptoJS.enc.Utf8));
      return credentials.token;
    } catch (err) {
      return null;
    }
  },
  // 删除凭证
  delCredentials() {
    cache.removeItem('credentials');
  }
}