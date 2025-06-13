import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Platform,
  TextStyle,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Fonts } from '../styles';
import { SelectedAchievement, Achievement } from '../types';

import { Header } from '../components/Header';
import { AchievementModal } from '../components/AchievementModal';

import { useGamification } from '../context/GamificationContext';

import {
  achievementsLockedIcon,
  achievementsDataContainer,
} from '../utils/achievements';

const windowWidth = Dimensions.get('window').width;

export const AchievementsScreen: React.FC<{ route: any }> = ({ route }) => {
  const title = 'Prestaties';
  const { unlockedAchievements } = useGamification();

  const [achievementModalVisible, setAchievementModalVisible] =
    useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<SelectedAchievement>({
      id: '',
      icon: achievementsLockedIcon,
      points: 0,
      description: '',
      parentTitle: '',
    });

  const handleAchievementPress = (
    achievement: Achievement,
    parentTitle: string
  ) => {
    setSelectedAchievement({ ...achievement, parentTitle });
    setAchievementModalVisible(true);
  };

  return (
    <>
      <AchievementModal
        achievementModalVisible={achievementModalVisible}
        setAchievementModalVisible={setAchievementModalVisible}
        selectedAchievement={selectedAchievement}
        isAchievementUnlocked={unlockedAchievements.includes(
          selectedAchievement.id
        )}
      />

      <StatusBar />
      <Header title={title} route={route} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Headers */}
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Prestaties</Text>
          <Text style={styles.headersDescriptionText}>
            Dit zijn de prestaties en badges die jij hebt behaald.
          </Text>
        </View>

        <View
          style={{
            rowGap: 30,
            marginBottom: 50,
          }}
        >
          {achievementsDataContainer.map((achievementsData, index) => {
            const { title, description, achievements } = achievementsData;

            const allUnlocked = achievements.every((achievement) =>
              unlockedAchievements.includes(achievement.id)
            );

            return (
              <View
                key={index}
                style={{
                  width: 350,
                  height: 290,
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: allUnlocked ? '#F1FDEF' : '#FFFFFF',
                  justifyContent: 'space-between',
                  // Shadow Test
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 1,
                }}
              >
                <View>
                  <Text style={styles.achievementsContainerHeadingText}>
                    {title}
                  </Text>
                  <Text style={styles.achievementsContainerBodyText}>
                    {description}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: 20,
                  }}
                >
                  {achievements.map((achievement, idx) => {
                    const { id, icon, points } = achievement;

                    return (
                      <Pressable
                        onPress={() =>
                          handleAchievementPress(achievement, title)
                        }
                        key={idx}
                        style={{
                          opacity: unlockedAchievements.includes(id) ? 1 : 0.5,
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={
                            unlockedAchievements.includes(id)
                              ? icon
                              : achievementsLockedIcon
                          }
                          style={{ width: 90, height: 90 }}
                        />

                        <View
                          style={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            columnGap: 5,
                          }}
                        >
                          <Text
                            style={
                              {
                                ...Fonts.sofiaProLight[Platform.OS],
                                fontSize: 20,
                              } as TextStyle
                            }
                          >
                            +{points}
                          </Text>
                          <Image
                            source={require('../../assets/images/bonsai_tree_icons/bonsai_price_icon.png')}
                            style={{
                              width: 25,
                              height: 25,
                              marginBottom: 5,
                            }}
                            resizeMode='contain'
                          />
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 100,
  },
  headersContainer: {
    position: 'relative',
    width: windowWidth,
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  achievementsContainerHeadingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    lineHeight: 30,
    color: '#5C6B57',
  } as TextStyle,
  achievementsContainerBodyText: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 22,
    fontSize: 14,
  } as TextStyle,
});
