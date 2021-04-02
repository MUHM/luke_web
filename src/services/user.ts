import { request } from 'ice';

export default {
  async getList(params) {
    const result = await request({ url: '/api/admin/user', params });
    return result;
  },
  async show(id: number | string) {
    const result = await request({ url: `/api/admin/user/${id}` });
    return result;
  },
  async create(params) {
    const result = await request.post('/api/admin/user', params);
    return result;
  },
  async update(params) {
    const result = await request.put(`/api/admin/user/${params.id}`, params);
    return result;
  },
  async destroy(id: number | string) {
    const result = await request.delete(`/api/admin/user/${id}`);
    return result;
  },
  async reset(id: number | string) {
    const result = await request.post(`/api/admin/user/reset/${id}`);
    return result;
  },
}