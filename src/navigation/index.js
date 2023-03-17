import { TransitionPresets } from "@react-navigation/stack"
import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
    navigationRef.current?.navigate(routeName, params);
};

export const openDrawer = () => {
    navigationRef.current?.openDrawer();
};

/**
 * It resets the root of the navigation stack to the stack name passed in
 */
export const changeStack = stackName => {
    resetRoot(stackName);
};

const resetRoot = routeName => {
    navigationRef.current?.resetRoot({
        index: 0,
        routes: [{ name: routeName }],
    });
};

export const defaultScreenOptions = {
    cardStyle : {backgroundColor : 'white'},
    detachPreviousScreen: false,
    ...TransitionPresets.SlideFromRightIOS
}
