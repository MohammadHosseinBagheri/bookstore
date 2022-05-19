import {useQuery} from 'react-query';
import {httpRequest} from '../apis/main';

const getUniversities = async () =>
  httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    url: '/api/university',
    authorization: true,
  });

export const useGetUniversities = () =>
  useQuery('universities', getUniversities);
