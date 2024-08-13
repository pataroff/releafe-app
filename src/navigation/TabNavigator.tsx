import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DiaryStack } from './DiaryStack';
import { ToolkitStack } from './ToolkitStack';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { HomeScreen } from '../screens/HomeScreen';
import { ToolkitScreen } from '../screens/ToolkitScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { AIScreen } from '../screens/AIScreen';

import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Diary'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderColor: '#dedede',
          borderWidth: 1,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          height: 80,
          // This can be done through tabBarIconStyle 👇🏻
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
              <Feather name='home' size={24} color='black' />
            ) : (
              <Feather name='home' size={24} color='gray' />
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
              <Feather name='book' size={24} color='black' />
            ) : (
              <Feather name='book' size={24} color='gray' />
            );
          },
        }}
      />

      {/* Custom Tab Bar Icon */}
      <Tab.Screen
        name='AI'
        component={AIScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => {},
        }}
      />

      <Tab.Screen
        name='Toolkit'
        component={ToolkitStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome6 name='lightbulb' size={22} color='black' />
            ) : (
              <FontAwesome6 name='lightbulb' size={22} color='gray' />
            );
          },
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome6 name='message' size={22} color='black' />
            ) : (
              <FontAwesome6 name='message' size={22} color='gray' />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
