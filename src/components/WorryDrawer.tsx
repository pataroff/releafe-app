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

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { WorryListModal } from './WorryListModal';
import { WorryListItemAddModal } from './WorryListItemAddModal';
import { WorryListItemAddedModal } from './WorryListItemAddedModal';
import { ReframingModal } from './ReframingModal';
import { ReframingSuccessModal } from './ReframingSucessModal';

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

// @TODO Correct the `route` type annotation!
export const WorryDrawer: React.FC<{ route: any }> = ({ route }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalWorryListVisible, setModalWorryListVisible] =
    useState<boolean>(false);
  const [modalAddWorryListItemVisible, setModalAddWorryListItemVisible] =
    useState<boolean>(false);
  const [modalAddedWorryListItemVisible, setModalAddedWorryListItemVisible] =
    useState<boolean>(false);
  const [modalReframingVisible, setModalReframingVisible] =
    useState<boolean>(false);
  const [modalReframingSuccessVisible, setModalReframingSuccessVisible] =
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
        modalAddedWorryListItemVisible={modalAddedWorryListItemVisible}
        setModalAddedWorryListItemVisible={setModalAddedWorryListItemVisible}
      />

      {/* Added Worry List Item Modal */}
      <WorryListItemAddedModal
        modalAddedWorryListItemVisible={modalAddedWorryListItemVisible}
        setModalAddedWorryListItemVisible={setModalAddedWorryListItemVisible}
      />

      {/* Reframing Modal */}
      <ReframingModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        reframingSteps={reframingSteps}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
        modalWorryListVisible={modalWorryListVisible}
        setModalWorryListVisible={setModalWorryListVisible}
        modalReframingSuccessVisible={modalReframingSuccessVisible}
        setModalReframingSuccessVisible={setModalReframingSuccessVisible}
      />

      {/* Reframing Sucess Modal */}
      <ReframingSuccessModal
        route={route}
        reframingModalIndex={reframingModalIndex}
        setReframingModalIndex={setReframingModalIndex}
        modalReframingSuccessVisible={modalReframingSuccessVisible}
        setModalReframingSuccessVisible={setModalReframingSuccessVisible}
        modalWorryListVisible={modalWorryListVisible}
        setModalWorryListVisible={setModalWorryListVisible}
        modalReframingVisible={modalReframingVisible}
        setModalReframingVisible={setModalReframingVisible}
      />

      {/* Drawer */}
      <View style={styles.drawerContainer}>
        <View style={styles.drawerDescriptionContainer}>
          <Text style={styles.drawerDescriptionText}>
            Het zorgenbakje biedt een veilige ruimte om je zorgen en angsten te
            benoemen en op te schrijven. Het kan je helpen bij het loslaten van
            zorgen door deze visueel en symbolisch op te bergen.
          </Text>
          <Text style={styles.drawerDescriptionText}>
            Druk op de lade hieronder om je opgeborgen zorgen te bekijken.
          </Text>
        </View>

        <View>
          {isDrawerOpen ? (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{
                  width: '80%',
                  height: 150,
                  alignSelf: 'center',
                }}
                source={require('../../assets/images/drawer_open.png')}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: '90%', height: 150, alignSelf: 'center' }}
                source={require('../../assets/images/drawer_closed.png')}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.bottomBarContainer}>
        <Pressable onPress={() => console.log('Naar archief pressed!')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}
          >
            <Feather name='archive' size={18} color='gray' />
            <Text style={styles.archiveButtonText}>Naar archief{' >'}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            setModalAddWorryListItemVisible(!modalAddWorryListItemVisible)
          }
        >
          <View style={{ width: 150 }}>
            <Image
              resizeMode='contain'
              style={{
                width: '100%',
                height: 40,
              }}
              source={require('../../assets/images/nieuwe_zorg_button.png')}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  drawerDescriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    rowGap: 10,
  },
  drawerDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
  bottomBarContainer: {
    marginBottom: 95,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#dedede',
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  archiveButtonText: {
    color: 'gray',
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
});
