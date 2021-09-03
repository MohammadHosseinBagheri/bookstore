/* eslint-disable react-native/no-inline-styles */
import {VStack, Text, Box} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {GREEN_COLOR} from '../../constant/styles';
const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
const VStackAnimatable = Animatable.createAnimatableComponent(VStack);
const animation = {
  0: {transform: [{translateX: 400}], opacity: 0},
  1: {transform: [{translateX: 0}], opacity: 1},
};
const CustomDrawer = props => {
  const {
    setDrawerShow,
    userInfo: {data},
  } = props;
  console.log(data);
  return (
    <VStackAnimatable
      animation={animation}
      duration={1000}
      useNativeDriver
      style={styles.container}>
      <TouchableOpacity onPress={() => setDrawerShow(false)}>
        <Text>Close</Text>
      </TouchableOpacity>
      <Box justifyContent="center" alignItems="center" mb={10}>
        <Image
          resizeMode="cover"
          source={{uri: 'https://www.imohammadhossein.ir/uploads/D2D.png'}}
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(30),
            height: PixelRatio.getPixelSizeForLayoutSize(30),
            borderRadius: 500,
            borderColor: GREEN_COLOR,
            borderWidth: 4,
          }}
        />
        <Text fontFamily="aviny" fontSize={22}>
          {data.name}
        </Text>
      </Box>
      <TouchableOpacity>
        <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
          About us
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
          Our Books
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
          Our Store
        </Text>
      </TouchableOpacity>
    </VStackAnimatable>
  );
};

export default React.memo(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: (91 * height) / 100,
    borderBottomLeftRadius: 300,
    padding: 25,
    width: (width * 70) / 100,
    zIndex: 30,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
