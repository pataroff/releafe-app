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

const windowHeight = Dimensions.get('window').height;

export const Header: React.FC<{ title: string; route?: any }> = ({
  title,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

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
        <View style={styles.container}>
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
              {route?.params?.toolkitStackScreen &&
                route?.name !== 'Toolkit1' && (
                  <Pressable onPress={() => navigation.navigate('Toolkit1')}>
                    <MaterialCommunityIcons
                      name='chevron-left-circle-outline'
                      size={30}
                      color='white'
                    />
                  </Pressable>
                )}
              {route?.name !== 'Home' ? (
                <Text style={styles.headerTitle}>{title}</Text>
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
            <Pressable onPress={() => navigation.openDrawer()}>
              <Avatar.Text
                style={{
                  backgroundColor: '#C1D6BA',
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                color='white'
                size={60}
                label={user?.firstName[0] + user?.lastName[0]}
              />
            </Pressable>
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
    backgroundColor: '#C1D6BA',
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
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 24,
    color: 'white',
    textAlign: 'left',
  } as TextStyle,
});
