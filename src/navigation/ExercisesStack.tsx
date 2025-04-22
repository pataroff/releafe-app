import React, { useEffect, useContext } from 'react';

import pb from '../lib/pocketbase';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExercisesScreen } from '../screens/ExercisesScreen';
import { ExercisesScreen2 } from '../screens/ExercisesScreen2';

import { useNotification } from '../context/NotificationContext';

const Stack = createNativeStackNavigator();

export const ExercisesStack: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { setFavouriteExercises } = useContext(SettingsContext);
  const { scheduleExerciseInactivityNotification } = useNotification();

  useEffect(() => {
    const fetchFavouriteExercises = async () => {
      if (user) {
        try {
          const userRecord = await pb.collection('users').getOne(user.id);
          const favourites = userRecord?.favouriteExercises
            ? userRecord?.favouriteExercises
            : [];
          setFavouriteExercises(favourites);
        } catch (error) {
          console.error('Error fetching favourite exercises:', error);
        }
      }
    };
    fetchFavouriteExercises();
    scheduleExerciseInactivityNotification();
  }, [user]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Exercises1' component={ExercisesScreen} />
      <Stack.Screen name='Exercises2' component={ExercisesScreen2} />
    </Stack.Navigator>
  );
};
