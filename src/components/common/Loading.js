import {Spinner} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GREEN_COLOR} from '../../constant/styles';

const Loading = () => {
  return <Spinner color={GREEN_COLOR} style={{marginTop: '50%'}} />;
};

export default Loading;

const styles = StyleSheet.create({});
