import React, { useRef, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';

import { WorryDrawer } from '../components/WorryDrawer';

import { useFocusEffect } from '@react-navigation/native';

// @TODO Correct the `route` type annotation!
export const WorryBoxScreen: React.FC<{ route: any }> = ({ route }) => {
  const scrollRef = useRef<ScrollView>(null);

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
      <ScrollView
        ref={scrollRef}
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <WorryDrawer route={route} />
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
  },
});
