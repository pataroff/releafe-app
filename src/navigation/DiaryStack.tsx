import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';
import { DiaryScreen } from '../screens/DiaryScreen';
import { DiaryScreen2 } from '../screens/DiaryScreen2';

const Stack = createNativeStackNavigator();

export const DiaryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {
          const title = 'Dagboek';
          return <Header title={title} />;
        },
      }}
    >
      <Stack.Screen name='Diary1' component={DiaryScreen} />
      <Stack.Screen name='Diary2' component={DiaryScreen2} />
    </Stack.Navigator>
  );
};
