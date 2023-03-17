import React from "react"
import axios from "axios"
import AppProvider from "./AppProvider"
import AuthProvider from "./AuthProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OrderProvider from "./OrderProvider"

// export const BASE_URL = 'http://3.108.49.36:14002/api/'
export const BASE_URL = 'https://efetch.om/api/'

export const LOADING = 'loading'
export const ERROR = 'error'

export default Providers = ({ children }) => (
    <AppProvider>
        <AuthProvider>
            <OrderProvider>
                {children}
            </OrderProvider>
        </AuthProvider>
    </AppProvider>
)

export const API = instance = axios.create({
    baseURL: BASE_URL
});

API.interceptors.request.use(async config => {
    let userData = (await AsyncStorage.getItem('userData'))
    userData = userData || null
    userData = JSON.parse(userData)
    console.log(userData, config.url)
    if (userData) return { ...config, url: `${config.url}${new URLSearchParams({ uid: userData.uid, access_token: userData.access_token, language : 'en_GB' })}` }
    return config
})