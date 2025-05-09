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
          const title = 'Instellingen';
          return <Header title={title} route={route} />;
        },
      }}
    >
      <Stack.Screen
        name='Settings1'
        component={SettingsScreen}
        initialParams={{ settingsStackScreen: true }}
      />
      <Stack.Screen
        name='ChangePassword'
        component={ChangePasswordScreen}
        initialParams={{ settingsStackScreen: true }}
      />
      <Stack.Screen
        name='ChangeEmail'
        component={ChangeEmailScreen}
        initialParams={{ settingsStackScreen: true }}
      />
      <Stack.Screen
        name='ChangePhoneNumber'
        component={ChangePhoneNumberScreen}
        initialParams={{ settingsStackScreen: true }}
      />
      <Stack.Screen
        name='Settings2'
        component={SettingsScreen2}
        initialParams={{ settingsStackScreen: true }}
      />
      <Stack.Screen
        name='ChangeBirthDate'
        component={ChangeBirthDateScreen}
        initialParams={{ settingsStackScreen: true }}
      />
    </Stack.Navigator>
  );
};
