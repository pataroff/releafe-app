import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const tools = [
  [
    'Persoonlijke doelen',
    'Stel een doel dat bij jou past en volg hoe je groeit.',
  ],
  [
    'Zorgenbakje',
    'Schrijf je zorgen van je af en bewaar ze tijdelijk in je zorgenbakje.',
  ],
  [
    'Reframen',
    'Leer op een andere en positieve manier naar je gedachten te kijken.',
  ],
  [
    'Berichten aan jezelf',
    'Schrijf berichten aan jezelf en lees ze later terug als je dat nodig hebt.',
  ],
  [
    'Ontspanning',
    'Doe oefeningen die je helpen ontspannen en tot rust te komen.',
  ],
];

const toolsIcons = [
  require('../../assets/images/custom_icons/persoonlijke_doelen_icon.png'),
  require('../../assets/images/custom_icons/zorgenbakje_icon.png'),
  require('../../assets/images/custom_icons/reframing_icon.png'),
  require('../../assets/images/custom_icons/berichten_aan_jezelf_icon.png'),
  require('../../assets/images/custom_icons/oefeningen_icon.png'),
];

// @TODO Correct the `route` type annotation!
export const ToolkitScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Toolkit',
    });
  }, [navigation]);

  const handleToolSelect = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('PersonalGoals');
        break;
      case 1:
        navigation.navigate('WorryBox');
        break;
      case 2:
        navigation.navigate('Reframing');
        break;
      case 3:
        navigation.navigate('NotesToSelf');
        break;
      case 4:
        navigation.navigate('Exercises');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Circle Image */}
        <Image
          style={{
            position: 'absolute',
            top: -85,
            left: -80,
            opacity: 0.1,
          }}
          source={require('../../assets/images/circle_background.png')}
        />
        {/* Headers */}
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Toolkit</Text>
          <Text style={styles.headersDescriptionText}>
            Kies met welke tool je aan de slag wilt.
          </Text>
        </View>
        {/* Toolkit Tools Container */}
        <View style={styles.toolkitToolsContainer}>
          {tools.map((tool, index) => (
            <Pressable
              key={index}
              style={styles.toolkitToolComponent}
              onPress={() => handleToolSelect(index)}
            >
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
                  source={toolsIcons[index]}
                />
                <Text style={styles.h3Text}>{tool[0]}</Text>
              </View>
              <Text style={styles.bodyText}>{tool[1]}</Text>
            </Pressable>
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
    backgroundColor: '#F9F9F9',
    paddingBottom: 120,
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    lineHeight: 18,
    marginTop: 10,
  } as TextStyle,
  h3Text: {
    ...Fonts.sofiaProSemiBold[Platform.OS],

    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  toolkitToolsContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  toolkitToolComponent: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    rowGap: 10,
    padding: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolkitComponentButton: {
    borderRadius: 5,
    width: 110,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5C6B57',
  },
  toolkitComponentButtonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
});
