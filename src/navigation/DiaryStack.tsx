import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DiaryScreen } from '../screens/DiaryScreen';
import { DiaryScreen2 } from '../screens/DiaryScreen2';

const Stack = createNativeStackNavigator();

export const DiaryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Diary1' component={DiaryScreen} />
      <Stack.Screen name='Diary2' component={DiaryScreen2} />
    </Stack.Navigator>
  );
};
