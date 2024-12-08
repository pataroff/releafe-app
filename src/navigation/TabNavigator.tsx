import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';

import { IWorryListItem, INoteEntry, IGoalEntry } from '../types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DiaryStack } from './DiaryStack';
import { ToolkitStack } from './ToolkitStack';

import { HomeScreen } from '../screens/HomeScreen';
import { AIScreen } from '../screens/AIScreen';
import { DashboardScreen } from '../screens/DashboardScreen';

import { AuthContext } from '../context/AuthContext';
import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';
import { GoalContext } from '../context/GoalContext';

import pb from '../lib/pocketbase';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { user } = useContext(AuthContext);
  const { worryEntries, setWorryEntries } = useContext(WorryContext);
  const { setNoteEntries } = useContext(NoteContext);
  const { setGoalEntries } = useContext(GoalContext);

  // TODO: Is this the right place to fetch the data?
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

    const fetchNoteEntries = async () => {
      if (user) {
        try {
          const noteEntriesList = await pb
            .collection('note_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-created',
              expand: 'user',
            });

          const modifiedNoteEntriesList: INoteEntry[] =
            noteEntriesList.items.map((item) => {
              const {
                id,
                uuid,
                worry,
                category,
                title,
                description,
                feelingDescription,
                thoughtLikelihoodSliderOne,
                forThoughtEvidence,
                againstThoughtEvidence,
                friendAdvice,
                thoughtLikelihoodSliderTwo,
                thoughtLikelihood,
                alternativePerspective,
              } = item;
              return {
                id,
                uuid,
                worry,
                category,
                title,
                description,
                feelingDescription,
                thoughtLikelihoodSliderOne,
                forThoughtEvidence,
                againstThoughtEvidence,
                friendAdvice,
                thoughtLikelihoodSliderTwo,
                thoughtLikelihood,
                alternativePerspective,
              };
            });

          setNoteEntries(modifiedNoteEntriesList);
        } catch (error) {
          console.error('Error fetching note entries:', error);
        }
      }
    };

    const fetchGoalEntries = async () => {
      if (user) {
        try {
          const goalEntriesList = await pb
            .collection('goal_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-created',
              expand: 'user',
            });

          const modifiedGoalEntriesList: IGoalEntry[] =
            goalEntriesList.items.map((item) => {
              const {
                id,
                uuid,
                category,
                title,
                description,
                sentence,
                diarySentence,
                timeframe,
                targetFrequency,
                startDate,
                endDate,
                completedTimeframe,
                completedPeriod,
              } = item;
              return {
                id,
                uuid,
                category,
                title,
                description,
                sentence,
                diarySentence,
                timeframe,
                targetFrequency,
                startDate,
                endDate,
                completedTimeframe,
                completedPeriod,
              };
            });

          setGoalEntries(modifiedGoalEntriesList);
        } catch (error) {
          console.error('Error fetching goal entries:', error);
        }
      }
    };

    fetchWorryEntries();
    fetchNoteEntries();
    fetchGoalEntries();
  }, [user]);

  const CustomTabIcon = () => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 99,
          backgroundColor: '#C1D6BA',
          width: 70,
          height: 70,
          marginBottom: 20,
          paddingVertical: 10,
        }}
      >
        <Image
          resizeMode='contain'
          style={{ width: '100%', height: 45 }}
          source={require('../../assets/images/bonsai_tree_icon.png')}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName='Home'
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

      {/* Custom Tab Bar Icon */}
      {/* <Tab.Screen
        name='AI'
        component={AIScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <CustomTabIcon />;
          },
        }}
      /> */}

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
          tabBarBadge:
            //	The || operator returns the first truthy value it encounters or the last value if all are falsy.
            worryEntries.filter((item) => item.reframed !== true).length ||
            undefined,
        }}
      />
    </Tab.Navigator>
  );
};
