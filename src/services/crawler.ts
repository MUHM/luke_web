import { request } from 'ice';

export default {
  async weiboHot() {
    const result = await request.get('/api/crawler/weibotimehot');
    return result;
  },
  async zhihuHot() {
    const result = await request.get('/api/crawler/zhihuhot');
    return result;
  }
}