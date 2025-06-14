import React, { createContext, useState, useContext } from 'react';
import { ISettingsContext } from '../types';

import pb from '../lib/pocketbase';
import { useAuth } from './AuthContext';

// Inside SettingsContext.tsx
export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [favouriteExercises, setFavouriteExercises] = useState<string[]>([]);

  const updateFavouritesInDatabase = async (favouriteExercises: string[]) => {
    try {
      const favouriteExercisesJSON = JSON.stringify(favouriteExercises);
      await pb.collection('users').update(user?.id!, {
        favouriteExercises: favouriteExercisesJSON,
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
