import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import { TreeStateKey } from '../types';

import {
  performanceBonsaiState,
  lockedIcon,
  achievementIcons,
} from '../utils/gamification';

import { useGamification } from '../context/GamificationContext';

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
                  <View key={index} style={styles.bonsaiTreeDataItem}>
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
                          {treeState[key as TreeStateKey] !== null
                            ? treeState[key as TreeStateKey]! + 1
                            : 0}
                        </Text>
                      </Text>
                    </View>
                  </View>
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
                <View key={index} style={styles.achievementDataItem}>
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={iconSource}
                  />
                </View>
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
