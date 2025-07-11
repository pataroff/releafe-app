import { useRef, useCallback } from 'react';

import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';

import { LoginForm } from '../components/LoginForm';

import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const LoginScreen = () => {
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
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <View style={styles.logoContainer}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            source={require('../../assets/images/logo_releafe_04.png')}
          />
        </View>
        <LoginForm />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyles: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    paddingHorizontal: 25,
    paddingVertical: 80,
  },
  logoContainer: {
    paddingHorizontal: 15,
    height: 100,
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 30,
  },
});
