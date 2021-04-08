import { request } from 'ice';

export default {
  async getList(params) {
    const result = await request({ url: '/api/admin/systemconst', params });
    return result;
  },
  async show(id) {
    const result = await request({ url: `/api/admin/systemconst/${id}` });
    return result;
  },
  async create(params) {
    const result = await request.post('/api/admin/systemconst', params);
    return result;
  },
  async update(params) {
    const result = await request.put(`/api/admin/systemconst/${params.id}`, params);
    return result;
  },
  async destroy(id) {
    const result = await request.delete(`/api/admin/systemconst/${id}`);
    return result;
  },
  async getWebConfig() {
    const result = await request.get('/api/admin/systemconst/webconfig');
    return result;
  }
}