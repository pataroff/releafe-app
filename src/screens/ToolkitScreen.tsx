import React, { useEffect } from 'react';

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

const windowHeight = Dimensions.get('window').height;

// @TODO Correct the `route` type annotation!
export const ToolkitScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Toolkit' });
  }, [navigation]);

  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Wrapper Container */}
        <View style={styles.wrapperContainer}>
          <Image
            style={{
              position: 'absolute',
              top: -180,
              left: -80,
              opacity: 0.1,
            }}
            source={require('../../assets/images/circle_background.png')}
          />

          {/* Information Component */}
          <View>
            <Text style={styles.h1Text}>Informatie</Text>
            <View style={styles.informationComponent}>
              <Text style={styles.h2Text}>Informatieve modules</Text>
              <Text style={styles.bodyText}>
                Lees hier informatie over stressfactoren, geestelijke gezondheid
                en meer.
              </Text>
              <Pressable
                style={styles.informationComponentButton}
                onPress={() =>
                  console.log('Informatieve modules button pressed!')
                }
              >
                <Text style={styles.informationComponentButtonText}>
                  Lees meer
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Toolkit Component */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View style={{ rowGap: 5 }}>
              <Text style={styles.h1Text}>Toolkit</Text>
              <Text style={styles.bodyText}>
                Kies een tool waar jij mee aan de slag wilt
              </Text>
            </View>

            {/* Toolkit Tools Wrapper */}
            <View style={styles.toolkitToolsWrapperContainer}>
              <View style={styles.toolkitToolComponent}>
                <Text style={styles.h3Text}>Persoonlijke doelen</Text>
                <Text style={styles.bodyText}>
                  Zet persoonlijke doelen en hou het proces precies bij.
                </Text>
                <Pressable
                  style={styles.toolkitComponentButton}
                  onPress={() =>
                    console.log('Persoonlijke doelen button pressed!')
                  }
                >
                  <Text style={styles.toolkitComponentButtonText}>
                    Lees meer
                  </Text>
                </Pressable>
              </View>

              <View style={styles.toolkitToolComponent}>
                <Text style={styles.h3Text}>Zorgenbakje</Text>
                <Text style={styles.bodyText}>
                  Moet jij je zorgen kwijt? Gebruik het zorgenbakje.
                </Text>
                <Pressable
                  style={styles.toolkitComponentButton}
                  onPress={() => navigation.navigate('WorryBox')}
                >
                  <Text style={styles.toolkitComponentButtonText}>
                    Lees meer
                  </Text>
                </Pressable>
              </View>

              <View style={styles.toolkitToolComponent}>
                <Text style={styles.h3Text}>Notes-to-self</Text>
                <Text style={styles.bodyText}>
                  Schrijf persoonlijke berichten uit en lees ze later terug.
                </Text>
                <Pressable
                  style={styles.toolkitComponentButton}
                  onPress={() => navigation.navigate('NotesToSelf')}
                >
                  <Text style={styles.toolkitComponentButtonText}>
                    Lees meer
                  </Text>
                </Pressable>
              </View>

              <View style={styles.toolkitToolComponent}>
                <Text style={styles.h3Text}>Oefeningen</Text>
                <Text style={styles.bodyText}>
                  Maak gebruik van onze aanbieding aan oefeningen.
                </Text>
                <Pressable
                  style={styles.toolkitComponentButton}
                  onPress={() => console.log('Ooefeningen button pressed!')}
                >
                  <Text style={styles.toolkitComponentButtonText}>
                    Lees meer
                  </Text>
                </Pressable>
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
    backgroundColor: '#F9F9F9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
  },
  wrapperContainer: {
    marginTop: 20,
    marginBottom: 100,
    borderColor: 'black',
    paddingHorizontal: windowHeight <= 667 ? 20 : 25,
  },
  h1Text: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  h2Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  bodyText: {
    fontSize: 14,
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  informationComponent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20,
    height: 180,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
  },
  informationComponentButton: {
    borderRadius: 15,
    width: 175,
    paddingVertical: 6,
    backgroundColor: '#829B7A',
  },
  toolkitComponentButton: {
    borderRadius: 5,
    width: 110,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5C6B57',
  },
  informationComponentButtonText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
  toolkitComponentButtonText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
  toolkitToolsWrapperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  toolkitToolComponent: {
    marginTop: 20,
    borderRadius: 20,
    width: 160,
    height: 180,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#E5F1E3',
  },
});
