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

import { useSettings } from '../context/SettingsContext';

import { ExercisesListItemExpandedModal } from './ExercisesListItemExpandedModal';
import { EarnedPointsModal } from './EarnedPointsModal';

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
  } = useSettings();
  // Check if the exercise is in the favorite list
  const isFavourite = favouriteExercises.includes(id);

  const [
    modalExercisesListItemExpandedVisible,
    setModalExercisesListItemExpandedVisible,
  ] = useState<boolean>(false);

  const [modalEarnedPointsModalVisible, setModalEarnedPointsModalVisibe] =
    useState<boolean>(false);

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
      <EarnedPointsModal
        visible={modalEarnedPointsModalVisible}
        onClose={() => setModalEarnedPointsModalVisibe(false)}
        points={15}
      />
      <ExercisesListItemExpandedModal
        modalExercisesListItemExpandedVisible={
          modalExercisesListItemExpandedVisible
        }
        setModalExercisesListItemExpandedVisible={
          setModalExercisesListItemExpandedVisible
        }
        exercise={exercise}
        earnedPointsModalVisible={modalEarnedPointsModalVisible}
        setEarnedPointsModalVisible={setModalEarnedPointsModalVisibe}
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
          {/* Reward Container */}
          <View style={{ display: 'flex', flexDirection: 'row', columnGap: 5 }}>
            {/* Points Container */}
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>+15</Text>

              <Image
                style={styles.shopIcon}
                source={require('../../assets/images/bonsai_tree_icons/shop_icon.png')}
                resizeMode='contain'
              />
            </View>
            {/* Trophy Container */}
            <View style={styles.trophyContainer}>
              <Image
                style={styles.trophyIcon}
                source={require('../../assets/images/bonsai_tree_icons/trophy_icon.png')}
                resizeMode='contain'
              />
            </View>
          </View>
          <Text style={styles.exerciseBodyText}>{description}</Text>
          <Text style={styles.durationHeadingText}>
            Duur: <Text style={styles.durationBodyText}>{duration}</Text>
          </Text>
        </View>

        {/* Favourite Button */}
        {/*TODO: Is this correct styling? - Luna*/}
        <Pressable
          onPress={() => handleFavourite(id)}
          style={{ width: 36, height: 36 }}
        >
          {isFavourite ? (
            <Image
              source={require('../../assets/images/favourite_button_on_icon.png')}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ) : (
            <Image
              source={require('../../assets/images/favourite_button_off_icon.png')}
              style={{ width: 24, height: 24 }}
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
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 31,
    columnGap: 5,
    backgroundColor: '#90A38A',
    borderRadius: 7.5,
    padding: 5,
  },
  pointsText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
    fontSize: 16,
  } as TextStyle,
  shopIcon: {
    width: 29,
    height: 20,
    marginBottom: 5,
  },
  trophyContainer: {
    width: 35,
    padding: 5,
    borderRadius: 7.5,
    backgroundColor: '#FCF2D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyIcon: {
    width: 23,
    height: 20,
  },
});
