// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import VAxios from './Axios';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString } from '@/utils/is';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';
import { AxiosRetry } from './axiosRetry';
import { joinTimestamp, formatRequestDate } from './helper';
import { setObjToUrlParams } from '@/utils/index';
import store from '@/store/index';
import { refresh } from '@/api/login';

let loadingInstance;
import('@/main').then((module) => {
  loadingInstance = module.default?.$Loading;
});

export const globSetting = {
  title: 1,
  apiUrl: process.env.VUE_APP_SERVER_URL,
  shortName: 1,
  urlPrefix: '/api',
  uploadUrl: 1,
};
const urlPrefix = globSetting.urlPrefix;
let TokenInvalid = false;

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
  /**
 * @description: 请求已成功处理。如果数据不是预期格式，可直接抛出错误
 */
  transformRequestHook: (res, options) => {
    const { data } = res;
    //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message } = data;
    const { isTransformResponse, isReturnNativeResponse, successMessageMode, errorMessageMode } = options;


    // 成功的消息提示
    if (code === 20000 && successMessageMode) {
      Message.success(message);
    }

    if (code !== 20000) {
      Message[errorMessageMode](res.data.message);
    }

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    // 不返回code，根据统一处理
    // 服务器返回成功code 200 / 20000 都是成功
    const hasSuccess =
      data && Reflect.has(data, 'code') && (code === ResultEnum.SUCCESS || code === 20000 || code === 20001 || code === 30001 || code === 40001);
    if (hasSuccess) {
      return data;
    }

    // throw new Error('transformRequestHook 拦截错误---' + message);
    return Promise.reject('transformRequestHook 拦截错误---' + message);

  },

  /**
   * @description: 请求前的流程配置
   * @description: Process configuration before request
   */
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        // 为了同时存在params和query参数，暂时将query参数放入data中
        config.params = data ? data : undefined;
        // config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    loadingInstance?.showLoading();
    NProgress.start();
    // 请求之前处理config
    const { accessToken, refreshToken,num } = store.state.user.userInfo
    if (accessToken && (config)?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${accessToken}`
        : accessToken;
    }
    if (refreshToken && (config)?.requestOptions?.withToken !== false) {
      config.headers.refreshToken = options.authenticationScheme
        ? `${options.authenticationScheme} ${refreshToken}`
        : refreshToken;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: async (axiosInstance,config, res) => {
    // console.log('响应拦截器处理', res);
    let { code } = res.data;
    const hasSuccess = (code === ResultEnum.SUCCESS || code === 20000 || code === 20001);

    if (code == 30001) {
      if (!config.url.includes('/refresh')) {
        const res1 = await refresh();
        if (res1.code === 20000) {
          store.dispatch('setToken',res1.data)
          const retryRequest = new AxiosRetry();
          config.requestOptions.retrtyCount = 1
          let refreshData = await retryRequest.retry(axiosInstance, {config:config,response:""}).catch((err) => {
            console.error(err)
            // 重复请求的失败，防止多次调用新增错误日志的接口
          });
          return refreshData
        } else {
          TokenInvalid = true;
          router.replace({
            path: '/login'
          });
        }
      }
    }

    loadingInstance?.hideLoading();
    NProgress.done();
    if (TokenInvalid) return res;
    if (hasSuccess) {
      return res;
    }
    throw new Error('responseInterceptors 拦截错误---' + res.data.message);
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: async (axiosInstance, error) => {
    // console.log('响应错误拦截器', error, error.response);
    loadingInstance?.hideLoading();
    NProgress.done();

    const { code, response } = error;
    const retryRequest = new AxiosRetry();
    retryRequest.retry(axiosInstance, error).catch(() => {
      // 重复请求的失败，防止多次调用新增错误日志的接口
    });
    switch (code) {
      case 'ERR_BAD_REQUEST':
        Message.error(response.data.message);
        break;

      default:
        Message.error(response.data.message);
        break;
    }
    // throw new Error('responseInterceptorsCatch 拦截错误---' + error);
    return Promise.reject('responseInterceptorsCatch 拦截错误---' + error);

  },
};

function createAxios(_opt) {
  return new VAxios(
    {
      // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
      authenticationScheme: '',
      timeout: 1000 * 30,
      // 基础接口地址
      baseURL: globSetting.apiUrl,
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      // 如果是form-data格式
      // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
      // 数据处理方式
      transform,
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        // 失败重复请求次数
        retrtyCount: 0,
        // 失败重复请求时间
        retrtyDelay: 1000,
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 错误消息提示类型
        errorMessageMode: 'error',
        // 成功是否提示消息
        successMessageMode: false,
        // 接口地址
        apiUrl: globSetting.apiUrl,
        // 接口拼接地址
        urlPrefix: urlPrefix,
        // 是否加入时间戳
        joinTime: true,
        // 是否禁止重复请求
        ignoreCancelToken: false,
        // 是否携带token
        withToken: true,
        // 是否携带refreshToken
        withRefreshToken: true,
      },
    }
  );
}
export const defHttp = createAxios();
// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
