import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { defaultScreenOptions } from '.';
import AuthStack from './AuthStack';
import DashBoardStack from './DashBoardStack';
import Splash from '../screens/Splash';
const Stack = createStackNavigator();

export default RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ ...defaultScreenOptions, headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }} >
            <Stack.Screen name={'Splash'} component={Splash} />
            <Stack.Screen name={'Auth Stack'} component={AuthStack} />
            <Stack.Screen name={'Dashboard Stack'} component={DashBoardStack} />
        </Stack.Navigator>
    );
}