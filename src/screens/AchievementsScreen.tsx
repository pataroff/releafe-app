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

const windowWidth = Dimensions.get('window').width;

const lockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');
const achievementsDataContainer = [
  {
    title: 'Betrokken Ontdekker',
    description:
      'Deze badges verdien je wanneer je Releafe gedurende een bepaald aantal dagen consequent gebruikt.',
    achievements: [
      {
        id: 'betrokken_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (1 ster).png'),
        points: 10,
        description:
          'Verdiend door binnen 7 dagen minstens één keer interactie te hebben met verschillende modules in de app.',
      },
      {
        id: 'betrokken_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door de app 7 dagen achter elkaar consequent te gebruiken.',
      },
      {
        id: 'betrokken_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door de app 28 dagen op rij consequent te gebruiken.',
      },
    ],
  },

  {
    title: 'Innerlijke Tuinier',
    description:
      'Deze badges verdien je door een bepaald aantal upgrades voor je bonsaiboom te kopen.',
    achievements: [
      {
        id: 'innerlijke_tuinier_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (1 ster).png'),
        points: 10,
        description:
          'Verdiend bij het voor de eerste keer kopen van een upgrade voor de boom.',
      },
      {
        id: 'innerlijke_tuinier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (2 sterren).png'),
        points: 20,
        description: 'Verdiend door 3 keer upgrades voor de boom te kopen.',
      },
      {
        id: 'innerlijke_tuinier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (3 sterren).png'),
        points: 50,
        description: 'Verdiend door 5 keer upgrades voor de boom te kopen.',
      },
    ],
  },

  {
    title: 'Aandachtige Ontdekker',
    description:
      'Deze badges verdien je door je dagboek gedurende een bepaalde periode consequent bij te houden.',
    achievements: [
      {
        id: 'aandachtige_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (1 ster).png'),
        points: 10,
        description: 'Verdiend door de eerste keer het dagboek in te vullen.',
      },
      {
        id: 'aandachtige_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door dagboek 7 dagen op rij consequent in te vullen.',
      },
      {
        id: 'aandachtige_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door dagboek 28 dagen op rij consequent in te vullen.',
      },
    ],
  },

  {
    title: 'Gedreven Onderzoeker',
    description:
      'Deze badge verdien je door jouw welzijnsoverzicht te bekijken zodra de eerste gegevens beschikbaar zijn.',
    achievements: [
      {
        id: 'gedreven_onderzoeker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Gedreven Onderzoeker.png'),
        points: 20,
        description:
          'Verdiend door het welzijnsoverzicht te bekijken zodra de eerste set gegevens beschikbaar is.',
      },
    ],
  },

  {
    title: 'Doelgerichte Groeier',
    description:
      'Deze badges verdien je door een persoonlijk doel aan te maken en de voortgang hiervan gedurende een bepaalde periode bij te houden.',
    achievements: [
      {
        id: 'doelgerichte_groier_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (1 ster).png'),
        points: 10,
        description: 'Verdiend door een eerste persoonlijk doel aan te maken.',
      },
      {
        id: 'doelgerichte_groier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door voor het eerst in het dagboek aan te geven dat je aan een doel hebt gewerkt.',
      },
      {
        id: 'doelgerichte_groier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door een volledige eerste week van een doel te behalen (dit kan elk doel zijn; de tijdsperiode maakt niet uit, zolang de gebruiker de vereisten voor een week succesvol volbrengt).',
      },
    ],
  },

  {
    title: 'Zucht Van Opluchting',
    description:
      'Deze badge verdien je door voor het eerst een zorg of gedachte op te slaan in het Zorgenbakje.',
    achievements: [
      {
        id: 'zucht_van_opluchting_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Zucht Van Opluchting.png'),
        points: 20,
        description:
          'Verdiend door voor het eerst een zorg of gedachte op te slaan in het Zorgenbakje.',
      },
    ],
  },

  {
    title: 'De Optimist',
    description:
      'Deze badge verdien je door voor het eerst een gedachte of zorg te herformuleren.',
    achievements: [
      {
        id: 'de_optimist_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_De Optimist.png'),
        points: 20,
        description:
          'Verdiend door voor het eerst een gedachte of zorg te herformuleren.',
      },
    ],
  },

  {
    title: 'Innerlijke Rust',
    description:
      'Deze badge verdien je door voor het eerst een ontspanningsoefening te bekijken of te beluisteren.',
    achievements: [
      {
        id: 'innerlijke_rust_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Rust.png'),
        points: 20,
        description:
          'Verdiend door voor het eerste een ontspanningsoefening afgekeken of afgeluisterd te hebben.',
      },
    ],
  },
];

export const AchievementsScreen: React.FC<{ route: any }> = ({ route }) => {
  const title = 'Prestaties';
  const { unlockedAchievements, unlockAchievement } = useGamification();

  const [achievementModalVisible, setAchievementModalVisible] =
    useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<SelectedAchievement>({
      id: '',
      icon: lockedIcon,
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
                              : lockedIcon
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
    paddingBottom: 80,
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
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
