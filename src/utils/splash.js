import * as screens from '../constant/routes';

export const loginRouteChange = navigation => {
  return navigation.push(screens.LOGIN_SCREEN);
};
export const registerRouteChange = navigation => {
  return navigation.push(screens.REGISTER_SCREEN);
};
