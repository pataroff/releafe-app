import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextStyle,
  Platform,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { Avatar } from 'react-native-paper';

export const CustomDrawerContent = (props) => {
  const { user, signOut } = useContext(AuthContext);
  const { navigation } = props;

  const menuConfigGroup1 = [
    {
      label: 'Persoonlijk profiel',
      icon: require('../../assets/images/drawer_icons/drawer_profile_icon.png'),
      action: () => console.log('Persoonlijk profiel pressed!'),
    },
    {
      label: 'Bonsai boom',
      icon: require('../../assets/images/drawer_icons/drawer_bonsai_tree_icon.png'),
      action: () => console.log('Bonsai boom pressed!'),
    },
    {
      label: 'Community',
      icon: require('../../assets/images/drawer_icons/drawer_community_icon.png'),
      action: () => console.log('Community pressed!'),
    },
  ];

  const menuConfigGroup2 = [
    {
      label: 'Informatiegids',
      icon: require('../../assets/images/drawer_icons/drawer_info_icon.png'),
      action: () => console.log('Informatiegids pressed!'),
    },
    {
      label: 'Instellingen',
      icon: require('../../assets/images/drawer_icons/drawer_settings_icon.png'),
      action: () => console.log('Instellingen pressed!'),
    },
    {
      label: 'Uitloggen',
      icon: require('../../assets/images/drawer_icons/drawer_sign_out_icon.png'),
      // @TODO: In case of a component clear up, the `signOut` function would need to be passed as a param as it is destructured from the `useContext` hook!
      action: () => signOut(),
    },
  ];

  return (
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
  );
};

const styles = StyleSheet.create({
  headersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#C1D6BA',
    height: 150,
    width: '100%',
    borderRadius: 30,
    borderTopEndRadius: 0,
    paddingBottom: 20,
  },
  h1Text: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 20,
    color: 'white',
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
    color: 'white',
  } as TextStyle,
  labelStyle: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'black',
    fontSize: 16,
  } as TextStyle,
  drawerItem: {
    paddingVertical: 10,
  },
  drawerItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000033',
  },
});
