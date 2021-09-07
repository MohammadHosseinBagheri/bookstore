import * as screens from '../constant/routes';
const handleRating = () => {};
export const handleNavigateDetail = (navigation, data) => {
  return navigation.push(screens.DETAIL_SCREEN, data);
};
