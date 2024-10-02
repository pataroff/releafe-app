import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Header } from '../components/Header';
import { AuthContext } from '../context/AuthContext';

export const HomeScreen: React.FC = ({ route }) => {
  const title = 'Home';
  const { user } = useContext(AuthContext);

  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await axios.get(process.env.API_NINJAS_API_URL as string, {
        headers: {
          'X-Api-Key': process.env.API_NINJAS_API_KEY,
        },
      });

      const { data } = res;

      setQuote(data[0].quote);
      setAuthor(data[0].author);
    };

    // fetchQuote();
  }, []);

  return (
    <>
      <StatusBar />
      <Header title={title} route={route} />
      <ScrollView
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
                  style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
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
                  style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
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
            <Text style={styles.quoteBodyText}>{quote}</Text>
            <Text style={styles.quoteAuthorText}>- {author}</Text>
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
    paddingHorizontal: 30,
  },
  greetingContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    rowGap: 5,
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
    marginTop: 30,
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
});
