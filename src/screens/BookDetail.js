/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  PixelRatio,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Box, HStack, VStack, Text} from 'native-base';
import {SharedElement} from 'react-navigation-shared-element';
import {AirbnbRating} from 'react-native-ratings';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import {alignItems} from 'styled-system';
const {height, width} = Dimensions.get('screen');
const BookDetailScreen = props => {
  const {
    route: {params},
  } = props;
  console.log('data?._id', params);
  return (
    <View style={styles.container}>
      <SharedElement id={`book-image${params?._id}`}>
        <ImageBackground
          resizeMode="stretch"
          source={{uri: `https://www.imohammadhossein.ir${params?.picPath}`}}
          style={[{height: 250}]}>
          <VStack padding={MAIN_PADDING}>
            <SharedElement id={`book-name${params?._id}`}>
              <Text>{params.name}</Text>
            </SharedElement>
            <SharedElement id={`book-writer${params?._id}`}>
              <Text>{params.writer}</Text>
            </SharedElement>
          </VStack>
          <Box
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'rgba(0,0,0,0.5)'},
            ]}
          />
        </ImageBackground>
      </SharedElement>
      <Box
        height="auto"
        backgroundColor="#fff"
        padding={MAIN_PADDING}
        margin={MAIN_PADDING / 2}
        justifyContent="center"
        borderRadius={8}
        style={{elevation: 1}}>
        <HStack justifyContent="space-between">
          <VStack justifyContent="center" alignItems="center">
            <Text textAlign="center" color="#9E9E9E">
              Rate
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={params.rate}
              selectedColor={GREEN_COLOR}
              showRating={false}
              size={10}
            />
          </VStack>
          <VStack justifyContent="center" alignItems="center">
            <Text textAlign="center" color="#9E9E9E">
              Price
            </Text>
            <Text color={GREEN_COLOR}>$25</Text>
          </VStack>
          <VStack justifyContent="center" alignItems="center">
            <Text textAlign="center" color="#9E9E9E">
              Buyers
            </Text>
            <Text color={GREEN_COLOR}>+250</Text>
          </VStack>
        </HStack>
      </Box>
      <ScrollView minimumZoomScale={1} maximumZoomScale={1.2} contentContainerStyle={{padding: MAIN_PADDING}}>
        <Text>
          Where does it come from? Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. There are many
          variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration in some form, by injected humour, or randomised
          words which don't look even slightly believable. If you are going to
          use a passage of Lorem Ipsum, you need to be sure there isn't anything
          embarrassing hidden in the middle of text. All the Lorem Ipsum
          generators on the Internet tend to repeat predefined chunks as
          necessary, making this the first true generator on the Internet. It
          uses a dictionary of over 200 Latin words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum which looks
          reasonable. The generated Lorem Ipsum is therefore always free from
          repetition, injected humour, or non-characteristic words etc.
        </Text>
      </ScrollView>
    </View>
  );
};
BookDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const {
    route: {params},
  } = route;
  return [
    {id: `book-image${params?._id}`, animation: 'fade'},
    {id: `book-name${params?._id}`, animation: 'fade'},
    {id: `book-writer${params?._id}`, animation: 'fade'},
  ];
};
export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
