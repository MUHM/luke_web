import { request } from 'ice';

export default {
  async getList(params) {
    const result = await request({ url: '/api/admin/permission', params });
    return result;
  },
  async getAll() {
    const result = await request.get('/api/admin/permission/all');
    return result;
  }
}