import { request } from 'ice';

export default {
  async getList(params) {
    const result = await request({ url: '/api/admin/module', params });
    return result;
  },
  async show(id) {
    const result = await request({ url: `/api/admin/module/${id}` });
    return result;
  },
  async create(params) {
    const result = await request.post('/api/admin/module', params);
    return result;
  },
  async update(params) {
    const result = await request.put(`/api/admin/module/${params.id}`, params);
    return result;
  },
  async destroy(id) {
    const result = await request.delete(`/api/admin/module/${id}`);
    return result;
  },
  async getAll() {
    const result = await request.get('/api/admin/module/all');
    return result;
  },
  // 菜单
  async getMenu() {
    const result = await request.get('/api/account/menu');
    return result;
  },
  async getAdminMenu() {
    const result = await request.get('/api/account/adminmenu');
    return result;
  }
}