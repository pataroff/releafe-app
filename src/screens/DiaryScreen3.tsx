import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { TextQuestion } from '../components/TextQuestion';

export const DiaryScreen3: React.FC = () => {
  return (
    <>
      <StatusBar />
      <ScrollView
        // Apply layout styles here
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // Add any additional styles here if needed
        style={{ flex: 1 }}
      >
        <Header />
        <TextQuestion
          questions={[
            'Welke dingen zijn er vandaag gebeur die je gemoedstoestand hebben beïnvloed?',
            'Hoe voelde je je daardoor?',
            'Wat heb je toen gedaan?',
            'Welk effect had dat op je gemoedstoestand?',
            'Heb je ook dingen vermeden?\nZo ja, waarom en hoe voelde dat?',
            'Waar ben je vandaag dankbaar voor?',
          ]}
        />
      </ScrollView>
    </>
  );
};
