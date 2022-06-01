import {useQuery} from 'react-query';
import {httpRequest} from '../apis/main';

const getUniversitiesColleges = async fieldId => {
  const {data} = await httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    url: `/api/college?field=${fieldId}`,
    authorization: true,
  });
  return data;
};

export const useGetUniversitiesCollege = fieldId =>
  useQuery(['field', fieldId], () => getUniversitiesColleges(fieldId), {
    enabled: false,
  });
const getUniversitiesDocuments = async (fieldId, collegeId) => {
  const {data} = await httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    url: `/api/document?fieldId=${fieldId}&collegeId=${collegeId}`,
    authorization: true,
  });
  return data;
};

export const useGetUniversitiesDocuments = (fieldId, collegeId) =>
  useQuery(
    [fieldId, collegeId, 'documents'],
    () => getUniversitiesDocuments(fieldId, collegeId),
    {
      enabled: false,
    },
  );
