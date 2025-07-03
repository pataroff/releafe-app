import { useRef, useCallback } from 'react';

import { StyleSheet, ScrollView } from 'react-native';

import { DiaryGreeting } from '../components/DiaryGreeting';

import { useFocusEffect } from '@react-navigation/native';

export const DiaryScreen: React.FC<{ route: any }> = ({ route }) => {
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
      <ScrollView
        ref={scrollRef}
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
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
});
