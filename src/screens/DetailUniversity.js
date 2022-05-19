import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Heading, HStack, VStack, Text, Box, Input, Select} from 'native-base';
import {MAIN_PADDING} from '../constant/styles';
import {useGetUniversityField} from '../react-query/useGetUniversityFields';
import Loading from '../components/common/Loading';

const DetailUniversity = props => {
  const {
    route: {
      params: {_id, name, city, province},
    },
  } = props;
  const {data: fieldData, isLoading: fieldLoading} = useGetUniversityField(_id);
  console.log({fieldData});
  return (
    <VStack padding={MAIN_PADDING}>
      <Heading textAlign="center">{name}</Heading>
      <HStack justifyContent="space-between" textAlign="center">
        <Text fontSize="2xl">شهر : {city}</Text>
        <Text fontSize="2xl">استان : {province}</Text>
      </HStack>
      <HStack space={4}>
        <Select bg="#fff" flex={0.5} w="100%" placeholder="درس موردنظر">
          {fieldData?.data?.map(field => (
            <Select.Item
              key={field?._id}
              label={field?.name}
              value={field?._id}
            />
          ))}
        </Select>
        {fieldLoading ? (
          <Loading />
        ) : (
          <Select bg="#fff" flex={0.5} w="100%" placeholder="رشته مورد نظر">
            {fieldData?.data?.map(field => (
              <Select.Item
                key={field?._id}
                label={field?.name}
                value={field?._id}
              />
            ))}
          </Select>
        )}
      </HStack>
    </VStack>
  );
};

export default DetailUniversity;

const styles = StyleSheet.create({});
