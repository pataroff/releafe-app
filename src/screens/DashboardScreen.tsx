import React, { useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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

  const scrollRef = useRef<ScrollView>(null);

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
  }, [diaryEntries]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const scrollToTopNextFrame = () => {
        requestAnimationFrame(() => {
          if (cancelled) return;

          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0, animated: false });
          } else {
            scrollToTopNextFrame(); // Try again next frame
          }
        });
      };

      scrollToTopNextFrame();

      return () => {
        cancelled = true;
      };
    }, [])
  );

  return (
    <>
      <StatusBar />
      <Header title={title} />
      <ScrollView
        ref={scrollRef}
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
