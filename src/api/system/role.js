 
import { defHttp } from '@/utils/http/index';

export const rolePage = (currentPage, pageSize, data) => {
  return defHttp.post({ url: `/role/page/${currentPage}/${pageSize}`,data  });
};

export const roleAdd = ( data) => {
  return defHttp.post({ url: `/role/add`,data  });
};

export const roleUpdate = ( data) => {
  return defHttp.put({ url: `/role/update`,data  });
};

export const roleDel = ( data) => {
  return defHttp.delete({ url: `/role/del`,data  });
};