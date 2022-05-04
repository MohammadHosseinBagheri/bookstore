import {Toast} from 'native-base';
import {useMutation, useQueryClient} from 'react-query';
import {httpRequest} from '../apis/main';
import {ToastConfig} from '../constant/base';

const editBook = async (data, id) => {
  return httpRequest({
    body: JSON.stringify(data),
    headers: {},
    isReactQuery: true,
    method: 'PUT',
    url: `/api/book/${id}`,
    authorization: true,
  });
};
export const useEditSingleBook = id => {
  const queryClient = useQueryClient();
  return useMutation(data => editBook(data, id), {
    onSuccess: () => {
      Toast.show({
        description: 'باموفقیت ثبت شد!',
        status: 'success',
        ...ToastConfig,
      });
      queryClient.invalidateQueries(['book', id]);
    },
  });
};
