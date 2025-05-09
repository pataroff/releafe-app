import React, { useState, useEffect, useContext, useRef } from 'react';
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
  Animated,
  Modal,
} from 'react-native';

import { Fonts } from '../styles';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

import { Header } from '../components/Header';
import { GoalsOverview } from '../components/GoalsOverview';

import { useAuth } from '../context/AuthContext';
import { useGoal } from '../context/GoalContext';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const nudgingItems = [
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/navigation_bar/diary_icon_active.png')}
      />
    ),
    title: 'Dagboek invullen',
    description:
      'Zou je iets aan je dagboek willen toevoegen? Zo kun je goed bijhouden hoe het met je gaat.',
    buttonText: 'Vul dagboek in',
  },
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/navigation_bar/wellbeing_overview_icon_active.png')}
      />
    ),
    title: 'Volg je voortgang',
    description: 'Sta even stil bij hoe het met je gaat.',
    buttonText: 'Bekijk voortgang',
  },
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/custom_icons/persoonlijke_doelen_icon.png')}
      />
    ),
    title: 'Werk aan jouw doelen',
    description:
      'Kleine stappen maken een groot verschil. Maak een doel aan of bekijk je voortgang.',
    buttonText: 'Ga naar doelen',
  },
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/custom_icons/zorgenbakje_icon.png')}
      />
    ),
    title: 'Parkeer je zorgen',
    description:
      'Soms is het fijn om je zorgen even los te laten. Schrijf ze op en geef jezelf wat ruimte.',
    buttonText: 'Ga naar Zorgenbakje',
  },
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/custom_icons/reframing_icon.png')}
      />
    ),
    title: 'Zorgen anders bekijken',
    description:
      'Een goede manier om met zorgen om te gaan, is om ze anders te bekijken. Probeer het eens!',
    buttonText: 'Ga naar Reframen',
  },
  {
    icon: (
      <Image
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
        source={require('../../assets/images/custom_icons/oefeningen_icon.png')}
      />
    ),
    title: 'Toe aan ontspanning?',
    description:
      'Bekijk hier oefeningen die je daarbij helpen. Er is vast een oefening die bij je past!',
    buttonText: 'Bekijk oefeningen',
  },
];

export const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const title = 'Home';
  const { user } = useAuth();
  const { goalEntries } = useGoal();

  const [quote, setQuote] = useState<string>(
    'Wherever you are, be there totally.'
  );
  const [author, setAuthor] = useState<string>('Eckhart Tolle');

  const [activeIndex, setActiveIndex] = useState(0);

  const [questionMarkModalActive, setQuestionMarkModalActive] =
    useState<boolean>(false);
  
  const [scrollViewOffsetPoints,setScrollViewOffsetPoints] = useState([0]);

  // Animation values
  const animatedValues = useRef(
    // Array of Animated.Values for each item
    nudgingItems.map(() => new Animated.Value(0))
  ).current;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (windowWidth - 40)); // 40 = padding * 2
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  const handleScrollViewSize = () => {
    setScrollViewOffsetPoints([]);
    var tempOffsetPoints = [];
    var offset = 0;
    for(var i=0;i<nudgingItems.length;i++)
    {
      if(i==0)
      {
        offset = windowWidth / 1.25 + 30;
      }
      else offset += windowWidth / 1.25 + 20;
      tempOffsetPoints.push(offset) 
    }
    console.log(tempOffsetPoints)
    setScrollViewOffsetPoints(tempOffsetPoints)
  }

  const handleNudgingQuestionMark = () => {
    setQuestionMarkModalActive(true);
  };

  const handleNudging = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('Diary');
        break;
      case 1:
        navigation.navigate('WellbeingOverview');
        break;
      case 2:
        navigation.navigate('Toolkit', { screen: 'PersonalGoals' });
        break;
      case 3:
        navigation.navigate('Toolkit', { screen: 'WorryBox' });
      case 4:
        navigation.navigate('Toolkit', { screen: 'Reframing' });
        break;
      case 5:
        navigation.navigate('Toolkit', { screen: 'Exercises' });
    }
  };

  useEffect(() => {
    // Trigger animation when activeIndex changes
    animatedValues.forEach((animatedValue, index) => {
      const toValue =
        index === activeIndex // Current item
          ? 0
          : index === activeIndex - 1 || index === activeIndex + 1 // Adjacent item
          ? 1
          : 0;

      Animated.timing(animatedValue, {
        toValue,
        duration: 500, // Smooth transition
        useNativeDriver: false, // Native driver doesn't support colors
      }).start();
    });
  }, [activeIndex]);

  // QUOTES API
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

  return (
    <>
      <Modal
        animationType='none'
        transparent={true}
        visible={questionMarkModalActive}
        onRequestClose={() =>
          setQuestionMarkModalActive(!questionMarkModalActive)
        }
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ rowGap: 20 }}>
                <Text style={styles.nudgingBodyText}>
                  Op basis van jouw gebruik van de app geven we je hier tips om
                  je volgende stap te zetten.
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() =>
                setQuestionMarkModalActive(!questionMarkModalActive)
              }
            >
              <Feather name='x-circle' size={24} color='gray' />
            </Pressable>
          </View>
        </View>
      </Modal>
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
            Hallo {user?.firstName}
          </Text>
          <Text style={styles.greetingBodyText}>Welkom!</Text>
          <Text style={styles.dateHeadingText}>
            Het is vandaag
            <Text style={styles.dateBodyText}>
              {' '}
              {new Date().toLocaleString('nl-NL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </Text>
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
        <View style={styles.tipsHeaderContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}
          >
            <Text style={styles.nudgingHeadingText}>Tips</Text>
            <Pressable onPress={() => handleNudgingQuestionMark()}>
              <FontAwesome6 name='question-circle' size={18} color='black' />
            </Pressable>
          </View>
        </View>
        {scrollViewOffsetPoints.length != nudgingItems.length && handleScrollViewSize()}
        <ScrollView
          horizontal={true}
          //snapToInterval={windowWidth / 1.25 + 26}
          snapToOffsets={scrollViewOffsetPoints}
          snapToAlignment={'center'}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: 20,
          }}
          contentContainerStyle={{
            paddingHorizontal: 30,
            columnGap: 20,
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Nudging Item Container  */}
          {nudgingItems.map((item, index) => {
            const { icon, title, description, buttonText } = item;

            const backgroundColor = animatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['#FFFFFF', '#C1DEBE'],
            });

            return (
              <Animated.View
                // onLayout={(e) =>
                //   console.log('Item width:', e.nativeEvent.layout.width)
                // }
                key={index}
                style={[
                  styles.nudgingItemContainer,
                  {
                    backgroundColor,
                  },
                ]}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 10,
                  }}
                >
                  {icon}
                  <Text style={styles.nudgingHeadingText}>{title}</Text>
                </View>
                <Text style={styles.nudgingBodyText}>{description}</Text>
                <Pressable
                  onPress={() => handleNudging(index)}
                  style={styles.nudgingButton}
                >
                  <Text style={styles.nudgingButtonText}>{buttonText}</Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </ScrollView>

        {/* Overviw Goals Container */}
        {goalEntries.length > 0 && <GoalsOverview />}

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
            Jouw bonsaiboom en prestaties
            </Text>
          </View>

          {/* Performance Data Container */}
          <View style={styles.performanceDataContainer}>
            <Text style={styles.performanceHeadingText}>
              Jouw bonsaiboom heeft deze week
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
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
  },
  greetingContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    rowGap: 10,
    paddingHorizontal: 30,
  },
  greetingHeadingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 24,
  } as TextStyle,
  greetingBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
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
  dateHeadingText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  dateBodyText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  statisticsOverviewContainer: {
    rowGap: 10,
    justifyContent: 'flex-start',
  },
  statisticsOverviewText: {
    ...Fonts.sofiaProRegular[Platform.OS],
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
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
    fontSize: 18,
  } as TextStyle,
  quoteBodyText: {
    ...Fonts.sofiaProMediumItalic[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
  quoteAuthorText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    color: 'white',
  } as TextStyle,
  nudgingItemContainer: {
    height: 210,
    width: windowWidth / 1.25,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  nudgingTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 30,
  } as TextStyle,
  nudgingHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  nudgingBodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
  nudgingButton: {
    borderRadius: 15,
    width: 200,
    paddingVertical: 7,
    backgroundColor: '#A5B79F',
  },
  nudgingButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    ...Fonts.sofiaProSemiBold[Platform.OS],
    textTransform: 'uppercase',
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  performanceHeadingText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  performanceBodyText: {
    textAlign: 'center',
    ...Fonts.sofiaProRegular[Platform.OS],
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
  tipsHeaderContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 35,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 30,
    height: 270,
    width: windowWidth - 2 * 15,
    backgroundColor: 'white',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
