import React, { useState } from 'react';
import {
    StatusBar,
    Text,
    View, Image, StyleSheet
} from 'react-native';

import { useForm } from 'react-hook-form';
import Colors from '../../constant/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BGImage from '../../components/BGImage';
import Assets from '../../constant/Assets';

const OTP = ({ navigation }) => {

    const insets = useSafeAreaInsets()
    const [otp, setOtp] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: Colors.green_Color, paddingTop: insets.top }}>

            <StatusBar barStyle={'light-content'} />

            <BGImage text={'OTP\nVerification'} bgImageSource={Assets.bg_image_one} />

            <View style={{ width: '100%', padding: 24, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: '#fff', flex: 1, marginTop: -26 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold',  marginBottom: 20, color: Colors.headingTextColor }}>Enter 4 Digit Code</Text>
                <Text>Enter the 4 digit code that you received on your email</Text>
                <OTPInputView
                    style={{ height: 80, paddingHorizontal: 20, marginVertical: 20 }}
                    pinCount={4}
                    code={otp}
                    onCodeChanged={setOtp}
                    autoFocusOnLoad
                    codeInputFieldStyle={[styles.otp]}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                        console.log(`Code is ${code}, you are good to go!`);
                    }}
                />

                <CustomButton onPress={() => { navigation.navigate('ResetPassword') }} label={"Continue"} />
            </View>

        </View>
    );
};



export default OTP;

const styles = StyleSheet.create({
    otp: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        color: 'black',
    },
});

