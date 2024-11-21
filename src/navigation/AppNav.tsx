import { useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

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
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
