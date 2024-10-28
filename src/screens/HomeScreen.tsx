import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ProgressBar } from 'react-native-paper';

import { Header } from '../components/Header';

import { AuthContext } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;

const nudgingItems = [
  [
    <Feather name='book' size={24} color='black' />,
    'Dagboek invullen',
    'Je hebt je dagboek nog niet ingevuld. Vergeet deze niet in te vullen om je voortgang bij te houden!',
    'Vul dagboek in',
  ],
  [
    <FontAwesome6 name='heart' size={24} color='black' />,
    'Voortgang bekijken',
    'Bekijk de voortgang van je doelen deze week en ontdek wat de volgende stappen zijn!',
    'Bekijk voortgang',
  ],
  [
    <FontAwesome6 name='heart' size={24} color='black' />,
    'Tijd voor een oefening',
    'Het is tijd voor een ontspanningsoefening. Bekijk deze oefening in de toolkit.',
    'Bekijk toolkit',
  ],
  [
    <AntDesign name='warning' size={24} color='black' />,
    'Blijf actief!',
    'Er is gedurende meer dan drie dagen geen fysieke activiteit in het dagboek geregistreerd.',
    'Bekijk dagboek',
  ],
];

const goalsData = [
  [
    <FontAwesome6 name='person-walking' size={18} color='black' />,
    'Bewegen',
    'Ik wil ',
    'wekelijks 4x',
    'op een actieve manier naar een plaats van bestemming gaan.',
    '8 juni 2024',
    '8 juni 2025',
    '175',
    '190',
    '25/52',
    0.48,
    '48%',
    '3/4',
    0.75,
    '75%',
  ],
  [
    <MaterialCommunityIcons name='meditation' size={22} color='black' />,
    'Ontspanning',
    'Ik wil voor een halfjaar ',
    'dagelijks 1x ',
    'een meditatie oefening doen.',
    '17 mei 2024',
    '17 nov 2025',
    '24',
    '159',
    '24/183',
    0.13,
    '13%',
  ],
  [
    <MaterialCommunityIcons name='silverware' size={20} color='black' />,
    'Voeding',
    'Ik wil ',
    'wekelijks 5x ',
    'niet meer dan twee suikerhoudende dranken drinken.',
    '10 juni 2024',
    '10 juni 2025',
    '4',
    '361',
    '0/52',
    0,
    '0%',
    '0/52',
    0,
    '0%',
  ],
];

export const HomeScreen: React.FC = ({ route }) => {
  const title = 'Home';
  const { user } = useContext(AuthContext);

  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [progressBarValue1, setProgressValue1] = useState(0.48);
  const [progressBarValue2, setProgressValue2] = useState(0.75);

  const goalData = useMemo(
    () => goalsData[selectedIndex] || [],
    [selectedIndex]
  );

  // useEffect(() => {
  //   const fetchQuote = async () => {
  //     const res = await axios.get(process.env.API_NINJAS_API_URL as string, {
  //       headers: {
  //         'X-Api-Key': process.env.API_NINJAS_API_KEY,
  //       },
  //     });

  //     const { data } = res;

  //     setQuote(data[0].quote);
  //     setAuthor(data[0].author);
  //   };

  //   fetchQuote();
  // }, []);

  const handlePrevious = () => {
    if (selectedIndex == 0) {
      setSelectedIndex(2);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex == 2) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <StatusBar />
      <Header title={title} route={route} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Greeting Container */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingHeadingText}>
            Hallo, {user?.firstName}!
          </Text>
          <Text style={styles.greetingBodyText}>Welkom terug</Text>
        </View>

        {/* Well-being Overview Container */}
        <View style={styles.wellbeingOverviewContainer}>
          <Text style={styles.wellbeingOverviewHeadingText}>
            Jouw welzijnsoverzicht deze week
          </Text>

          {/* Date Container */}
          <View>
            <Text style={styles.wellbeingOverviewDateHeadingText}>
              Het is vandaag
            </Text>

            <Text style={styles.wellbeingOverviewDateBodyText}>
              {new Date().toLocaleString('nl-NL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>

          {/* Statistics Overview Container  */}
          <View style={styles.statisticsOverviewContainer}>
            {/* Mood Overview Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
            >
              {/* TODO: Make the icon change dynamically based on user data! */}
              <FontAwesome6 name='smile' size={17} color='black' />
              <Text style={styles.statisticsOverviewText}>
                Deze week voel jij je{' '}
                <Text
                  style={{ ...Fonts.poppinsSemiBold[Platform.OS] } as TextStyle}
                >
                  goed
                </Text>
              </Text>
            </View>

            {/* Activities Overview Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 14.7,
              }}
            >
              <FontAwesome6 name='person-walking' size={19} color='black' />
              <Text>
                Deze week heb jij{' '}
                <Text
                  style={{ ...Fonts.poppinsSemiBold[Platform.OS] } as TextStyle}
                >
                  zes
                </Text>{' '}
                activiteiten uitgevoerd
              </Text>
            </View>
          </View>
        </View>

        {/* Quote of the Day Container */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteHeadingText}>Quote van de dag</Text>

          <View
            style={{
              rowGap: 10,
            }}
          >
            <Text style={styles.quoteBodyText}>"{quote}"</Text>
            <Text style={styles.quoteAuthorText}>- {author}</Text>
          </View>
        </View>

        {/* Nudging Container */}

        <ScrollView
          horizontal={true}
          decelerationRate={'fast'}
          snapToInterval={windowWidth - 2 * 20}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: 20,
          }}
          contentContainerStyle={{
            paddingHorizontal: 30,
            columnGap: 20,
          }}
        >
          {/* Nudging Item Container  */}
          {nudgingItems.map((item, index) => {
            return (
              <View key={index} style={styles.nudgingItemContainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 10,
                  }}
                >
                  {item[0]}
                  <Text style={styles.nudgingHeadingText}>{item[1]}</Text>
                </View>
                <Text style={styles.nudgingBodyText}>{item[2]}</Text>
                <Pressable style={styles.nudgingButton}>
                  <Text style={styles.nudgingButtonText}> {item[3]}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>

        {/* Overviw Goals Container */}
        <View
          style={
            selectedIndex != 1
              ? styles.overviewGoalsContainer
              : [styles.overviewGoalsContainer, { height: 485 }]
          }
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}
          >
            <Text style={styles.overviewGoalsHeadingText}>
              Overzicht doelen
            </Text>
            <FontAwesome6 name='question-circle' size={18} color='black' />
          </View>

          {/* Custom Picker Container */}
          <View style={styles.customPickerContainer}>
            <Pressable onPress={() => handlePrevious()}>
              <Entypo name='chevron-left' size={28} color='black' />
            </Pressable>

            {/* Custom Picker Selection */}
            <View style={styles.customPickerSelection}>
              {goalData[0]}
              <Text style={styles.customPickerText}>{goalData[1]}</Text>
            </View>

            <Pressable onPress={() => handleNext()}>
              <Entypo name='chevron-right' size={28} color='black' />
            </Pressable>
          </View>

          {/* Goal Container */}
          <View
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'row',
              columnGap: 10,
              paddingRight: 30,
            }}
          >
            <Text style={styles.goalHeadingText}>Doel:</Text>
            <Text style={styles.goalBodyText}>
              {goalData[2]}
              <Text
                style={{ ...Fonts.poppinsSemiBold[Platform.OS] } as TextStyle}
              >
                {goalData[3]}
              </Text>{' '}
              {goalData[4]}
            </Text>
          </View>

          {/* Statistics Container */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.statisticsHeadingText}>Statistieken:</Text>
            {/* Statistics Data Container */}
            <View style={styles.statisticsDataContainer}>
              <View style={styles.statisticsDataTextContainer}>
                <Text style={styles.statisticsDataHeadingText}>Startdatum</Text>
                <Text style={styles.statisticsDataBodyText}>{goalData[5]}</Text>
              </View>

              <View style={styles.statisticsDataTextContainer}>
                <Text style={styles.statisticsDataHeadingText}>Einddatum</Text>
                <Text style={styles.statisticsDataBodyText}>{goalData[6]}</Text>
              </View>

              <View style={styles.statisticsDataTextContainer}>
                <Text style={styles.statisticsDataHeadingText}>
                  Dagen actief
                </Text>
                <Text style={styles.statisticsDataBodyText}>{goalData[7]}</Text>
              </View>

              <View style={styles.statisticsDataTextContainer}>
                <Text style={styles.statisticsDataHeadingText}>
                  Dagen tot {'\n'}einddatum
                </Text>
                <Text style={styles.statisticsDataBodyText}>{goalData[8]}</Text>
              </View>
            </View>

            {/* Progress Bar Container 1 */}
            <View style={styles.progressBarContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.progressBarHeadingText}>
                  Statistieken voor gehele looptijd
                </Text>
                <Text style={styles.progressBarBodyText}>{goalData[9]}</Text>
              </View>
              <ProgressBar
                progress={goalData[10] as number}
                color='#A9C1A1'
                style={styles.progressBar}
              />
              <Text style={styles.progressBarPercentageText}>
                {goalData[11]}
              </Text>
            </View>

            {/* Progress Bar Container 2 */}
            {selectedIndex != 1 && (
              <View style={styles.progressBarContainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.progressBarHeadingText}>
                    Statistieken voor tijdsframe (wekelijks)
                  </Text>
                  <Text style={styles.progressBarBodyText}>{goalData[12]}</Text>
                </View>
                <ProgressBar
                  progress={goalData[13] as number}
                  color='#A9C1A1'
                  style={styles.progressBar}
                />
                <Text style={styles.progressBarPercentageText}>
                  {goalData[14]}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Performance Container */}
        <View style={styles.performanceContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}
          >
            <Text style={styles.performanceContainerHeadingText}>
              Jouw prestaties
            </Text>
            <FontAwesome6 name='question-circle' size={18} color='black' />
          </View>

          {/* Performance Data Container */}
          <View style={styles.performanceDataContainer}>
            <Text style={styles.performanceHeadingText}>
              Jouw bonsai boom heeft deze week
            </Text>

            {/* Bonsai Tree Data Container */}
            <View style={styles.bonsaiTreeDataContainer}>
              {/* Bonsai Tree Data Item 1 */}
              <View style={styles.bonsaiTreeDataItem}>
                <Image
                  style={{ width: 35, height: 45 }}
                  resizeMode='contain'
                  source={require('../../assets/images/leaf_icon.png')}
                />
                <Text style={styles.performanceBodyText}>
                  Meerdere, nieuwe bladeren gekregen
                </Text>
              </View>

              {/* Bonsai Tree Data Item 2 */}
              <View style={styles.bonsaiTreeDataItem}>
                <Image
                  style={{ width: 35, height: 45 }}
                  resizeMode='contain'
                  source={require('../../assets/images/blossom_icon.png')}
                />
                <Text style={styles.performanceBodyText}>
                  Haar eerste bloesems gekregen
                </Text>
              </View>
            </View>

            <Text style={styles.performanceHeadingText}>
              Je hebt deze badges behaald
            </Text>

            {/* Badges Container */}
            <View style={styles.badgesContainer}>
              {/* Badge Item 1 */}
              <View style={styles.badgeItem}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require('../../assets/images/badge_placeholder_icon.png')}
                />
                <Text style={styles.performanceBodyText}>Badge 1</Text>
              </View>

              {/* Badge Item 2 */}
              <View style={styles.badgeItem}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require('../../assets/images/badge_placeholder_icon.png')}
                />
                <Text style={styles.performanceBodyText}>Badge 2</Text>
              </View>

              {/* Badge Item 3 */}
              <View style={styles.badgeItem}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require('../../assets/images/badge_placeholder_icon.png')}
                />
                <Text style={styles.performanceBodyText}>Badge 3</Text>
              </View>

              {/* Badge Item 4 */}
              <View style={styles.badgeItem}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require('../../assets/images/badge_placeholder_icon.png')}
                />
                <Text style={styles.performanceBodyText}>Badge 4</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
  },
  greetingContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    rowGap: 5,
    paddingHorizontal: 30,
  },
  greetingHeadingText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 24,
  } as TextStyle,
  greetingBodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  wellbeingOverviewContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: 220,
    width: 355,
    marginTop: 20,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  wellbeingOverviewHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  wellbeingOverviewDateHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  wellbeingOverviewDateBodyText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  statisticsOverviewContainer: {
    rowGap: 10,
    justifyContent: 'flex-start',
  },
  statisticsOverviewText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  quoteContainer: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 25,
    width: 325,
    backgroundColor: '#829B7A',
    rowGap: 10,
  },
  quoteHeadingText: {
    textAlign: 'center',
    ...Fonts.poppinsBold[Platform.OS],
    color: 'white',
    fontSize: 18,
  } as TextStyle,
  quoteBodyText: {
    ...Fonts.poppinsMediumItalic[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  quoteAuthorText: {
    ...Fonts.poppinsRegular[Platform.OS],
    color: 'white',
  } as TextStyle,
  nudgingItemContainer: {
    height: 210,
    width: 325,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  nudgingHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  nudgingBodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  nudgingButton: {
    borderRadius: 15,
    width: 180,
    paddingVertical: 7,
    backgroundColor: '#A5B79F',
  },
  nudgingButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    ...Fonts.poppinsSemiBold[Platform.OS],
    textTransform: 'uppercase',
  } as TextStyle,
  overviewGoalsContainer: {
    height: 610,
    width: 325,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  overviewGoalsHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  customPickerContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customPickerSelection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    width: 200,
    height: 30,
    backgroundColor: '#829B7A',
    borderRadius: 10,
  },
  customPickerText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  goalHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  goalBodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  statisticsHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  statisticsDataContainer: {
    width: 220,
    height: 155,
    backgroundColor: '#E5F1E3',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    rowGap: 10,
  },
  statisticsDataTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statisticsDataHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  statisticsDataBodyText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBarContainer: {
    marginTop: 20,
    rowGap: 10,
  },
  progressBarHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBarBodyText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressBar: {
    backgroundColor: '#dedede',
    borderRadius: 15,
    height: 12,
  },
  progressBarPercentageText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  performanceContainer: {
    height: 330,
    width: 325,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  performanceDataContainer: {
    marginTop: 20,
    rowGap: 15,
  },
  bonsaiTreeDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bonsaiTreeDataItem: {
    width: 125,
    alignItems: 'center',
    rowGap: 10,
  },
  performanceContainerHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  performanceHeadingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  performanceBodyText: {
    textAlign: 'center',
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  badgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'center',
  },
  badgeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 5,
  },
});
