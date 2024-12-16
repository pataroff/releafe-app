import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const exercisesCategories = [
  { icon: null, title: 'Bekijk alle oefeningen' },
  {
    icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
    title: 'Mindfulness',
  },
  {
    icon: require('../../assets/images/exercises_categories_icons/meditation_icon.png'),
    title: 'Meditatie',
  },
  {
    icon: require('../../assets/images/exercises_categories_icons/relaxation_icon.png'),
    title: 'Ontspanning',
  },
  {
    icon: require('../../assets/images/exercises_categories_icons/exercise_icon.png'),
    title: 'Lichaamsbeweging',
  },
  {
    icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
    title: 'Ademhaling',
  },
];

import { ExercisesCategoriesListItem } from './ExercisesCategoriesListItem';

export const ExercisesCategoriesList: React.FC<{ route: any }> = ({
  route,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.exercisesCategoriesListContainer}
      contentContainerStyle={styles.exercisesCategoriesListContentContainer}
    >
      {exercisesCategories.length > 0 &&
        exercisesCategories.map((item, index) => {
          return (
            <ExercisesCategoriesListItem
              key={index}
              item={item}
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
    backgroundColor: '#ffffff',
  },
  exercisesCategoriesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 10,
    marginHorizontal: 30,
    marginBottom: 100,
  },
});
