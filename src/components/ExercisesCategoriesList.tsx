import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { categories } from '../utils/exercises';
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
