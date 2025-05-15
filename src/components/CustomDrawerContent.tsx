import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../context/AuthContext';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { Avatar } from 'react-native-paper';

import { InformationModal } from './InformationModal';
import { BonsaiInformationModal } from './BonsaiInformationModal';
import { CloseModal } from './CloseModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

const HAS_SEEN_HOME_GUIDE_KEY = 'hasSeenHomeGuide';
const HAS_SEEN_BONSAI_GUIDE_KEY = 'hasSeenBonsaiGuide';

export const CustomDrawerContent: React.FC = (props) => {
  const { user, signOut } = useAuth();
  const { navigation, state } = props;

  const [isInformationModalVisible, setIsInformationModalVisible] =
    useState<boolean>(false);
  
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const currentRoute = state.routes[state.index];
  const nestedRoute = currentRoute.state?.routes?.[currentRoute.state.index];

  const menuConfigGroup1 = [
    {
      label: 'Persoonlijk profiel',
      icon: require('../../assets/images/drawer_icons/drawer_profile_icon.png'),
      action: () =>
        navigation.navigate('Settings', {
          screen: 'Settings1',
        }),
    },
    {
      label: 'Bonsai boom',
      icon: require('../../assets/images/drawer_icons/drawer_bonsai_tree_icon.png'),
      action: () =>
        navigation.navigate('BonsaiTree', { screen: 'BonsaiTree1' }),
    },
  ];

  const menuConfigGroup2 = [
    {
      label: 'Informatiegids',
      icon: require('../../assets/images/drawer_icons/drawer_info_icon.png'),
      action: () => {
        setIsInformationModalVisible(true);
      },
    },

    {
      label: 'Uitloggen',
      icon: require('../../assets/images/drawer_icons/drawer_sign_out_icon.png'),
      // @TODO: In case of a component clear up, the `signOut` function would need to be passed as a param as it is destructured from the `useContext` hook!
      action: () => setCloseModalVisible(true),
    },
  ];

  const checkAndShowGuideModal = async () => {
    if (nestedRoute?.name === 'BonsaiTree') {
      const hasSeenBonsaiGuide = await AsyncStorage.getItem(
        HAS_SEEN_BONSAI_GUIDE_KEY
      );
      if (!hasSeenBonsaiGuide) {
        setIsInformationModalVisible(true);
        await AsyncStorage.setItem(HAS_SEEN_BONSAI_GUIDE_KEY, 'true');
      }
    } else if (nestedRoute?.name === 'Home') {
      const hasSeenHomeGuide = await AsyncStorage.getItem(
        HAS_SEEN_HOME_GUIDE_KEY
      );
      if (!hasSeenHomeGuide) {
        setIsInformationModalVisible(true);
        await AsyncStorage.setItem(HAS_SEEN_HOME_GUIDE_KEY, 'true');
      }
    }
  };

  useEffect(() => {
    if (nestedRoute?.name) {
      checkAndShowGuideModal();
    }
  }, [nestedRoute?.name]);

  return (
    <>
      {nestedRoute?.name === 'BonsaiTree' ? (
        <BonsaiInformationModal
          modalBonsaiInformationVisible={isInformationModalVisible}
          setModalBonsaiInformationVisible={setIsInformationModalVisible}
        />
      ) : (
        <InformationModal
          modalInformationVisible={isInformationModalVisible}
          setModalInformationVisible={setIsInformationModalVisible}
        />
      )}
      <SafeAreaView>
        <CloseModal
          closeModalVisible={closeModalVisible}
          setCloseModalVisible={setCloseModalVisible}
          title='Uitloggen'
          description={'Je staat op het punt om uit te loggen.\nWeet je het zeker?'}
          denyText='Nee, annuleren'
          confirmText='Ja, ik wil uitloggen'
          handleClose={signOut}
        />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <View style={styles.headersContainer}>
          <View
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              columnGap: 15,
              paddingHorizontal: 30,
            }}
          >
            <Avatar.Text
              style={{
                backgroundColor: '#C1D6BA',
                borderWidth: 2,
                borderColor: 'white',
              }}
              color='white'
              size={54}
              label={user?.firstName[0] + user?.lastName[0]}
            />
            <View style={{ rowGap: 5 }}>
              <Text style={styles.h1Text}>Hallo, {user?.firstName}!</Text>
              <Text style={styles.bodyText}>Waar ben je naar op zoek?</Text>
            </View>
            {/* @TODO: Is there a better way of doing this? */}
            <Pressable
              style={{ position: 'absolute', right: 25, top: 5 }}
              onPress={() => navigation.closeDrawer()}
            >
              <Feather name='x-circle' size={22} color='white' />
            </Pressable>
          </View>
        </View>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            paddingTop: 0, // Removes extra space at the top
            flexGrow: 1,
            paddingBottom: 30,
          }}
        >
          <DrawerItemList {...props} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingHorizontal: 20,
            }}
          >
            <View>
              {menuConfigGroup1.map((item, index, array) => {
                return (
                  <DrawerItem
                    key={`group1-${index}`}
                    icon={({ color }) => (
                      <Image
                        source={item.icon}
                        resizeMode='contain'
                        style={{
                          marginRight: -5,
                          width: 34,
                          height: 27,
                          tintColor: color,
                        }}
                      />
                    )}
                    onPress={item.action}
                    label={item.label}
                    labelStyle={styles.labelStyle}
                    style={[
                      styles.drawerItem,
                      index !== array.length - 1 && styles.drawerItemWithBorder,
                    ]}
                  />
                );
              })}
            </View>

            <View>
              {menuConfigGroup2.map((item, index, array) => {
                return (
                  <DrawerItem
                    key={`group2-${index}`}
                    icon={({ color }) => (
                      <Image
                        source={item.icon}
                        resizeMode='contain'
                        style={{
                          marginRight: -5,
                          width: 34,
                          height: 27,
                          tintColor: index !== array.length - 1 ? color : 'red',
                        }}
                      />
                    )}
                    onPress={item.action}
                    label={item.label}
                    labelStyle={
                      index === array.length - 1
                        ? [styles.labelStyle, { color: 'red' }]
                        : styles.labelStyle
                    }
                    style={[
                      styles.drawerItem,
                      index !== array.length - 1 && styles.drawerItemWithBorder,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#C1D6BA',
    height: 155,
    width: '100%',
    borderRadius: 30,
    borderTopEndRadius: 0,
    paddingBottom: 20,
  },
  h1Text: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
    color: 'white',
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
    color: 'white',
  } as TextStyle,
  labelStyle: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 16,
  } as TextStyle,
  informationTitleIntro: {
    ...Fonts.sofiaProMedium[Platform.OS],
    color: 'black',
    fontSize: 20,
  } as TextStyle,
  informationTitle: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 18,
  } as TextStyle,
  informationBody: {
    ...Fonts.sofiaProLight[Platform.OS],
    color: 'black',
    fontSize: 14,
  } as TextStyle,
  informationBodyBold: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 14,
  } as TextStyle,
  drawerItem: {
    paddingVertical: 10,
  },
  drawerItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000033',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 30,
    width: windowWidth - 2 * 15,
    backgroundColor: 'white',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  navigationScreenIcon: {
    objectFit: 'contain',
    paddingRight: 10,
    paddingLeft: 10,
    height: 26,
    width: 26,
    marginRight: 25,
    top: 4,
    alignSelf: 'center',
  },
  websiteButton: {
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#5C6B57',
    marginVertical: 20,
  },
  websiteButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  } as TextStyle,
});
