import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BonsaiTreeScreen } from '../screens/BonsaiTreeScreen';
import { BonsaiTreeShopScreen } from '../screens/BonsaiTreeShopScreen';
import { AchievementsScreen } from '../screens/AchievementsScreen';

const Stack = createNativeStackNavigator();

export const BonsaiTreeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='BonsaiTree1'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='BonsaiTree1' component={BonsaiTreeScreen} />
      <Stack.Screen
        name='BonsaiTreeShop'
        component={BonsaiTreeShopScreen}
        initialParams={{ bonsaiTreeStackScreen: true }}
      />
      <Stack.Screen
        name='Achievements'
        component={AchievementsScreen}
        initialParams={{ bonsaiTreeStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
