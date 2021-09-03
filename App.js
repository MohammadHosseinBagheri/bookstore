import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import ConfigRoutes from './src/screens/Config';
import {QueryClient, QueryClientProvider} from 'react-query';
import ToastManager from 'toastify-react-native';
import IsAuthProvider from './src/context/useIsLoggedIn';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const App = () => {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor="#fff" />
        <ToastManager />
        <IsAuthProvider>
          <ConfigRoutes />
        </IsAuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
