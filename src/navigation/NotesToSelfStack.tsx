import React, { useEffect, useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';

import { NotesToSelfScreen } from '../screens/NotesToSelfScreen';
import { NotesToSelfScreen2 } from '../screens/NotesToSelfScreen2';
import { NotesToSelfScreen3 } from '../screens/NotesToSelfScreen3';

const Stack = createNativeStackNavigator();

export const NotesToSelfStack: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Notes to Self' });
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName='NotesToSelf'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='NotesToSelf1' component={NotesToSelfScreen} />
      <Stack.Screen name='NotesToSelf2' component={NotesToSelfScreen2} />
      <Stack.Screen name='NotesToSelf3' component={NotesToSelfScreen3} />
    </Stack.Navigator>
  );
};
