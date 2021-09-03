import axios from 'axios';
import {getData} from '../helper/common';
export const getAllBooks = async () => {
  const {data} = await axios.get(
    'https://teabook-server.herokuapp.com/api/book/get',
  );
  const result = await data.data;
  return result;
};

export const userLogin = async values => {
  try {
    const _res = await axios.post(
      'https://teabook-server.herokuapp.com/api/auth/login',
      values,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const status = await _res.status;
    if (status === 200) {
      const data = await _res.data;
      return {data, status: 200};
    }
  } catch (e) {
    if (e.response.status === 400) {
      return {data: null, status: 400};
    }
    if (e.response.status === 401) {
      return {data: null, status: 401};
    }
    if (e.response.status === 404) {
      return {data: null, status: 404};
    }
    if (e.response.status === 500) {
      return {data: null, status: 500};
    }
  }
};

export const getUserInfo = async () => {
  try {
    const {accessToken} = await getData('jwt');
    const {data} = await axios.post(
      'https://teabook-server.herokuapp.com/api/auth/user/info',
      null,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const userInfo = await data.data;
    return userInfo;
  } catch (e) {
    throw new Error(e);
  }
};
