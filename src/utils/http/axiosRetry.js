/**
 *  请求重试机制
 */

export class AxiosRetry {
  /**
   * 重试
   */
  async retry(AxiosInstance, error) {
    const { config, response } = error || {};
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [config?.requestOptions?.retrtyCount, config?.requestOptions?.retrtyDelay];
    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error });
      }
      // 增加重试计数
      config.__retryCount++;
      await this.delay(RETRY_DELAY);
      return await AxiosInstance(config);
    }
    return Promise.resolve();
  }

  /**
   * 延迟
   */
  delay(waitTime) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
