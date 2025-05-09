import React, { useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import {
  categoryExercises,
  getExerciseCategory,
  getExerciseCategoryString,
} from '../utils/exercises';
import { ExercisesListItem } from './ExercisesListItem';

import { ExerciseCategory, Exercise } from '../types';
import { SettingsContext } from '../context/SettingsContext'; // Import your context

interface ExercisesListProps {
  category: string;
  showOnlyFavourites: boolean;
}

export const ExercisesList: React.FC<ExercisesListProps> = ({
  category,
  showOnlyFavourites,
}) => {
  const { favouriteExercises } = useContext(SettingsContext); // Get favouriteExercises from context

  // Define the structure of `exercisesData`
  const exercisesData: [ExerciseCategory, Exercise[]][] | Exercise[] =
    //category === 'Bekijk alle oefeningen'
    Array.from(categoryExercises.entries()); // Grouped: [categoryKey, exercises[]]
  //: categoryExercises.get(getExerciseCategory(category)) || []; // Flat array of exercises

  // Type guard to check if `exercisesData` is grouped
  const isGrouped = category == 'Bekijk alle oefeningen';
  //Array.isArray(exercisesData[0]);

  const filteredExercises = (exercises: Exercise[]) =>
    showOnlyFavourites
      ? exercises.filter((exercise) => favouriteExercises.includes(exercise.id))
      : exercises;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.exercisesListContainer}
      contentContainerStyle={styles.exercisesListContentContainer}
    >
      {isGrouped
        ? // Handle grouped categories
          (exercisesData as [ExerciseCategory, Exercise[]][]).map(
            ([categoryKey, exercises]) => {
              const filtered = filteredExercises(exercises);
              if (filtered.length === 0) return null; // Skip rendering if no favourites for this category
              return (
                <React.Fragment key={String(categoryKey)}>
                  <Text style={styles.categoryText}>
                    {getExerciseCategoryString(categoryKey)}
                  </Text>
                  {filtered.map((exercise, index) => (
                    <ExercisesListItem key={index} exercise={exercise} />
                  ))}
                </React.Fragment>
              );
            }
          )
        : // Handle single category
          (exercisesData as [ExerciseCategory, Exercise[]][]).map(
            ([categoryKey, exercises], index) => {
              console.log('Category: ' + category.toUpperCase());
              console.log('CategoryKey: ' + categoryKey);
              console.log('---');
              if (categoryKey == category.toUpperCase()) {
                console.log('------Match-----');
                exercises =
                  categoryExercises.get(getExerciseCategory(category)) || [];
                const filtered = filteredExercises(exercises);
                if (filtered.length === 0) return null; // Skip rendering if no favourites for this category
                return (
                  <React.Fragment key={index}>
                    <Text style={styles.categoryText}>
                      {getExerciseCategoryString(categoryKey)}
                    </Text>
                    <React.Fragment>
                      {filtered.map((exercise, idx) => (
                        <ExercisesListItem key={idx} exercise={exercise} />
                      ))}
                    </React.Fragment>
                  </React.Fragment>
                );
              }
            }
          )}
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
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    rowGap: 15,
    marginBottom: 200,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
});
