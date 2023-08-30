import { defHttp } from '@/utils/http/index';

export const login = (data) => {
  return defHttp.post({ url: `/auth/login`, data }, { successMessageMode: true });
};

export const refresh = (data) => {
  return defHttp.get({ url: `/auth/refresh`, data }, { successMessageMode: true });
};

export const queryUserPage = (currentPage, pageSize, data) => {
  return defHttp.post({ url: `/user/page/${currentPage}/${pageSize}`, data });
};
