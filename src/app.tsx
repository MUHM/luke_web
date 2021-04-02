import { runApp, IAppConfig, history } from 'ice';
import accountService from '@/services/account';
import { Message } from '@alifd/next';

const appConfig: IAppConfig = {
  app: {
    rootId: 'luke-container',
  },
  router: {
    type: 'browser',
  },
  request: {
    // 可选的，全局设置 request 是否返回 response 对象，默认为 false
    withFullResponse: false,

    baseURL: '/',
    headers: {
      'Content-Type': 'application/json',
    },
    // ...RequestConfig 其他参数

    // 拦截器
    interceptors: {
      request: {
        onConfig: (config) => {
          // 发送请求前：可以对 RequestConfig 做一些统一处理
          config.headers = Object.assign(config.headers, {
            token: accountService.getToken(),
          });
          return config;
        },
        onError: (error) => {
          return Promise.reject(error);
        }
      },
      response: {
        onConfig: (response) => {
          // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
          if (response.data?.code !== 200) {
            Message.error({
              type: 'error',
              title: '错误消息',
              content: response.data.message,
            });
            return response;
          }

          return response;
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            Message.show({
              type: 'error',
              title: '错误',
              content: '登录超时',
            });
            if (!history.location.pathname.startsWith('/user/login')) {
              history.push({
                pathname: '/user/login',
                search: `?returnUrl=${location.href.replace(location.origin, '')}`,
              });
            }
            return Promise.reject(error);
          }
          if (error.response?.status === 403) {
            Message.show({
              type: 'warning',
              title: '警告',
              content: '没有相关权限',
            });
            return Promise.reject(error);
          }
          // 请求出错：服务端返回错误状态码
          Message.show({
            type: 'error',
            title: '错误消息',
            content: `${error.response?.status}:请求出错`,
          });
          return Promise.reject(error);
        }
      },
    }
  }
};
runApp(appConfig);
