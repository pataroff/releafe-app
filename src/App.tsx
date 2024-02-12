// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DiaryEntryList } from './components/DiaryEntryList';
import { AddDiaryEntry } from './components/AddDiaryEntry';

export default function App() {
  return (
    <View style={styles.container}>
      <DiaryEntryList />
      <AddDiaryEntry />
    </View>
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
