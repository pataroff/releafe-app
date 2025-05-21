import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../styles';

import { ReframingModal } from '../components/ReframingModal';
import { EarnedPointsModal } from '../components/EarnedPointsModal';

const windowWidth = Dimensions.get('window').width;

const reframingOptionsData = [
  [
    'Reframe een bestaande zorg',
    'Wil je een zorg uit je Zorgenbakje reframen?\n\nGa dan naar je Zorgenbakje.',
  ],
  [
    'Reframe een nieuwe zorg',
    'Heb je een zorg die nog niet in je Zorgenbakje staat, maar wil je er meteen mee aan de slag?\n\nBegin dan direct.',
  ],
];

// @TODO Correct the `route` type annotation!
export const ReframingScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  const [earnedPointsModalVisible, setEarnedPointsModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Zorgenbakje' });
  }, [navigation]);

  return (
    <>
      <EarnedPointsModal
        visible={earnedPointsModalVisible}
        onClose={() => setEarnedPointsModalVisible(false)}
        points={20}
      />
      <ReframingModal
        // @TODO: Correct `route` type annotation!
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        earnedPointsModalVisible={earnedPointsModalVisible}
        setEarnedPointsModalVisible={setEarnedPointsModalVisible}
      />

      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Reframen</Text>
          <Text style={styles.headersDescriptionText}>
            Reframen helpt je om anders naar je zorgen te kijken.
            {'\n \n'}
            Je leert stap voor stap om negatieve gedachten om te zetten in
            positievere of realistischere gedachten. Zo krijg je meer grip op je
            gevoelens en voel je je rustiger en zekerder.
          </Text>
          <Text style={styles.headersHeadingText}>Starten</Text>
          <Text style={styles.headersDescriptionText}>
            Reframen kan op twee manieren.
          </Text>
        </View>

        <View
          style={{
            width: windowWidth,
            paddingHorizontal: 30,
            marginBottom: 110,
          }}
        >
          {reframingOptionsData.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 7,
                }}
              >
                <Image
                  style={{ width: 28, height: 28 }}
                  source={require('../../assets/images/custom_icons/reframing_icon.png')}
                />
                <Text style={styles.h3Text}>{option[0]}</Text>
              </View>
              <Text style={styles.bodyText}>{option[1]}</Text>
              {/* Reward Container */}
              <View
                style={{ display: 'flex', flexDirection: 'row', columnGap: 5 }}
              >
                {/* Points Container */}
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>+20</Text>

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
              <Pressable
                style={styles.ctaButton}
                onPress={() =>
                  index == 0
                    ? navigation.navigate('WorryBox')
                    : setModalReframingVisible(!modalReframingVisible)
                }
              >
                <Text style={styles.ctaButtonText}>
                  {index == 0 ? 'Ga naar mijn zorgen' : 'Start met reframen'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
  } as TextStyle,
  optionContainer: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    flexGrow: 1,
    padding: 20,
    // justifyContent: 'space-between',
    rowGap: 20,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersDescriptionText: {
    ...Fonts.sofiaProLight[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  h3Text: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  ctaButton: {
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 13,
    backgroundColor: '#A9C1A1',
  },
  ctaButtonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
    fontSize: 14,
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
