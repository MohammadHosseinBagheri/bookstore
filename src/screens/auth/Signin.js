/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {useFormik} from 'formik';
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  VStack,
  Text,
  ScrollView,
} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/common/Header';
import {SIGNIN_INITIAL_VALUES} from '../../constant/initial_values';
import {SIGNIN_VALIDATION} from '../../constant/schema';
import {GREEN_COLOR, MAIN_PADDING} from '../../constant/styles';
import {goBackRouting} from '../../utils/auth/signin';
import {userLogin} from '../../apis/';
import {Toast} from 'toastify-react-native';
import {getData, saveData} from '../../helper/common';
import * as screens from '../../constant/routes';

const SigninScreen = () => {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: SIGNIN_INITIAL_VALUES,
    validationSchema: SIGNIN_VALIDATION,
    onSubmit: async values => {
      const {data, status} = await userLogin(values);
      if (status === 200) {
        await Toast.success('you are logged in');
        await saveData(data, 'jwt').then(() => {
          navigation.replace(screens.HOME_SCREEN);
        });
      }
      if (status === 400) {
        return Toast.error('check your fields');
      }
      if (status === 401) {
        return Toast.error('username or password incorrect');
      }
      if (status === 404) {
        return Toast.error('first register');
      }
      if (status === 500) {
        return Toast.error('internal error');
      }
    },
  });
  return (
    <>
      <Header
        left={
          <TouchableOpacity onPress={() => goBackRouting(navigation)}>
            <Image source={require('../../assets/icons/RightDetail.png')} />
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="height">
          <Heading fontFamily="aviny">Sign in</Heading>
          <VStack>
            <Box mt={5}>
              <Input
                onChangeText={e => formik.setFieldValue('specialCode', e)}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                style={styles.input}
                placeholderTextColor="#000"
                placeholder="Optional Group Special Code"
              />
            </Box>
            <Box mt={5}>
              <Input
                onChangeText={e => formik.setFieldValue('phone', e)}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                style={styles.input}
                placeholderTextColor="#000"
                placeholder="Phone"
              />
              <Text style={{color: 'red'}}>{formik.errors.phone}</Text>
            </Box>
            <Box mt={5}>
              <Input
                secureTextEntry
                onChangeText={e => formik.setFieldValue('password', e)}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                style={styles.input}
                placeholderTextColor="#000"
                placeholder="Password"
              />
              <Text style={{color: 'red'}}>{formik.errors.password}</Text>
            </Box>
            <HStack justifyContent="space-between">
              <HStack alignItems="center">
                <Checkbox
                  mr={3}
                  isChecked={formik.values.stay}
                  onChange={e => formik.setFieldValue('stay', e)}
                  value={formik.values.stay}
                  my={2}
                />
                <Text fontFamily="aviny" fontSize={18}>
                  Stay Logged In
                </Text>
              </HStack>
              <Box alignItems="center" justifyContent="center">
                <TouchableOpacity>
                  <Text fontFamily="aviny" fontSize={18}>
                    Forget Password
                  </Text>
                </TouchableOpacity>
              </Box>
            </HStack>
            <TouchableOpacity
              onPress={formik.handleSubmit}
              style={styles.signinButton}>
              <Text textAlign="center" p={4} color={GREEN_COLOR}>
                Sign in
              </Text>
            </TouchableOpacity>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: MAIN_PADDING,
  },
  input: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderWidth: 0,
  },
  signinButton: {borderColor: GREEN_COLOR, borderWidth: 1, borderRadius: 20},
});
