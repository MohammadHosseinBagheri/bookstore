/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import * as screens from '../constant/routes';
import SplashScreen from './Splash';
import SigninScreen from './auth/Signin';
import RegisterScreen from './auth/Register';
import HomeScreen from './Home';
import CustomDrawer from '../components/common/Drawer';
import {useIsAuthState, useIsAuthDispatch} from '../context/useIsLoggedIn';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BookDetailScreen from './BookDetail';
import Universities from './Universities';
import DetailUniversity from './DetailUniversity';
enableScreens();
const Stack = createSharedElementStackNavigator();
// const Drawer = createDrawerNavigator();
const MainStack = () => {
  const isLoggedIn = useIsAuthState();
  useEffect(() => {}, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
        <Stack.Screen
          component={Universities}
          name={screens.UNIVERSITIES_SCREEN}
        />
        <Stack.Screen
          component={DetailUniversity}
          name={screens.DETAIL_UNIVERSITY}
        />
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
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={SplashScreen} name={screens.SPLASH_SCREEN} />
        <Stack.Screen component={HomeScreen} name={screens.HOME_SCREEN} />
        <Stack.Screen component={SigninScreen} name={screens.LOGIN_SCREEN} />
        <Stack.Screen
          component={RegisterScreen}
          name={screens.REGISTER_SCREEN}
        />
        <Stack.Screen
          component={Universities}
          name={screens.UNIVERSITIES_SCREEN}
        />
        <Stack.Screen
          component={DetailUniversity}
          name={screens.DETAIL_UNIVERSITY}
        />
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
};

let navigationRef = React.createRef();
export const replace = (routeName, ...params) => {
  navigationRef.current?.element?.dispatch(
    StackActions.replace(routeName, ...params),
  );
};
export const navigate = (name, config) => {
  navigationRef.current?.element?.dispatch(StackActions?.push(name, ...config));
};
const ConfigRoutes = () => {
  const setIsAuth = useIsAuthDispatch();
  return (
    <NavigationContainer
      ref={element => {
        navigationRef.current = {element, setIsAuth};
      }}>
      <MainStack />
    </NavigationContainer>
  );
};
export default ConfigRoutes;
