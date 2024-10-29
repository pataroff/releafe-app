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
import { ReframingSuccessModal } from '../components/ReframingSucessModal';

const windowWidth = Dimensions.get('window').width;

const reframingSteps = [
  {
    title: 'Reframing: Situatieomschrijving',
    description:
      'De situatie is automatisch overgenomen vanuit je zorg. Je kan deze hier eventueel nog aanpassen. Het resultaat van deze methode is een Note-to-Self. Als je deze niet wilt koppelen aan je bestaande zorg, kan je dit uitschakelen.',
    instruction: 'Laten we beginnen!',
  },
  {
    title: 'Reframing: Gevoelsomschrijving',
    description:
      'Omschrijf hier hoe je je voelt door deze situatie, zodat we er mee aan de slag kunnen.',
    placeholder: 'Ik voel me...',
    instruction:
      'Het opschrijven van je gevoelens helpt om je emoties te verhelderen en te begrijpen, wat kan leiden tot meer zelfinzicht en een betere emotionele verwerking.',
  },
  {
    title: 'Reframing: Vraag 1',
    description:
      'Noteer feiten en observaties die jouw gedachte ondersteunen. Dit helpt om te zien of er objectief bewijs is dat jouw zorgen bevestigt.',
    question: 'Welk bewijs heb ik dat deze gedachte echt waar is?',
    placeholder: 'Welk bewijs heb ik dat deze gedachte echt waar is?',
    instruction:
      'Deze vraag helpt om objectieve feiten te verzamelen die je gedachte ondersteunen, waardoor je inzicht krijgt in de realiteit van je zorgen. Het voorkomt dat je uitsluitend op gevoelens en aannames baseert.',
  },
  {
    title: 'Reframing: Vraag 2',
    description:
      'Denk aan tegenvoorbeelden en feiten die jouw gedachte weerleggen. Dit helpt om een evenwichtiger beeld te krijgen en je gedachten te relativeren.',
    question: 'Welk bewijs heb ik dat deze gedachte niet waar is?',
    placeholder: 'Welk bewijs heb ik dat deze gedachte niet waar is?',
    instruction:
      'Door tegenbewijs te overwegen, kun je irrationele gedachten uitdagen en relativeren. Het helpt je een evenwichtiger en realistischer beeld te vormen.',
  },
  {
    title: 'Reframing: Vraag 3',
    description:
      'Bedenk welk advies of welke troostende woorden je een vriend zou geven in dezelfde situatie. Dit perspectief helpt om milder en realistischer naar je eigen gedachten te kijken.',
    question:
      'Wat zou ik tegen een vriend (in) zeggen die deze gedachte heeft?',
    placeholder:
      'Wat zou ik tegen een vriend (in) zeggen die deze gedachte heeft?',
    instruction:
      'Deze vraag stimuleert empathie en zelfcompassie. door je aan te moedigen jezelf dezelfde steun te geven als aan een vriend. Het kan leiden tot mildere en constructievere zelfreflectie.',
  },
  {
    title: 'Reframing: Advies',
  },
  {
    title: 'Reframing: Vraag 4',
    description:
      'Gebruik een schaal van 1 tot 5 om de waarschijnlijkheid van je negatieve gedachte in te schatten. Dit helpt om de reële kans op het scenario te evalueren en irrationele angsten te verminderen.',
    question:
      'Hoe groot denk je dat de kans nu is dat de omschreven, negatieve gedachte realiteit wordt?',
    placeholder: 'Waarom?',
    instruction:
      'Door de waarschijnlijkheid van je zorgen te beoordelen, kun je irrationele angsten verminderen en een realistisch perspectief ontwikkelen. Het helpt om onnodige piekergedachten te relativeren.',
  },
  {
    title: 'Reframing: Vraag 5',
    description:
      'Zoek naar andere verklaringen of interpretaties van de situatie die realistischer en minder negatiet zin. Dit helpt om je perspectief te verschuiven naar een meer evenwichtige en constructieve mindset.',
    question:
      'Wat is een alternatieve, realistische verklaring die ik bij deze situatie heb?',
    placeholder:
      'Wat is een alternatieve, realistische verklaring die ik bij deze situatie heb?',
    instruction:
      'Deze vraag moedigt je aan om bredere en positievere interpretaties van de situatie te overwegen. Het helpt om starre, negatieve denkpatronen te doorbreken en een evenwichtiger perspectief te krijgen.',
  },
];

const reframingOptionsData = [
  [
    'Reframen van een bestaande zorg',
    'Wanneer je een eerder aangemaakte zorg reframed, leer je op een nieuwe manier naar deze zorg of negatieve gedachte te kijken.',
  ],
  [
    'Reframen van een nieuwe zorg',
    'Heb je een zorg die je nog niet aan je zorgenbakje hebt toegevoegd, maar die je direct wilt reframen? Begin dan meteen.',
  ],
];

// @TODO Correct the `route` type annotation!
export const ReframingScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [modalReframingSuccessVisible, setModalReframingSuccessVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Zorgenbakje' });
  }, [navigation]);

  return (
    <>
      <ReframingModal
        // @TODO: Correct `route` type annotation!
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        reframingSteps={reframingSteps}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        modalReframingSuccessVisible={modalReframingSuccessVisible}
        setModalReframingSuccessVisible={setModalReframingSuccessVisible}
      />

      {/* Reframing Sucess Modal */}
      <ReframingSuccessModal
        // @TODO: Correct `route` type annotation!
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingSuccessVisible={modalReframingSuccessVisible}
        setModalReframingSuccessVisible={setModalReframingSuccessVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
      />

      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Reframing</Text>
          <Text style={styles.headersDescriptionText}>
            Reframing is het bekijken van een situatie, gedachte of gevoel
            vanuit een andere invalshoek.{'\n\n'}Door een situatie of
            (negatieve) gedachte te herformuleren, kun je patronen doorbreken en
            jezelf helpen gezonder te voelen en meer controle te krijgen over je
            eigen gedachten.
          </Text>
          <Text style={styles.headersHeadingText}>Proces starten</Text>
          <Text style={styles.headersDescriptionText}>
            Het toepassen van reframen kan op twee manieren.
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
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
  } as TextStyle,
  optionContainer: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    height: 180,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
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
    ...Fonts.poppinsBold[Platform.OS],
    color: 'white',
    fontSize: 12,
  } as TextStyle,
});
