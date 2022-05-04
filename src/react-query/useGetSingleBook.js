import {useQuery} from 'react-query';
import {httpRequest} from '../apis/main';

const getSignleBookApi = id =>
  httpRequest({
    body: {},
    headers: {},
    isReactQuery: true,
    method: 'GET',
    authorization: true,
    url: `/api/book/get/${id}`,
  });

export const useGetSingleBook = bookId =>
  useQuery(['book', bookId], () => getSignleBookApi(bookId));
