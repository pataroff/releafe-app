import React, { useEffect, useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { IDiaryEntry } from '../types';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

import pb from '../lib/pocketbase';
import { AuthContext } from '../context/AuthContext';
import { DiaryContext } from '../context/DiaryContext';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';

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
              const { id, uuid, date, sliderValues, textValues } = item;
              return {
                id,
                uuid,
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
      <Header title={title} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Performance />
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
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
});
