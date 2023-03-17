import React, { useContext, useEffect, useState } from 'react';
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
import Assets from '../../constant/Assets';
import BGImage from '../../components/BGImage';
import { AuthContext } from '../../Providers/AuthProvider';
const Login = ({ navigation }) => {

  const insets = useSafeAreaInsets()

  const [passwordVisible, setPasswordVisibility] = useState(false)
  const [mobileNo, setMobileNo] = useState(false)
  const { login } = useContext(AuthContext)
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const changeFeildData= () => {
    if(mobileNo == false){
    reset({login :'',password : ''})
    }else{
      reset({mlogin :'',password : ''})
    }
   }
  const onSubmit = data => {
    console.log('Login params', data)

    let LoginData={}
    if(mobileNo == false){
      LoginData={"login": data.login, "password": data.password}
    }else{
      LoginData={"login": data.mlogin, "password": data.password}
    }
    login(LoginData, () => changeStack('Dashboard Stack'))
  }

  useEffect(() => {
    reset({ login: '', password: watch('password') })
  }, [mobileNo])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.green_Color, paddingTop: insets.top }}>

      <StatusBar barStyle={'light-content'} />

      <BGImage text={'Log In'} bgImageSource={Assets.bg_image_two} />

      <View style={{ width: '100%', padding: 24, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: '#fff', flex: 1, marginTop: -26 }}>

        {mobileNo == false ?
          <ControlledInput
            label={'Email'}
            textInputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
            controllerProps={{ name: 'login', control, errors, rules: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }, }}
            containerStyle={{ marginBottom: 20 }} />
          : <ControlledInput
            label={'Phone Number'}
            textInputProps={{ keyboardType: 'phone-pad', maxLength: 8 }}
            controllerProps={{ name: 'mlogin', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />}

        <TouchableOpacity onPress={() => {setMobileNo(!mobileNo),changeFeildData()}}>
          <Text style={{ textAlign: 'right', fontWeight: 'bold', color: Colors.blue_Color, }}>Login with {!mobileNo ? 'Phone Number' : 'Email'}</Text>
        </TouchableOpacity>

        <ControlledInput
          label={'Password'}
          rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(!passwordVisible) }}
          textInputProps={{ placeholder: '* * * * * * * *', autoCapitalize: 'none', secureTextEntry: !passwordVisible }}
          controllerProps={{ name: 'password', control, errors, rules: { required: true }, }}
          containerStyle={{ marginTop: 5 }} />

        {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} > */}
        <TouchableOpacity  >
          {/* <Text style={{ color: Colors.blue_Color, marginVertical: 20, marginTop: 30 }}>Forgot Password</Text> */}
          <Text style={{ color: Colors.blue_Color, marginVertical: 20, marginTop: 30 }}></Text>
        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(onSubmit)} label={"LOGIN"} />
      </View>

    </View>
  );
};

export default Login;

