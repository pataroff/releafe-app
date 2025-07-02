import React, { useState, useEffect } from 'react';

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
import Entypo from '@expo/vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EditableSettingsInput } from '../components/EditableSettingsInput';

import { LinearGradient } from 'expo-linear-gradient';
import { DeleteAccountModal } from '../components/DeleteAccountModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isSmallerScreen = windowHeight <= 667;

const settings = ['Wachtwoord wijzigen', 'Profiel verwijderen'];

export const SettingsScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const { user, updateUser, deleteUser } = useAuth();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>(user?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(user?.lastName ?? '');
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
    const normalizedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setBirthDate(normalizedDate);
    setShowDatePicker(false);
  };

  const handleDeleteConfirm = async (password: string) => {
    await deleteUser(password);
    setDeleteModalVisible(false);
  };

  const handleNavigation = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('ChangePassword');
        break;
      case 1:
        setDeleteModalVisible(true);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const updatedFields: Partial<IUserData> = {};

      if (user?.firstName !== firstName)
        updatedFields.firstName = firstName.trim();
      if (user?.lastName !== lastName) updatedFields.lastName = lastName.trim();
      if (
        new Date(user?.birthDate).getTime() !== new Date(birthDate!).getTime()
      )
        updatedFields.birthDate = birthDate;

      if (user?.gender !== gender) updatedFields.gender = gender;
      if (user?.postcode !== postcode) updatedFields.postcode = postcode.trim();

      if (Object.keys(updatedFields).length > 0) {
        updateUser(updatedFields);
      }
    });

    return unsubscribe;
  }, [firstName, lastName, birthDate, gender, postcode]);

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        paddingTop: isSmallerScreen ? 105 : 145,
      }}
    >
      <DeleteAccountModal
        visible={deleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalVisible(false)}
      />
      <LinearGradient
        colors={['rgba(119,221,119,0.25)', 'transparent']}
        style={styles.background}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Profile Header */}
        <View
          style={{
            marginTop: 40,
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
            {/* <Pressable
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
            </Pressable> */}
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
        {/* Personal Data Container */}
        <View style={styles.personalDataContainer}>
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
            editable
          />
          <EditableSettingsInput
            label='Achternaam'
            value={lastName}
            onChangeText={setLastName}
            type='text'
            editable
          />

          <EditableSettingsInput
            label='Geboortedatum'
            value={
              birthDate ? new Date(birthDate).toLocaleDateString('nl-NL') : ''
            }
            onPress={() => setShowDatePicker(true)}
            type='date'
            editable
          />

          <EditableSettingsInput
            label='Geslacht'
            value={gender}
            onPress={(value) => setGender(value)}
            type='dropdown'
          />

          <EditableSettingsInput
            label='Postcode'
            value={postcode}
            onChangeText={setPostcode}
            type='text'
            editable
          />
        </View>
        {/* Other Data Container */}
        <View style={styles.otherDataContainer}>
          <Text style={styles.headingText}>Overige gegevens</Text>

          <EditableSettingsInput
            label='E-mailadres'
            value={user?.email ?? ''}
            type='text'
          />
          <EditableSettingsInput
            label='Organisatie'
            value={user?.organization ?? ''}
            type='text'
          />

          <EditableSettingsInput
            label='Afdeling'
            value={user?.department ?? ''}
            type='text'
          />
        </View>
        {/* Account Settings Container */}
        <View style={styles.accountSettingsContainer}>
          <Text style={styles.headingText}>Accountinstellingen</Text>

          {/* Settings Container */}
          <View style={{ marginTop: 20 }}>
            {settings.map((setting, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleNavigation(index)}
                  style={styles.navigationButton}
                >
                  <Text style={styles.navigationButtonText}>{setting}</Text>
                  <Entypo name='chevron-right' size={24} />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyles: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 120,
  },
  personalDataContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    width: 325,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  otherDataContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    width: 325,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  accountSettingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    width: 325,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  navigationButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dedede',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  navigationButtonText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
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
