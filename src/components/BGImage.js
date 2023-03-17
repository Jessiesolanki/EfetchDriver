import React from "react"
import { Image, Text, View } from "react-native"
import Assets from "../constant/Assets"

const BGImage = ({ text, bgImageSource }) => {
    return (
        <View>
            <Image style={{ width: '100%', height: 260, }} source={bgImageSource} />
            <Image style={{ position: 'absolute', top: 30, left: 30, height: 75, width: 75 }} source={Assets.logo_in_bubble} />
            <Text style={{ position: 'absolute', top: 110, left: 30, fontWeight: '800', color: Colors.white, fontSize: 34 }} >{text}</Text>
        </View>
    )
}

export default BGImage