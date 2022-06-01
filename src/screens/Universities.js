import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import {useGetUniversities} from '../react-query/useGetUniversities';
import Loading from '../components/common/Loading';
import {
  Box,
  Heading,
  Button,
  Text,
  Modal,
  FormControl,
  Input,
  Select,
  useToast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as screen from '../constant/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GREEN_COLOR, MAIN_PADDING} from '../constant/styles';
import {useState} from 'react';
import {useFormik} from 'formik';
import {useGetCity, useGetProvince} from '../react-query/useProvince';
import {REGISTR_UNIVERSITY_VALIDATION} from '../constant/schema';
import {useRegisterUniversity} from '../react-query/useRegisterUniversity';

const Universities = () => {
  const {data, isLoading} = useGetUniversities();
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const {isLoading: registerLoading, mutate} = useRegisterUniversity(setOpen);

  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      province: '',
    },
    validationSchema: REGISTR_UNIVERSITY_VALIDATION,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {
    isLoading: loadingProvince,
    data: provinceData,
    isSuccess: provinceSuccess,
    refetch: provinceRefetch,
  } = useGetProvince();
  const {
    isLoading: loadingCity,
    data: cityData,
    isSuccess: citySuccess,
    refetch: cityRefetch,
  } = useGetCity(formik.values.province);
  useEffect(() => {
    if (isOpen && !provinceSuccess) {
      provinceRefetch();
    }
  }, [isOpen, provinceRefetch, provinceSuccess]);
  useEffect(() => {
    cityRefetch();
  }, [formik.values.province]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <View
        pos="relative"
        style={{paddingBottom: 40, paddingTop: 20, fontFamily: 'aviny'}}>
        <Heading fontFamily="aviny" textAlign="center">
          دانشگاه ها
        </Heading>
        <Button
          _pressed={{bg: 'transparent'}}
          variant="ghost"
          onPress={() => {
            setOpen(true);
          }}
          right={MAIN_PADDING}
          top={25}
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          formik.handleReset();
          setOpen(false);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />

          <Heading textAlign="center" fontSize="xl">
            ثبت‌دانشگاه
          </Heading>
          <Modal.Body>
            {loadingProvince ? (
              <Loading isFull={false} />
            ) : (
              <>
                <FormControl style={{fontFamily: 'aviny'}}>
                  <FormControl mt="3">
                    <FormControl.Label>
                      <Text w="100%" textAlign="right">
                        نام دانشگاه
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={value =>
                        formik.setFieldValue('name', value)
                      }
                    />
                    <Text style={{color: 'red'}}>{formik.errors.name}</Text>
                  </FormControl>

                  <FormControl.Label>
                    <Text w="100%" textAlign="right">
                      استان
                    </Text>
                  </FormControl.Label>
                  {provinceSuccess && provinceData?.data?.length !== 0 && (
                    <Select
                      onValueChange={value =>
                        formik.setFieldValue('province', value)
                      }
                      style={{fontFamily: 'aviny'}}
                      accessibilityLabel="استان را انتخاب کنید"
                      placeholder="استان را انتخاب کنید"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <Icon name="check" color="white" size={20} />,
                      }}>
                      {provinceData?.data?.map(province => (
                        <Select.Item
                          style={{fontFamily: 'aviny'}}
                          value={province?.id}
                          label={province?.name}
                        />
                      ))}
                    </Select>
                  )}
                  <Text style={{color: 'red'}}>{formik.errors.province}</Text>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>
                    <Text w="100%" textAlign="right">
                      شهر
                    </Text>
                  </FormControl.Label>
                  {formik.values.province !== '' &&
                  citySuccess &&
                  cityData?.data?.cities?.length !== 0 ? (
                    <Select
                      onValueChange={value =>
                        formik.setFieldValue('city', value)
                      }
                      style={{fontFamily: 'aviny'}}
                      accessibilityLabel="استان را انتخاب کنید"
                      placeholder="استان را انتخاب کنید"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <Icon name="check" color="white" size={20} />,
                      }}>
                      {cityData?.data?.cities?.map(city => (
                        <Select.Item
                          style={{fontFamily: 'aviny'}}
                          value={city?.id}
                          label={city?.name}
                        />
                      ))}
                    </Select>
                  ) : (
                    <Select
                      isDisabled
                      style={{fontFamily: 'aviny'}}
                      accessibilityLabel="استان را انتخاب کنید"
                      placeholder="استان را انتخاب کنید">
                      <Select.Item
                        style={{fontFamily: 'aviny'}}
                        value=""
                        label=""
                      />
                    </Select>
                  )}
                  <Text style={{color: 'red'}}>{formik.errors.city}</Text>
                </FormControl>
              </>
            )}
          </Modal.Body>
          <Modal.Footer d="flex" justifyContent="space-between">
            <Button
              style={{fontFamily: 'aviny'}}
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setOpen(false);
                formik.resetForm();
              }}>
              <Text>ولش کن!</Text>
            </Button>
            <Button
              isLoading={registerLoading}
              disabled={!formik.isValid}
              bg={GREEN_COLOR}
              style={{fontFamily: 'aviny'}}
              onPress={() => {
                formik.handleSubmit();
              }}>
              <Text color="white">ثبت</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Universities;

const styles = StyleSheet.create({});
