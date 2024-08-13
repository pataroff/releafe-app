import React, { useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ScrollView } from 'react-native';

import { DiaryGreeting } from '../components/DiaryGreeting';

import pb from '../lib/pocketbase';
import { AuthContext } from '../context/AuthContext';
import { DiaryContext } from '../context/DiaryContext';
import { IDiaryEntry } from '../types';

export const DiaryScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { setDiaryEntries, jsonToMap } = useContext(DiaryContext);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        try {
          // TODO: Consider subscribing to the `diary_entries` collection!
          const diaryEntriesList = await pb
            .collection('diary_entries')
            .getList(1, 50, {
              filter: `user.id='${user.id}'`,
              sort: '-date', // desc order
              expand: 'user',
            });

          const modifiedDiaryEntriesList: IDiaryEntry[] =
            diaryEntriesList.items.map((item) => {
              const { id, date, sliderValues, textValues } = item;
              return {
                id,
                date: new Date(date),
                sliderValues: jsonToMap(sliderValues),
                textValues: jsonToMap(textValues),
              };
            });

          setDiaryEntries(modifiedDiaryEntriesList);
        } catch (error) {
          console.error('Error fetching diary entries:', error);
        }
      }
    };

    fetchDiaryEntries();
  }, [user]);

  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <DiaryGreeting />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
});
