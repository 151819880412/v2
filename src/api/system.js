 

import { defHttp } from '@/utils/http/index';


export const uploadFiles = (data) =>{
  return defHttp.uploadFile({ url: `/file/upload`},data);
}
