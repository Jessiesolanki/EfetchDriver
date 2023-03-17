import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constant/Colors";
import ImageIcon from "./ImageIcon";

export default Header = ({title, headerRight}) => {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 10 + insets.top,borderBottomWidth : 1,borderColor : Colors.black30 }} >
            <View style={{ position: 'absolute', top: 10+insets.top, bottom: 20, left: 20, alignItems: 'center', justifyContent: 'center', }} >
                <ImageIcon onPress={()=>navigation.goBack()} containerStyle={{}} name={'back'} />
            </View>
            <View style={{ position: 'absolute', top: 10+insets.top, bottom: 20, right: 20, alignItems: 'center', justifyContent: 'center', }} >
                {headerRight}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize : 23 }} >{title}</Text>
        </View>
    )
}