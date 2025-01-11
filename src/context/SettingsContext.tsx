import React, { createContext, useState, useContext } from 'react';
import { ISettingsContext } from '../types';

import pb from '../lib/pocketbase';
import { AuthContext } from './AuthContext';

export const SettingsContext = createContext<ISettingsContext>({
  favouriteExercises: [],
  setFavouriteExercises: () => {},
  updateFavouritesInDatabase: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);
  const [favouriteExercises, setFavouriteExercises] = useState<string[]>([]);

  const updateFavouritesInDatabase = async (favouriteExercises: string[]) => {
    try {
      // Convert the array of exercise IDs to a JSON string if necessary (depends on Pocketbase's field type)
      const favouriteExercisesJSON = JSON.stringify(favouriteExercises);

      const userRecord = await pb.collection('users').getOne(user?.id);

      // Update the user document with the serialized favorite exercises
      await pb.collection('users').update(userRecord.id, {
        favouriteExercises: favouriteExercisesJSON, // Update this field with JSON
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        favouriteExercises,
        setFavouriteExercises,
        updateFavouritesInDatabase,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
