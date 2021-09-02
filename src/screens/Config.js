/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import * as screens from '../constant/routes';
import SplashScreen from './Splash';
import SigninScreen from './auth/Signin';
import RegisterScreen from './auth/Register';
import HomeScreen from './Home';
import CustomDrawer from '../components/common/Drawer';
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = () => (
  <Drawer.Navigator
    drawerContent={CustomDrawer}
    screenOptions={{
      headerShown: false,
      drawerPosition: 'right',
      drawerStyle: {backgroundColor: 'transparent'},
    }}>
    <Drawer.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
    <Drawer.Screen component={SplashScreen} name={screens.SPLASH_SCREEN} />
    <Drawer.Screen component={SigninScreen} name={screens.LOGIN_SCREEN} />
    <Drawer.Screen component={RegisterScreen} name={screens.REGISTER_SCREEN} />
  </Drawer.Navigator>
);

const ConfigRoutes = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);

export default ConfigRoutes;
