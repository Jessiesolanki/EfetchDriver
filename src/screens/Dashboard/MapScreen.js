import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Colors from "../../constant/Colors";

const GOOGLE_MAPS_APIKEY = "AIzaSyAM3MOnEcSutSRZn_sQDEf-mSNsjPtaxM0"

export default MapScreen = ({ route }) => {
    const insets = useSafeAreaInsets()
    const order = route.params?.order

    if(order?.coordinates?.length != 2) return null;;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }} >
            <Header title={'Location'} />
            <MapView
                style={{ flex: 1 }}
                showsUserLocation
                showsMyLocationButton={false}
                userLocationPriority="high"
                initialRegion={{
                    latitudeDelta: 0.0222, longitudeDelta: 0.0591,...order.coordinates[0]
                }}
                followsUserLocation >

                <Marker coordinate={order.coordinates[0]} />
                <Marker coordinate={order.coordinates[1]} />

                <MapViewDirections
                    strokeColor={Colors.blue_Color}
                    strokeWidth={5}
                    origin={order.coordinates[0]}
                    destination={order.coordinates[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                />
            </MapView>
        </View>

    )
}