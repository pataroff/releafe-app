import React, { useState, useContext } from 'react';

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
import { IGoalEntry, Timeframe } from '../types';
import {
  getGoalCategoryIcon,
  getGoalCategoryString,
  getTimeframeString,
} from '../utils/goal';

import Entypo from '@expo/vector-icons/Entypo';

import { GoalContext } from '../context/GoalContext';

const GoalListItem: React.FC<{ item: IGoalEntry }> = ({ item }) => {
  const {
    uuid,
    category,
    title,
    description,
    sentence,
    timeframe,
    targetFrequency,
    startDate,
    endDate,
    completedTimeframe,
    completedPeriod,
  } = item;

  const { deleteGoalEntry } = useContext(GoalContext);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [timeframeProgressValue, setTimeframeProgressValue] =
    useState<number>(completedTimeframe);
  const [periodProgressValue, setPeriodProgressValue] =
    useState<number>(completedPeriod);

  const getDaysBetweenDates = (
    startDate: Date | null | undefined,
    endDate: Date | null | undefined
  ): number => {
    if (!startDate || !endDate) {
      console.error('startDate and endDate must not be null or undefined');
      return 0;
    }

    const timeDifference = Math.abs(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference;
  };

  return (
    <View style={styles.goalComponent}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {/* Category Icon */}
        <Image
          style={{
            width: 40,
            height: 40,
            alignSelf: isExpanded ? 'flex-start' : 'center',
          }}
          source={getGoalCategoryIcon(category)}
        />

        {/* Main Content Container */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
          }}
        >
          {/* Category + Title */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text style={styles.h2Text}>{getGoalCategoryString(category)}</Text>
            <Text style={styles.h3Text}>{title}</Text>
          </View>

          {/* Collapsed Container */}
          {!isExpanded && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                rowGap: 15,
                marginTop: 10,
              }}
            >
              <Text style={styles.bodyText}>{sentence}</Text>

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
                  <Text style={styles.timeframeText}>
                    {(() => {
                      const timeframeString = getTimeframeString(timeframe);
                      return (
                        timeframeString.charAt(0).toUpperCase() +
                        timeframeString.slice(1)
                      );
                    })()}
                  </Text>
                  <Text style={styles.completedTimeframeText}>
                    {completedTimeframe}/
                    {timeframe !== Timeframe.Daily
                      ? targetFrequency
                      : getDaysBetweenDates(startDate, endDate)}
                  </Text>
                </View>
                <ProgressBar
                  progress={timeframeProgressValue}
                  color='#A9C1A1'
                  style={styles.progressBar}
                />
              </View>
            </View>
          )}

          {/* Expanded Container */}
          {isExpanded && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                rowGap: 15,
                marginTop: 10,
              }}
            >
              <Text style={styles.bodyText}>{description}</Text>

              {/* Sentence Container */}
              <View style={{ rowGap: 5 }}>
                <Text style={styles.h2Text}>Mijn persoonlijke doel</Text>
                <Text style={styles.bodyText}>{sentence}</Text>
              </View>

              <Text style={styles.h3Text}>Statistieken</Text>

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
                    Statistieken voor tijdsframe (
                    {getTimeframeString(timeframe)})
                  </Text>

                  <Text style={styles.completedTimeframeText}>
                    {completedTimeframe}/
                    {timeframe !== Timeframe.Daily
                      ? targetFrequency
                      : // @ts-ignore
                        getDaysBetweenDates(startDate, endDate)}
                  </Text>
                </View>
                <ProgressBar
                  progress={timeframeProgressValue}
                  color='#A9C1A1'
                  style={styles.progressBar}
                />
                {/* Timeframe Percentage Text */}
                <Text style={styles.percentageText}>
                  {timeframeProgressValue * 100}%
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
                >
                  <Text style={styles.progressBarText}>
                    Statistieken voor gehele looptijd
                  </Text>

                  <Text style={styles.completedTimeframeText}>
                    {completedTimeframe}/
                    {timeframe !== Timeframe.Daily
                      ? targetFrequency
                      : // @ts-ignore
                        getDaysBetweenDates(startDate, endDate)}
                  </Text>
                </View>

                <ProgressBar
                  progress={periodProgressValue}
                  color='#A9C1A1'
                  style={styles.progressBar}
                />
                {/* Period Percentage Text */}
                <Text style={styles.percentageText}>
                  {periodProgressValue * 100}%
                </Text>
              </View>

              {/* Statistics Box */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#E5F1E3',
                  borderRadius: 20,
                  padding: 20,
                  columnGap: 5,
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
                  <Text style={styles.statisticsDataHeadingText}>
                    Startdatum
                  </Text>
                  <Text style={styles.statisticsDataHeadingText}>
                    Einddatum
                  </Text>
                  <Text style={styles.statisticsDataHeadingText}>
                    Dagen actief
                  </Text>
                  <Text style={styles.statisticsDataHeadingText}>
                    Dagen tot einddatum
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
                    {new Date(startDate as Date).toLocaleDateString('nl-NL', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.statisticsDataBodyText}>
                    {new Date(endDate as Date).toLocaleDateString('nl-NL', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.statisticsDataBodyText}>
                    {/* @TODO Is `Math.round` the best solution here? What about incrementing by 1? */}
                    {Math.round(getDaysBetweenDates(startDate, new Date()))}
                  </Text>
                  <Text style={styles.statisticsDataBodyText}>
                    {Math.floor(getDaysBetweenDates(new Date(), endDate))}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => deleteGoalEntry(uuid)}
                style={styles.viewButton}
              >
                <Text style={styles.buttonText}>Doel verwijderen</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Expand/Collapse Button */}
        <Pressable
          style={{
            alignSelf: isExpanded ? 'flex-start' : 'center',
          }}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Entypo name='chevron-up' size={32} color='#5c6b57' />
          ) : (
            <Entypo name='chevron-down' size={32} color='#5c6b57' />
          )}
        </Pressable>
      </View>
    </View>
  );
};
export default GoalListItem;
const styles = StyleSheet.create({
  goalComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  h2Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  timeframeText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  completedTimeframeText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 10,
    width: '100%',
  },
  progressBarText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 9.5,
  } as TextStyle,
  percentageText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  statisticsDataHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  statisticsDataBodyText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  buttonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  viewButton: {
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 8,
    backgroundColor: '#5c6b57',
  },
});
