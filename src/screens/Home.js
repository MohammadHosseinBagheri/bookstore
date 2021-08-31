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
import React, {useState} from 'react';
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
const FlatListAnimatable = Animatable.createAnimatableComponent(FlatList);
const {width} = Dimensions.get('screen');
const HomeScreen = () => {
  const [selectIndex, setSelectedIndex] = useState(1);
  return (
    <>
      <StatusBar backgroundColor={GREEN_COLOR} />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.container}>
        <View style={styles.circleHeader} />
        <VStack pb={MAIN_PADDING * 2}>
          <HStack
            justifyContent="space-between"
            alignContent="center"
            zIndex={15}
            p={MAIN_PADDING}
            mt={MAIN_PADDING * 3}>
            <Heading fontFamily="aviny" style={{zIndex: 15, color: '#fff'}}>
              Our Top Picks
            </Heading>
            <TouchableOpacity
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
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({item, index}) => (
              <Animatable.View
                animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                duration={500}
                delay={index * 300}
                useNativeDriver>
                <Box
                  bg="#000"
                  style={{
                    width: width / 3 - width / 12,
                    marginHorizontal: width / 24,
                    height: 130,
                    borderRadius: 10,
                    transform: [{scale: selectIndex === index ? 1 : 0.8}],
                  }}
                />
                <Heading
                  fontFamily="aviny"
                  fontSize={selectIndex === index ? 25 : 18}
                  textAlign="center">
                  Title
                </Heading>
                <Text
                  fontFamily="aviny"
                  fontSize={selectIndex === index ? 20 : 16}
                  textAlign="center"
                  color={
                    selectIndex === index
                      ? 'rgba(36,33,38,0.8)'
                      : 'rgba(36,33,38,0.5)'
                  }>
                  Author
                </Text>
              </Animatable.View>
            )}
          />
          <Heading fontFamily="aviny" m={MAIN_PADDING}>
            Best Sellers
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
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({item, index}) => (
              <Animatable.View
                animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                duration={500}
                delay={index * 300}
                useNativeDriver>
                <Box
                  bg="#000"
                  style={{
                    width: width / 2 - width / 6,
                    marginHorizontal: MAIN_PADDING,
                    height: 170,
                    borderRadius: 10,
                  }}
                />
                <Text color="rgba(33,33,33,1)" textAlign="center" fontSize="lg">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  RATE
                </Text>
              </Animatable.View>
            )}
          />
          <Heading fontFamily="aviny" m={MAIN_PADDING}>
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
            data={[1, 2, 3, 4, 5, 6]}
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
                <Text color="rgba(33,33,33,1)" textAlign="center" fontSize="lg">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  RATE
                </Text>
              </Animatable.View>
            )}
          />
          <Heading fontFamily="aviny" m={MAIN_PADDING}>
            Recently Viewed
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
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({item, index}) => (
              <Animatable.View
                animation={{0: {opacity: 0}, 1: {opacity: 1}}}
                duration={500}
                delay={index * 300}
                useNativeDriver>
                <Box
                  bg="#000"
                  style={{
                    width: width / 2 - width / 6,
                    marginHorizontal: MAIN_PADDING,
                    height: 170,
                    borderRadius: 10,
                  }}
                />
                <Text color="rgba(33,33,33,1)" textAlign="center" fontSize="lg">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  Title
                </Text>
                <Text
                  color="rgba(33,33,33,0.5)"
                  textAlign="center"
                  fontSize="xs">
                  RATE
                </Text>
              </Animatable.View>
            )}
          />
          {/* <Heading fontFamily="aviny" m={MAIN_PADDING} mb={0}>
            Monthly Newsletter
          </Heading>
          <Text
            fontFamily="aviny"
            color="rgba(33,33,33,0.5)"
            m={MAIN_PADDING}
            mt={0}>
            Receive our monthly newsletter and receive updates on new stock,
            books and the occasional promotion.
          </Text> */}
        </VStack>
      </ScrollView>
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
