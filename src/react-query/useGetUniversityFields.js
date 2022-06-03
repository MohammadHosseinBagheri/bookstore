import {Toast} from 'native-base';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {httpRequest} from '../apis/main';
import {ToastConfig} from '../constant/base';

const getFields = async universityId =>
  httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    url: `/api/field?university=${universityId}`,
    authorization: true,
  });
const registerField = async (values, university) => {
  return httpRequest({
    body: JSON.stringify({...values, university}),
    headers: {},
    isReactQuery: true,
    method: 'POST',
    url: '/api/field',
    authorization: true,
  });
};

export const useGetUniversityField = universityId =>
  useQuery(['universityField', universityId], () => getFields(universityId));

export const useRegisterField = university => {
  const queryClient = useQueryClient();
  return useMutation(values => registerField(values, university), {
    onSuccess: () => {
      Toast.show({
        ...ToastConfig,
        title: 'باموفقیت ثبت شد!',
        status: 'success',
      });
      queryClient.invalidateQueries(['universityField', university]);
    },
  });
};
