import { useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import AuthStack from './AuthStack';
import { TabNavigator } from './TabNavigator';

import { AuthContext } from '../context/AuthContext';

const AppNav = () => {
  // TODO: Property does not exist on type '{}'!
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} animating={true} color='#A9C1A1' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
