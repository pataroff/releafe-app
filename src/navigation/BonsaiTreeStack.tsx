import React, { useEffect, useContext } from 'react';
import pb from '../lib/pocketbase';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { Header } from '../components/Header';

import { BonsaiTreeScreen } from '../screens/BonsaiTreeScreen';
import { BonsaiTreeShopScreen } from '../screens/BonsaiTreeShopScreen';

import { AuthContext } from '../context/AuthContext';
import { useGamification } from '../context/BonsaiContext';

const Stack = createNativeStackNavigator();

export const BonsaiTreeStack: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { setPoints, setUnlockedItems } = useGamification();

  useEffect(() => {
    const fetchGamificationData = async () => {
      if (user) {
        try {
          const userRecord = await pb.collection('users').getOne(user.id);
          const points = userRecord?.points ? userRecord.points : 0;
          const unlockedItems = userRecord?.unlockedItems
            ? userRecord.unlockedItems
            : [];

          setPoints(points);
          setUnlockedItems(unlockedItems);
        } catch (error) {
          console.error('Error fetching gamification data:', error);
        }
      }
    };

    fetchGamificationData();
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName='BonsaiTree1'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='BonsaiTree1'
        component={BonsaiTreeScreen}
        initialParams={{ bonsaiTreeStackScreen: true }}
      />
      <Stack.Screen
        name='BonsaiTreeShop'
        component={BonsaiTreeShopScreen}
        initialParams={{ bonsaiTreeStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
