/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {
  KeyboardAvoidingView,
  ScrollView,
  Box,
  Input,
  VStack,
  Heading,
  Text,
} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Header from '../../components/common/Header';
import {GREEN_COLOR, MAIN_PADDING} from '../../constant/styles';
import {goBackRouting} from '../../utils/auth/register';
import {useFormik} from 'formik';
import {REGISTER_INITIAL_VALUES} from '../../constant/initial_values';
import {REGISTRATION_VALIDATION} from '../../constant/schema';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: REGISTER_INITIAL_VALUES,
    validationSchema: REGISTRATION_VALIDATION,
    onSubmit: values => console.log(values),
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
          <Heading fontFamily="aviny">Register</Heading>
          <VStack>
            <Box mt={3}>
              <Input
                onChangeText={e => formik.setFieldValue('name', e)}
                style={styles.input}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                placeholderTextColor="#000"
                placeholder="First & Lastname"
              />
              <Text style={{color: 'red'}}>{formik.errors.name}</Text>
            </Box>
            <Box mt={3}>
              <Input
                onChangeText={e => formik.setFieldValue('email', e)}
                style={styles.input}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                placeholderTextColor="#000"
                placeholder="Email"
              />
              <Text style={{color: 'red'}}>{formik.errors.email}</Text>
            </Box>
            <Box mt={3}>
              <Input
                onChangeText={e => formik.setFieldValue('phone', e)}
                style={styles.input}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                placeholderTextColor="#000"
                placeholder="Mobile Phone"
              />
              <Text style={{color: 'red'}}>{formik.errors.phone}</Text>
            </Box>
            <Box mt={3}>
              <Input
                onChangeText={e => formik.setFieldValue('specialCode', e)}
                style={styles.input}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                placeholderTextColor="#000"
                placeholder="Group Special Code(Optional)"
              />
            </Box>
            <Box mt={3} mb={3}>
              <Input
                secureTextEntry
                onChangeText={e => formik.setFieldValue('password', e)}
                style={styles.input}
                fontSize={20}
                fontFamily="aviny"
                bg="#EFEFEF"
                alignItems="center"
                placeholderTextColor="#000"
                placeholder="Password"
              />
              <Text style={{color: 'red'}}>{formik.errors.password}</Text>
            </Box>
            <TouchableOpacity
              onPress={formik.handleSubmit}
              style={styles.registerButton}>
              <Text textAlign="center" p={4} color="#fff">
                Register
              </Text>
            </TouchableOpacity>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

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
  registerButton: {
    borderColor: GREEN_COLOR,
    backgroundColor: GREEN_COLOR,
    borderWidth: 1,
    borderRadius: 20,
  },
});
