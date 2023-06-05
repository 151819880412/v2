import axios from 'axios';

import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@/utils/is';
import { omit } from 'lodash';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import { globSetting } from './index';


class VAxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * @description: 数据处理，方便区分多种处理方式
   */
  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config) => {
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);
    this.axiosInstance.interceptors.response.use(undefined, (err) => {
      if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
        err = responseInterceptorsCatch(this.axiosInstance, err);
      }
      return err;
    });
  }

  async uploadFile(config, params) {
    const formData = new FormData();

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return;
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data[key]);
      });
    }
    formData.append("file", new Blob([params.file], { type: 'multipart/form-data; charset=utf-8', }), params.filename);
    const customParams = omit(params, 'file', 'filename', 'file');

    Object.keys(customParams).forEach(() => {
      // formData.append(key, customParams[key]);
    });

    return (await this.axiosInstance.request({
      ...config,
      url: globSetting.urlPrefix + config.url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data; charset=utf-8',
        'Accept': 'multipart/form-data; charset=utf-8',
        ignoreCancelToken: true,
      },
    })).data;
  }

  supportFormData(config) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: JSON.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request(config, options) {
    let conf = JSON.parse(JSON.stringify(config));

    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt = JSON.parse(JSON.stringify(Object.assign({}, requestOptions, options)));
    // this.options.requestOptions = JSON.parse(JSON.stringify(opt));

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // 在此处重写axios的错误消息
          }
          reject(e);
        });
    });
  }
}

export default VAxios;