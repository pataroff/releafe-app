import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';

import { ToolkitScreen } from '../screens/ToolkitScreen';
import { PersonalGoalsScreen } from '../screens/PersonalGoalsScreen';
import { WorryBoxScreen } from '../screens/WorryBoxScreen';
import { ReframingScreen } from '../screens/ReframingScreen';
import { NotesToSelfScreen } from '../screens/NotesToSelfScreen';
import { ExercisesStack } from './ExercisesStack';

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
      <Stack.Screen name='Toolkit1' component={ToolkitScreen} />
      <Stack.Screen
        name='PersonalGoals'
        component={PersonalGoalsScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='WorryBox'
        component={WorryBoxScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='Reframing'
        component={ReframingScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='NotesToSelf'
        component={NotesToSelfScreen}
        initialParams={{ toolkitStackScreen: true }}
      />
      <Stack.Screen
        name='Exercises'
        component={ExercisesStack}
        initialParams={{ toolkitStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
