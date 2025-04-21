import React, { useEffect, useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { IDiaryEntry } from '../types';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

import pb from '../lib/pocketbase';
import { AuthContext } from '../context/AuthContext';
import { DiaryContext } from '../context/DiaryContext';

import { useNotification } from '../context/NotificationContext';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';
  const { scheduleDashboardInactivityNotification } = useNotification();

  const { user } = useContext(AuthContext);
  const { diaryEntries, setDiaryEntries, deserializeRecord } =
    useContext(DiaryContext);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        oneYearAgo.setHours(0, 0, 0, 0);

        try {
          const diaryEntriesList = await pb
            .collection('diary_entries')
            // @TODO A year of data from Date.now() should be readily available on `DashboardScreen` mounted! ✅
            .getList(1, 365, {
              filter: `user.id='${
                user.id
              }' && date >='${oneYearAgo.toISOString()}'`,
              sort: 'date', // asc order. but used to be in desc order
              expand: 'user',
            });

          // @ts-expect-error
          const modifiedDiaryEntriesList: IDiaryEntry[] =
            diaryEntriesList.items.map((item) => {
              const { id, uuid, date, sliderValues, textValues } = item;
              return {
                id,
                uuid,
                date: new Date(date),
                sliderValues: deserializeRecord(sliderValues),
                textValues: deserializeRecord(textValues),
              };
            });

          setDiaryEntries(modifiedDiaryEntriesList);
        } catch (error) {
          console.error('Error fetching diary entries:', error);
        }
      }
    };

    fetchDiaryEntries();
    scheduleDashboardInactivityNotification();
  }, [user]);

  return (
    <>
      <StatusBar />
      <Header title={title} />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <Performance diaryData={diaryEntries} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F9F9F9',
  },
});
