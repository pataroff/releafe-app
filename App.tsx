import './gesture-handler';

import { useFonts } from 'expo-font';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

import { NavigationContainer } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
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
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer>
            <PaperProvider>
              <AuthProvider>
                <GamificationProvider>
                  <SettingsProvider>
                    <DiaryProvider>
                      <WorryProvider>
                        <NoteProvider>
                          <GoalProvider>
                            <NotificationProvider>
                              <AppNav />
                            </NotificationProvider>
                          </GoalProvider>
                        </NoteProvider>
                      </WorryProvider>
                    </DiaryProvider>
                  </SettingsProvider>
                </GamificationProvider>
              </AuthProvider>
            </PaperProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}
