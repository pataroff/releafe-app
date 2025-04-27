import React, { useState, useEffect, useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../context/NotificationContext';

import { GoalListItemAddModal } from '../components/GoalListItemAddModal';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

import { GoalContext } from '../context/GoalContext';
import GoalListItem from '../components/GoalListItem';

const windowWidth = Dimensions.get('window').width;

export const PersonalGoalsScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const { scheduleEvery3DaysNotification, scheduleReminder3DaysNotification } =
    useNotification();
  const { goalEntries } = useContext(GoalContext);

  const [modalAddGoalListItemVisible, setModalAddGoalListItemVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (goalEntries.length === 0) {
      scheduleEvery3DaysNotification();
    }

    if (goalEntries.length > 0) {
      const eligibleGoals = goalEntries.filter(
        (goal) =>
          goal.endDate &&
          (goal.timeframe === 'WEEKLY' || goal.timeframe === 'MONTHLY')
      );

      const upcomingGoals = eligibleGoals.filter((goal) => {
        const now = new Date();
        const deadline = new Date(goal.endDate!);

        const timeDiff = deadline.getTime() - now.getTime();
        const daysUntilDeadline = timeDiff / (1000 * 60 * 60 * 24); // Convert ms to days

        return daysUntilDeadline >= 3 && daysUntilDeadline <= 4;
      });

      if (upcomingGoals.length > 0) {
        // Pick the goal with the earliest deadline
        const soonestGoal = upcomingGoals.reduce((a, b) =>
          new Date(a.endDate!) < new Date(b.endDate!) ? a : b
        );

        scheduleReminder3DaysNotification(soonestGoal);
      }
    }
  }, [goalEntries]);

  return (
    <>
      <GoalListItemAddModal
        modalAddGoalListItemVisible={modalAddGoalListItemVisible}
        setModalAddGoalListItemVisible={setModalAddGoalListItemVisible}
      />

      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <>
          {/* Headers */}
          <View style={styles.headersContainer}>
            <Text style={styles.headersTitleText}>Persoonlijke doelen</Text>
            <Text style={styles.headersDescriptionText}>
              Het stellen van persoonlijke doelen helpt je om je op specifieke
              gebieden te richten die je mentale welzijn bevorderen. Door er
              gemotiveerd en bewust mee aan de slag te gaan, zorgt dit voor een
              positieve gedragsverandering.
            </Text>
            {/* Headers Inner Container */}
            <View style={styles.headersInnerContainer}>
              <View style={{ width: '80%' }}>
                <Text style={styles.headersHeadingText}>Mijn doelen</Text>
                <Text style={styles.headersDescriptionText}>
                  Bekijk hieronder de voortgang van je persoonlijke doelen of
                  stel via de + knop hiernaast een nieuwe persoonlijk doel in.
                </Text>
              </View>
              {/* Add Button */}
              <Pressable
                style={styles.addButton}
                onPress={() =>
                  setModalAddGoalListItemVisible(!modalAddGoalListItemVisible)
                }
              >
                <Entypo name='plus' size={32} color='#5C6B57' />
              </Pressable>
            </View>
          </View>

          {/* Goals List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.goalListContainer}
            contentContainerStyle={styles.goalListContentContainer}
          >
            {goalEntries.length > 0 ? (
              <View style={styles.goalsContainer}>
                {goalEntries.map((item) => {
                  return <GoalListItem key={item.uuid} item={item} />;
                })}
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataTitleText}>Geen doelen</Text>
                <Text style={styles.noDataDescriptionText}>
                  Bekijk hier je persoonlijke doelen, of voeg een nieuw doel
                  toe.
                </Text>
              </View>
            )}
          </ScrollView>
        </>
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
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
  },

  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 18,
    marginTop: 10,
  } as TextStyle,
  addButton: {
    borderRadius: 15,
    height: 50,
    width: 50,
    backgroundColor: '#E5F1E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalListContainer: {
    marginVertical: 20,
    flex: 1,
  },
  goalListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    rowGap: 10,
  },
  goalsContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  noDataTitleText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
});
