import axios from 'axios';
import {getData} from '../helper/common';
import Config from 'react-native-config';

export const getAllBooks = async () => {
  const {data} = await axios.get(
    `https://teabook-server.herokuapp.com/api/book/get`,
  );
  const result = await data.data;
  return result;
};

export const userLogin = async values => {
  try {
    const _res = await axios.post(
      `https://teabook-server.herokuapp.com/api/auth/login`,
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
      `https://teabook-server.herokuapp.com/api/auth/user/info`,
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
export const userRegister = async values => {
  try {
    const {name} = await values;
    const firstName = await name.split(' ')[0];
    const lastName = await name.split(' ')[1];
    const _res = await axios.post(
      `https://teabook-server.herokuapp.com/api/auth/register`,
      {...values, name: firstName, lastName},
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const status = await _res.status;
    if (status === 201) {
      const data = await _res.data;
      return {data, status: 201};
    }
  } catch (e) {
    if (e.response.status === 400) {
      return {data: null, status: 400, message: e.response.data.message};
    }
    if (e.response.status === 409) {
      return {data: null, status: 409, message: e.response.data.message};
    }
    if (e.response.status === 500) {
      return {data: null, status: 500, message: e.response.data.message};
    }
  }
};
