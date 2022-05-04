import {Toast} from 'native-base';
import {useWindowDimensions} from 'react-native';
import {useQuery, useMutation} from 'react-query';
import {getAllBooks} from '../apis';
import {httpRequest} from '../apis/main';
import {ToastConfig} from '../constant/base';
export const useGetAllBooks = () => {
  return useQuery('books', getAllBooks);
};
const postEditBookAPI = async args => {
  const {_id, ...other} = args;
  const {data, status, message} = await httpRequest({
    body: JSON.stringify(other),
    method: 'PUT',
    url: `/api/auth/user-book-detail/${_id}`,
    isReactQuery: false,
    headers: {},
    authorization: true,
  });
  console.log({data, status, message});
};

export const useEditBook = bookName => {
  const {width} = useWindowDimensions();
  return useMutation(postEditBookAPI, {
    onSuccess: async () => {
      await Toast.show({
        description: `شما کتاب ${bookName} را خواندید`,
        status: 'success',
        ...ToastConfig,
      });
    },
  });
};
