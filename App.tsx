import './gesture-handler';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/context/AuthContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { DiaryProvider } from './src/context/DiaryContext';
import { WorryProvider } from './src/context/WorryContext';
import { NoteProvider } from './src/context/NoteContext';
import { GoalProvider } from './src/context/GoalContext';

import AppNav from './src/navigation/AppNav';

import Toast from 'react-native-toast-message';

import { NotificationProvider } from './src/context/NotificationContext';
import * as Notifications from 'expo-notifications';
import { BonsaiProvider } from './src/context/BonsaiContext';

import { NavigationContainer } from '@react-navigation/native';

// import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

// ExponentPushToken[6JjBi7BE3q5ieVgKH4Fh3q]

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
                <BonsaiProvider>
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
                </BonsaiProvider>
              </AuthProvider>
            </NotificationProvider>
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
