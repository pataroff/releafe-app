import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import { Performance } from '../components/Performance';

import { useNotification } from '../context/NotificationContext';

export const DashboardScreen: React.FC = () => {
  const title = 'Welzijnsoverzicht';
  const { scheduleDashboardInactivityNotification } = useNotification();

  useEffect(() => {
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
    justifyContent: 'space-evenly',
    backgroundColor: '#F9F9F9',
  },
});
