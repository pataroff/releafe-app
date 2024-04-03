import { StatusBar } from 'expo-status-bar';

import { StyleSheet, View, Modal } from 'react-native';

import { Header } from '../components/Header';
import { SliderQuestion } from '../components/SliderQuestion';

export const DiaryScreen2: React.FC = () => {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Header />
        <SliderQuestion
          questions={[
            'Hoe zou je je algehele stemming vandaag beoordelen?',
            'Hoe angstig voel je je op dit moment?',
            'Hoeveel stress heb je vandaag ervaren?',
            'Hoeveel energie heb je vandaag?',
            'Hoe is je focus en concentratie?',
            'Hoe goed heb je geslapen?',
          ]}
        />
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
