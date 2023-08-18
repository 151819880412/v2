/**
 * get请求添加后缀
 * @author  
 * @date 2023-07-31
 * @param {any} baseUrl
 * @param {any} obj
 * @returns {any}
 */
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}


// 获取 uuid
export const getUuid = function () {
  return (
    new Date().getTime().toString(36).substring(2, 12) +
    Math.ceil(Math.random() * 100000000).toString(36)
  )
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}