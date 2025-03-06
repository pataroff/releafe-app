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
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      <View style={styles.headersContainer}>
        <Text style={styles.headersTitleText}>Oefeningen</Text>
        <Text style={styles.headersDescriptionText}>
          Hieronder vind je een selectie van oefeningen, zorgvuldig samengesteld
          uit ons aanbod. Je kunt kiezen uit verschillende categorieën.
        </Text>

        {/* Headers Inner Container */}
        <View style={styles.headersInnerContainer}>
          <View style={{ width: '80%' }}>
            <Text style={styles.headersHeadingText}>Categorieën</Text>
            <Text style={styles.headersDescriptionText}>
              Kies een categorie waarmee jij aan de slag wilt.
            </Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
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
    ...Fonts.sofiaProRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
});
