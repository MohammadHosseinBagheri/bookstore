import {useQuery, useMutation} from 'react-query';
import {getAllBooks} from '../apis';
import {httpRequest} from '../apis/main';
export const useGetAllBooks = () => {
  return useQuery('books', getAllBooks);
};
const postEditBookAPI = async args => {
  const {_id, ...other} = args;
  const formData = new FormData();
  Object.entries(other).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const {data, status, message} = await httpRequest({
    body: formData,
    method: 'PUT',
    url: `/api/book/${_id}`,
    isReactQuery: false,
    headers: {},
    authorization: true,
  });
  console.log({data, status, message});
};
export const useEditBook = () => {
  return useMutation(postEditBookAPI,{
    onSuccess: async (data, variables) => {
      console.log({data, variables});
    }
  });
};
