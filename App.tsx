import './gesture-handler';

import { useFonts } from 'expo-font';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/context/AuthContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { DiaryProvider } from './src/context/DiaryContext';
import { WorryProvider } from './src/context/WorryContext';
import { NoteProvider } from './src/context/NoteContext';
import { GoalProvider } from './src/context/GoalContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { GamificationProvider } from './src/context/GamificationContext';

import AppNav from './src/navigation/AppNav';

import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const toastConfig: ToastConfig = {
  longError: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontFamily: 'SofiaProBold',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontFamily: 'SofiaProLight',
        fontSize: 14,
        color: '#333',
      }}
      style={{
        minHeight: 90,
        paddingVertical: 10,
        borderLeftColor: 'red',
        borderLeftWidth: 10,
        borderRadius: 10,
      }}
      text2NumberOfLines={3}
    />
  ),
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'SofiaPro-Light': require('./assets/fonts/SofiaProLight.ttf'),
    'SofiaPro-Regular': require('./assets/fonts/SofiaProRegular.ttf'),
    'SofiaPro-Italic': require('./assets/fonts/SofiaProRegular-Italic.ttf'),
    'SofiaPro-Medium': require('./assets/fonts/SofiaProMedium.ttf'),
    'SofiaPro-MediumItalic': require('./assets/fonts/SofiaProMedium-Italic.ttf'),
    'SofiaPro-SemiBold': require('./assets/fonts/SofiaProSemiBold.ttf'),
    'SofiaPro-Bold': require('./assets/fonts/SofiaProBold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <PaperProvider>
            <NotificationProvider>
              <AuthProvider>
                <GamificationProvider>
                  <SettingsProvider>
                    <DiaryProvider>
                      <WorryProvider>
                        <NoteProvider>
                          <GoalProvider>
                            <AppNav />
                          </GoalProvider>
                        </NoteProvider>
                      </WorryProvider>
                    </DiaryProvider>
                  </SettingsProvider>
                </GamificationProvider>
              </AuthProvider>
            </NotificationProvider>
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </>
  );
}
