import React, { useState, useContext } from 'react';
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

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;

export const DiaryGreeting = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Hi {user.firstName}, wat fijn dat je er weer bent.
      </Text>
      <Text style={styles.diaryDescriptionText}>
        Door dagelijks je dagboek bij te houden, volg je zorgvuldig jouw
        groeiproces.
      </Text>
      <View style={{ paddingVertical: 10 }}>
        <Image
          style={{ width: '100%', height: 150 }}
          source={require('../../assets/images/placeholder_image.png')}
        />
      </View>
      <Text style={[styles.dateLabel, { fontSize: 16 }]}>
        Vandaag is het:{' '}
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('nl-NL', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          })}
        </Text>
      </Text>
      <Text style={styles.diaryDescriptionText}>
        Laten we beginnen met het vastleggen van jouw reis.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Diary2')}
        style={styles.startButton}
      >
        <Text>Start</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('WellbeingOverview')}>
        <Text style={styles.dashboardButtonText}>
          Ga gelijk door naar het persoonlijk dashboard
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 2 * 25,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    marginTop: 20,
    marginBottom: 100,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  greetingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
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
  startButton: {
    width: 150,
    alignSelf: 'flex-start',
    alignItems: 'center',
    // borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: '#A9C1A1',
  },
  dashboardButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 10,
  } as TextStyle,
});
