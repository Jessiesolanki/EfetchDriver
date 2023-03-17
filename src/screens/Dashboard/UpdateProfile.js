import React, { useContext, useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ImageIcon from "../../components/ImageIcon";
import Colors from "../../constant/Colors";
import CustomButton from '../../components/CustomButton'
import ControlledInput from "../../components/ControlledInput";
import { useForm } from "react-hook-form";
import {AuthContext} from "../../Providers/AuthProvider"
export default UpdateProfile = () => {
    const insets = useSafeAreaInsets()
    const {userData} = useContext(AuthContext)
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

    useEffect(()=>reset({first_name : userData.driver_name}),[])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue10, }} >
            <Header title={'Update Profile'} />
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 20 + insets.bottom, alignItems: 'center' }} >

                <View style={{paddingTop : 15, paddingHorizontal : 15}} >
                    <ImageIcon name='plus' size={20} containerStyle={{ position: 'absolute', top: 0, right: -20 }} />
                    <Image
                        source={require('../../constant/Assets/profile_icon.png')}
                        style={{ height: 120, width: 120, marginBottom: 20 }} />
                </View>

                <ControlledInput
                    rightIconProps={{ name: 'person' }}
                    textInputProps={{ placeholder: 'Name', placeholderTextColor: Colors.blackColor }}
                    controllerProps={{ name: 'first_name', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginBottom: 20, borderBottomWidth: 0, padding: 10, backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, alignSelf: 'stretch' }} />

                {/* <ControlledInput
                    rightIconProps={{ name: 'person' }}
                    textInputProps={{ placeholder: 'Last name', placeholderTextColor: Colors.blackColor }}
                    controllerProps={{ name: 'last_name', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginBottom: 20, borderBottomWidth: 0, padding: 10, backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, alignSelf: 'stretch' }} /> */}

                <ControlledInput
                    rightIconProps={{ name: 'expand-more' }}
                    textInputProps={{ placeholder: 'Male', placeholderTextColor: Colors.blackColor, editable: false }}
                    controllerProps={{ name: 'gender', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginBottom: 20, borderBottomWidth: 0, padding: 10, backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, alignSelf: 'stretch' }} />

                <ControlledInput
                    textInputProps={{ placeholder: 'Address', placeholderTextColor: Colors.blackColor }}
                    controllerProps={{ name: 'address', control, errors, rules: { required: true }, }}
                    containerStyle={{ marginBottom: 20, borderBottomWidth: 0, padding: 10, backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, alignSelf: 'stretch' }} />

                <CustomButton containerStyle={{ alignSelf: 'stretch' }} label={'Update'} />

            </ScrollView>
        </View>
    )
}
