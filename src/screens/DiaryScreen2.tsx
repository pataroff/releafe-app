import { StatusBar } from 'expo-status-bar';

import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { SliderQuestion } from '../components/SliderQuestion';

export const DiaryScreen2: React.FC = () => {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Header />
        <SliderQuestion />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
