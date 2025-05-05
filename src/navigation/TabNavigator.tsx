import React, { useEffect, useContext } from 'react';
import { Image } from 'react-native';

import { IWorryListItem, INoteEntry, IGoalEntry } from '../types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';

import { DiaryStack } from './DiaryStack';
import { ToolkitStack } from './ToolkitStack';
import { BonsaiTreeStack } from './BonsaiTreeStack';
import { SettingsStack } from './SettingsStack';

import { useAuth } from '../context/AuthContext';
import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';
import { GoalContext } from '../context/GoalContext';
import { useGamification } from '../context/BonsaiContext';

import pb from '../lib/pocketbase';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { user } = useAuth();
  const { setWorryEntries } = useContext(WorryContext);
  const { setNoteEntries } = useContext(NoteContext);
  const { setGoalEntries } = useContext(GoalContext);
  const { setPoints } = useGamification();

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
                priority,
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
                mediaFile,
                audioMetering,
              } = item;
              return {
                id,
                uuid,
                worry,
                category,
                priority,
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
                mediaFile,
                audioMetering,
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

    // @TODO: Is this where this should happen?
    const fetchUserPoints = async () => {
      if (user) {
        setPoints(user.points);
        // try {
        //   const userRecord = await pb.collection('users').getOne(user?.id);
        //   setPoints(userRecord.points || 0);
        // } catch (error) {
        //   console.error('Error fetching points:', error);
        // }
      }
    };

    fetchWorryEntries();
    fetchNoteEntries();
    fetchGoalEntries();
    fetchUserPoints();
  }, [user]);

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
