import React, { useState, useCallback, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { Gender, IUserData } from '../types';
import { getGenderString } from '../utils/settings';

import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EditableSettingsInput } from '../components/EditableSettingsInput';

const windowWidth = Dimensions.get('window').width;

export const SettingsScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState<string>(user?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(user?.lastName ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [birthDate, setBirthDate] = useState<Date | null>(
    user?.birthDate ?? null
  );
  const [gender, setGender] = useState<Gender | null>(user?.gender ?? null);
  const [postcode, setPostcode] = useState<string>(user?.postcode ?? '');

  const calculateAge = (birthDateString: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  };

  const handleConfirmDate = (date: Date) => {
    setBirthDate(date);
    setShowDatePicker(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const updatedFields: Partial<IUserData> = {};

      if (user?.firstName !== firstName) updatedFields.firstName = firstName;
      if (user?.lastName !== lastName) updatedFields.lastName = lastName;
      if (user?.email !== email) updatedFields.email = email;
      if (
        user?.birthDate &&
        birthDate &&
        new Date(user.birthDate).getTime() !== new Date(birthDate).getTime()
      ) {
        updatedFields.birthDate = birthDate;
      }
      if (user?.gender !== getGenderString(gender as Gender))
        updatedFields.gender = gender;
      if (user?.postcode !== postcode) updatedFields.postcode = postcode;

      // DEBUGGING
      console.log(gender);
      console.log(typeof user?.gender);
      console.log(Object.keys(updatedFields).length);
      console.log(Object.values(updatedFields));

      if (Object.keys(updatedFields).length > 0) {
        updateUser(updatedFields);
      }
    });

    return unsubscribe;
  }, [firstName, lastName, email, birthDate, gender, postcode]);
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      {/* Profile Header */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 20,
          width: 325,
          padding: 15,
          borderRadius: 15,
          backgroundColor: '#5C6B57',
          // Shadow Test
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        {/* Profile Picture Container */}
        <View
          style={{
            position: 'relative',
            borderRadius: 45,
            overflow: 'hidden',
          }}
        >
          <Avatar.Text
            style={{
              backgroundColor: '#5C6B57',
              borderWidth: 2,
              borderColor: 'white',
            }}
            color='white'
            size={80}
            label={user?.firstName[0] + user?.lastName[0]}
          />
          <Pressable
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: '100%',
            }}
          >
            <MaterialCommunityIcons name='pencil' size={24} color='white' />
          </Pressable>
        </View>
        {/* Profile Information Container */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 1,
            rowGap: 10,
          }}
        >
          {/* First name + Last name */}
          <Text
            style={
              {
                ...Fonts.sofiaProBold[Platform.OS],
                fontSize: 25,
                color: 'white',
              } as TextStyle
            }
          >
            {user?.firstName} {user?.lastName}
          </Text>

          {/* Age + Gender Container */}
          <View
            style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}
          >
            {/* Age Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}
            >
              <Image
                style={{ height: 14, width: 12, marginBottom: 3 }}
                source={require('../../assets/images/settings_icons/age_icon.png')}
                resizeMode='contain'
              />
              <Text
                style={
                  {
                    ...Fonts.sofiaProMedium[Platform.OS],
                    fontSize: 14,
                    color: 'white',
                  } as TextStyle
                }
              >
                {calculateAge(user?.birthDate)} jaar
              </Text>
            </View>

            {/* Dividing Line */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FFFFFF',
                opacity: 0.35,
                height: 20,
                width: 1,
              }}
            ></View>

            {/* Gender Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}
            >
              <Image
                style={{ height: 14, width: 12, marginBottom: 3 }}
                source={require('../../assets/images/settings_icons/gender_icon.png')}
                resizeMode='contain'
              />
              <Text
                style={
                  {
                    ...Fonts.sofiaProMedium[Platform.OS],
                    fontSize: 14,
                    color: 'white',
                  } as TextStyle
                }
              >
                {getGenderString(user?.gender)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Settings Wrapper */}
      <View style={styles.settingsWrapper}>
        <Text style={styles.headingText}>Persoonlijke gegevens</Text>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode='date'
          maximumDate={new Date()}
          onConfirm={(date) => handleConfirmDate(date)}
          onCancel={() => setShowDatePicker(false)}
        />
        <EditableSettingsInput
          label='Voornaam'
          value={firstName}
          onChangeText={setFirstName}
          type='text'
        />
        <EditableSettingsInput
          label='Achternaam'
          value={lastName}
          onChangeText={setLastName}
          type='text'
        />

        <EditableSettingsInput
          label='Geboortedatum'
          value={
            birthDate ? new Date(birthDate).toLocaleDateString('nl-NL') : ''
          }
          onPress={() => setShowDatePicker(true)}
          type='date'
        />

        <EditableSettingsInput
          label='Geslacht'
          value={gender}
          onPress={() => setGender}
          type='dropdown'
        />

        <EditableSettingsInput
          label='Postcode'
          value={postcode}
          onChangeText={setPostcode}
          type='text'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  settingsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    marginBottom: 120,
    width: 325,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  headingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    color: '#5C6B57',
    fontSize: 18,
    marginTop: 10,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 18,
  } as TextStyle,
});
