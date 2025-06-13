import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { ExercisesCategoriesList } from '../components/ExercisesCategoriesList';

const windowWidth = Dimensions.get('window').width;

export const ExercisesScreen: React.FC<{ route: any }> = ({ route }) => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      <View style={styles.headersContainer}>
        <Text style={styles.headersTitleText}>Oefeningen</Text>
        <Text style={styles.headersDescriptionText}>
          Hieronder vind je een selectie van oefeningen, zorgvuldig samengesteld
          voor jou, Ontdek welke oefeningen bij jou passen.
        </Text>
      </View>

      {/* Exercises Categories List */}
      <ExercisesCategoriesList route={route} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 18,
    marginTop: 10,
  } as TextStyle,
});
