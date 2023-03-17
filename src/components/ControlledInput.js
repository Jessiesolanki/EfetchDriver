import React, { useMemo } from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import Colors from '../constant/Colors';
import { shadow }  from '../constant/Styles';

export default ControlledInput = ({
    style,
    label,
    containerStyle,
    textInputProps,
    controllerProps,
    rightIconProps,
    hideLabel,
    disabled
}) => {
    return (
        <View style={[{borderBottomWidth : 1, borderColor : Colors.black30}, containerStyle]}>


            <View style={{ }}>
                {(label && !hideLabel) && (<Text style={{ fontSize: 13,   color:Colors.text_Color ,}}>{label}</Text>)}
                <Controller  {...controllerProps}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View
                            style={[
                                {
                                    flexDirection: 'row',
                                    borderRadius: 12,
                                    alignItems: 'center',
                                },
                                style,
                            ]}>
                            <TextInput
                                editable={!disabled}
                                placeholderTextColor={Colors.black50}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                {...textInputProps}

                                style={[
                                    {
                                        flex: 1,
                                        fontSize: 16,
                                        color: Colors.text_Color,
                                        height: 40,
                                        paddingLeft : 10,
                                        justifyContent: 'center',
                                    },
                                ]}
                            />
                            {rightIconProps && <Icon {...rightIconProps} color={'#bbb'} />}
                        </View>
                    )}
                />
            </View>

            <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            />
        </View>
    );
};

export const Error = ({ error, label }) => {
    if (!error) return null;
    const capitalizeFistLetter = string =>
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    const errorText = useMemo(() => {
        if (error.type == 'pattern')
            return `Please enter a valid ${label.toLowerCase()}`;
        if (error.type == 'max') return error.message;
        if (error.type == 'min') return error.message;
        if (error.type == 'maxLength') return error.message;
        if (error.type == 'required')
            return `${capitalizeFistLetter(label)} is required`;
    }, [error]);
    return <Text style={{ color: 'red', paddingTop: 5 }}>{errorText}</Text>;
};
