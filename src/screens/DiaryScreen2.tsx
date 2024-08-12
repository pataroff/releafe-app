import { StatusBar } from 'expo-status-bar';

import { View, Text, ScrollView } from 'react-native';

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
              'Hoe zou je je algemene stemming vandaag beschrijven?',
              'Zeer slecht',
              'Uitstekend',
            ],
            [
              'Hoeveel angst of zorgen heb je vandaag ervaren?',
              'Heel veel angst of zorgen',
              'Helemaal geen angst of zorgen',
            ],
            [
              'Hoe gestrest voelde je je vandaag?',
              'Zeer gestresst',
              'Helemaal niet gestresst',
            ],
            [
              'Hoe zou je je energieniveau vandaag beoordelen?',
              'Zeer lage energie',
              'Zeer energiek',
            ],
            [
              'Hoe goed kon je je vandaag concentreren op dingen die je deed?',
              'Helemaal geen concentratie',
              'Uitstekende concentratie',
            ],
            [
              'Hoe goed heb je geslapen afgelopen nacht?',
              'Zeer slecht',
              'Uitstekend',
            ],
          ]}
          route={route}
        />
      </ScrollView>
    </>
  );
};
