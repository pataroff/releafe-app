import { useFonts } from 'expo-font';

import { DiaryProvider } from './src/context/DiaryContext';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';

import AppNav from './src/navigation/AppNav';

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
    <PaperProvider>
      <AuthProvider>
        <DiaryProvider>
          <AppNav />
        </DiaryProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
