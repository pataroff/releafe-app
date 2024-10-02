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

import { ReframingModal } from '../components/ReframingModal';
import { ReframingSuccessModal } from '../components/ReframingSucessModal';

import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const tools = [
  ['Persoonlijke doelen', 'Stel persoonlijke doelen en volg jouw groeiproces.'],
  [
    'Zorgenbakje',
    'Schrijf je zorgen van je af en berg ze op in het Zorgenbakje.',
  ],
  ['Reframen', 'Leer anders naar je negatieve gedachten kijken.'],
  ['Notes-to-self', 'Leg berichten aan jezelf vast en bekijk ze later terug.'],
  ['Ontspanning', 'Doe hier oefeningen die je helpen ontspannen.'],
];

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

// @TODO Correct the `route` type annotation!
export const ToolkitScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [modalReframingSuccessVisible, setModalReframingSuccessVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Toolkit',
    });
  }, [navigation]);

  const handleToolSelect = (index: number) => {
    switch (index) {
      case 0:
        console.log('Persoonlijke doelen button pressed!');
        break;
      case 1:
        navigation.navigate('WorryBox');
        break;
      case 2:
        setModalReframingVisible(!modalReframingVisible);
        break;
      case 3:
        navigation.navigate('NotesToSelf');
        break;
      case 4:
        console.log('Ontspanning button pressed!');
        break;
      default:
        break;
    }
  };

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

        {/* Toolkit Tools Container */}
        <View style={styles.toolkitToolsContainer}>
          {tools.map((tool, index) => (
            <View key={index} style={styles.toolkitToolComponent}>
              <Text style={styles.h3Text}>{tool[0]}</Text>
              <Text style={styles.bodyText}>{tool[1]}</Text>
              <Pressable
                style={styles.toolkitComponentButton}
                onPress={() => handleToolSelect(index)}
              >
                <Text style={styles.toolkitComponentButtonText}>Lees meer</Text>
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
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  bodyText: {
    fontSize: 13,
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  toolkitToolsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: windowHeight <= 667 ? 20 : 25,
    marginBottom: 100,
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
  toolkitComponentButton: {
    borderRadius: 5,
    width: 110,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5C6B57',
  },
  toolkitComponentButtonText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  } as TextStyle,
});
