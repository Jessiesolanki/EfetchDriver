import React, { useContext, useEffect, useMemo } from 'react';
import { ActivityIndicator, DeviceEventEmitter, FlatList, Image, StatusBar, Text, TouchableOpacity, View,Linking } from 'react-native';
import Colors from '../constant/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shadow } from '../constant/Styles'
import ImageIcon from '../components/ImageIcon';
import { useNavigation } from '@react-navigation/native';
import { OrderContext } from '../Providers/OrderProvider';
import Error from '../components/Error'
import { AuthContext } from '../Providers/AuthProvider';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { EVENTS } from '../constant/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();

const DashBoard = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { getDashboard } = useContext(OrderContext)
    const { status, data, refetch, isRefetching } = useQuery('dashboard', getDashboard)
    const { userData, logout } = useContext(AuthContext)

    const HomeHeader = () => {
        return (
            <View style={{ padding: 20, paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems  :'center' }}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Update Profile')} style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                    <TouchableOpacity  style={{ flexDirection: 'row', alignItems: 'center', flex : 1 }}>
                        <View>
                            <Image style={{ width: 50, height: 50, }} source={require('../constant/Assets/profile_icon.png')}></Image>
                            <View style={{ position: 'absolute', top: 3, right: 3, height: 10, width: 10, backgroundColor: Colors.green_Color, borderRadius: 10, borderWidth: 1, borderColor: Colors.blue10 }} />
                        </View>
                        <View style={{ marginLeft: 10,flex : 1}}>
                            <Text style={{ color: Colors.headingTextColor, fontWeight: 'bold', fontSize: 16 }}>{userData?.driver_name}</Text>
                            <Text>{userData?.login_time}</Text>
                        </View>
                    </TouchableOpacity>
                    <ImageIcon size={25} onPress={() => navigation.navigate('Notification')} name='bell' />
                    <Icon size={30} type='ionicon' color={Colors.green_Color} containerStyle={{marginLeft : 10}} onPress={logout} name='log-out-outline' />
                </View>
                <View style={{ backgroundColor: Colors.sepration_lineColor, height: 1, marginTop: 10, marginHorizontal: -20 }} />
            </View>
        )
    }

    const Delivery = () => {

        return (
            <FlatList
                ListEmptyComponent={() => <Error message={'No deliveries at the moment'} />}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                data={data?.data?.data?.deliveries}
                renderItem={({ item, index }) => <OrderItem item={item} type={'delivery'} index={index} />} />
        )
    }
    const Pickup = () => {

        return (
            <FlatList
                ListEmptyComponent={() => <Error message={'No pickups at the moment'} />}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                data={data?.data?.data?.pickings}
                renderItem={({ item, index }) => <OrderItem item={item} type={'picking'} index={index} />} />
        )
    }

    const Body = useMemo(() => () => {
        if (status=='error') return <Error retry={refetch} message={'Something went wrong\nPlease try again'} />
        if (status=='loading') return <ActivityIndicator color={Colors.blue_Color} style={{ padding: 20 }} size={'large'} />
        if (status == 'success') return (
            <Tab.Navigator
                sceneContainerStyle={{ backgroundColor: Colors.blue10 }}
                screenOptions={{
                    tabBarStyle: { margin: 15, borderRadius: 5, marginVertical: 0, height: 40, paddingBottom: 10, backgroundColor: Colors.white, overflow: 'hidden', borderWidth: 1, borderColor: Colors.black30 },
                    tabBarIndicatorStyle: {
                        backgroundColor: Colors.green_Color,
                        height: 40,
                    },
                    tabBarActiveTintColor: Colors.white,
                    tabBarInactiveTintColor: Colors.blackColor,
                    tabBarLabelStyle: { fontSize: 16, fontWeight: '600', padding: 0, paddingTop: 0, marginTop: -4, textTransform: 'none' },
                }}
            >
                <Tab.Screen options={{ tabBarLabel: `Pickup (${data?.data?.data?.total_pickings})` }} name="Pickup" component={Pickup} />
                <Tab.Screen options={{ tabBarLabel: `Drop-Off (${data?.data?.data?.total_deliveries})` }} name="Delivery" component={Delivery} />

            </Tab.Navigator>
        )
    },[status,data])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue10, paddingTop: insets.top }}>
            <StatusBar barStyle={'dark-content'} />
            <HomeHeader />
            <Body />
        </View>
    );
};



export default DashBoard;


const OrderItem = ({ type, index, item }) => {
    const navigation = useNavigation()

    const onPress = () => {
        navigation.navigate('Order Details', { order_type: type, order_id: item.order_id })
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.green_Color, padding: 20, borderRadius: 10, ...shadow }} >

            <Text style={{ fontWeight: '600', fontSize: 18, color: Colors.blue_Color }} >{item.order_no}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }} >
                <Text style={{ fontWeight: '600', fontSize: 18 }} >Name - </Text>
                <Text style={{ fontWeight: '600', fontSize: 18, color: Colors.blue_Color }} >{item.customer}</Text>
                <ImageIcon onPress={()=>{Linking.openURL(`tel:${item.customer_mobile}`);}}  containerStyle={{ marginLeft: 'auto' }} size={30} name='call_blue' />
            </View>

            <Text style={{ color: Colors.black80, paddingTop: 3 }} >Exp Delivery {item.expected_time.split(' ')[0]}</Text>

            {/* <Text style={{ fontWeight: '600', fontSize: 18, color: Colors.green_Color, paddingTop: 10 }} >{type == 0 ? 'Pickup' : 'Delivered'}</Text> */}
            <Text style={{ fontWeight: '600', fontSize: 18, color: Colors.green_Color, paddingTop: 10 }} >{item.order_status}</Text>

        </TouchableOpacity>
    )
}