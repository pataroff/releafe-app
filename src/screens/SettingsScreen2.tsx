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
} from 'react-native';

import { Fonts } from '../styles';
import { extraProfileSettingsData } from '../utils/settings';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

import { DeleteAccountModal } from '../components/DeleteAccountModal';

const windowWidth = Dimensions.get('window').width;

export const SettingsScreen2: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { deleteUser } = useAuth();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleNavigation = (title: string) => {
    switch (title) {
      case 'Geboortedatum wijzigen':
        navigation.navigate('ChangeBirthDate');
        break;
      case 'Download uw informatie':
        console.log('Download uw informatie pressed!');
        break;
      case 'Profiel verwijderen':
        setModalVisible(true);
        break;
      default:
        return;
    }
  };

  const handleDeleteConfirm = async (password: string) => {
    console.log('test');
    await deleteUser(password);
    setModalVisible(false);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      <DeleteAccountModal
        visible={modalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setModalVisible(false)}
      />
      {/* Settings Wrapper */}
      <View style={styles.settingsWrapper}>
        {/* Settings Container */}
        <View>
          {/* Heading */}
          <Text style={styles.headingText}>Profiel instellingen</Text>

          {/* Settings Data Container */}
          <View
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              rowGap: 25,
            }}
          >
            {extraProfileSettingsData.map((setting, idx) => {
              const { icon, title } = setting;

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
                </Pressable>
              );
            })}
          </View>
        </View>
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
    paddingBottom: 100,
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
