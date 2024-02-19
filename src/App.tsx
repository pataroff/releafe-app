import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { StyleSheet, View } from 'react-native';
import { DiaryEntryList } from './components/DiaryEntryList';
import { AddDiaryEntry } from './components/AddDiaryEntry';
import { GlobalProvider } from './context/GlobalState';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GlobalProvider>
      <StatusBar />
      <View style={styles.container}>
        <DiaryEntryList />
        <AddDiaryEntry />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
