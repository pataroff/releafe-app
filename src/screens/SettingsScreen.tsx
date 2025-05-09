import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Platform,
  TextStyle,
  Switch,
} from 'react-native';

import { Fonts } from '../styles';
import { settingsData } from '../utils/settings';

import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

const windowWidth = Dimensions.get('window').width;

export const SettingsScreen: React.FC = ({ route }) => {
  const {
    gamificationEnabled,
    setGamificationEnabled,
    updateGamificationInDatabase,
  } = useSettings();

  const toggleGamification = async (value: boolean) => {
    setGamificationEnabled(value);
    await updateGamificationInDatabase(value);
  };

  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useState<boolean>(false);
  const [isGamificationEnabled, setIsGamificationEnabled] =
    useState<boolean>(false);

  const toggleState = {
    notifications: {
      value: isNotificationsEnabled,
      setter: setIsNotificationsEnabled,
    },
    gamification: {
      value: isGamificationEnabled,
      setter: setIsGamificationEnabled,
    },
  };

  const navigation = useNavigation();

  const handleNavigation = (title: string) => {
    switch (title) {
      case 'Wachtwoord wijzigen':
        navigation.navigate('ChangePassword');
        break;
      case 'E-mailadres bijwerken':
        navigation.navigate('ChangeEmail');
        break;
      case 'Telefoonnummer wijzigen':
        navigation.navigate('ChangePhoneNumber');
        break;
      case 'Extra profielinstellingen':
        navigation.navigate('Settings2');
        break;
      default:
        return;
    }
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      {/* Settings Wrapper */}
      <View style={styles.settingsWrapper}>
        {settingsData.map((settingsGroup, index) => {
          const { heading, data } = settingsGroup;

          return (
            <View key={index}>
              {/* Heading */}
              <Text style={styles.headingText}>{heading}</Text>

              {/* Settings Data Container */}
              <View
                style={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 25,
                }}
              >
                {data.map((setting, idx) => {
                  const { icon, title, isToggle, key } = setting;

                  return (
                    <Pressable
                      onPress={() => handleNavigation(title)}
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Icon + Title */}
                      <View style={styles.iconContainer}>
                        <Image
                          source={icon}
                          width={32}
                          height={32}
                          resizeMode='contain'
                        />
                        <Text style={styles.bodyText}>{title}</Text>
                      </View>
                      {isToggle && key && toggleState[key] && (
                        <Switch
                          trackColor={{ false: '#FFFFFF', true: '#5C6B57' }}
                          onValueChange={(val) =>
                            key === 'gamification'
                              ? toggleGamification(val)
                              : toggleState[key].setter(val)
                          }
                          value={
                            key === 'gamification'
                              ? gamificationEnabled
                              : toggleState[key].value
                          }
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
              {/* Dividing Line */}
              {index !== settingsData.length - 1 && (
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: 'gainsboro',
                    marginVertical: 20,
                  }}
                ></View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  settingsWrapper: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
    marginBottom: 100,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  headingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 18,
  } as TextStyle,
});
