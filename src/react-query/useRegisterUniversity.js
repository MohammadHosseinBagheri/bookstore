import {Toast} from 'native-base';
import {useMutation, useQueryClient} from 'react-query';
import {httpRequest} from '../apis/main';
import {ToastConfig} from '../constant/base';

const registerUniversity = values =>
  httpRequest({
    method: 'POST',
    body: JSON.stringify(values),
    headers: {},
    isReactQuery: true,
    url: '/api/university',
    authorization: true,
  });
export const useRegisterUniversity = setOpen => {
  const queryClient = useQueryClient();
  return useMutation(registerUniversity, {
    onSuccess: () => {
      queryClient.invalidateQueries('universities');
      Toast.show({
        description: 'با موفقیت ثبت شد',
        status: 'success',
        ...ToastConfig,
      });
      setOpen(false);
    },
  });
};
