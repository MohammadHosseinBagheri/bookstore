/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import * as screens from '../constant/routes';
import SplashScreen from './Splash';
import SigninScreen from './auth/Signin';
import RegisterScreen from './auth/Register';
import HomeScreen from './Home';
import CustomDrawer from '../components/common/Drawer';
import {useIsAuthState} from '../context/useIsLoggedIn';
import {removeData} from '../helper/common';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BookDetailScreen from './BookDetail';
enableScreens();
const Stack = createSharedElementStackNavigator();
// const Drawer = createDrawerNavigator();
const MainStack = () => {
  const isLoggedIn = useIsAuthState();
  useEffect(() => {}, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <Stack.Navigator
        initialRouteName={screens.HOME_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
        <Stack.Screen
          component={BookDetailScreen}
          name={screens.DETAIL_SCREEN}
          options={() => ({
            headerShown: false,
            gestureEnabled: false,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 1000}},
              close: {animation: 'timing', config: {duration: 1000}},
            },
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={
        isLoggedIn ? screens.HOME_SCREEN : screens.SPLASH_SCREEN
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />

      <Stack.Screen component={SplashScreen} name={screens.SPLASH_SCREEN} />
      <Stack.Screen component={SigninScreen} name={screens.LOGIN_SCREEN} />
      <Stack.Screen component={RegisterScreen} name={screens.REGISTER_SCREEN} />
    </Stack.Navigator>
  );
};

const ConfigRoutes = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

export default ConfigRoutes;
