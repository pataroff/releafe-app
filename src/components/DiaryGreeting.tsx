import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

import { DiaryModal } from './DiaryModal';

const windowWidth = Dimensions.get('window').width;

export const DiaryGreeting = ({ route }) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [modalDiaryVisible, setModalDiaryVisible] = useState<boolean>(false);

  return (
    <>
      <DiaryModal
        modalDiaryVisible={modalDiaryVisible}
        setModalDiaryVisible={setModalDiaryVisible}
        route={route}
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
          <FontAwesome name='heart' size={36} color='#5C6B57' />
          <Text style={styles.greetingText}>
            Hi {user?.firstName}, wat goed dat je er weer bent. Laten we gelijk
            beginnen.
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
            Door dagelijks je dagboek bij te houden, volg je zorgvuldig jouw
            groeiproces.
          </Text>
          {/* Reward Container */}
          <View style={{ display: 'flex', flexDirection: 'row', columnGap: 5 }}>
            {/* Points Container */}
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>+35</Text>

              <Image
                style={styles.shopIcon}
                source={require('../../assets/images/bonsai_tree_icons/shop_icon.png')}
                resizeMode='contain'
              />
            </View>
            {/* Trophy Container */}
            <View style={styles.trophyContainer}>
              <Image
                style={styles.trophyIcon}
                source={require('../../assets/images/bonsai_tree_icons/trophy_icon.png')}
                resizeMode='contain'
              />
            </View>
          </View>

          <Text style={styles.dateLabel}>
            Het is vandaag:{' '}
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('nl-NL', {
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                weekday: 'long',
              })}
            </Text>
          </Text>
        </View>
        <Pressable
          onPress={() => setModalDiaryVisible(!modalDiaryVisible)}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Start met dagboek</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 2 * 30,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
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
    fontSize: 18,
  } as TextStyle,
  diaryDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
  } as TextStyle,
  dateLabel: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  dateText: {
    ...Fonts.sofiaProLight[Platform.OS],
  } as TextStyle,
  startButton: {
    width: 160,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 13,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#5c6b57',
  },
  startButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 31,
    columnGap: 5,
    backgroundColor: '#90A38A',
    borderRadius: 7.5,
    padding: 5,
  },
  pointsText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
    fontSize: 16,
  } as TextStyle,
  shopIcon: {
    width: 29,
    height: 20,
    marginBottom: 5,
  },
  trophyContainer: {
    width: 35,
    padding: 5,
    borderRadius: 7.5,
    backgroundColor: '#FCF2D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyIcon: {
    width: 23,
    height: 20,
  },
});
