import * as screens from '../constant/routes';

export const loginRouteChange = navigation => {
  return navigation.navigate(screens.LOGIN_SCREEN);
};
export const registerRouteChange = navigation => {
  return navigation.navigate(screens.REGISTER_SCREEN);
};
