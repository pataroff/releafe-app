import React, { useState, useEffect } from 'react';

import {
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TextStyle,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import { Fonts } from '../styles';

const windowHeight = Dimensions.get('window').height;
const isSmallerScreen = windowHeight <= 667;

interface FormInputProps {
  label: string;
  value: string;
  onChangeText?: (val: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  onPress?: () => void;
  editable?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  handleRequestOtp?: () => void;
  requestOTPButtonLabel?: string;
  cooldown?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  onPress,
  editable = true,
  keyboardType = 'default',
  maxLength,
  handleRequestOtp,
  requestOTPButtonLabel = 'Vraag code aan',
  cooldown,
}) => {
  return (
    <>
      <Text style={styles.textInputLabelText}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Pressable style={{ flex: 1 }} onPress={onPress} disabled={!onPress}>
          <TextInput
            style={styles.textInputField}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            editable={editable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            pointerEvents={editable ? 'auto' : 'none'}
          />
        </Pressable>
        {handleRequestOtp && (
          <Pressable
            style={[
              styles.otpButton,
              cooldown! > 0 && styles.otpButtonDisabled,
            ]}
            onPress={handleRequestOtp}
            disabled={cooldown! > 0}
          >
            <Text style={styles.otpButtonText}>
              {cooldown! > 0
                ? `Opnieuw verzenden in ${cooldown}s`
                : requestOTPButtonLabel}
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputLabelText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  textInputField: {
    ...Fonts.sofiaProItalic[Platform.OS],
    height: 40,
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
    paddingLeft: 15,
    flex: 1,
    marginRight: 10,
  } as TextStyle,
  otpButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#A9C1A1',
    borderRadius: 20,
  },
  otpButtonDisabled: {
    backgroundColor: 'gainsboro',
    width: isSmallerScreen ? '63%' : '59%',
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 14,
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
});
