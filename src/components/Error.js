import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Colors from '../constant/Colors';

const Error = ({ retry, message, color = 'black', opacity = 0.1, small, retryLabel, retryIcon, icon, style }) => {
    return (
        <View style={[{ alignItems: 'center', padding: 20 }, style]}>
            {!small && <Icon color={color} style={{ opacity: opacity }} size={70} name={icon || ('list-alt')} />}
            <Text style={{ fontSize: 24, fontWeight : 'bold', opacity: opacity, color: color, textAlign: "center" }}>
                {message}
            </Text>
            {retry && (
                <TouchableOpacity onPress={retry} style={{ alignItems: 'center', paddingTop: 15 }}>
                    <Icon
                        color={Colors.blue_Color}
                        containerStyle={{ opacity: 0.8, borderRadius: 30, borderWidth: 2, borderColor: Colors.blue_Color, backgroundColor: '#eee', padding: 5 }}
                        size={40}
                        name={retryIcon ? retryIcon : "refresh"}
                    />
                    <Text style={{ fontSize: 16, opacity: 0.8, color: Colors.blue_Color }}>{retryLabel ? retryLabel : 'Retry'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Error;
