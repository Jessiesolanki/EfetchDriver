import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API, ERROR, LOADING } from ".";
import { changeStack } from "../navigation";
import { AppContext } from "./AppProvider";
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import useGeolocation from "../Hooks/useGeolocation";

export const AuthContext = React.createContext()

export default AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState()
    const { setLoading } = useContext(AppContext)
    const { position } = useGeolocation({ interval: 50000 })

    useEffect(() => {
        messaging().subscribeToTopic('driver_test')
        getCachedUserData()
    }, [])

    useEffect(() => {
        const unsubscribe = messaging().onTokenRefresh(token => updateDeviceToken(token))
        updateDeviceToken()
        return unsubscribe
    }, [userData?.access_token])

    useEffect(() => {
        updateLocation()
    }, [position])

    const updateLocation = async () => {
        if(!userData) return 
        if (position == ERROR || position == LOADING) return
        const params = { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude }
        await API.post('user/post-location?' + new URLSearchParams(params).toString() + '&')
    }

    const login = (params, onSuccess) => {
        setLoading(true)
        console.log(params)
        API.get('driver/login?' + new URLSearchParams({ ...params }).toString()+'&')
            .then((res) => {
                setUserData(res.data.data)
                AsyncStorage.setItem('userData', JSON.stringify(res.data.data))
                onSuccess()
            }).catch(err => {
                console.log('login error', err, err?.response)
                Alert.alert('Login', err?.response?.data?.message || 'Something went wrong, Please try again.')
            }).finally(() => setLoading(false))
    }

    const redirect = async () => {
        const cachedUserData = await AsyncStorage.getItem('userData')
        if (cachedUserData) changeStack('Dashboard Stack')
        else changeStack('Auth Stack')
    }

    const getCachedUserData = async () => {
        const cachedUserData = await AsyncStorage.getItem('userData')
        if (cachedUserData) setUserData(JSON.parse(cachedUserData))
    }

    const updateDeviceToken = async (token) => {
        if (!userData) return
        const deviceToken = token || await messaging().getToken()
        const params = {
            uid: userData.uid,
            access_token: userData.access_token,
            device_token: deviceToken,
            db: 'efetch_18'
        }

        console.log(JSON.stringify(params, null, 2))

        await axios.get('http://3.108.49.36:14002/api/user/update-device-token?' + new URLSearchParams(params))
    }

    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        AsyncStorage.clear()
                        changeStack('Auth Stack')
                        setUserData(null)
                    }
                },
                {
                    text : 'Cancel'
                }
            ]
        )

    }

    return (
        <AuthContext.Provider value={{
            login,
            userData,
            redirect,
            logout
        }}  >
            {children}
        </AuthContext.Provider>
    )
}