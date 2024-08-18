import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { IWorryListItem } from '../types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DiaryStack } from './DiaryStack';
import { ToolkitStack } from './ToolkitStack';

import { HomeScreen } from '../screens/HomeScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { AIScreen } from '../screens/AIScreen';

import { AuthContext } from '../context/AuthContext';
import { WorryContext } from '../context/WorryContext';

import pb from '../lib/pocketbase';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { user } = useContext(AuthContext);
  const { worryEntries, setWorryEntries } = useContext(WorryContext);

  // TODO: Is this the right place of fetching the worry entries?
  useEffect(() => {
    const fetchWorryEntries = async () => {
      if (user) {
        try {
          const worryEntriesList = await pb
            .collection('worry_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-date', // desc order
              expand: 'user',
            });

          const modifiedWorryEntriesList: IWorryListItem[] =
            worryEntriesList.items.map((item) => {
              const {
                id,
                uuid,
                category,
                priority,
                date,
                title,
                description,
                reframed,
              } = item;
              return {
                id,
                uuid,
                category,
                date: new Date(date),
                priority,
                title,
                description,
                reframed,
              };
            });

          setWorryEntries(modifiedWorryEntriesList);
        } catch (error) {
          console.error('Error fetching worry entries:', error);
        }
      }
    };

    fetchWorryEntries();
  }, [user]);

  const CustomTabIcon = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          borderRadius: 99,
          backgroundColor: '#8afc78',
          width: 75,
          height: 75,
          marginBottom: 20,
          paddingVertical: 10,
        }}
      >
        <Image
          resizeMode='contain'
          style={{ width: '100%', height: 55 }}
          source={require('../../assets/images/bonsai_tree_placeholder_icon.png')}
        />
      </View>
    );
  };

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
          tabBarIcon: ({ size, focused, color }) => {
            return <CustomTabIcon />;
          },
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
          tabBarBadge:
            //	The || operator returns the first truthy value it encounters or the last value if all are falsy.
            worryEntries.filter((item) => item.reframed !== true).length ||
            undefined,
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
