/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import * as screens from '../constant/routes';
import SplashScreen from './Splash';
import SigninScreen from './auth/Signin';
import RegisterScreen from './auth/Register';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();
const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
    <Stack.Screen component={SplashScreen} name={screens.SPLASH_SCREEN} />
    <Stack.Screen component={SigninScreen} name={screens.LOGIN_SCREEN} />
    <Stack.Screen component={RegisterScreen} name={screens.REGISTER_SCREEN} />
  </Stack.Navigator>
);

const ConfigRoutes = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

export default ConfigRoutes;
