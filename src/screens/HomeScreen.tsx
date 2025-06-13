import React, { useState, useEffect, useRef } from 'react';

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

import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { GoalsOverview } from '../components/GoalsOverview';
import { PerformanceOverview } from '../components/PerformanceOverview';

import { useAuth } from '../context/AuthContext';
import { useGoal } from '../context/GoalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { debugAsyncStorage } from '../utils/registerForPushNotificationsAsync';

const windowWidth = Dimensions.get('window').width;

const RANGE = 'Blad1!A2:C';
const QUOTE_KEY = 'QUOTE_ID';

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
  const { goalEntries, refreshGoalTimeframes } = useGoal();

  const [quote, setQuote] = useState<{
    id: string;
    text: string;
    author: string;
  }>({ id: '', text: '', author: '' });

  const [activeIndex, setActiveIndex] = useState(0);

  const [questionMarkModalActive, setQuestionMarkModalActive] =
    useState<boolean>(false);

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
        break;
      case 4:
        navigation.navigate('Toolkit', { screen: 'Reframing' });
        break;
      case 5:
        navigation.navigate('Toolkit', { screen: 'Exercises' });
        break;
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

  useEffect(() => {
    const fetchQuote = async () => {
      const today = new Date().toISOString().split('T')[0];

      try {
        const stored = await AsyncStorage.getItem(QUOTE_KEY);

        if (stored) {
          const { date, quote } = JSON.parse(stored);

          if (date === today) {
            setQuote(quote);
            return; // ✅ already up to date
          }
        }

        // Either no quote stored or it's a new day
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/${RANGE}?key=${process.env.GOOGLE_SHEETS_API_KEY}`
        );

        const data = await res.json();

        if (!data.values || data.values.length === 0) return;

        const quotes = data.values.map(([id, text, author]: string[]) => ({
          id,
          text,
          author,
        }));

        let nextIndex = 0;

        if (stored) {
          const { index } = JSON.parse(stored);
          nextIndex = (index + 1) % quotes.length; // ✅ wrap around if past last
        }

        const newQuote = quotes[nextIndex];

        await AsyncStorage.setItem(
          QUOTE_KEY,
          JSON.stringify({ date: today, index: nextIndex, quote: newQuote })
        );

        setQuote(newQuote);
      } catch (error) {
        console.error('Failed to fetch quote of the day:', error);
      }
    };

    fetchQuote();
  }, []);

  // Resetting goal timeframes
  useEffect(() => {
    refreshGoalTimeframes();
  }, [goalEntries]);

  const itemWidth = windowWidth * 0.8;
  const sidePadding = (windowWidth - itemWidth) / 2;

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
            <Text style={styles.quoteBodyText}>"{quote.text}"</Text>
            <Text style={styles.quoteAuthorText}>- {quote.author}</Text>
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
        <ScrollView
          horizontal
          snapToInterval={itemWidth + 20}
          decelerationRate='fast'
          snapToAlignment='start'
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: sidePadding,
            columnGap: 20,
            marginVertical: 20,
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
                key={index}
                style={[
                  styles.nudgingItemContainer,
                  {
                    width: itemWidth,
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

        <PerformanceOverview />
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
    backgroundColor: '#f9f9f9',
    paddingBottom: 120,
  },
  greetingContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
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
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  quoteHeadingText: {
    textAlign: 'center',
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
    fontSize: 18,
  } as TextStyle,
  quoteBodyText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  quoteAuthorText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  nudgingItemContainer: {
    height: 210,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
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
    borderRadius: 10,
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5B79F',
  },
  nudgingButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    ...Fonts.sofiaProSemiBold[Platform.OS],
    textTransform: 'uppercase',
  } as TextStyle,
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
