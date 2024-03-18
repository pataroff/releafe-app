import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Box, MessageSquare } from 'react-native-feather';

// All icon packs are available by default in Expo 👇🏻
// import Feather from '@expo/vector-icons/Feather';

import { HomeScreen } from '../screens/HomeScreen';
import { DiaryScreen } from '../screens/DiaryScreen';
import { ToolkitScreen } from '../screens/ToolkitScreen';
import { ChatScreen } from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
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
              <Home fill='black' stroke='black' />
            ) : (
              <Home stroke='black' />
            );
          },
        }}
      />
      <Tab.Screen
        name='Diary'
        component={DiaryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <BookOpen fill='black' stroke='black' />
            ) : (
              <BookOpen stroke='black' />
            );
          },
        }}
      />
      <Tab.Screen
        name='Toolkit'
        component={ToolkitScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Box fill='black' stroke='black' />
            ) : (
              <Box stroke='black' />
            );
          },
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <MessageSquare fill='black' stroke='black' />
            ) : (
              <MessageSquare stroke='black' />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
