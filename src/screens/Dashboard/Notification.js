import React, { useContext, useMemo } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Colors from "../../constant/Colors";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useQuery } from 'react-query';
import { OrderContext } from '../../Providers/OrderProvider';
const Tab = createMaterialTopTabNavigator();
 Notification = ({}) => {
    const insets = useSafeAreaInsets()
    const { getNotification } = useContext(OrderContext)
    const { status, data, refetch, isRefetching } = useQuery('getNotification', getNotification)
    
    console.log(data?.data?.data);
    const NotificationItem = ({ type, index, item }) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
           
    <Image style={{ width: 40, height: 40, }} source={require('../../constant/Assets/bell.png')}></Image>
     <View style={{ flex: 1, paddingLeft : 10}} >
                <Text style={{ fontSize: 14, fontWeight: 'bold', }} >{item?.notification_title}</Text>
                <Text style={{ color: Colors.black80, fontSize : 12 }} >{item?.notification_contain}</Text>
            </View>

        </View>
    )
}
   const Drop_Off = () => {

        return (
   
            <FlatList
                ListEmptyComponent={() => <Error message={'No Drop-Off Notification at the moment'} />}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                data={data?.data?.data?.dropoff}
                renderItem={({ item, index }) => <NotificationItem item={item} type={'delivery'} index={index} />} />
         )
    }
    const Pickup = () => {

        return (
           

            <FlatList
            ListEmptyComponent={() => <Error message={'No pickups Notification at the moment'} />}
            contentContainerStyle={{ padding: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            data={data?.data?.data?.pickup}
            renderItem={({ item, index }) => <NotificationItem item={item} type={'picking'} index={index} />} />
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
                <Tab.Screen options={{ tabBarLabel: `Pickup (${data?.data?.data?.pickup?.length})` }} name="Pickup" component={Pickup} />
                <Tab.Screen options={{ tabBarLabel: `Drop-Off (${data?.data?.data?.dropoff?.length})` }} name="Drop-Off" component={Drop_Off} />

            </Tab.Navigator>
        )
    },[status,data])
    return (
        
        <View style={{ flex: 1, backgroundColor: Colors.blue10, }} >
            <Header title={'Notification'} />
        
            <Body />
        </View>
    )



}
export default Notification