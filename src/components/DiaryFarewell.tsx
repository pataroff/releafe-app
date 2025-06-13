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

import {
  useRoute,
  useNavigation,
  useFocusEffect,
  StackActions,
  RouteProp,
} from '@react-navigation/native';
import { EarnedPointsModal } from './EarnedPointsModal';

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

  const [earnedPointsModalVisible, setEarnedPointsModalVisible] =
    useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (showEarnedPointsModal && !hasShownModal) {
        setEarnedPointsModalVisible(true);
        setHasShownModal(true);
      }
    }, [hasShownModal])
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
    fontSize: 20,
  } as TextStyle,
  diaryDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
  dateLabel: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  dateText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
  continueButton: {
    width: 150,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 4,
    marginTop: 10,
  },
  dashboardButton: {
    width: 225,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: '#90A38A',
  },
  dashboardButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
    fontSize: 13,
  } as TextStyle,
  closeButton: {
    width: 125,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 0.5,
  },
  closeButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
