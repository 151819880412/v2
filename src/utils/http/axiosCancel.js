import axios from 'axios';
import { isFunction } from '@/utils/is';

let pendingMap = new Map();

export const getPendingUrl = (config) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有挂起的请求，请添加它
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 清空所有pending请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel('清空所有pending请求');
    });
    pendingMap.clear();
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // 如果存在挂起的当前请求标识符，
      // 需要取消并删除当前请求;
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map();
  }
}
