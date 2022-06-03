import {Toast} from 'native-base';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {httpRequest} from '../apis/main';
import {ToastConfig} from '../constant/base';

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

const registerUniversitiesCollege = (values, field) =>
  httpRequest({
    body: JSON.stringify({...values, field}),
    headers: {},
    isReactQuery: true,
    method: 'POST',
    url: '/api/college',
    authorization: true,
  });
export const useRegisterCollege = field => {
  const queryClient = useQueryClient();
  return useMutation(values => registerUniversitiesCollege(values, field), {
    onSuccess: () => {
      Toast.show({
        ...ToastConfig,
        status: 'success',
        title: 'باموفقیت ثبت شد!',
      });
      queryClient.refetchQueries(['field', field]);
    },
  });
};

const registerUniversitiesDocumnets = async values => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return httpRequest({
    body: formData,
    method: 'POST',
    headers: {},
    isReactQuery: true,
    url: '/api/document',
    authorization: true,
  });
};

export const useRegisterDocument = (fieldId, collegeId) => {
  const queryClient = useQueryClient();
  return useMutation(values => registerUniversitiesDocumnets(values), {
    onSuccess: (value, {college, field}) => {
      Toast.show({
        ...ToastConfig,
        status: 'success',
        title: 'بامپفقیت ثبت شد!',
      });
      queryClient.invalidateQueries([field, college, 'documents']);
    },
  });
};
