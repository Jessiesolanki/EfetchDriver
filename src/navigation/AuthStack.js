import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardStack from './DashBoardStack';
import { defaultScreenOptions } from '.';
import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTP from '../screens/Auth/OTP';
import ResetPassword from '../screens/Auth/ResetPassowrd';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions} >

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  );
};

export default MyStack;