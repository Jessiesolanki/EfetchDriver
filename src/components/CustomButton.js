import React from "react"
import { Text, TouchableOpacity } from "react-native"
import Colors from  '../constant/Colors'
import { shadow } from "../constant/Styles"


export default CustomButton = ({ label, onPress, containerStyle, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{ backgroundColor: Colors.blue_Color, ...shadow, alignItems: 'center', borderRadius: 10, opacity: disabled ? 0.5 : 1, padding: 22, borderBottomRightRadius : 0 }, containerStyle]}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight : 'bold' }}>{label}</Text>
        </TouchableOpacity>
    )
}