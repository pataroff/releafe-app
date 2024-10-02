import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';

import { ToolkitScreen } from '../screens/ToolkitScreen';
import { WorryBoxScreen } from '../screens/WorryBoxScreen';
import { NotesToSelfStack } from './NotesToSelfStack';

const Stack = createNativeStackNavigator();

export const ToolkitStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Toolkit1'
      screenOptions={{
        header: ({ route }) => {
          const title = 'Toolkit';
          return <Header title={title} route={route} />;
        },
      }}
    >
      <Stack.Screen
        name='Toolkit1'
        component={ToolkitScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='WorryBox'
        component={WorryBoxScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='NotesToSelf'
        component={NotesToSelfStack}
        initialParams={{ toolkitStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
