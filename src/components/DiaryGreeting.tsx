import React, { useState } from 'react';

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
import { Fonts, Typography } from '../styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DiaryGreeting: React.FC = ({ navigation }) => {
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
          Hi Jan, wat fijn dat je er weer bent.
        </Text>
        <Text style={styles.diaryDescriptionText}>
          Door dagelijks je dagboek bij te houden, volg je zorgvuldig jouw
          groeiproces.
        </Text>
        <View style={{ paddingVertical: 10 }}>
          <Image
            style={{ width: 290, height: 150 }}
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
        <Text style={[styles.diaryDescriptionText, { fontSize: 16 }]}>
          Laten we beginnen met het vastleggen van jouw reis.
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Diary2')}
          style={styles.continueButton}
        >
          <Text>Button</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.dashboardButtonText}>
            Ga gelijk door naar het persoonlijk dashboard
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
  dashboardButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 10,
  } as TextStyle,
});
