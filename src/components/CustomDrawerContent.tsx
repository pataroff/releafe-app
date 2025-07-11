import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  TextStyle,
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
import { ChangePasswordModal } from './ChangePasswordModal';
import { CloseModal } from './CloseModal';

import { useNavigationState } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const HAS_SEEN_HOME_GUIDE_KEY = 'hasSeenHomeGuide';
const HAS_SEEN_BONSAI_GUIDE_KEY = 'hasSeenBonsaiGuide';

// 🔥 DEVELOPMENT ONLY: Clear all AsyncStorage keys
const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('[DEV] Local storage cleared.');
  } catch (e) {
    console.warn('[DEV] Failed to clear local storage:', e);
  }
};

export const CustomDrawerContent: React.FC = (props) => {
  const { navigation } = props;
  const { user, signOut } = useAuth();

  const [modalInformationVisible, setModalInformationVisible] = useState(false);
  const [modalBonsaiInformationVisible, setModalBonsaiInformationVisible] =
    useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [closeModalVisible, setCloseModalVisible] = useState(false);

  const getActiveRoute = (state: any): any => {
    if (!state || !state.routes || state.index == null) return undefined;

    const route = state.routes[state.index];

    // Recurse until we reach the deepest screen
    if (route.state) return getActiveRoute(route.state);
    return route;
  };

  const activeRoute = useNavigationState((state) => getActiveRoute(state));
  const routeName = activeRoute?.name;
  const routeScreen = activeRoute?.params?.screen;

  useEffect(() => {
    // clearLocalStorage();

    if (!user?.isClaimed) {
      setChangePasswordModalVisible(true);
      return;
    }

    if (!routeName) return;

    const checkAndShowGuide = async () => {
      try {
        if (routeName === 'BonsaiTree' && routeScreen === 'BonsaiTree1') {
          const seen = await AsyncStorage.getItem(HAS_SEEN_BONSAI_GUIDE_KEY);
          if (!seen) {
            setModalBonsaiInformationVisible(true);
            await AsyncStorage.setItem(HAS_SEEN_BONSAI_GUIDE_KEY, 'true');
          }
        } else {
          const seen = await AsyncStorage.getItem(HAS_SEEN_HOME_GUIDE_KEY);
          if (!seen) {
            setModalInformationVisible(true);
            await AsyncStorage.setItem(HAS_SEEN_HOME_GUIDE_KEY, 'true');
          }
        }
      } catch (e) {
        console.warn('Failed to check guide modal:', e);
      }
    };

    checkAndShowGuide();
  }, [routeName, routeScreen]);

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
      label: 'Bonsaiboom',
      icon: require('../../assets/images/drawer_icons/drawer_bonsai_tree_icon.png'),
      action: () =>
        navigation.navigate('BonsaiTree', { screen: 'BonsaiTree1' }),
    },
    {
      label: 'Puntenwinkel',
      icon: require('../../assets/images/drawer_icons/drawer_bonsai_shop_icon.png'),
      action: () =>
        navigation.navigate('BonsaiTree', { screen: 'BonsaiTreeShop' }),
    },
    {
      label: 'Prestaties',
      icon: require('../../assets/images/drawer_icons/drawer_achievements_icon.png'),
      action: () =>
        navigation.navigate('BonsaiTree', { screen: 'Achievements' }),
    },
  ];

  const menuConfigGroup2 = [
    {
      label: 'Informatiegids',
      icon: require('../../assets/images/drawer_icons/drawer_info_icon.png'),
      action: () => {
        const isBonsai =
          routeName === 'BonsaiTree' && routeScreen === 'BonsaiTree1';
        if (isBonsai) {
          setModalBonsaiInformationVisible(true);
        } else {
          setModalInformationVisible(true);
        }
      },
    },

    {
      label: 'Uitloggen',
      icon: require('../../assets/images/drawer_icons/drawer_sign_out_icon.png'),
      // @TODO: In case of a component clear up, the `signOut` function would need to be passed as a param as it is destructured from the `useContext` hook!
      action: () => setCloseModalVisible(true),
    },
  ];

  return (
    <>
      {changePasswordModalVisible && (
        <ChangePasswordModal
          changePasswordModalVisible={changePasswordModalVisible}
          setChangePasswordModalVisible={setChangePasswordModalVisible}
        />
      )}

      {modalInformationVisible && (
        <InformationModal
          modalInformationVisible={modalInformationVisible}
          setModalInformationVisible={setModalInformationVisible}
        />
      )}

      {modalBonsaiInformationVisible && (
        <BonsaiInformationModal
          modalBonsaiInformationVisible={modalBonsaiInformationVisible}
          setModalBonsaiInformationVisible={setModalBonsaiInformationVisible}
        />
      )}

      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        title='Uitloggen'
        description={
          'Je staat op het punt om uit te loggen.\nWeet je het zeker?'
        }
        denyText='Nee, annuleren'
        confirmText='Ja, ik wil uitloggen'
        handleClose={signOut}
        isSpecialModal={true}
      />
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
