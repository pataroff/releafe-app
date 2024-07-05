import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Header } from '../components/Header';
import { DiaryGreeting } from '../components/DiaryGreeting';

const windowHeight = Dimensions.get('window').height;

export const DiaryScreen: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Header />
        <DiaryGreeting />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    backgroundColor: '#ffffff',
  },
});
