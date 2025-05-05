import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { useAuth } from '../context/AuthContext';

const AppNav = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} animating={true} color='#A9C1A1' />
      </View>
    );
  }

  return <>{isLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

export default AppNav;
