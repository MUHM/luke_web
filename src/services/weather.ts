import { request } from 'ice';

export default {
  async fetch(){
    const result = await request.get('/api/weather');
    return result;
  }
}
