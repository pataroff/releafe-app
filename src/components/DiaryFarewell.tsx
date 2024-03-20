import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';
import { Fonts } from '../styles';

import { DiaryContext } from '../context/DiaryContext';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DiaryFarewell: React.FC = () => {
  const navigation = useNavigation();
  const { createDiaryEntry } = useContext(DiaryContext);

  useEffect(() => {
    createDiaryEntry();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 10,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <Text style={styles.greetingText}>
          Goed gedaan, Jan.{'\n'}Je hebt jouw dagboek met succes ingevuld.
        </Text>
        <View style={{ paddingVertical: 10 }}>
          <Image
            style={{ width: 290, height: 150 }}
            source={require('../../assets/images/placeholder_image.png')}
          />
        </View>
        <Text style={styles.diaryDescriptionText}>
          Door elke dag je dagboek in te vullen, worden de meest waardevolle
          gegevens verzameld die later kunnen worden geanalyseerd in jouw
          persoonlijk dashboard.
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Diary1')}
          style={styles.dashboardButton}
        >
          <Text style={styles.dashboardButtonText}>
            Ga naar het persoonlijk dashboard
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 250,
    width: windowWidth - 2 * 25,
    height: windowHeight,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
  },
  greetingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
    alignSelf: 'center',
  } as TextStyle,
  diaryDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
  dateLabel: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  dateText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
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
    width: 280,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 5,
    marginTop: 20,
  },
  dashboardButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 12,
  } as TextStyle,
});
