import {useQuery} from 'react-query';
import {getAllBooks} from '../apis';
export const useGetAllBooks = () => {
  return useQuery('books', getAllBooks);
};
