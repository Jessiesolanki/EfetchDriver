import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useQueryClient } from "react-query";
import { API, ERROR, LOADING } from ".";
import { ORDER_STATUSES } from "../constant/Constants";
import { changeStack } from "../navigation";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";

export const OrderContext = React.createContext()

export default OrderProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)
    const queryClient = useQueryClient()

    const getDashboard = () => API.get('driver/get-dashboard?')
    const getNotification = () => API.get('user/get-notification?language=en&')

    const getOrderDetails = (setState, params) => {
        setState(LOADING)
        API.get('driver/get-order-details?' + new URLSearchParams(params).toString() + '&')
            .then((res) => {
                let order = res.data?.data
                if(order.order_status == 'Arrived at Customer Location' && params.order_type == 'delivery'){
                    order.order_status = ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED
                }
                setState(order)
            })
            .catch(err => {
                setState(ERROR)
                console.log('get-order-details-error', err, JSON.stringify(err?.response, null, 2))
            })
    }

    const changeOrderStatus = (order, onSuccess) => {
        const getEndpoint = () => {
            switch (order.order_status) {
                case ORDER_STATUSES.PICKUP.DRIVER_ASSIGNED: return 'initiate-pickup'
                case ORDER_STATUSES.PICKUP.PICKUP_INITIATED: return 'reached-to-customer'
                case ORDER_STATUSES.PICKUP.CUSTOMER_REACHED: return 'confirm-pickup'
                case ORDER_STATUSES.PICKUP.PICKUP_CONFIRMED: return 'initiate-workshop'
                case ORDER_STATUSES.PICKUP.VEHICLE_PICKED_UP: return 'reached-to-workshop'

                case ORDER_STATUSES.DELIVERY.DRIVER_ASSIGNED_FOR_DELIVERY: return 'initiate-drop-off'
                case ORDER_STATUSES.DELIVERY.DELIVERY_INITIATED: return 'picked-from-workshop'
                case ORDER_STATUSES.DELIVERY.PICKED_FROM_WORK_SHOP: return 'reached-to-customer'
                case ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED: return 'verify-customer'
            }
        }
        setLoading(true)
        API.get(`driver/${getEndpoint()}?`+new URLSearchParams(order).toString()+'&')
            .then(()=>{
                onSuccess()
                queryClient.invalidateQueries('dashboard')
            })
            .catch(err => {
                Alert.alert('Order',err?.response?.data?.data?.error_message || err?.response?.data?.message || 'Something went wrong, Please try again.')
                console.log('change-order-status', err, JSON.stringify(err?.response, null, 2))
            }).finally(() => setLoading(false))
    }

    const changeOrderStatusOtp = (order, onSuccess) => {
    
        const getEndpoint = () => {
            switch (order.order_status) {
                case ORDER_STATUSES.PICKUP.DRIVER_ASSIGNED: return 'initiate-pickup'
                case ORDER_STATUSES.PICKUP.PICKUP_INITIATED: return 'reached-to-customer'
                case ORDER_STATUSES.PICKUP.CUSTOMER_REACHED: return 'confirm-pickup'
                case ORDER_STATUSES.PICKUP.PICKUP_CONFIRMED: return 'initiate-workshop'
                case ORDER_STATUSES.PICKUP.VEHICLE_PICKED_UP: return 'reached-to-workshop'

                case ORDER_STATUSES.DELIVERY.DRIVER_ASSIGNED_FOR_DELIVERY: return 'initiate-drop-off'
                case ORDER_STATUSES.DELIVERY.DELIVERY_INITIATED: return 'picked-from-workshop'
                case ORDER_STATUSES.DELIVERY.PICKED_FROM_WORK_SHOP: return 'reached-to-customer'
                case ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED: return 'verify-customer'
            }
        }
        setLoading(true)
        API.get(`driver/${getEndpoint()}?`+new URLSearchParams(order).toString()+'&')
            .then(()=>{
                onSuccess()
                queryClient.invalidateQueries('dashboard')
            })
            .catch(err => {
                Alert.alert('Order',err?.response?.data?.data?.error_message || err?.response?.data?.message || 'Something went wrong, Please try again.')
                console.log('change-order-status', err, JSON.stringify(err?.response, null, 2))
            }).finally(() => setLoading(false))
    }

    return (
        <OrderContext.Provider value={{
            getDashboard,
            getOrderDetails,
            changeOrderStatus,
            changeOrderStatusOtp,
            getNotification
        }}  >
            {children}
        </OrderContext.Provider>
    )
}