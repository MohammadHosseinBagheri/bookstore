/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
import {
  Center,
  Container,
  Heading,
  VStack,
  Box,
  HStack,
  Button,
} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {BACKGROUND_COLOR, MAIN_PADDING} from '../constant/styles';
import * as Animatable from 'react-native-animatable';
import {SPLASH_DATA} from '../constant/base';
import {loginRouteChange, registerRouteChange} from '../utils/splash';
import {useNavigation} from '@react-navigation/core';
const fadeAnimation = {
  0: {opacity: 0, transform: [{scale: 1}]},
  1: {opacity: 1, transform: [{scale: 1.5}]},
};

const {width, height} = Dimensions.get('screen');
const SplashScreen = () => {
  const [selectIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const selectedIndex = contentOffset / viewSize;
    setSelectedIndex(Math.round(selectedIndex));
  };
  return (
    <Box style={styles.container}>
      <VStack style={{flex: 1}}>
        <Center style={styles.content}>
          {/* <Animatable.Text
            style={styles.splashText}
            animation={fadeAnimation}
            duration={1000}
            useNativeDriver>
            Online Book
          </Animatable.Text> */}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            horizontal
            snapToInterval={width}>
            {SPLASH_DATA.map((item, index) =>
              index !== 3 ? (
                <Center style={{width}}>
                  <VStack>
                    <Center>
                      <Text style={styles.splashText}>{item.title}</Text>
                      <Text style={[styles.splashText, {fontSize: 20}]}>
                        {item.description}
                      </Text>
                      <Image source={item.image} />
                    </Center>
                  </VStack>
                </Center>
              ) : (
                <Center style={styles.lastScreenContainer}>
                  <Image
                    source={require('../assets/images/Group94.png')}
                    style={{
                      position: 'absolute',
                      left: -PixelRatio.get() * 15,
                      top: 0,
                      zIndex: 1,
                    }}
                  />
                  <Image
                    resizeMode="stretch"
                    source={require('../assets/images/Group95.png')}
                    style={{
                      position: 'absolute',
                      left: -PixelRatio.get() * 24,
                      bottom: 0,
                      width: PixelRatio.getPixelSizeForLayoutSize(70),
                      height: PixelRatio.getPixelSizeForLayoutSize(70),
                    }}
                  />
                  <Image
                    source={require('../assets/images/Group39.png')}
                    style={{
                      position: 'absolute',
                      right: -PixelRatio.get() * 20,
                      top: 0,
                    }}
                  />
                  <Image
                    source={require('../assets/images/Group40.png')}
                    style={{
                      position: 'absolute',
                      right: -PixelRatio.get() * 11,
                      top: PixelRatio.get() * 55,
                    }}
                  />
                  <Text style={styles.splashText}>{item.title}</Text>
                  <VStack alignItems="center" w={width}>
                    <TouchableOpacity onPress={()=>registerRouteChange(navigation)} style={styles.button}>
                      <Text style={{textAlign: 'center', color: '#fff'}}>
                        SIGN UP
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => loginRouteChange(navigation)}
                      style={styles.button}>
                      <Text style={{textAlign: 'center', color: '#fff'}}>
                        SIGN IN
                      </Text>
                    </TouchableOpacity>
                  </VStack>
                </Center>
              ),
            )}
          </ScrollView>
          <HStack>
            {SPLASH_DATA.map((item, index) => (
              <Box
                ml={3}
                mr={3}
                style={[
                  styles.dots,
                  {
                    backgroundColor:
                      selectIndex === index
                        ? '#5ABD8C'
                        : 'rgba(90,189,140,0.25)',
                  },
                ]}
              />
            ))}
          </HStack>
        </Center>
        <Box
          justifyContent="flex-end"
          alignItems="center"
          mb={MAIN_PADDING}
          style={styles.version}>
          <Animatable.Text
            style={styles.versionText}
            animation={fadeAnimation}
            duration={500}
            useNativeDriver
            delay={1000}>
            Version 1.0.1
          </Animatable.Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  content: {
    flex: 1,
  },
  version: {
    flex: 0.1,
    fontFamily: 'aviny',
  },
  splashText: {
    fontFamily: 'aviny',
    fontSize: 30,
    color: '#5ABD8C',
  },
  versionText: {
    fontFamily: 'aviny',
    // fontSize: 25,
    color: '#5ABD8C',
  },
  dots: {
    backgroundColor: '#5ABD8C',
    width: 15,
    height: 15,
    borderRadius: 30,
  },
  button: {
    backgroundColor: '#5ABD8C',
    width: '90%',
    margin: 5,
    padding: 15,
    borderRadius: 20,
  },
  lastScreenContainer: {
    width,
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
});
