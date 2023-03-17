import React, { useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Assets from "../constant/Assets";

export default ImageIcon = ({ size = 27, containerStyle, iconStyle, name, color, onPress }) => {

    const image = useMemo(() => {
        switch (name) {
            default: return Assets[name]             
        }
    }, [name])
  
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} style={[{ justifyContent: 'center', alignItems: 'center' }, containerStyle]} >
            <Image style={[{ width: size, height: size, resizeMode: 'contain', tintColor: color }, iconStyle]} source={image} />
        </TouchableOpacity>
    )
}