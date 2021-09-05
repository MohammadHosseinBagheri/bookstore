/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import * as screens from '../constant/routes';
import SplashScreen from './Splash';
import SigninScreen from './auth/Signin';
import RegisterScreen from './auth/Register';
import HomeScreen from './Home';
import CustomDrawer from '../components/common/Drawer';
import {useIsAuthState} from '../context/useIsLoggedIn';
import {removeData} from '../helper/common';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const MainStack = () => {
  const isLoggedIn = useIsAuthState();
  useEffect(() => {}, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <Stack.Navigator
        initialRouteName={screens.HOME_SCREEN}
        // drawerContent={CustomDrawer}
        screenOptions={{
          headerShown: false,
          // drawerPosition: 'right',
          // drawerStyle: {backgroundColor: 'transparent'},
          // swipeEnabled: false,
        }}>
        <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={
        isLoggedIn ? screens.HOME_SCREEN : screens.SPLASH_SCREEN
      }
      // drawerContent={CustomDrawer}
      screenOptions={{
        headerShown: false,
        // drawerPosition: 'right',
        // drawerStyle: {backgroundColor: 'transparent'},
        // swipeEnabled: false,
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
