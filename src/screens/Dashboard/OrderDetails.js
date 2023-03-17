import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, DeviceEventEmitter, ScrollView, Text, TextInput, TouchableOpacity, View,Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from 'react-hook-form';
import Header from "../../components/Header";
import ImageIcon from "../../components/ImageIcon";
import Colors from "../../constant/Colors";
import { shadow } from '../../constant/Styles'
import CustomButton from '../../components/CustomButton'
import { ERROR, LOADING } from "../../Providers";
import { OrderContext } from "../../Providers/OrderProvider";
import Error from "../../components/Error";
import { EVENTS, ORDER_STATUSES } from "../../constant/Constants";
import { Icon } from "react-native-elements";


export default OrderDetails = ({ route, navigation }) => {
    const insets = useSafeAreaInsets()
    const order_id = route.params?.order_id
    const order_type = route.params?.order_type
    const [order, setOrder] = useState(LOADING)
  
    const { getOrderDetails, changeOrderStatus,changeOrderStatusOtp } = useContext(OrderContext)
    const buttonText = useMemo(() => getButtonText(order.order_status), [order])
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
    useEffect(() => {
        getOrderDetails(setOrder, { order_id, order_type })
    }, [])

    const OTPCard = ({ order }) => {
        
        if (order.order_status != ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED) return null
    
        return (
            <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 16, borderRadius: 10, ...shadow, marginBottom: 20 }} >
                <Text style={{ color: Colors.black80, fontSize: 16, paddingBottom: 3 }} >Enter OTP</Text>
                {/* <TextInput onChangeText={(newText) => setOtp(newText)} defaultValue={otp}   style={{ padding: 15, borderWidth: 1, borderColor: Colors.blue_Color, marginTop: 5, borderRadius: 5 }} /> */}
            <ControlledInput
           
            textInputProps={{ keyboardType: 'phone-pad', maxLength: 6 }}
            controllerProps={{ name: 'otp', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20, color: Colors.black80, fontSize: 16 }} />
            </View>
        )
    }
    const onPress = data => {
        let otp =data?.otp;
        if(otp){
            changeOrderStatusOtp({ ...order, otp, order_type }, () => {
                DeviceEventEmitter.emit(EVENTS.ORDER_UPDATED)
                navigation.goBack()
            })
    }else{
       
        changeOrderStatus({ ...order, order_type }, () => {
            DeviceEventEmitter.emit(EVENTS.ORDER_UPDATED)
            navigation.goBack()
        })
    }
    }

    const Body = useMemo(() => () => {
        switch (order) {
            case LOADING: return <ActivityIndicator color={Colors.blue_Color} style={{ padding: 20 }} size={'large'} />
            case ERROR: return <Error retry={() => getOrderDetails(setOrder, { order_id, order_type: 'delivery' })} message={'Something went wrong\nPlease try again'} />
            default: return (
                <ScrollView  style={{ padding: 20, paddingBottom: 20 + insets.bottom }} >
                    <OrderDetailsCard order={order} />
                    <View style={{ height: 20 }} />
                    <CustomerDetailsCard order={order} />
                   <View style={{ height: 20 }} />
                    <StatusCard order={order} />
                    <OTPCard order={order} />
           
                    {buttonText && <CustomButton onPress={handleSubmit(onPress)} containerStyle={{marginBottom:30}} label={buttonText} />}
                </ScrollView>
            )
        }
    }, [order])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue10, }} >
            <Header 
            headerRight={<Icon type="ionicon" onPress={()=>navigation.navigate('MapScreen', {order})} size={20} containerStyle={{borderWidth : 1.5, borderRadius : 30, height : 28, width : 28, justifyContent : 'center', alignItems : 'center'}} name={'location-outline'} />} 
            title={'Order Details'} />
            <Body />
        </View>
    )
}

const OrderDetailsCard = ({ order }) => {
console.log(order);
    const timeLabel = useMemo(() => getTimeLabel(order.order_status), [order])

    return (
        <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 16, borderRadius: 10, ...shadow }} >

            <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color }} >{order.order_no}</Text>
            {timeLabel && <Text style={{ color: Colors.black80, paddingTop: 10, fontSize: 16 }} >{timeLabel}</Text>}
            {timeLabel && <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color, marginTop: 5 }} >{order.expected_time}</Text>}
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color, marginTop: 5 }} >{order.order_status}</Text>

        </View>
    )
}

// const OTPCard = ({ order }) => {

//     if (order.order_status != ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED) return null

//     return (
//         <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 16, borderRadius: 10, ...shadow, marginBottom: 20 }} >
//             <Text style={{ color: Colors.black80, fontSize: 16, paddingBottom: 3 }} >Enter OTP</Text>
//             <TextInput  style={{ padding: 15, borderWidth: 1, borderColor: Colors.blue_Color, marginTop: 5, borderRadius: 5 }} />
//         </View>
//     )
// }

const StatusCard = ({ order }) => {

    if (
        order.order_status == ORDER_STATUSES.PICKUP.DRIVER_ASSIGNED ||
        order.order_status == ORDER_STATUSES.PICKUP.PICKUP_INITIATED ||
        order.order_status == ORDER_STATUSES.PICKUP.CUSTOMER_REACHED ||
        order.order_status == ORDER_STATUSES.DELIVERY.PICKED_FROM_WORK_SHOP ||
        order.order_status == ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED ||
        order.order_status == ORDER_STATUSES.DELIVERY.VEHICLE_DELIVERED_CUSTOMER
    ) return null

    return (
        <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 16, borderRadius: 10, ...shadow, marginBottom: 20 }} >

            <View >
                <Text style={{ color: Colors.black80, fontSize: 16, paddingBottom: 3 }} >Workshop</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color, flex: 1, marginRight: 115 }} >{order?.Workshop}</Text>
            </View>

            {order?.customer_address && <View style={{ paddingTop: 15 }}>
                <Text style={{ color: Colors.black80, fontSize: 16, paddingBottom: 3 }} >Address</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color }} >{order.customer_address}</Text>
            </View>}

        </View>
    )
}

const CustomerDetailsCard = ({ order }) => {
    console.log(order,'op');
    return (
        <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 16, borderRadius: 10, ...shadow }} >

            <Text style={{ color: Colors.black80, fontSize: 16 }} >Name</Text>
            <Text style={{ fontWeight: 'bold', paddingBottom: 10, fontSize: 16, color: Colors.blue_Color }} >{order?.customer}</Text>
            {order?.customer_address ? <Text style={{ color: Colors.black80, fontSize: 16 }} >Address</Text>:null}
            {order?.customer_address ? <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color, marginTop: 5 }} >{order?.customer_address}</Text>:null}
            {order?.customer_mobile ? <Text style={{ color: Colors.black80, fontSize: 16 }} >Phone Number</Text>:null}
            {order?.customer_mobile ? <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.blue_Color, marginTop: 5 }} >{order?.customer_mobile}</Text>:null}
            <ImageIcon onPress={()=>{Linking.openURL(`tel:${order?.customer_mobile}`);}} containerStyle={{ position: 'absolute', right: 15, bottom: 15 }} size={30} name='call_blue' />

        </View>
    )
}

const getButtonText = (status) => {

    if (!status) return null
    switch (status) {
        case ORDER_STATUSES.PICKUP.DRIVER_ASSIGNED: return 'Initiate Pickup'
        case ORDER_STATUSES.PICKUP.PICKUP_INITIATED: return 'Reached Customer Location'
        case ORDER_STATUSES.PICKUP.CUSTOMER_REACHED: return 'Vehicle Pickup Complete'
        case ORDER_STATUSES.PICKUP.PICKUP_CONFIRMED: return 'initiate-workshop'
        case ORDER_STATUSES.PICKUP.VEHICLE_PICKED_UP: return 'Vehicle Delivered at Workshop'

        case ORDER_STATUSES.DELIVERY.DRIVER_ASSIGNED_FOR_DELIVERY: return 'Initiate Drop-off'
        case ORDER_STATUSES.DELIVERY.DELIVERY_INITIATED: return 'Vehicle picked from workshop'
        case ORDER_STATUSES.DELIVERY.PICKED_FROM_WORK_SHOP: return 'Reached at Customer Location'
        case ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED: return 'Deliver vehicle to customer'
       
        default: return null
    }
}

const getTimeLabel = (status) => {
    if (!status) return null
    switch (status) {

        case ORDER_STATUSES.PICKUP.DRIVER_ASSIGNED: return 'Exp Delivery'
        case ORDER_STATUSES.PICKUP.CUSTOMER_REACHED: return 'Pickup Location Arrival Time'
        case ORDER_STATUSES.PICKUP.PICKUP_CONFIRMED: return 'Vehicle Pickup Time'

        case ORDER_STATUSES.DELIVERY.DELIVERY_INITIATED: return 'Delivery Initiation Time'
        case ORDER_STATUSES.DELIVERY.PICKED_FROM_WORK_SHOP: return 'Delivery Initiation Time'
        case ORDER_STATUSES.DELIVERY.CUSTOMER_REACHED: return 'Vehicle Drop-off Time'
        case ORDER_STATUSES.DELIVERY.VEHICLE_DELIVERED_CUSTOMER: return 'Vehicle Delivered Time'

        default: return null
    }
}

const dummyOrder = {
    "access_token": "ABC",
    "uid": 40,
    "driver_name": "Dharmik",
    "login_time": "25/05/2022",
    "order_id": 80,
    "order_no": "SO0000000000083",
    "customer": "Abhay",
    "customer_mobile": false,
    "customer_address": false,
    "Workshop": false,
    "workshop_address": false,
    "expected_time": "25-05-2022 11:36:44",
    "order_status": "Reched at Customer Location"
}