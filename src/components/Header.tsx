import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TextStyle,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts } from '../styles';
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/BonsaiContext';

export const Header: React.FC<{ title: string; route?: any }> = ({
  title,
  route,
}) => {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { points } = useGamification();

  const insets = useSafeAreaInsets();

  const backgroundColor =
    route?.params?.bonsaiTreeStackScreen || route?.params?.settingsStackScreen
      ? '#829B7A'
      : '#C1D6BA';

  const isNestedScreen =
    route?.params?.toolkitStackScreen ||
    route?.params?.bonsaiTreeStackScreen ||
    route?.params?.settingsStackScreen;

  const showBackButton = isNestedScreen && route?.name !== 'Toolkit1';

  const showAvatar =
    route?.name !== 'BonsaiTreeShop' || route?.name !== 'Settings1';

  return (
    <>
      <StatusBar style='light' backgroundColor={backgroundColor} />
      {/* SafeAreaView */}
      <View
        style={{
          backgroundColor,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingTop: insets.top,
          borderTopWidth: 0,
          borderBottomStartRadius: 30,
          borderBottomEndRadius: 30,
        }}
      >
        {/* Main Container */}
        <View
          style={[
            styles.container,
            {
              backgroundColor,
            },
          ]}
        >
          {/* Header Container */}
          <View style={styles.headerContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
            >
              {/* Nested Routes */}
              {showBackButton && (
                <Pressable onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons
                    name='chevron-left-circle-outline'
                    size={30}
                    color='white'
                  />
                </Pressable>
              )}
              {/* Title */}
              {route?.name !== 'Home' ? (
                <Text style={styles.headerTitle}> {title} </Text>
              ) : (
                <Image
                  style={{
                    height: 90,
                    width: 90,
                  }}
                  resizeMode='contain'
                  source={require('../../assets/images/logo_releafe_white.png')}
                />
              )}
            </View>
            {showAvatar ? (
              <Pressable onPress={() => navigation.openDrawer()}>
                <Avatar.Text
                  style={{
                    backgroundColor,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                  color='white'
                  size={65}
                  label={user?.firstName[0] + user?.lastName[0]}
                />
              </Pressable>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 15,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#C1D6BA',
                    padding: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={
                      {
                        ...Fonts.sofiaProBold[Platform.OS],
                        fontSize: 20,
                        color: 'white',
                      } as TextStyle
                    }
                  >
                    {points} punten
                  </Text>
                </View>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                  }}
                  resizeMode='contain'
                  source={require('../../assets/images/logo_releafe_white.png')}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 125,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    columnGap: 30,
    width: '100%',
  },
  headerTitle: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 28,
    color: 'white',
    textAlign: 'left',
    textShadowColor: 'black',
    textShadowRadius: 6,
  } as TextStyle,
});
