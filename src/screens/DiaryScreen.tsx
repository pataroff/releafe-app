import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { DiaryGreeting } from '../components/DiaryGreeting';

import { useWorry } from '../context/WorryContext';
import { useDiary } from '../context/DiaryContext';
import { useNotification } from '../context/NotificationContext';

export const DiaryScreen: React.FC<{ route: any }> = ({ route }) => {
  const { worryEntries } = useWorry();
  const { diaryEntries } = useDiary();
  const { scheduleDailyNotification, scheduleReminderWorryBoxNotification } =
    useNotification();

  useEffect(() => {
    // Schedule daily diary notification
    scheduleDailyNotification(
      '20:00',
      'Hoe gaat het vandaag met je?',
      'Neem even de tijd om je dagboek in te vullen – even stilstaan bij hoe het gaat.',
      {
        screen: 'Diary',
        params: {
          screen: 'Diary1',
        },
      }
    );

    // Schedule reminder worry box
    scheduleReminderWorryBoxNotification(worryEntries, diaryEntries);
  }, []);

  return (
    <>
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <DiaryGreeting route={route} />
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
