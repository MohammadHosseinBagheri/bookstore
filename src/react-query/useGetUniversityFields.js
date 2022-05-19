import {useQuery} from 'react-query';
import {httpRequest} from '../apis/main';

const getFields = async universityId =>
  httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    url: `/api/field?university=${universityId}`,
    authorization: true,
  });

export const useGetUniversityField = universityId =>
  useQuery(['universityField', universityId], () => getFields(universityId));
