/* eslint-disable react-native/no-inline-styles */
import {VStack, Text, Box, Modal} from 'native-base';
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
import {useGetUserInfo} from '../../react-query/useGetUserInfo';
import * as screen from '../../constant/routes';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
const VStackAnimatable = Animatable.createAnimatableComponent(VStack);
const animation = {
  0: {transform: [{translateX: 400}], opacity: 0},
  1: {transform: [{translateX: 0}], opacity: 1},
};
const CustomDrawer = props => {
  const {setDrawerShow} = props;
  const {data} = useGetUserInfo();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <VStackAnimatable
        animation={animation}
        duration={1000}
        useNativeDriver
        style={styles.container}>
        <TouchableOpacity onPress={() => setDrawerShow(false)}>
          <Icon size={20} color={GREEN_COLOR} name="close" />
        </TouchableOpacity>
        <Box justifyContent="center" alignItems="center" mb={10}>
          <Image
            resizeMode="cover"
            source={{uri: data?.avatar}}
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(30),
              height: PixelRatio.getPixelSizeForLayoutSize(30),
              borderRadius: 500,
              borderColor: GREEN_COLOR,
              borderWidth: 4,
            }}
          />
          <Text fontFamily="aviny" fontSize={22}>
            {data?.name}
          </Text>
        </Box>
        <TouchableOpacity>
          <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
            پروفایل
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
            درباره‌ما
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(screen.UNIVERSITIES_SCREEN)}>
          <Text fontFamily="aviny" fontSize={25} color={GREEN_COLOR}>
            جزوات
          </Text>
        </TouchableOpacity>
      </VStackAnimatable>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body w="60%">
            این برنامه برای دریافت کتاب‌های الکترونیک و جزوه‌های دانشگاهی طراحی
            شده!
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default React.memo(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    elevation: 5,
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
