import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

import { useDiary } from '../context/DiaryContext';
import { useGamification } from '../context/GamificationContext';

import { evaluateAllAchievements } from '../utils/achievements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DASHBOARD_LAST_OPENED_KEY = 'DASHBOARD_LAST_OPENED';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';
  const { diaryEntries } = useDiary();
  const { unlockedAchievements, unlockAchievement } = useGamification();

  useEffect(() => {
    if (diaryEntries.length > 0) {
      evaluateAllAchievements('onWellBeingDataAvailable', {
        diaryEntries,
        unlockedAchievements,
        unlockAchievement,
      });
    }

    const storeDashboardOpenTime = async () => {
      const now = new Date().toISOString();
      await AsyncStorage.setItem(DASHBOARD_LAST_OPENED_KEY, now);
    };

    storeDashboardOpenTime();
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
