import { StyleSheet, ScrollView } from 'react-native';

import { TextQuestion } from '../components/TextQuestion';

export const DiaryScreen3: React.FC = ({ route }) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyles}
        style={styles.container}
      >
        <TextQuestion
          questions={[
            [
              'Heb jij je vandaag ergens zorgen over gemaakt?',
              'Omschrijf hier je angsten of zorgen en hoe ju je daardoor voelde...',
            ],
            [
              'Zijn er ook andere dingen gebeurd die je gevoel hebben beïnvloed?',
              'Omschrijf hier wat er is gebeurd en hoe ju je daardoor voelde...',
            ],
            [
              'Heb je ook dingen vermeden?',
              'Omschrijf hier wat je hebt vermeden en waarom en hoe ju je daardoor voelde...',
            ],
            [
              'Wat heeft je vandaag dankbaar, trots of blij gemaakt?',
              'Schrijf het hier op... ',
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
