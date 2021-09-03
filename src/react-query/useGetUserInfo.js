import {useQuery} from 'react-query';
import {getUserInfo} from '../apis';

export const useGetUserInfo = () => {
  return useQuery('user-info', getUserInfo);
};
