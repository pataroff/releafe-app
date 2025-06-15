import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

import { WorryListModal } from './WorryListModal';
import { WorryListItemAddModal } from './WorryListItemAddModal';
import { ReframingModal } from './ReframingModal';
import { EarnedPointsModal } from './EarnedPointsModal';

import { useWorry } from '../context/WorryContext';
import { useNote } from '../context/NoteContext';
import { useGamification } from '../context/GamificationContext';

import {
  findAchievementById,
  evaluateAllAchievements,
} from '../utils/achievements';

const windowWidth = Dimensions.get('window').width;

// @TODO Correct the `route` type annotation!
export const WorryDrawer: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const { worryEntries } = useWorry();
  const { noteEntries } = useNote();
  const {
    unlockedAchievements,
    setUnlockedAchievemnts,
    updateUnlockedAchievementsInDatabase,
    setAchievementQueue,
  } = useGamification();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalWorryListVisible, setModalWorryListVisible] =
    useState<boolean>(false);
  const [modalAddWorryListItemVisible, setModalAddWorryListItemVisible] =
    useState<boolean>(false);
  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  const [earnedPointsModalVisible, setEarnedPointsModalVisible] =
    useState<boolean>(false);

  const handleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(true);
      setTimeout(() => {
        setModalWorryListVisible(true);
      }, 500);
    } else {
      setModalWorryListVisible(false);
      setTimeout(() => {
        setIsDrawerOpen(false);
      }, 500);
    }
  };

  return (
    <>
      {/* Earned Points Modal */}
      <EarnedPointsModal
        visible={earnedPointsModalVisible}
        setVisible={setEarnedPointsModalVisible}
        points={20}
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

          // @TODO The problem here is that we delete a worry entry post creation of a note entry,
          // therefore the `onWorryCreated` evaluation will evaluate to false cause worryEntries.length <= 0!
          await evaluateAllAchievements('onWorryCreated', {
            worryEntries,
            unlockedAchievements: latestUnlockedAchievements,
            unlockAchievement: wrappedUnlockAchievement,
          });

          await evaluateAllAchievements('onReframingCompleted', {
            noteEntries,
            unlockedAchievements: latestUnlockedAchievements,
            unlockAchievement: wrappedUnlockAchievement,
          });
        }}
      />
      {/* Worry List Modal */}
      <WorryListModal
        modalWorryListVisible={modalWorryListVisible}
        setModalWorryListVisible={setModalWorryListVisible}
        modalAddWorryListItemVisible={modalAddWorryListItemVisible}
        setModalAddWorryListItemVisible={setModalAddWorryListItemVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        handleDrawer={handleDrawer}
      />

      {/* Add Worry List Item Modal */}
      <WorryListItemAddModal
        modalAddWorryListItemVisible={modalAddWorryListItemVisible}
        setModalAddWorryListItemVisible={setModalAddWorryListItemVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        handleDrawer={handleDrawer}
      />

      {/* Reframing Modal */}
      <ReframingModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        handleDrawer={handleDrawer}
        earnedPointsModalVisible={earnedPointsModalVisible}
        setEarnedPointsModalVisible={setEarnedPointsModalVisible}
      />

      {/* Headers */}
      <View style={styles.headersContainer}>
        <Text style={styles.headersTitleText}>Zorgenbakje</Text>
        <Text style={styles.headersDescriptionText}>
          Het Zorgenbakje is een veilige plek om je zorgen en angsten op te
          schrijven en even los te laten. Door ze hier op te bergen, geef je
          jezelf even ruimte en rust. Dit helpt om je hoofd leeg te maken.
        </Text>
        {/* Headers Inner Container */}
        <View style={styles.headersInnerContainer}>
          <View style={{ width: '80%' }}>
            <Text style={styles.headersHeadingText}>Mijn zorgen</Text>
            <Text style={styles.headersDescriptionText}>
              Klik op de lade hieronder om je opgeborgen zorgen te bekijken. Wil
              je iets nieuws toevoegen? Gebruik dan de + knop.
            </Text>
          </View>
          {/* Add Button */}
          <Pressable
            style={styles.addButton}
            onPress={() => {
              setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
            }}
          >
            <Entypo name='plus' size={32} color='#5C6B57' />
          </Pressable>
        </View>

        {/* Drawer */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            marginTop: 40,
          }}
        >
          {isDrawerOpen ? (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: 340, height: 150 }}
                source={require('../../assets/images/drawer_open.png')}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: 380, height: 150 }}
                source={require('../../assets/images/drawer_closed.png')}
              />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
