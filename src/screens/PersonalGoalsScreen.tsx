import React, { useState, useRef, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { useGoal } from '../context/GoalContext';

import { GoalListItemAddModal } from '../components/GoalListItemAddModal';
import { GoalListItem } from '../components/GoalListItem';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const PersonalGoalsScreen: React.FC<{ route: any }> = ({ route }) => {
  const scrollRef = useRef<ScrollView>(null);
  const { goalEntries } = useGoal();

  const [modalAddGoalListItemVisible, setModalAddGoalListItemVisible] =
    useState<boolean>(false);

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
      <GoalListItemAddModal
        modalAddGoalListItemVisible={modalAddGoalListItemVisible}
        setModalAddGoalListItemVisible={setModalAddGoalListItemVisible}
      />
      <ScrollView
        ref={scrollRef}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <>
          {/* Headers */}
          <View style={styles.headersContainer}>
            <Text style={styles.headersTitleText}>Persoonlijke doelen</Text>
            <Text style={styles.headersDescriptionText}>
              Stel een doel dat je helpt om je mentaal gezond te voelen. Door er
              met aandacht aan te werken, ontdek je stap voor stap wat jou
              helpt.
            </Text>
            {/* Headers Inner Container */}
            <View style={styles.headersInnerContainer}>
              <View style={{ width: '80%' }}>
                <Text style={styles.headersHeadingText}>Mijn doelen</Text>
                <Text style={styles.headersDescriptionText}>
                  Bekijk hieronder je voortgang of voeg een nieuw doel toe via
                  de + knop.
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
                  Je hebt nog geen doelen aangemaakt.
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
    backgroundColor: '#F9F9F9',
    paddingBottom: 120,
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
    paddingVertical: 20,
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
