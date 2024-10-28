import { ScrollView, StyleSheet } from 'react-native';

import { SliderQuestion } from '../components/SliderQuestion';

export const DiaryScreen2: React.FC<{ route: any }> = ({ route }) => {
  return (
    <>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainerStyles}
        style={styles.container}
      >
        <SliderQuestion
          questions={[
            [
              'Hoe zou je je algemene stemming vandaag beschrijven?',
              'Zeer slecht',
              'Zeer goed',
            ],
            [
              'Hoeveel angst of zorgen heb je vandaag ervaren?',
              'Zeer veel',
              'Zeer weinig',
            ],
            ['Hoe gestrest voelde je je vandaag?', 'Zeer veel', 'Zeer weinig'],
            [
              'Hoe zou je je energieniveau vandaag beoordelen?',
              'Zeer weinig',
              'Zeer veel',
            ],
            [
              'Hoe goed kon je je vandaag concentreren op dingen die je deed?',
              'Zeer slecht',
              'Zeer goed',
            ],
            [
              'Hoe goed heb je geslapen afgelopen nacht?',
              'Zeer slecht',
              'Zeer goed',
            ],
          ]}
          route={route}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F9F9F9',
  },
});
