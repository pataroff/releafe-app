import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  TextStyle,
} from 'react-native';

import { ProgressBar } from 'react-native-paper';

import { Fonts } from '../styles';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import {
  getGoalCategoryString,
  getGoalCategoryIcon,
  highlightFrequency,
  getDaysBetweenDates,
  formatDateString,
} from '../utils/goal';
import { useGoal } from '../context/GoalContext';

export const GoalsOverview: React.FC = () => {
  const { goalEntries } = useGoal();
  const [goalIndex, setGoalIndex] = useState<number>(0);

  // Clamp index immediately if out of bounds BEFORE any hook return
  const clampedGoalIndex = Math.min(
    goalIndex,
    Math.max(0, goalEntries.length - 1)
  );

  useEffect(() => {
    if (goalIndex !== clampedGoalIndex) {
      setGoalIndex(clampedGoalIndex);
    }
  }, [goalEntries.length]);

  // Still allow early return for empty goals
  if (goalEntries.length === 0) return null;

  const currentGoal = goalEntries[clampedGoalIndex];

  const {
    category,
    title,
    sentence,
    targetFrequency,
    completedTimeframe,
    completedPeriod,
    createdDate,
  } = currentGoal;

  const [timeframeProgressValue, setTimeframeProgressValue] = useState<number>(
    completedTimeframe / 10
  );
  const [periodProgressValue, setPeriodProgressValue] = useState<number>(
    completedPeriod / 10
  );

  // Update progress values when `goalIndex` chanes
  useEffect(() => {
    setTimeframeProgressValue(completedTimeframe / 10);
    setPeriodProgressValue(completedPeriod / 10);
  }, [completedTimeframe, completedPeriod]);

  const handlePrevious = () => {
    if (goalIndex !== 0) {
      setGoalIndex((prev) => --prev);
    }
  };

  const handleNext = () => {
    if (goalIndex < goalEntries.length - 1) {
      setGoalIndex((prev) => ++prev);
    }
  };

  return (
    <View style={styles.overviewGoalsContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        <Text style={styles.overviewGoalsHeadingText}>Overzicht doelen</Text>
      </View>

      {/* Goal Headers Container */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {/* Category Icon */}
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={getGoalCategoryIcon(category)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text style={styles.h1Text}>{getGoalCategoryString(category)}</Text>
          <Text style={styles.h3Text}>{title}</Text>
        </View>
      </View>

      {/* Goal Body Container */}
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          columnGap: 10,
        }}
      >
        <Text style={styles.h2Text}>Doel:</Text>
        <Text style={styles.goalBodyText}>{highlightFrequency(sentence)}</Text>
      </View>

      {/* Statistics Container */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.h2Text}>Voortgang:</Text>

        {/* Progress Bars Container */}
        <View style={{ width: 220, alignSelf: 'center', marginTop: 20 }}>
          {/* Timeframe Progress Bar */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 5,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.progressBarText}>Aantal keer behaald</Text>

              <Text style={styles.completedTimeframeText}>
                {completedTimeframe}/{targetFrequency}
              </Text>
            </View>
            <ProgressBar
              progress={completedTimeframe / targetFrequency}
              color='#A9C1A1'
              style={styles.progressBar}
            />
            {/* Timeframe Percentage Text */}
            <Text style={styles.percentageText}>
              {Math.min(
                100,
                Math.round((completedTimeframe / targetFrequency) * 100)
              )}
              %
            </Text>
          </View>

          {/* Period Progress Bar */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 5,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            ></View>
          </View>
        </View>

        {/* Statistics Box */}
        <View
          style={{
            flex: 1,
            width: 220,
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: '#E5F1E3',
            borderRadius: 20,
            padding: 20,
            columnGap: 5,
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 10,
              width: '50%',
            }}
          >
            <Text style={styles.statisticsDataHeadingText}>Startdatum</Text>
            <Text style={styles.statisticsDataHeadingText}>Dagen actief</Text>
            <Text style={styles.statisticsDataHeadingText}>
              Aantal keer gedaan
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 10,
              width: '50%',
            }}
          >
            <Text style={styles.statisticsDataBodyText}>
              {/* Start Date */}
              {formatDateString(new Date(createdDate!))}
            </Text>
            {/* Days Active */}
            <Text style={styles.statisticsDataBodyText}>
              {new Date(createdDate!) >= new Date()
                ? 1
                : Math.ceil(
                    getDaysBetweenDates(new Date(createdDate!), new Date())
                  )}
            </Text>
            {/* Completed Period */}
            <Text style={styles.statisticsDataBodyText}>{completedPeriod}</Text>
          </View>
        </View>
      </View>

      {/* Goal Index Controls */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => handlePrevious()}
          disabled={goalIndex == 0 ? true : false}
          style={goalIndex == 0 ? { opacity: 0.4 } : {}}
        >
          <MaterialCommunityIcons
            name='chevron-left-circle-outline'
            size={27}
            color='black'
          />
        </Pressable>

        <View style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
          {Array.from({ length: goalEntries.length }).map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: index === goalIndex ? '#829c7a' : '#E4E1E1',
                  borderRadius: 99,
                }}
              ></View>
            );
          })}
        </View>

        <Pressable
          onPress={() => handleNext()}
          disabled={goalIndex == goalEntries.length - 1 ? true : false}
          style={goalIndex == goalEntries.length - 1 ? { opacity: 0.4 } : {}}
        >
          <MaterialCommunityIcons
            name='chevron-right-circle-outline'
            size={27}
            color='black'
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewGoalsContainer: {
    flex: 1,
    width: 325,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  overviewGoalsHeadingText: {
    marginTop: 10,
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  h1Text: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  h2Text: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  h3Text: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  goalHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  goalBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    flexShrink: 1,
  } as TextStyle,
  statisticsHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  statisticsDataContainer: {
    width: 220,
    height: 155,
    backgroundColor: '#E5F1E3',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    rowGap: 10,
  },
  statisticsDataTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statisticsDataHeadingText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  statisticsDataBodyText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBarContainer: {
    marginTop: 10,
    rowGap: 10,
  },
  progressBarHeadingText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBarBodyText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 10,
    width: '100%',
  },
  progressBarPercentageText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  completedTimeframeText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 12,
  } as TextStyle,

  progressBarText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 11,
  } as TextStyle,
  percentageText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
