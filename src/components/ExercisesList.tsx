import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import { Exercise } from '../types';

import { useSettings } from '../context/SettingsContext';
import {
  categoryExercises,
  getExerciseCategory,
  getExerciseCategoryString,
} from '../utils/exercises';

import { ExercisesListItem } from './ExercisesListItem';

const windowWidth = Dimensions.get('window').width;

interface ExercisesListProps {
  category: string;
  showOnlyFavourites: boolean;
}

export const ExercisesList: React.FC<ExercisesListProps> = ({
  category,
  showOnlyFavourites,
}) => {
  const { favouriteExercises } = useSettings();

  const isGrouped = category == 'Bekijk alle oefeningen';
  const exercisesData = Array.from(categoryExercises.entries());

  const filterExercises = (exercises: Exercise[]) =>
    showOnlyFavourites
      ? exercises.filter((exercise) => favouriteExercises.includes(exercise.id))
      : exercises;

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.exercisesListContainer}
      contentContainerStyle={styles.exercisesListContentContainer}
    >
      {isGrouped
        ? // Handle grouped categories
          exercisesData.map(([categoryKey, exercises], index) => {
            const filteredExercises = filterExercises(exercises);
            if (filteredExercises.length === 0)
              return (
                <Text key={index} style={styles.noDataText}>
                  Geen favoriete oefeningen gevonden.
                </Text>
              );
            return (
              <View key={String(categoryKey)} style={{ rowGap: 20 }}>
                <Text style={styles.categoryText}>
                  {getExerciseCategoryString(categoryKey)}
                </Text>
                {filteredExercises.map((exercise, idx) => (
                  <ExercisesListItem key={idx} exercise={exercise} />
                ))}
              </View>
            );
          })
        : // Handle single category
          exercisesData.map(([categoryKey, exercises], index) => {
            if (categoryKey == getExerciseCategory(category)) {
              const filteredExercises = filterExercises(exercises);

              if (filteredExercises.length === 0)
                return (
                  <Text key={index} style={styles.noDataText}>
                    Geen favoriete oefeningen gevonden.
                  </Text>
                );

              return (
                <View key={index} style={{ rowGap: 20 }}>
                  <Text style={styles.categoryText}>
                    {getExerciseCategoryString(categoryKey)}
                  </Text>
                  {filteredExercises.map((exercise, idx) => (
                    <ExercisesListItem key={idx} exercise={exercise} />
                  ))}
                </View>
              );
            }
          })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  exercisesListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  exercisesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: windowWidth - 2 * 25,

    paddingBottom: 120,
  },
  categoryText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  } as TextStyle,
  noDataText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    marginTop: 10,
  } as TextStyle,
});
