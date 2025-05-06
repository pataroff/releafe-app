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
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fonts } from '../styles';
import { Avatar } from 'react-native-paper';

import { useGamification } from '../context/BonsaiContext';

const windowHeight = Dimensions.get('window').height;

export const Header: React.FC<{ title: string; route?: any }> = ({
  title,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const { points } = useGamification();

  return (
    <>
      <StatusBar style='light' />
      {/* SafeAreaView */}
      <View
        style={{
          backgroundColor: '#F9F9F9',
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        {/* Main Container */}
        <View
          style={[
            styles.container,
            {
              backgroundColor: route?.params?.bonsaiTreeStackScreen
                ? '#829B7A'
                : '#C1D6BA',
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
              {(route?.params?.toolkitStackScreen ||
                route?.params?.bonsaiTreeStackScreen) &&
                route?.name !== 'Toolkit1' && (
                  <Pressable onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                      name='chevron-left-circle-outline'
                      size={30}
                      color='white'
                    />
                  </Pressable>
                )}
              {/* Home Route */}
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
            {route?.name !== 'BonsaiTreeShop' ? (
              <Pressable onPress={() => navigation.openDrawer()}>
                <Avatar.Text
                  style={{
                    backgroundColor: route?.params?.bonsaiTreeStackScreen
                      ? '#829B7A'
                      : '#C1D6BA',
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                  color='white'
                  size={60}
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
    height: windowHeight <= 667 ? 145 : 165,
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
    paddingTop: windowHeight <= 667 ? 20 : 40,
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
