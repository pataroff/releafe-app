import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';

import { NotesToSelfScreen } from '../screens/NotesToSelfScreen';
import { NotesToSelfScreen2 } from '../screens/NotesToSelfScreen2';

const Stack = createNativeStackNavigator();

export const NotesToSelfStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='NotesToSelf'
      screenOptions={{
        header: ({ options }) => {
          const title = options.headerTitle || 'Notes to Self';
          return <Header title={title} />;
        },
      }}
    >
      <Stack.Screen name='NotesToSelf1' component={NotesToSelfScreen} />
      <Stack.Screen name='NotesToSelf2' component={NotesToSelfScreen2} />
    </Stack.Navigator>
  );
};
