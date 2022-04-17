import {useQuery} from 'react-query';
import {getUserInfo} from '../apis';

export const useGetUserInfo =  () => useQuery('user-info', getUserInfo);
