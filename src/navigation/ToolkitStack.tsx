import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';
import { WorryBoxScreen } from '../screens/WorryBoxScreen';

const Stack = createNativeStackNavigator();

export const ToolkitStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ options }) => {
          const title = options.headerTitle || 'Informatie & Toolkit';
          return <Header title={title} />;
        },
      }}
    >
      <Stack.Screen name='WorryBox' component={WorryBoxScreen} />
    </Stack.Navigator>
  );
};
