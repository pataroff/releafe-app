import React, { useEffect } from 'react';

import pb from '../lib/pocketbase';

import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useNotification } from '../context/NotificationContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExercisesScreen } from '../screens/ExercisesScreen';
import { ExercisesScreen2 } from '../screens/ExercisesScreen2';

const Stack = createNativeStackNavigator();

export const ExercisesStack: React.FC = () => {
  const { user } = useAuth();
  const { setFavouriteExercises } = useSettings();
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
