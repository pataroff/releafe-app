import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { categories } from '../utils/exercises';
import { ExercisesCategoriesListItem } from './ExercisesCategoriesListItem';

const windowWidth = Dimensions.get('window').width;

export const ExercisesCategoriesList: React.FC<{ route: any }> = ({
  route,
}) => {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.exercisesCategoriesListContainer}
      contentContainerStyle={styles.exercisesCategoriesListContentContainer}
    >
      {categories.length > 0 &&
        categories.map((categoryItem, index) => {
          return (
            <ExercisesCategoriesListItem
              key={index}
              categoryItem={categoryItem}
              index={index}
            />
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  exercisesCategoriesListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  exercisesCategoriesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    rowGap: 10,
    width: windowWidth - 2 * 25,
    paddingBottom: 100,
  },
});
