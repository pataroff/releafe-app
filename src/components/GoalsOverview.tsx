import React, { useState, useEffect, useContext } from 'react';

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

import { IGoalEntry, Timeframe } from '../types';
import { Fonts } from '../styles';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import {
  getGoalCategoryString,
  getGoalCategoryIcon,
  highlightFrequency,
  getDaysBetweenDates,
  calculatePeriod,
  formatDateString,
  getTimeframeString,
} from '../utils/goal';
import { GoalContext } from '../context/GoalContext';

export const GoalsOverview = () => {
  const { goalEntries } = useContext(GoalContext);

  const [goalIndex, setGoalIndex] = useState<number>(0);

  const {
    category,
    title,
    sentence,
    timeframe,
    targetFrequency,
    startDate,
    //endDate,
    completedTimeframe,
    completedPeriod,
  } = goalEntries[goalIndex];

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
        <Text style={styles.overviewGoalsHeadingText}>
          Overzicht persoonlijke doelen
        </Text>
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
          paddingRight: 30,
        }}
      >
        <Text style={styles.h2Text}>Doel:</Text>
        <Text style={styles.goalBodyText}>{highlightFrequency(sentence)}</Text>
      </View>

      {/* Statistics Container */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.h2Text}>Statistieken:</Text>

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
              <Text style={styles.progressBarText}>
                Statistieken voor tijdsframe ({getTimeframeString(timeframe)})
              </Text>

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
              {completedTimeframe >= targetFrequency
                ? 100
                : Math.round((completedTimeframe / targetFrequency) * 100)}
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
              {formatDateString(startDate as Date)}
            </Text>
            {/* Completed Timeframe */}
            <Text style={styles.statisticsDataBodyText}>
              {new Date(startDate as Date) > new Date()
                ? 0
                : Math.floor(getDaysBetweenDates(startDate, new Date()))}
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
  },
  overviewGoalsHeadingText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
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
    fontSize: 9.5,
  } as TextStyle,
  percentageText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
