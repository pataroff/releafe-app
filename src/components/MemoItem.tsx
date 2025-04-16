import { useState, useEffect, useRef, useCallback } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { FontAwesome5 } from '@expo/vector-icons';

import { Audio, AVPlaybackStatus } from 'expo-av';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const MemoItem = ({
  uri,
  metering,
  containerStyle,
}: {
  uri: string;
  metering: number[];
  containerStyle?: ViewStyle;
}) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const loadSound = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    console.log('Loading Sound...');

    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      onPlaybackStatusUpdate
    );
    soundRef.current = sound;
  };

  const onPlaybackStatusUpdate = async (newStatus: AVPlaybackStatus) => {
    setStatus(newStatus);

    if (!soundRef.current) {
      return;
    }

    if (newStatus.isLoaded && newStatus.didJustFinish) {
      await soundRef.current.setPositionAsync(0);
    }
  };

  useEffect(() => {
    loadSound();
  }, [uri]);

  const playSound = async () => {
    if (!soundRef.current) {
      return;
    }
    if (status?.isLoaded && status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.replayAsync();
    }
  };

  const formatMillis = (millis: number) => {
    const minutes = Math.floor(millis / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded ? status.durationMillis : 1;

  // @ts-ignore
  const progress = position / duration;

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${progress * 100}%`,
  }));

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        console.log('Unloading Sound');
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  let lines = [];
  let numLines = 25;

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * metering.length) / numLines);
    const nextMeteringIndex = Math.ceil(((i + 1) * metering.length) / numLines);

    const values = metering.slice(meteringIndex, nextMeteringIndex);
    const average = values.reduce((sum, a) => sum + a, 0) / values.length;
    lines.push(average);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={playSound}>
        <FontAwesome5
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color='gray'
        />
      </Pressable>
      <View style={styles.playbackContainer}>
        {/* <View style={styles.playbackBackground}></View> */}

        <View style={styles.wave}>
          {lines?.map((db, index) => (
            <View
              key={index}
              style={[
                styles.waveLine,
                {
                  height: interpolate(
                    db,
                    [-60, 0],
                    [5, 50],
                    Extrapolation.CLAMP
                  ),
                  backgroundColor:
                    progress > index / lines.length ? 'royalblue' : 'gainsboro',
                },
              ]}
            ></View>
          ))}
        </View>

        {/* <Animated.View
          style={[styles.playbackIndicator, animatedIndicatorStyle]}
        ></Animated.View> */}
        <Text
          style={
            {
              verticalAlign: Platform.OS == 'android'? "top" : {},
              position: 'absolute',
              right: 0,
              bottom: 0,
              color: 'gray',
              ...Fonts.sofiaProRegular[Platform.OS],
              fontSize: 12,
            } as TextStyle
          }
        >
          {formatMillis(position || 0)} / {formatMillis(duration || 0)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  playbackContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  playbackBackground: {
    height: 5,
    backgroundColor: 'gainsboro',
    borderRadius: 10,
  },
  playbackIndicator: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'royalblue',
    position: 'absolute',
  },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveLine: {
    flex: 1,
    height: 30,
    backgroundColor: 'gainsboro',
    borderRadius: 20,
  },
});
