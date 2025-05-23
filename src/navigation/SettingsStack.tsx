import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '../components/Header';

import { SettingsScreen } from '../screens/SettingsScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { ChangeEmailScreen } from '../screens/ChangeEmailScreen';
import { ChangePhoneNumberScreen } from '../screens/ChangePhoneNumberScreen';
import { SettingsScreen2 } from '../screens/SettingsScreen2';
import { ChangeBirthDateScreen } from '../screens/ChangeBirthDateScreen';

const Stack = createNativeStackNavigator();

export const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Settings1'
      screenOptions={{
        header: ({ route }) => {
          const title = 'Personlijk profiel';
          return <Header title={title} route={route} />;
        },
      }}
    >
      <Stack.Screen
        name='Settings1'
        component={SettingsScreen}
        initialParams={{ settingsStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
