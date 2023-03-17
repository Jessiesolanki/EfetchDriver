import 'react-native-gesture-handler';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../screens/DashBoard';
import Notification from '../screens/Dashboard/Notification';
import OrderDetails from '../screens/Dashboard/OrderDetails';
import UpdateProfile from '../screens/Dashboard/UpdateProfile';
import MapScreen from '../screens/Dashboard/MapScreen';
const Stack = createNativeStackNavigator();

const DashBoardStack = () => {

    return (
        <Stack.Navigator initialRouteName="DashBoard">
            <Stack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Order Details"
                component={OrderDetails}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Update Profile"
                component={UpdateProfile}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};
export default DashBoardStack 