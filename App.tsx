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

import AppNav from './src/navigation/AppNav';

import Toast from 'react-native-toast-message';

// import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <AuthProvider>
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
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
