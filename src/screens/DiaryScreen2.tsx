import { StatusBar } from 'expo-status-bar';

import { ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { SliderQuestion } from '../components/SliderQuestion';

export const DiaryScreen2: React.FC = ({ route }) => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#ffffff',
        }}
        style={{ flex: 1, backgroundColor: '#ffffff' }}
      >
        <Header />
        <SliderQuestion
          questions={[
            [
              'Hoe zou je je algehele stemming vandaag beoordelen?',
              'Heel slecht',
              'Heel goed',
            ],
            [
              'Hoe angstig voel je je op dit moment?',
              'Erg angstig',
              'Totaal niet angstig',
            ],
            [
              'Hoeveel stress heb je vandaag ervaren?',
              'Veel stress',
              'Geen stress',
            ],
            ['Hoeveel energie heb je vandaag?', 'Geen energie', 'Veel energie'],
            [
              'Hoe is je focus en concentratie?',
              'Niet aanwezig',
              'Sterk aanwezig',
            ],
            ['Hoe goed heb je geslapen?', 'Slecht geslapen', 'Goed geslapen'],
          ]}
          route={route}
        />
      </ScrollView>
    </>
  );
};
