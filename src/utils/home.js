import * as screens from '../constant/routes';
import {StackActions} from '@react-navigation/native';

export const handleNavigateDetail = (navigation, data) => {
  return navigation.dispatch(StackActions.push(screens.DETAIL_SCREEN, data));
};
