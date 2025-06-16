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
import { useGamification } from '../context/GamificationContext';

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

  return (
    <>
      <StatusBar style='light' />
      {/* Background  */}
      <View
        style={{
          backgroundColor:
            route?.name !== 'Settings1' ? '#f9f9f9' : 'transparent',
        }}
      >
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
            // Shadow Test
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 1,
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
                }}
              >
                {/* Nested Routes */}
                {showBackButton && (
                  <Pressable onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                      name='chevron-left-circle-outline'
                      size={35}
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
                      marginBottom: 10,
                    }}
                    resizeMode='contain'
                    source={require('../../assets/images/logo_releafe_white.png')}
                  />
                )}
              </View>
              {!isNestedScreen && (
                <Pressable onPress={() => navigation.openDrawer()}>
                  <Avatar.Text
                    style={{
                      backgroundColor,
                      borderWidth: 2,
                      borderColor: 'white',
                    }}
                    color='white'
                    size={60}
                    label={user?.firstName[0] + user?.lastName[0]}
                  />
                </Pressable>
              )}
              {/* Bonsai Tree Shop */}
              {route?.name === 'BonsaiTreeShop' && (
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
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
    width: '100%',
  },
  headerTitle: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 30,
    color: 'white',
  } as TextStyle,
});
