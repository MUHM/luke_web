import systemConstService from '@/services/systemConst';
import { WebCache } from '@/utils/cache';

interface IWebConfig {
  title: string;
  logo: string;
  copyright: string;
}
interface IState {
  webConfig: IWebConfig;
}

export default {
  state: {
    webConfig: {
      title: '写着玩系统',
      logo: '',
      copyright: '',
    },
  },
  effects: (dispatch) => ({
    async getWebConfig() {
      const cache = new WebCache<IWebConfig>();
      const webConfig = cache.getJSON('web_config');
      if (webConfig) {
        dispatch.systemConst.update({ webConfig });
        return;
      }
      const res = await systemConstService.getWebConfig();
      if (res.code === 200) {
        const data: IWebConfig = { ...dispatch.systemConst.webConfig };
        res.data.map(item => {
          data[item.constKey] = item.constValue;
        })
        dispatch.systemConst.update({ webConfig: data });
        cache.setJSON('web_config', data);
      }
    }
  }),
  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
}
