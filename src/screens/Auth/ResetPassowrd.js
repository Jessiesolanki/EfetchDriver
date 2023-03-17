import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, TouchableOpacity
} from 'react-native';
import ControlledInput from '../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { changeStack } from '../../navigation';
import Colors from '../../constant/Colors';
import BGImage from '../../components/BGImage';
import Assets from '../../constant/Assets';

const ResetPassword = ({ navigation }) => {

    const insets = useSafeAreaInsets()

    const [passwordVisible, setPasswordVisibility] = useState(false)
    const [mobileNo, setMobileNo] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.green_Color, paddingTop: insets.top }}>

            <StatusBar barStyle={'light-content'} />

            <BGImage text={'Reset\nPassword'} bgImageSource={Assets.bg_image_one} />

            <View style={{ width: '100%', padding: 24, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: '#fff', flex: 1, marginTop: -26 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold',  marginBottom: 20, color: Colors.headingTextColor }}>Reset Password</Text>
                <Text style={{paddingBottom : 20}} >Set the new password for your account so you can login and access all the features</Text>
                <ControlledInput
                    label={'New Password'}
                    rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(!passwordVisible) }}
                    textInputProps={{ placeholder: '* * * * * * * *', autoCapitalize: 'none', secureTextEntry: !passwordVisible }}
                    controllerProps={{ name: 'new_password', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginTop: 5 }} />

                <ControlledInput
                    label={'Confirm Password'}
                    rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(!passwordVisible) }}
                    textInputProps={{ placeholder: '* * * * * * * *', autoCapitalize: 'none', secureTextEntry: !passwordVisible }}
                    controllerProps={{ name: 'confirm_password', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginTop: 25, marginBottom : 30 }} />

                <CustomButton onPress={() => changeStack('Dashboard Stack')} label={"RESET PASSWORD"} />
            </View>

        </View>
    );
};



export default ResetPassword;
