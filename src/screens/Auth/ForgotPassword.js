import React, {  } from 'react';
import {
  StatusBar,
  Text,
  View, Image} from 'react-native';

import { useForm } from 'react-hook-form';
import Colors from '../../constant/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import ControlledInput from '../../components/ControlledInput';
import BGImage from '../../components/BGImage';
import Assets from '../../constant/Assets';

const ForgotPassword = ({ navigation }) => {

  const insets = useSafeAreaInsets()

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.green_Color, paddingTop: insets.top }}>

      <StatusBar barStyle={'light-content'} />

      <BGImage text={'Forgot\nPassword'} bgImageSource={Assets.bg_image_one} />

      <View style={{ width: '100%', padding: 24, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: '#fff', flex: 1, marginTop: -26 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold',  marginBottom: 20, color: Colors.headingTextColor  }}>Forgot Password</Text>
        <ControlledInput
          label={'Email'}
          leftIconProps={{ name: 'email' }}
          textInputProps={{ placeholder: 'Johnsondoe@gmail.com', keyboardType: 'email-address', autoCapitalize: 'none' }}
          controllerProps={{ name: 'email', control, errors, rules: { required: true }, }}
          containerStyle={{ marginBottom: 20 }} />

        <CustomButton onPress={() => { navigation.navigate('OTP') }} label={"Send Email"} />
      </View>

    </View>
  );
};



export default ForgotPassword;
