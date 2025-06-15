import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';
import { Fonts } from '../styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useAuth } from '../context/AuthContext';
import { useDiary } from '../context/DiaryContext';
import { useGoal } from '../context/GoalContext';
import { useGamification } from '../context/GamificationContext';

import {
  useRoute,
  useNavigation,
  useFocusEffect,
  StackActions,
  RouteProp,
} from '@react-navigation/native';
import { EarnedPointsModal } from './EarnedPointsModal';
import {
  findAchievementById,
  evaluateAllAchievements,
} from '../utils/achievements';

const windowWidth = Dimensions.get('window').width;

// @TODO Move this into `types.ts` and apply the same principle to other stack navigators!
type DiaryStackParamList = {
  DiaryFarewell: {
    earnedPoints: number;
    goalCompleted: boolean;
    showEarnedPointsModal: boolean;
  };
  // ... other routes
};

export const DiaryFarewell: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<DiaryStackParamList, 'DiaryFarewell'>>();

  const { showEarnedPointsModal, earnedPoints, goalCompleted } = route.params;

  const { user } = useAuth();
  const { diaryEntries } = useDiary();
  const { goalEntries } = useGoal();
  const {
    unlockedAchievements,
    setUnlockedAchievemnts,
    updateUnlockedAchievementsInDatabase,
    setAchievementQueue,
  } = useGamification();

  const [earnedPointsModalVisible, setEarnedPointsModalVisible] =
    useState<boolean>(false);
  const [hasShownPointsModal, setHasShownPointsModal] =
    useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (showEarnedPointsModal && !hasShownPointsModal) {
        setEarnedPointsModalVisible(true);
        setHasShownPointsModal(true);
      }
    }, [hasShownPointsModal])
  );

  const handleStackReset = (continueFlow: boolean) => {
    navigation.dispatch(StackActions.popToTop());
    if (continueFlow) {
      navigation.navigate('WellbeingOverview');
    } else {
      navigation.navigate('Diary1');
    }
  };

  return (
    <>
      <EarnedPointsModal
        visible={earnedPointsModalVisible}
        setVisible={setEarnedPointsModalVisible}
        points={earnedPoints}
        goalCompleted={goalCompleted}
        onClose={async () => {
          // NOTE: This solution ensures that achievements are not missed due to stale state.
          // ⚠️ React state updates (like setUnlockedAchievements) are async and not immediate.
          // When calling `evaluateAllAchievements` multiple times in a row,
          // the second call may still receive the old value of `unlockedAchievements`,
          // causing achievements to be skipped or overwritten.
          //
          // ✅ We work around this by maintaining a local `latestUnlockedAchievements` list
          // that is updated *immediately* when `wrappedUnlockAchievement` is called.
          // This ensures consistency across consecutive evaluations.
          //
          // @TODO Consider refactoring achievement tracking into a reducer or middleware
          // to fully centralize state and avoid workarounds like this.

          let latestUnlockedAchievements = [...unlockedAchievements];

          const wrappedUnlockAchievement = async (achievementId: string) => {
            if (latestUnlockedAchievements.includes(achievementId)) return;

            try {
              const updatedUnlocked = [
                achievementId,
                ...latestUnlockedAchievements,
              ];
              setUnlockedAchievemnts(updatedUnlocked);
              latestUnlockedAchievements = updatedUnlocked;

              await updateUnlockedAchievementsInDatabase(updatedUnlocked);
              const achievement = findAchievementById(achievementId);
              if (achievement) {
                setAchievementQueue((prev) => [...prev, achievement]);
              }
            } catch (error) {
              console.error('Error unlocking achievement:', error);
              setUnlockedAchievemnts(latestUnlockedAchievements);
            }
          };

          await evaluateAllAchievements('onDiaryCompleted', {
            diaryEntries,
            unlockedAchievements: latestUnlockedAchievements,
            unlockAchievement: wrappedUnlockAchievement,
          });

          if (goalCompleted) {
            await evaluateAllAchievements('onGoalCompleted', {
              goalEntries,
              unlockedAchievements: latestUnlockedAchievements,
              unlockAchievement: wrappedUnlockAchievement,
            });
          }
        }}
      />
      <View style={styles.container}>
        {/* Header Container */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 20,
            marginTop: 10,
          }}
        >
          <FontAwesome name='thumbs-up' size={36} color='#5C6B57' />
          <Text style={styles.greetingText}>
            Goed gedaan, {user?.firstName}!
          </Text>
        </View>

        {/* Body Container */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20,
            marginTop: 20,
          }}
        >
          <Text style={styles.diaryDescriptionText}>
            Als je je dagboek vaak invult, krijg je meer inzicht in hoe het met
            je gaat. Je ziet dit terug in je welzijnsoverzicht.
          </Text>
        </View>

        <Pressable
          onPress={() => handleStackReset(true)}
          style={styles.dashboardButton}
        >
          <Text style={styles.dashboardButtonText}>
            Bekijk mijn welzijnsoverzicht
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleStackReset(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Afsluiten</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 25,
    width: windowWidth - 2 * 25,
    borderRadius: 30,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  greetingText: {
    alignSelf: 'flex-start',
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  diaryDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
  } as TextStyle,
  dateLabel: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  dateText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  dashboardButton: {
    width: 225,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    marginTop: 20,
    backgroundColor: '#90A38A',
  },
  dashboardButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  closeButton: {
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
  },
  closeButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
});
