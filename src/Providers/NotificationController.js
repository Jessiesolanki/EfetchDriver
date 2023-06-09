import { useContext, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { AuthContext } from './AuthProvider';

const NotificationController = ({ children }) => {
  const { userData } = useContext(AuthContext)

  PushNotification.configure({
    onNotification: notification => {
      console.log('ON NOTIFICATION : ', JSON.stringify(notification, null, 2))
      notification.userInteraction ? handleNotification(notification, notification.bigPictureUrl, notification.data) : false
    }
  })

  useEffect(() => {
    messaging().getInitialNotification().then(remoteMessage => handleNotification(remoteMessage?.notification, remoteMessage?.notification?.android?.imageUrl, remoteMessage?.data))
    const unsubscribe = messaging().onMessage(createLocalNotification)
    return unsubscribe;
  }, []);

  const handleNotification = (notification, imageUrl, data,) => {
    if (!notification) return
    console.log(userData)
    console.log('H A N D L E D', JSON.stringify({ title: notification.title, body: notification.body, data: { ...data } }, null, 2))
    
  }

  const createLocalNotification = (remoteMessage) => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      message: remoteMessage.notification.body,
      body: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification?.android?.imageUrl,
      smallIcon: remoteMessage.notification?.android?.imageUrl,
      data: remoteMessage?.data,
    });
  }


  return null
};

export default NotificationController;

export const initNotifications = () => {

    // import PushNotificationIOS from "@react-native-community/push-notification-ios";

    // import { Linking } from 'react-na tive'
    // import { ToastAndroid } from 'react-native'

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log('ON REGISTER : TOKEN>', token)
        },

        // // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            // console.log('NOTIFICATION CLICK',appIsOpen.current, notification)
            // navigationRef.current.navigate('Creddit/Debit Card')
            // onStartAction.current = notification
            // onStartAction.current = {action : ()=>navigate('BOOKING DETAILS', { id: '67' })}
            // if(true){
            //     setTimeout(() => { 
            //         console.log('OPENING LINK')
                    
                    
            //      }, appIsOpen.current==true ? 1000 : 3000)
            // }
           

            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log(notification)
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err)
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true
    })

    PushNotification.createChannel(
        {
            channelId: 'test-channel', // (required)
            channelName: 'Order Notification', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true // (optional) default: true. Creates the default vibration patten if true.
        },
        created => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    )
}