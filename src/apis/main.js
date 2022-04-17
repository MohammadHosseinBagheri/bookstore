import axios from 'axios';
import {HOST} from '../constant/base';
import {LOGIN_SCREEN} from '../constant/routes';
import {getData, removeData} from '../helper/common';
import {replace} from '../screens/Config';
const customInstance = axios.create({
  baseURL: HOST,
});

export const httpRequest = async ({
  method,
  url,
  body,
  headers,
  isReactQuery,
  authorization = false,
}) => {
  const {accessToken: token} = await getData('jwt');
  console.log(token);
  try {
    const _res = await customInstance({
      method,
      url,
      data: body,
      headers: authorization
        ? {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
            ...headers,
          }
        : {
            'content-type': 'application/json',
            ...headers,
          },
    });
    const status = _res.status;
    console.log(status);
    if (status === 200 || status === 201) {
      if (isReactQuery) {
        return _res.data;
      }
      return {
        status: _res.status,
        message: _res.data?.message || 'Successful',
        data: _res.data,
      };
    }
  } catch (e) {
    if (e.response.status === 401) {
      return await removeData('jwt').then(() => replace(LOGIN_SCREEN));
    }
    return {
      status: e?.response?.status,
      message:
        e?.response?.data?.message ||
        // e?.response?.data?.errors[0] ||
        'عملیات با خطا مواجه شد!',
      data: null,
    };
  }
};
