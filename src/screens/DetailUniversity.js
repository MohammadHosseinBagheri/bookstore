import {StyleSheet, View, FlatList, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
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
  Modal,
  FormControl,
  Checkbox,
  Toast,
  Image,
  useClipboard,
} from 'native-base';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import {
  useGetUniversityField,
  useRegisterField,
} from '../react-query/useGetUniversityFields';
import Loading from '../components/common/Loading';
import {
  useGetUniversitiesCollege,
  useGetUniversitiesDocuments,
  useRegisterCollege,
  useRegisterDocument,
} from '../react-query/useGetUniversityCollege';
import {useFormik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ToastConfig} from '../constant/base';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import * as Yup from 'yup';
import Document from '../components/detail-university/Document';

const DetailUniversity = props => {
  const {onCopy, value, hasCopied} = useClipboard();

  const [isOpen, setOpen] = useState(false);

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
    validationSchema: Yup.object({
      fieldId: Yup.string().required('رشته را انتخاب کنید!'),
    }),
  });
  const registerFieldFormik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => mutate(values),
  });
  const {mutate: registerDocumentMutate} = useRegisterDocument();
  const registerDocumentFormik = useFormik({
    initialValues: {
      name: '',
      author: '',
      field: '',
      college: '',
      picPath: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('نام‌جزوه اجباری است!'),
      author: Yup.string().required('نام‌نویسنده اجباری است!'),
      field: Yup.string().required('رشته‌تحصیلی اجباری است!'),
      college: Yup.string().required('درس اجباری است!'),
      picPath: Yup.object().required('فایل‌جزوه اجباری است!'),
    }),
    onSubmit: values => registerDocumentMutate(values),
  });
  const {mutate: registerCollegeMutate} = useRegisterCollege(
    registerDocumentFormik?.values.field,
  );
  const registerCollegeFormik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => registerCollegeMutate(values),
  });
  const {data: fieldData, isLoading: fieldLoading} = useGetUniversityField(_id);
  const {
    data: collegeData,
    isLoading: collegeLoading,
    refetch,
    isSuccess: collegeIsSuccess,
  } = useGetUniversitiesCollege(
    isOpen ? registerDocumentFormik.values.field : formik.values.fieldId,
  );
  const {
    data: documentsData,
    isLoading: documentsLoading,
    refetch: documentsRefetch,
    isSuccess: documentsIsSuccess,
  } = useGetUniversitiesDocuments(formik.values.fieldId, formik.values.college);
  const {mutate} = useRegisterField(_id);
  const [showRegisterField, setShowRegisterField] = useState(false);
  const [showRegisterCollege, setShowRegisterCollege] = useState(false);
  const {width, height} = useWindowDimensions();
  return (
    <VStack pos="relative" padding={MAIN_PADDING}>
      <Button
        zIndex={1}
        _pressed={{bg: 'transparent'}}
        variant="ghost"
        onPress={() => {
          setOpen(true);
        }}
        right={MAIN_PADDING}
        top={5}
        position="absolute"
        bg="transparent">
        <Icon
          size={15}
          style={{
            backgroundColor: GREEN_COLOR,
            padding: 10,
            borderRadius: 20,
            color: 'white',
            elevation: 5,
          }}
          name="plus"
        />
      </Button>
      <Heading textAlign="center">{name}</Heading>
      <HStack justifyContent="space-between" textAlign="center">
        <Text fontSize="2xl">شهر : {city}</Text>
        <Text fontSize="2xl">استان : {province}</Text>
      </HStack>
      <HStack space={4}>
        {fieldLoading ? (
          <Loading isFull={false} />
        ) : (
          fieldData &&
          fieldData?.data?.length !== 0 && (
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
          )
        )}
        {collegeLoading ? (
          <Loading isFull={false} />
        ) : collegeData && collegeData?.length !== 0 ? (
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
      {formik.errors.fieldId && (
        <Text style={{color: 'red'}}>*{formik.errors.fieldId}</Text>
      )}
      <Button
        onPress={() => {
          if (formik.values.fieldId === '') {
            formik.setFieldError('fieldId', 'رشته مورد‌نظر را انتخاب کنید!');
          } else {
            formik.setFieldError('fieldId', false);
            documentsRefetch();
          }
        }}
        mt={10}
        mb={5}
        bg={GREEN_COLOR}
        py={1}>
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
      {documentsIsSuccess && documentsData?.length !== 0 && (
        <HStack alignItems="center" justifyContent="flex-end">
          <Text px={MAIN_PADDING} color="#8e8e8e" fontSize="xl">
            تعداد{' '}
            <Text fontSize="xl" color={GREEN_COLOR}>
              {documentsData?.length}
            </Text>{' '}
            جزوه پیدا شد!
          </Text>
          <Icon color={GREEN_COLOR} name="file" />
        </HStack>
      )}
      {documentsLoading && <Loading />}
      {documentsIsSuccess && (
        <FlatList
          ListEmptyComponent={() => (
            <VStack>
              <Text fontSize="2xl" color="#8e8e8e" textAlign="center">
                جزوه‌ای برای رشته مورد‌نظر وجود ندارد!
              </Text>
              <Image
                w={width}
                h={height / 4}
                alt="404"
                source={require('../assets/images/404.jpg')}
              />
            </VStack>
          )}
          style={{height: '100%'}}
          contentContainerStyle={{paddingBottom: height / 2}}
          numColumns={2}
          keyExtractor={item => item?._id}
          data={documentsData}
          renderItem={({item}) => (
            <Document
              onCopy={onCopy}
              value={value}
              hasCopied={hasCopied}
              key={item?._id}
              item={item}
            />
          )}
        />
      )}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          registerCollegeFormik.resetForm();
          registerDocumentFormik.resetForm();
          registerFieldFormik.resetForm();
          setShowRegisterCollege(false);
          setShowRegisterField(false);
          setOpen(false);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Heading textAlign="center">ثبت‌جزوه</Heading>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>
                <Text w="100%" textAlign="right">
                  نام‌جزوه
                </Text>
              </FormControl.Label>
              <Input
                onChangeText={value =>
                  registerDocumentFormik.setFieldValue('name', value)
                }
              />
              {registerDocumentFormik.errors.name && (
                <Text style={{color: 'red'}} w="100%" textAlign="right">
                  {registerDocumentFormik.errors.name}
                </Text>
              )}
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>
                <Text w="100%" textAlign="right">
                  نام‌نویسنده
                </Text>
              </FormControl.Label>
              <Input
                onChangeText={value =>
                  registerDocumentFormik.setFieldValue('author', value)
                }
              />
              {registerDocumentFormik.errors.author && (
                <Text style={{color: 'red'}} w="100%" textAlign="right">
                  {registerDocumentFormik.errors.author}
                </Text>
              )}
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>
                <Text w="100%" textAlign="right">
                  رشته موردنظر
                </Text>
              </FormControl.Label>
              {fieldData?.data?.length !== 0 ? (
                <Select
                  onValueChange={async value => {
                    await registerDocumentFormik.setFieldValue('field', value);
                    await refetch();
                  }}>
                  {fieldData?.data?.map(item => (
                    <Select.Item label={item?.name} value={item?._id} />
                  ))}
                </Select>
              ) : (
                <HStack flex={1} w="100%">
                  <Button
                    onPress={registerFieldFormik.handleSubmit}
                    mr={5}
                    bg={GREEN_COLOR}
                    flex={0.3}>
                    <Text color="white">ثبت‌رشته</Text>
                  </Button>
                  <HStack flex={1}>
                    <Input
                      onChangeText={value =>
                        registerFieldFormik.setFieldValue('name', value)
                      }
                      w="100%"
                      placeholder="نام‌رشته"
                    />
                  </HStack>
                </HStack>
              )}
              {registerDocumentFormik.errors.field && (
                <Text style={{color: 'red'}} w="100%" textAlign="right">
                  {registerDocumentFormik.errors.field}
                </Text>
              )}
            </FormControl>
            <HStack
              mt={3}
              alignItems="center"
              justifyContent="flex-end"
              w="100%">
              <Text>ثبت رشته مورد‌نظر</Text>
              <Checkbox
                value={showRegisterField}
                onChange={() => setShowRegisterField(value => !value)}
                ml={1}
              />
            </HStack>
            {showRegisterField && (
              <HStack flex={1} w="100%">
                <Button
                  onPress={registerFieldFormik.handleSubmit}
                  mr={5}
                  bg={GREEN_COLOR}
                  flex={0.3}>
                  <Text color="white">ثبت‌رشته</Text>
                </Button>
                <HStack flex={1}>
                  <Input
                    onChangeText={value =>
                      registerFieldFormik.setFieldValue('name', value)
                    }
                    w="100%"
                    placeholder="نام‌رشته"
                  />
                </HStack>
              </HStack>
            )}
            {collegeData &&
            registerDocumentFormik.values.field !== '' &&
            collegeData?.length !== 0 ? (
              <Select
                onValueChange={value => {
                  registerDocumentFormik.setFieldValue('college', value);
                }}>
                {collegeData?.map(item => (
                  <Select.Item value={item?._id} label={item?.name} />
                ))}
              </Select>
            ) : (
              registerDocumentFormik.values.field !== '' &&
              collegeData?.length === 0 && (
                <HStack flex={1} w="100%">
                  <Button
                    onPress={registerCollegeFormik.handleSubmit}
                    mr={5}
                    bg={GREEN_COLOR}
                    flex={0.3}>
                    <Text color="white">ثبت‌درس</Text>
                  </Button>
                  <HStack flex={1}>
                    <Input
                      onChangeText={value =>
                        registerCollegeFormik.setFieldValue('name', value)
                      }
                      w="100%"
                      placeholder="نام‌درس"
                    />
                  </HStack>
                </HStack>
              )
            )}
            {registerDocumentFormik.values.field !== '' && (
              <>
                <HStack
                  mt={3}
                  alignItems="center"
                  justifyContent="flex-end"
                  w="100%">
                  <Text>ثبت درس مورد‌نظر</Text>
                  <Checkbox
                    value={showRegisterCollege}
                    onChange={() => setShowRegisterCollege(value => !value)}
                    ml={1}
                  />
                </HStack>
                {showRegisterCollege && (
                  <HStack flex={1} w="100%">
                    <Button
                      onPress={() => {
                        if (registerDocumentFormik.values.field === '') {
                          Toast.show({
                            ...ToastConfig,
                            status: 'error',
                            title: 'رشته را انتخاب کنید',
                          });
                        } else {
                          registerCollegeFormik.handleSubmit();
                        }
                      }}
                      mr={5}
                      bg={GREEN_COLOR}
                      flex={0.3}>
                      <Text color="white">ثبت‌درس</Text>
                    </Button>
                    <HStack flex={1}>
                      <Input
                        onChangeText={value =>
                          registerCollegeFormik.setFieldValue('name', value)
                        }
                        w="100%"
                        placeholder="نام‌درس"
                      />
                    </HStack>
                  </HStack>
                )}
              </>
            )}
            {registerDocumentFormik.errors.college &&
              !registerDocumentFormik.errors.field && (
                <Text style={{color: 'red'}} w="100%" textAlign="right">
                  {registerDocumentFormik.errors.college}
                </Text>
              )}
            <Button
              h="50px"
              onPress={async () => {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                  });
                  await registerDocumentFormik.setFieldValue(
                    'picPath',
                    pickerResult,
                  );
                } catch (e) {
                  console.log(e);
                }
              }}
              mt={5}
              bg={GREEN_COLOR}
              width="100%">
              <Text fontSize="xl" color="white">
                آپلود‌جزوه
              </Text>
            </Button>
            {registerDocumentFormik.values.picPath && (
              <HStack justifyContent="flex-end" alignItems="center">
                <Text
                  mr={2}
                  textAlign="right"
                  color="#8e8e8e"
                  my={2}
                  fontSize="lg">
                  فایل: {registerDocumentFormik.values.picPath?.name}
                </Text>
                <Icon
                  onPress={() =>
                    registerDocumentFormik.setFieldValue('picPath', '')
                  }
                  size={20}
                  name="close"
                  color="red"
                />
              </HStack>
            )}
            {registerDocumentFormik.errors.picPath && (
              <Text style={{color: 'red'}} w="100%" textAlign="right">
                {registerDocumentFormik.errors.picPath}
              </Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group w="100%" justifyContent="space-between" space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  registerCollegeFormik.resetForm();
                  registerDocumentFormik.resetForm();
                  registerFieldFormik.resetForm();
                  setShowRegisterCollege(false);
                  setShowRegisterField(false);
                  setOpen(false);
                }}>
                <Text>ولش‌کن</Text>
              </Button>
              <Button
                bg={GREEN_COLOR}
                onPress={() => {
                  // const submitPromise = new Promise(() =>
                  registerDocumentFormik.handleSubmit();
                  // );
                  // submitPromise.then(() => {
                  //   registerCollegeFormik.resetForm();
                  //   registerDocumentFormik.resetForm();
                  //   registerFieldFormik.resetForm();
                  //   setShowRegisterCollege(false);
                  //   setShowRegisterField(false);
                  //   setOpen(false);
                  // });
                }}>
                <Text color="white">ثبت‌جزوه</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

export default DetailUniversity;
