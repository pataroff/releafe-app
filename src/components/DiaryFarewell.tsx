import React, { useEffect, useCallback, useContext } from 'react';
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

import { DiaryContext } from '../context/DiaryContext';
import { AuthContext } from '../context/AuthContext';

import {
  useNavigation,
  useFocusEffect,
  StackActions,
} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export const DiaryFarewell: React.FC = () => {
  const navigation = useNavigation();
  const { createDiaryEntry, resetSliderValues, resetTextValues } =
    useContext(DiaryContext);
  const { user } = useContext(AuthContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     createDiaryEntry();
  //     resetSliderValues();
  //     resetTextValues();
  //   }, [])
  // );

  const handleStackReset = (continueFlow: boolean) => {
    navigation.dispatch(StackActions.popToTop());
    if (continueFlow) {
      navigation.navigate('WellbeingOverview');
    } else {
      navigation.navigate('Diary1');
    }
  };

  return (
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
          Goed gedaan, {user?.firstName}.{'\n'}Je hebt jouw dagboek met succes
          ingevuld.
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
          <Text style={{ ...(Fonts.poppinsMedium[Platform.OS] as TextStyle) }}>
            Hou dit vol!
          </Text>{' '}
          Door elke dag je dagboek in te vullen, worden de meest waardevolle
          gegevens verzameld. Deze worden opgeslagen in jouw welzijnsoverzicht.
        </Text>
      </View>

      <Pressable
        onPress={() => handleStackReset(true)}
        style={styles.dashboardButton}
      >
        <Text style={styles.dashboardButtonText}>
          Ga door naar welzijnsoverzicht
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handleStackReset(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Afsluiten</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 100,
    width: windowWidth - 2 * 25,
    borderRadius: 30,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    padding: 25,
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
