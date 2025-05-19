import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageSourcePropType,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { performanceBonsaiState } from '../utils/bonsai';
import { useGamification } from '../context/GamificationContext';

const lockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');
const achievementIcons: Record<string, ImageSourcePropType> = {
  betrokken_ontdekker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (1 ster).png'),
  betrokken_ontdekker_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (2 sterren).png'),
  betrokken_ontdekker_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (3 sterren).png'),
  innerlijke_tuinier_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (1 ster).png'),
  innerlijke_tuinier_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (2 sterren).png'),
  innerlijke_tuinier_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (3 sterren).png'),
  aandachtige_ontdekker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (1 ster).png'),
  aandachtige_ontdekker_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (2 sterren).png'),
  aandachtige_ontdekker_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (3 sterren).png'),
  gedreven_onderzoeker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Gedreven Onderzoeker.png'),
  doelgerichte_groier_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (1 ster).png'),
  doelgerichte_groier_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (2 sterren).png'),
  doelgerichte_groier_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (3 sterren).png'),
  zucht_van_opluchting_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Zucht Van Opluchting.png'),
  de_optimist_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_De Optimist.png'),
  innerlijke_rust_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Rust.png'),
};

export const PerformanceOverview: React.FC = () => {
  const { treeState, unlockedAchievements } = useGamification();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.performanceContainerHeadingText}>
          Jouw prestaties
        </Text>

        {/* Bonsai Tree Performance Container */}
        <View>
          <Text style={styles.performanceHeadingText}>
            Je hebt dit voor je bonsai gekocht
          </Text>
          {/* Performance Data Container */}
          <View style={styles.performanceDataContainer}>
            {/* Bonsai Tree Data Container */}
            <View style={styles.bonsaiTreeDataContainer}>
              {performanceBonsaiState.map((state, index) => {
                const { label, icon, key } = state;

                return (
                  <Pressable key={index} style={styles.bonsaiTreeDataItem}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      resizeMode='contain'
                      source={icon}
                    />
                    <View
                      style={{
                        height: 40,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={styles.performanceHeadingText}>{label}</Text>
                      <Text style={styles.performanceBodyText}>
                        Je bent op
                        <Text style={styles.performanceLevelText}>
                          {' '}
                          niveau{' '}
                          {
                            //@ts-expect-error
                            treeState[key] + 1
                          }
                        </Text>
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Achievments Performance Container */}
        <View>
          <Text style={styles.performanceHeadingText}>
            Je hebt deze badges verdiend
          </Text>
          <View style={styles.achievementsDataContainer}>
            {Array.from({ length: 4 }).map((_, index) => {
              const achievementId = unlockedAchievements[index];
              const iconSource = achievementId
                ? achievementIcons[achievementId]
                : lockedIcon;

              return (
                <Pressable key={index} style={styles.achievementDataItem}>
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={iconSource}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 325,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 25,
    padding: 25,
    marginTop: 20,
    marginBottom: 120,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  performanceDataContainer: {
    marginTop: 10,
    rowGap: 15,
  },
  bonsaiTreeDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
  },
  bonsaiTreeDataItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    columnGap: 15,
  },
  performanceContainerHeadingText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  performanceHeadingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  performanceBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  performanceLevelText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  achievementsDataContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
    justifyContent: 'center',
  },
  achievementDataItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
