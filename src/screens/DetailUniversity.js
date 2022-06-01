import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Input,
  Select,
  Button,
} from 'native-base';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import {useGetUniversityField} from '../react-query/useGetUniversityFields';
import Loading from '../components/common/Loading';
import {
  useGetUniversitiesCollege,
  useGetUniversitiesDocuments,
} from '../react-query/useGetUniversityCollege';
import {useFormik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';

const {config} = RNFetchBlob;
let options = {
  fileCache: false,
  addAndroidDownloads: {
    useDownloadManager: true,
    notification: true,
    // path: PictureDir,
    description: 'دانلود جزوه',
  },
};
const DetailUniversity = props => {
  const {
    route: {
      params: {_id, name, city, province},
    },
  } = props;
  const formik = useFormik({
    initialValues: {
      fieldId: '',
      college: '',
    },
  });
  const {data: fieldData, isLoading: fieldLoading} = useGetUniversityField(_id);
  const {
    data: collegeData,
    isLoading: collegeLoading,
    refetch,
    isSuccess: collegeIsSuccess,
  } = useGetUniversitiesCollege(formik.values.fieldId);
  const {
    data: documentsData,
    isLoading: documentsLoading,
    refetch: documentsRefetch,
    isSuccess: documentsIsSuccess,
  } = useGetUniversitiesDocuments(formik.values.fieldId, formik.values.college);
  return (
    <VStack padding={MAIN_PADDING}>
      <Heading textAlign="center">{name}</Heading>
      <HStack justifyContent="space-between" textAlign="center">
        <Text fontSize="2xl">شهر : {city}</Text>
        <Text fontSize="2xl">استان : {province}</Text>
      </HStack>
      <HStack space={4}>
        {fieldLoading ? (
          <Loading isFull={false} />
        ) : (
          <Select
            onValueChange={async value => {
              await formik.setFieldValue('fieldId', value);
              await refetch();
            }}
            bg="#fff"
            flex={0.5}
            w="100%"
            placeholder="رشته مورد نظر">
            {fieldData?.data?.map(field => (
              <Select.Item
                key={field?._id}
                label={field?.name}
                value={field?._id}
              />
            ))}
          </Select>
        )}
        {collegeLoading ? (
          <Loading isFull={false} />
        ) : collegeIsSuccess && collegeData?.length !== 0 ? (
          <Select
            bg="#fff"
            w="100%"
            flex={0.5}
            onValueChange={value => formik.setFieldValue('college', value)}
            placeholder="کالج مورد نظر">
            {collegeData?.map(field => (
              <Select.Item
                key={field?._id}
                label={field?.name}
                value={field?._id}
              />
            ))}
          </Select>
        ) : (
          <Select
            isDisabled={!formik.values.fieldId}
            bg="#fff"
            w="100%"
            flex={0.5}
            placeholder="کالج مورد نظر">
            <Select.Item />
          </Select>
        )}
      </HStack>
      <Button onPress={documentsRefetch} mt={10} mb={5} bg={GREEN_COLOR} py={1}>
        <HStack
          justifyContent="center"
          alignItems="center"
          color="#fff"
          fontSize="xl">
          <Text fontSize="xl" color="#fff">
            پیداکردن جزوه
          </Text>
          <Icon
            color="white"
            name="book"
            size={20}
            style={{marginHorizontal: 20}}
          />
        </HStack>
      </Button>
      <FlatList
        style={{height: '100%'}}
        contentContainerStyle={{paddingBottom: 250}}
        numColumns={2}
        keyExtractor={item => item?._id}
        data={documentsData}
        renderItem={({item}) => (
          <VStack shadow={3} borderRadius={8} p={4} bg="#fff" m={2} flex={1}>
            <HStack flexWrap="wrap" justifyContent="space-between">
              <Text fontSize="xs">{item?.college?.name}</Text>
              <Text fontSize="xs">{item?.field?.name}</Text>
            </HStack>
            <HStack flexWrap="wrap" justifyContent="space-between">
              <Text fontSize="xs">{item?.author}</Text>
              <Text fontSize="xs">{item?.field?.university?.name}</Text>
            </HStack>
            <Heading textAlign="center">{item?.name}</Heading>
            <HStack justifyContent="space-between">
              <Icon
                onPress={async () => {
                  config(options)
                    .fetch('GET', item?.source)
                    .then(res => {
                      let status = res.info().status;

                      if (status === 200) {
                        // console.log(res.path());
                        // the conversion is done in native code
                        let base64Str = res.base64();
                        // the following conversions are done in js, it's SYNC
                        let text = res.text();
                        let json = res.json();
                        console.log({base64Str, text, json});
                      }
                    })
                    // Something went wrong:
                    .catch((errorMessage, statusCode) => {
                      // error handling
                      console.log({errorMessage, statusCode}, item?.source);
                    });
                }}
                color={GREEN_COLOR}
                name="download"
                size={15}
              />
              <Icon name="copy" size={15} />
            </HStack>
          </VStack>
        )}
      />
    </VStack>
  );
};

export default DetailUniversity;
