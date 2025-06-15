import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

import { useDiary } from '../context/DiaryContext';
import { useGamification } from '../context/GamificationContext';
import { useNotification } from '../context/NotificationContext';

import { evaluateAllAchievements } from '../utils/achievements';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';
  const { diaryEntries } = useDiary();
  const { unlockedAchievements, unlockAchievement } = useGamification();
  const { scheduleDashboardInactivityNotification } = useNotification();

  useEffect(() => {
    if (diaryEntries.length > 0) {
      evaluateAllAchievements('onWellBeingDataAvailable', {
        diaryEntries,
        unlockedAchievements,
        unlockAchievement,
      });
    }

    scheduleDashboardInactivityNotification();
  }, []);

  return (
    <>
      <StatusBar />
      <Header title={title} />
      <ScrollView
        bounces={false}
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
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingBottom: 120,
  },
});
