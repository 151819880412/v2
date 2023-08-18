
import { defHttp } from '@/utils/http/index';

export const sysMenuPage = (currentPage, pageSize, data) => {
  return defHttp.post({ url: `/menu/page/${currentPage}/${pageSize}`, data });
};

export const sysMenuAdd = (data) => {
  return defHttp.post({ url: `/menu/add`, data });
};

export const sysMenuEdit = (data) => {
  return defHttp.put({ url: `/menu/edit`, data }, { successMessageMode: true });
};

export const sysMenuDel = (data) => {
  return defHttp.delete({ url: `/menu/del`, data });
};
export const sysMenuQueryById = (id) => {
  return defHttp.get({ url: `/menu/queryById/${id}` });
};
