import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextStyle,
  Platform,
  Pressable,
} from 'react-native';

import { Fonts } from '../styles';
import { Exercise } from '../types';

import { SettingsContext } from '../context/SettingsContext';

import { ExercisesListItemExpandedModal } from './ExercisesListItemExpandedModal';

interface ExerciseListItemProps {
  exercise: Exercise;
}

export const ExercisesListItem: React.FC<ExerciseListItemProps> = ({
  exercise,
}) => {
  const { id, icon, title, description, duration } = exercise;
  const {
    favouriteExercises,
    setFavouriteExercises,
    updateFavouritesInDatabase,
  } = useContext(SettingsContext);
  // Check if the exercise is in the favorite list
  const isFavourite = favouriteExercises.includes(id);

  const [
    modalExercisesListItemExpandedVisible,
    setModalExercisesListItemExpandedVisible,
  ] = useState<boolean>(false);

  // Toggle favorite status
  const handleFavourite = (exerciseId: string) => {
    setFavouriteExercises((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(exerciseId)
        ? prevFavorites.filter((id) => id !== exerciseId)
        : [...prevFavorites, exerciseId];

      updateFavouritesInDatabase(updatedFavorites);
      return updatedFavorites; // Return the updated array
    });
  };

  return (
    <>
      <ExercisesListItemExpandedModal
        modalExercisesListItemExpandedVisible={
          modalExercisesListItemExpandedVisible
        }
        setModalExercisesListItemExpandedVisible={
          setModalExercisesListItemExpandedVisible
        }
        exercise={exercise}
      />
      <Pressable
        onPress={() =>
          setModalExercisesListItemExpandedVisible(
            !modalExercisesListItemExpandedVisible
          )
        }
        style={styles.container}
      >
        <Image
          source={icon}
          style={{ width: 35, height: 35 }}
          resizeMode='contain'
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
            width: '65%',
          }}
        >
          <Text style={styles.exerciseHeadingText}>{title}</Text>
          <Text style={styles.exerciseBodyText}>{description}</Text>
          <Text style={styles.durationHeadingText}>
            Duur: <Text style={styles.durationBodyText}>{duration}</Text>
          </Text>
        </View>

        {/* Favourite Button */}
        <Pressable onPress={() => handleFavourite(id)}>
          {isFavourite ? (
            <Image
              source={require('../../assets/images/favourite_button_on_icon.png')}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
          ) : (
            <Image
              source={require('../../assets/images/favourite_button_off_icon.png')}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
          )}
        </Pressable>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
    width: '100%',
    padding: 25,
  },
  exerciseHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  exerciseBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  durationHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  durationBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
});
