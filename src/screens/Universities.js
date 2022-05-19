import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {useGetUniversities} from '../react-query/useGetUniversities';
import Loading from '../components/common/Loading';
import {Box, Heading, Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as screen from '../constant/routes';
const Universities = () => {
  const {data, isLoading} = useGetUniversities();
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={{paddingBottom: 40, paddingTop: 20, fontFamily: 'aviny'}}>
      <Heading fontFamily="aviny" textAlign="center">
        دانشگاه ها
      </Heading>
      <FlatList
        numColumns={2}
        data={data?.data}
        renderItem={({item, index}) => (
          <Box
            fontFamily="aviny"
            d="flex"
            justifyContent="center"
            alignItems="center"
            h={width / 2 - 10}
            px="10px"
            my="10px"
            flex={0.5}>
            <Button
              onPress={() => {
                navigation.navigate(screen.DETAIL_UNIVERSITY, {
                  _id: item?._id,
                  ...item,
                });
              }}
              _pressed={{bg: '#8e8e8e'}}
              colorScheme="teal"
              borderRadius={8}
              w="100%"
              h="100%"
              bg="#eee"
              justifyContent="center"
              alignItems="center">
              <Text fontSize="2xl">{item?.name}</Text>
            </Button>
          </Box>
        )}
      />
    </View>
  );
};

export default Universities;

const styles = StyleSheet.create({});
