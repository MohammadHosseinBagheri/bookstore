import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import ConfigRoutes from './src/screens/Config';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor="#fff" />
        <ConfigRoutes />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
