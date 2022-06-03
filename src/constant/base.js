import {Dimensions} from 'react-native';

export const HOST = 'https://teabook-server.herokuapp.com';
export const SPLASH_DATA = [
  {
    title: 'Discounted Secondhand Books',
    description: 'Used and near new secondhand books at great prices',
    image: require('../assets/images/undraw_Bibliophile_hwqc.png'),
  },
  {
    title: '20 Book Grocers Nationally',
    description: "We've successfully opened 20 stores across Australia.",
    image: require('../assets/images/undraw_business_shop_qw5t.png'),
  },
  {
    title: 'Sell or Recycle Your Old Books With Us',
    description:
      "If you're looking to downsize, sell or recycle old books, the Book Grocer can help.",
    image: require('../assets/images/undraw_collecting_fjjl.png'),
  },
  {
    title: 'Books For Every Taste.',
    description: '',
    //   image: require('',
  },
];

const {width} = Dimensions.get('window');
export const ToastConfig = {
  duration: 3000,
  variant: 'subtle',
  isClosable: false,
  width,
  justifyContent: 'space-between',
};
