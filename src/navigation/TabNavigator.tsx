import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';

import { DiaryStack } from './DiaryStack';
import { ToolkitStack } from './ToolkitStack';
import { BonsaiTreeStack } from './BonsaiTreeStack';
import { SettingsStack } from './SettingsStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderColor: '#dedede',
          borderWidth: 2,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          height: 100,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/home_icon_active.png')}
              />
            ) : (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/home_icon.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Diary'
        component={DiaryStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/diary_icon_active.png')}
              />
            ) : (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/diary_icon.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name='WellbeingOverview'
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/wellbeing_overview_icon_active.png')}
              />
            ) : (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/wellbeing_overview_icon.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name='Toolkit'
        component={ToolkitStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/toolkit_icon_active.png')}
              />
            ) : (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 25 }}
                source={require('../../assets/images/navigation_bar/toolkit_icon.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name='BonsaiTree'
        component={BonsaiTreeStack}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='Settings'
        component={SettingsStack}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
