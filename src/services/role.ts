import { request } from 'ice';

export default {
  async getList(params) {
    const result = await request({ url: '/api/admin/role', params });
    return result;
  },
  async show(id) {
    const result = await request({ url: `/api/admin/role/${id}` });
    return result;
  },
  async create(params) {
    const result = await request.post('/api/admin/role', params);
    return result;
  },
  async update(params) {
    const result = await request.put(`/api/admin/role/${params.id}`, params);
    return result;
  },
  async destroy(id) {
    const result = await request.delete(`/api/admin/role/${id}`);
    return result;
  },
  async getAll() {
    const result = await request.get('/api/admin/role/all');
    return result;
  }
}