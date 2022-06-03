import {useQuery} from 'react-query';
import {httpRequest} from '../apis/main';

const getProvince = (province = undefined) => {
  return httpRequest({
    method: 'GET',
    body: {},
    headers: {},
    isReactQuery: true,
    url:
      typeof province === 'undefined' || province === ''
        ? '/api/province'
        : `/api/province${`?province=${province}`}`,
    authorization: true,
  });
};

export const useGetProvince = () =>
  useQuery('province', () => getProvince(), {enabled: false});

export const useGetCity = province =>
  useQuery(['city', province], () => getProvince(province), {enabled: false});
