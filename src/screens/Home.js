/* eslint-disable react-native/no-inline-styles */
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  StatusBar,
  VStack,
  Text,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import * as Animatable from 'react-native-animatable';
import {useGetAllBooks} from '../react-query/useGetAllBooks';
import {AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/core';
import Loading from '../components/common/Loading';
import CustomDrawer from '../components/common/Drawer';
import {useGetUserInfo} from '../react-query/useGetUserInfo';
import {handleNavigateDetail} from '../utils/home';
import {SharedElement} from 'react-navigation-shared-element';
import {navigate} from './Config';
import {DETAIL_SCREEN} from '../constant/routes';

const FlatListAnimatable = Animatable.createAnimatableComponent(FlatList);
const {width} = Dimensions.get('screen');
const HomeScreen = () => {
  const [selectIndex, setSelectedIndex] = useState(1);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const navigation = useNavigation();
  const {data, isLoading, isFetching, isError, isSuccess} = useGetAllBooks();
  console.log({data});
  return (
    <>
      <StatusBar backgroundColor={GREEN_COLOR} />
      {isLoading && <Loading />}
      {isSuccess && (
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.container}>
          {isShowDrawer && <CustomDrawer setDrawerShow={setShowDrawer} />}
          <View style={styles.circleHeader} />
          <VStack pb={MAIN_PADDING * 2}>
            <HStack
              justifyContent="space-between"
              alignContent="center"
              zIndex={15}
              p={MAIN_PADDING}
              mt={MAIN_PADDING * 3}>
              <Heading fontFamily="aviny" style={{zIndex: 15, color: '#fff'}}>
                جدیدترین ها
              </Heading>
              <TouchableOpacity
                onPress={() => setShowDrawer(true)}
                style={{
                  zIndex: 15,
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/icons/menu.png')}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </HStack>
            <FlatListAnimatable
              useNativeDriver
              animation={{
                0: {transform: [{translateX: -400}]},
                1: {transform: [{translateX: 0}]},
              }}
              duration={1000}
              style={{zIndex: 15, marginTop: PixelRatio.get() * 10}}
              horizontal
              snapToInterval={width / 3}
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const contentOffset = event.nativeEvent.contentOffset.x;
                const selectedIndex = contentOffset / (width / 3 - width / 12);
                setSelectedIndex(Math.floor(selectedIndex) + 1);
              }}
              data={data?.data.slice(0, 6)}
              renderItem={({item, index}) => (
                <Animatable.View
                  style={{
                    alignItems: 'center',
                  }}
                  animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                  duration={500}
                  delay={index * 300}
                  useNativeDriver>
                  <TouchableOpacity
                    onPress={() => {
                      handleNavigateDetail(navigation, item);
                    }}>
                    <SharedElement id={`book-image${item._id}`}>
                      <Image
                        resizeMode="stretch"
                        source={{
                          uri: item.picPath,
                        }}
                        style={{
                          width: width / 3 - width / 12,
                          marginHorizontal: width / 24,
                          height: 130,
                          transform: [{scale: selectIndex === index ? 1 : 0.8}],
                        }}
                      />
                    </SharedElement>
                  </TouchableOpacity>
                  <Box
                    width={width / 3 - width / 12}
                    justifyContent="center"
                    alignItems="center">
                    <SharedElement id={`book-name${item._id}`}>
                      <Heading
                        fontFamily="aviny"
                        fontSize={selectIndex === index ? 25 : 18}>
                        {item.name}
                      </Heading>
                    </SharedElement>
                  </Box>
                  <SharedElement id={`book-writer${item._id}`}>
                    <Text
                      fontFamily="aviny"
                      fontSize={selectIndex === index ? 20 : 16}
                      textAlign="center"
                      color={
                        selectIndex === index
                          ? 'rgba(36,33,38,0.8)'
                          : 'rgba(36,33,38,0.5)'
                      }>
                      {item.writer}
                    </Text>
                  </SharedElement>
                </Animatable.View>
              )}
            />
            <Heading textAlign="left" fontFamily="aviny" m={MAIN_PADDING}>
              پرطرفدار‌ترین ها
            </Heading>
            <FlatListAnimatable
              useNativeDriver
              animation={{
                0: {transform: [{translateX: -400}]},
                1: {transform: [{translateX: 0}]},
              }}
              duration={1000}
              delay={500}
              horizontal
              snapToInterval={width / 2 - width / 6 + MAIN_PADDING * 2}
              showsHorizontalScrollIndicator={false}
              data={data?.data}
              renderItem={({item, index}) => (
                <Animatable.View
                  animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                  duration={500}
                  delay={index * 300}
                  useNativeDriver>
                  <TouchableOpacity>
                    <Image
                      resizeMode="stretch"
                      source={{
                        uri: item?.picPath,
                      }}
                      style={{
                        width: width / 2 - width / 6,
                        marginHorizontal: MAIN_PADDING,
                        height: 170,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    alignSelf="center"
                    width={width / 2 - width / 6}
                    color="rgba(33,33,33,1)"
                    textAlign="center"
                    fontSize="lg">
                    {item.name}
                  </Text>
                  <Text
                    color="rgba(33,33,33,0.5)"
                    textAlign="center"
                    fontSize="xs">
                    {item.writer}
                  </Text>
                  <AirbnbRating
                    // type="star"
                    count={5}
                    defaultRating={item.rate}
                    selectedColor={GREEN_COLOR}
                    showRating={false}
                    size={PixelRatio.get() * 5}
                    // onFinishRating={this.ratingCompleted}
                  />
                </Animatable.View>
              )}
            />
            {/* <Heading fontFamily="aviny" m={MAIN_PADDING}>
              Geners
            </Heading>
            <FlatListAnimatable
              useNativeDriver
              animation={{
                0: {transform: [{translateX: -400}]},
                1: {transform: [{translateX: 0}]},
              }}
              duration={1000}
              delay={1000}
              horizontal
              snapToInterval={width - width / 6 + MAIN_PADDING * 2}
              showsHorizontalScrollIndicator={false}
              data={data?.data}
              renderItem={({item, index}) => (
                <Animatable.View
                  animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                  duration={500}
                  delay={index * 300}
                  useNativeDriver>
                  <Box
                    bg="#000"
                    style={{
                      width: width - width / 6,
                      marginHorizontal: MAIN_PADDING,
                      height: 170,
                      borderRadius: 10,
                    }}
                  />
                  <Text
                    color="rgba(33,33,33,1)"
                    textAlign="center"
                    fontSize="lg">
                    Title
                  </Text>
                  <Text
                    color="rgba(33,33,33,0.5)"
                    textAlign="center"
                    fontSize="xs">
                    Title
                  </Text>
                  <AirbnbRating
                    // type="star"
                    count={5}
                    defaultRating={item.rate}
                    selectedColor={GREEN_COLOR}
                    showRating={false}
                    size={PixelRatio.get() * 5}
                    // onFinishRating={this.ratingCompleted}
                  />
                </Animatable.View>
              )}
            /> */}
            <Heading textAlign="left" fontFamily="aviny" m={MAIN_PADDING}>
              اخیرا خوانده شده
            </Heading>
            <FlatListAnimatable
              useNativeDriver
              animation={{
                0: {transform: [{translateX: -400}]},
                1: {transform: [{translateX: 0}]},
              }}
              duration={1000}
              delay={1500}
              horizontal
              snapToInterval={width / 2 - width / 6 + MAIN_PADDING * 2}
              showsHorizontalScrollIndicator={false}
              data={data?.recentlyReadedBook}
              renderItem={({item, index}) => (
                <Animatable.View
                  animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                  duration={500}
                  delay={index * 300}
                  useNativeDriver>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(DETAIL_SCREEN, item?.bookId);
                    }}>
                    <Image
                      resizeMode="stretch"
                      source={{
                        uri: item?.bookId?.picPath,
                      }}
                      style={{
                        width: width / 2 - width / 6,
                        marginHorizontal: MAIN_PADDING,
                        height: 170,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    width={width / 2 - width / 6}
                    alignSelf="center"
                    color="rgba(33,33,33,1)"
                    textAlign="center"
                    fontSize="lg">
                    {item.name}
                  </Text>
                  <Text
                    alignSelf="center"
                    color="rgba(33,33,33,0.5)"
                    textAlign="center"
                    fontSize="xs">
                    {item.writer}
                  </Text>
                  <AirbnbRating
                    count={5}
                    defaultRating={item?.bookId?.rate / item?.bookId?.rateCount}
                    selectedColor={GREEN_COLOR}
                    showRating={false}
                    size={PixelRatio.get() * 5}
                  />
                </Animatable.View>
              )}
            />
          </VStack>
        </ScrollView>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // padding: MAIN_PADDING,
    position: 'relative',
  },
  circleHeader: {
    height: 486,
    width: 486,
    borderRadius: 486,
    backgroundColor: GREEN_COLOR,
    position: 'absolute',
    zIndex: 15,
    top: -174,
    left: -45,
    padding: MAIN_PADDING,
  },
});
