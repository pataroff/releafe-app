import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

import { WorryListModal } from './WorryListModal';
import { WorryListItemAddModal } from './WorryListItemAddModal';
import { ReframingModal } from './ReframingModal';

const windowWidth = Dimensions.get('window').width;

const reframingSteps = [
  {
    description:
      'De situatie is automatisch overgenomen vanuit je zorg. Je kan deze hier eventueel nog aanpassen. Het resultaat van deze methode is een Note-to-Self. Als je deze niet wilt koppelen aan je bestaande zorg, kan je dit uitschakelen.',
    instruction: 'Laten we beginnen!',
  },
  {
    description:
      'Omschrijf hier hoe je je voelt door deze situatie, zodat we er mee aan de slag kunnen.',
    placeholder: 'Ik voel me...',
    instruction:
      'Het opschrijven van je gevoelens helpt om je emoties te verhelderen en te begrijpen, wat kan leiden tot meer zelfinzicht en een betere emotionele verwerking.',
  },
  {
    description:
      'Noteer feiten en observaties die jouw gedachte ondersteunen. Dit helpt om te zien of er objectief bewijs is dat jouw zorgen bevestigt.',
    question: 'Welk bewijs heb ik dat deze gedachte echt waar is?',
    placeholder: 'Welk bewijs heb ik dat deze gedachte echt waar is?',
    instruction:
      'Deze vraag helpt om objectieve feiten te verzamelen die je gedachte ondersteunen, waardoor je inzicht krijgt in de realiteit van je zorgen. Het voorkomt dat je uitsluitend op gevoelens en aannames baseert.',
  },
  {
    description:
      'Denk aan tegenvoorbeelden en feiten die jouw gedachte weerleggen. Dit helpt om een evenwichtiger beeld te krijgen en je gedachten te relativeren.',
    question: 'Welk bewijs heb ik dat deze gedachte niet waar is?',
    placeholder: 'Welk bewijs heb ik dat deze gedachte niet waar is?',
    instruction:
      'Door tegenbewijs te overwegen, kun je irrationele gedachten uitdagen en relativeren. Het helpt je een evenwichtiger en realistischer beeld te vormen.',
  },
  {
    description:
      'Bedenk welk advies of welke troostende woorden je een vriend zou geven in dezelfde situatie. Dit perspectief helpt om milder en realistischer naar je eigen gedachten te kijken.',
    question:
      'Wat zou ik tegen een vriend (in) zeggen die deze gedachte heeft?',
    placeholder:
      'Wat zou ik tegen een vriend (in) zeggen die deze gedachte heeft?',
    instruction:
      'Deze vraag stimuleert empathie en zelfcompassie. door je aan te moedigen jezelf dezelfde steun te geven als aan een vriend. Het kan leiden tot mildere en constructievere zelfreflectie.',
  },
  {},
  {
    description:
      'Gebruik een schaal van 1 tot 5 om de waarschijnlijkheid van je negatieve gedachte in te schatten. Dit helpt om de reële kans op het scenario te evalueren en irrationele angsten te verminderen.',
    question:
      'Hoe groot denk je dat de kans nu is dat de omschreven, negatieve gedachte realiteit wordt?',
    placeholder: 'Waarom?',
    instruction:
      'Door de waarschijnlijkheid van je zorgen te beoordelen, kun je irrationele angsten verminderen en een realistisch perspectief ontwikkelen. Het helpt om onnodige piekergedachten te relativeren.',
  },
  {
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
export const WorryDrawer: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalWorryListVisible, setModalWorryListVisible] =
    useState<boolean>(false);
  const [modalAddWorryListItemVisible, setModalAddWorryListItemVisible] =
    useState<boolean>(false);
  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  const handleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(!isDrawerOpen);
      setTimeout(() => {
        setModalWorryListVisible(!modalWorryListVisible);
      }, 500);
    } else {
      setModalWorryListVisible(!modalWorryListVisible);
      setTimeout(() => {
        setIsDrawerOpen(!isDrawerOpen);
      }, 500);
    }
  };

  return (
    <>
      {/* Worry List Modal */}
      <WorryListModal
        modalWorryListVisible={modalWorryListVisible}
        setModalWorryListVisible={setModalWorryListVisible}
        modalAddWorryListItemVisible={modalAddWorryListItemVisible}
        setModalAddWorryListItemVisible={setModalAddWorryListItemVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        handleDrawer={handleDrawer}
      />

      {/* Add Worry List Item Modal */}
      <WorryListItemAddModal
        modalAddWorryListItemVisible={modalAddWorryListItemVisible}
        setModalAddWorryListItemVisible={setModalAddWorryListItemVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
      />

      {/* Reframing Modal */}
      <ReframingModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        modalWorryListVisible={modalWorryListVisible}
        setModalWorryListVisible={setModalWorryListVisible}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Headers */}
      <View style={styles.headersContainer}>
        <Text style={styles.headersTitleText}>Zorgenbakje</Text>
        <Text style={styles.headersDescriptionText}>
          Het Zorgenbakje biedt je een veilige ruimte om je zorgen en angsten
          van je af te schrijven en even op te bergen. Wat helpt bij het
          loslaten van zorgen is het visueel en symbolisch opbergen van deze
          zorgen.
        </Text>
        {/* Headers Inner Container */}
        <View style={styles.headersInnerContainer}>
          <View style={{ width: '80%' }}>
            <Text style={styles.headersHeadingText}>Mijn zorgen</Text>
            <Text style={styles.headersDescriptionText}>
              Druk op de lade hieronder om je opgeborgen zorgen te kunnen
              bekijken, of voeg een nieuwe zorg toe.
            </Text>
          </View>
          {/* Add Button */}
          <Pressable
            style={styles.addButton}
            onPress={() =>
              setModalAddWorryListItemVisible(!modalAddWorryListItemVisible)
            }
          >
            <Entypo name='plus' size={32} color='#5C6B57' />
          </Pressable>
        </View>

        {/* Drawer */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            marginTop: 40,
          }}
        >
          {isDrawerOpen ? (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: 340, height: 150 }}
                source={require('../../assets/images/drawer_open.png')}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: 380, height: 150 }}
                source={require('../../assets/images/drawer_closed.png')}
              />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headersTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  addButton: {
    borderRadius: 15,
    height: 50,
    width: 50,
    backgroundColor: '#E5F1E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
