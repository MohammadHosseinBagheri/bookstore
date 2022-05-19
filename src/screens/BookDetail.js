/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  PixelRatio,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {Box, HStack, VStack, Text, Button, Badge, CloseIcon} from 'native-base';
import {SharedElement} from 'react-navigation-shared-element';
import {AirbnbRating} from 'react-native-ratings';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
import {useEditBook} from '../react-query/useGetAllBooks';
import {useGetSingleBook} from '../react-query/useGetSingleBook';
import Loading from '../components/common/Loading';
import {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {calculateRate} from '../utils/bookDetail';
import {httpRequest} from '../apis/main';
import {useEditSingleBook} from '../react-query/useEditBook';
import {useCallback} from 'react';

const {height, width} = Dimensions.get('window');

const BookDetailScreen = props => {
  const {
    route: {params},
  } = props;
  console.log({props});
  const {data, isLoading} = useGetSingleBook(params?._id);
  const [isFree] = React.useState(() => params?.price === '0');
  const [isShowBadge, setShowBadge] = React.useState(false);
  const [progressPercent, setPercent] = React.useState(0);
  const [read, setRead] = React.useState(false);
  const {mutate} = useEditBook(params?.name);
  const {mutate: mutateBook} = useEditSingleBook(params?._id);

  console.log({test: data?.data?.bookDetail?.percent});
  const scrollerRef = useRef(null);

  const calculateProgress = e => {
    const percent = Math.abs(
      Math.round(
        (e.nativeEvent.contentOffset.y /
          (e.nativeEvent.contentSize.height -
            e.nativeEvent.layoutMeasurement.height)) *
          100,
      ),
    );
    if (percent === 100 && data?.data?.bookDetail?.percent !== 100) {
      mutate({_id: params._id, percent});
    }
    setPercent(percent);
  };
  const handleProgress = React.useCallback(e => {
    calculateProgress(e);
  }, []);

  useEffect(() => {
    if (data?.data?.bookDetail?.percent) {
      setShowBadge(true);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data?.data?.bookDetail?.percent !== 100) {
          mutate({_id: params?._id, progressPercent});
        }
      };
    }, []),
  );

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      onScroll={handleProgress}
      ref={scrollerRef}
      scrollEnabled={data?.data?.bookDetail?.isBought}>
      <SharedElement id={`book-image${params?._id}`}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']}>
          <ImageBackground
            resizeMode="stretch"
            source={{uri: `${params?.picPath}`}}
            style={[{height: 250}]}>
            <VStack padding={MAIN_PADDING}>
              <SharedElement id={`book-name${params?._id}`}>
                <Text>{params?.name}</Text>
              </SharedElement>
              <SharedElement id={`book-writer${params?._id}`}>
                <Text>{params?.writer}</Text>
              </SharedElement>
            </VStack>
            {isShowBadge && (
              <Badge
                borderTopLeftRadius={10}
                borderBottomLeftRadius={10}
                colorScheme="success"
                d="flex"
                alignItems="flex-end"
                w="auto"
                py="2px"
                pos="absolute"
                top={0}
                right={0}>
                <CloseIcon
                  onPress={() => {
                    setShowBadge(false);
                  }}
                  w="10px"
                  h="10px"
                />
                <Text>خوانده شده</Text>
              </Badge>
            )}
          </ImageBackground>
        </LinearGradient>
      </SharedElement>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          height: 8,
          marginTop: 2,
          width: `${progressPercent}%`,
        }}
        colors={['white', GREEN_COLOR]}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            height="auto"
            backgroundColor="#fff"
            padding={MAIN_PADDING}
            margin={MAIN_PADDING / 2}
            justifyContent="center"
            borderRadius={8}>
            <HStack justifyContent="space-between">
              <VStack justifyContent="center" alignItems="center">
                <Text textAlign="center" color="#9E9E9E">
                  رتبه
                </Text>
                <AirbnbRating
                  onFinishRating={selectedRate => {
                    mutateBook({
                      rate: data?.data?.book?.rate + selectedRate,
                      rateCount: data?.data?.book?.rateCount + 1,
                    });
                  }}
                  count={5}
                  defaultRating={
                    data?.data?.book?.rate / data?.data?.book?.rateCount
                  }
                  selectedColor={GREEN_COLOR}
                  showRating={false}
                  size={10}
                />
                <Text>{data?.data?.book?.rateCount}</Text>
              </VStack>
              <VStack justifyContent="center" alignItems="center">
                <Text textAlign="center" color="#9E9E9E">
                  قیمت
                </Text>
                <Text color={GREEN_COLOR}>
                  {isFree ? 'رایگان' : params?.price + ' تومان'}
                </Text>
              </VStack>
              <VStack justifyContent="center" alignItems="center">
                <Text textAlign="center" color="#9E9E9E">
                  تعداد خوانندگان
                </Text>
                <Text color={GREEN_COLOR}>{params?.boughtCount}</Text>
              </VStack>
            </HStack>
          </Box>
          <HStack padding={MAIN_PADDING / 2} justifyContent="space-between">
            {!isFree && (
              <Button
                onPress={() => {
                  scrollerRef.current.scrollTo({x: 0, y: 0, animated: true}),
                    setRead(prev => !prev);
                }}>
                خرید
              </Button>
            )}
            {isFree && !data?.data?.bookDetail?.isBought && (
              <Button
                onPress={() => {
                  mutate({_id: params._id, isBought: true});
                  setRead(prev => !prev);
                }}
                bg="tertiary.400">
                شروع به خوانندن
              </Button>
            )}
          </HStack>
          <VStack position="relative">
            {!data?.data?.bookDetail?.isBought && (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                style={{
                  flex: 1,
                  zIndex: 1,
                  position: 'absolute',
                  top: 0,
                  height: height / 2,
                  width: '100%',
                }}
              />
            )}
            <Box padding={MAIN_PADDING}>
              <RenderHtml
                contentWidth={width}
                source={{html: params?.content}}
              />
            </Box>
          </VStack>
        </>
      )}
    </ScrollView>
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
