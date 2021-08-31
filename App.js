import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import ConfigRoutes from './src/screens/Config';

const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#fff" />
      <ConfigRoutes />
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
