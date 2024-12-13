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
} from 'react-native';

import { Fonts } from '../styles';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Header } from '../components/Header';

import { AuthContext } from '../context/AuthContext';
import { GoalContext } from '../context/GoalContext';
import { GoalsOverview } from '../components/GoalsOverview';

const windowWidth = Dimensions.get('window').width;

const nudgingItems = [
  {
    icon: <Feather name='book' size={24} color='black' />,
    title: 'Dagboek invullen',
    description:
      'Zou je vandaag iets aan je dagboek willen toevoegen? Zo kun jij je proces goed bijhouden.',
    buttonText: 'Vul dagboek in',
  },
  {
    icon: <FontAwesome6 name='heart' size={24} color='black' />,
    title: 'Voortgang bekijken',
    description:
      'Dit is een goed moment om je voortgang van deze week te bekijken.',
    buttonText: 'Bekijk voortgang',
  },
  {
    icon: <FontAwesome6 name='heart' size={24} color='black' />,
    title: 'Tijd voor een oefening',
    description:
      'De beste manier om met zorgen om te gaan, is om ze anders te benaderen – probeer het eens!',
    buttonText: 'Bekijk toolkit',
  },
  {
    icon: (
      <MaterialCommunityIcons name='arm-flex-outline' size={24} color='black' />
    ),
    title: 'Blijf actief!',
    description:
      'Wat dacht je van wat lichaamsbeweging vandaag? Er is vast een oefening die bij je past!',
    buttonText: 'Bekijk dagboek',
  },
];

export const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
  const title = 'Home';
  const { user } = useContext(AuthContext);
  const { goalEntries } = useContext(GoalContext);

  const [quote, setQuote] = useState<string>(
    'Wherever you are, be there totally.'
  );
  const [author, setAuthor] = useState<string>('Eckhart Tolle');

  const [activeIndex, setActiveIndex] = useState(0);

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
          <Text style={styles.greetingBodyText}>Welkom terug,</Text>
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
        <Text style={styles.nudgingTitleText}>Geadviseerde stappen</Text>
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
                <Pressable style={styles.nudgingButton}>
                  <Text style={styles.nudgingButtonText}> {buttonText}</Text>
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
    justifyContent: 'space-around',
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
  dateHeadingText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  dateBodyText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 15,
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
  nudgingTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 30,
  } as TextStyle,
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
