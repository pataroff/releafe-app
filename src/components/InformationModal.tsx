import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextStyle,
  Platform,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const informatiegidsSteps = [
  {
    title: 'Releafe',
    description: '',
  },
  {
    title: 'Onderdelen',
    description:
      'Releafe heeft verschillende onderdelen die je kunt gebruiken.',
  },
  {
    title: 'Toolkit',
    description:
      'In de toolkit vind je verschillende oefeningen en hulpmiddelen die je kunnen helpen.',
  },
  {
    title: 'Bonsaiboom',
    description:
      'Op verschillende plekken in de app kun je Releafe-punten verdienen, bijvoorbeeld door je dagboek in te vullen of aan een persoonlijk doel te werken.',
  },
  {
    title: 'Notificaties',
    description:
      'Releafe kan je meldingen sturen. Bijvoorbeeld om je te herinneren aan het invullen van je dagboek of om een oefening te doen. Wat je ontvangt, hangt af van je meldingsinstellingen.',
    icon: require('../../assets/images/bell_icon.png'),
  },
  {
    title: 'Feedback',
    description:
      'Heb je een vraag, is iets niet duidelijk of werkt de app niet goed? Laat het ons weten! Op onze website vind je meer informatie over mentale gezondheid en over de Releafe-app. Je kunt daar ook contact met ons opnemen.',
    icon: require('../../assets/images/information_icon.png'),
  },
];
const informatiegidsNavigationElements = [
  {
    icon: require('../../assets/images/navigation_bar/home_icon.png'),
    boldtext: 'Hoofdscherm',
    text: 'Hier zie je wat je al hebt gedaan en wat een goede volgende stap kan zijn. Zo weet je altijd waar je staat en hoe je verder kunt.',
  },
  {
    icon: require('../../assets/images/navigation_bar/diary_icon.png'),
    boldtext: 'Dagboek',
    text: 'In het dagboek geef je elke dag aan hoe je je voelt en wat er is gebeurd. Je houdt ook bij hoe het gaat met je persoonlijke doelen.',
  },
  {
    icon: require('../../assets/images/navigation_bar/wellbeing_overview_icon.png'),
    boldtext: 'Welzijnsoverzicht',
    text: 'Hier zie je hoe het met je gaat op basis van je dagboek. Ook kun je terugkijken naar eerdere dagen.',
  },
  {
    icon: require('../../assets/images/navigation_bar/toolkit_icon.png'),
    boldtext: 'Toolkit',
    text: 'De toolkit bevat oefeningen en hulpmiddelen die je helpen om goed voor je mentale gezondheid te zorgen.',
  },
];
const informatiegidsExerciseElements = [
  {
    icon: require('../../assets/images/custom_icons/persoonlijke_doelen_icon.png'),
    title: 'Persoonlijke doelen',
    text: 'Stel doelen die goed zijn voor je mentale gezondheid en belangrijk voor jou zijn. Je kunt ze aanpassen zoals jij dat wilt.',
  },
  {
    icon: require('../../assets/images/custom_icons/zorgenbakje_icon.png'),
    title: 'Zorgenbakje',
    text: 'Schrijf je zorgen op en bewaar ze tijdelijk in het Zorgenbakje. Zo zet je ze even van je af.',
  },
  {
    icon: require('../../assets/images/custom_icons/reframing_icon.png'),
    title: 'Reframen',
    text: 'Kijk op een andere manier naar je zorgen. Zo leer je omgaan met negatieve gedachten.',
  },
  {
    icon: require('../../assets/images/custom_icons/berichten_aan_jezelf_icon.png'),
    title: 'Bericht aan jezelf',
    text: 'Schrijf een bericht aan jezelf dat je erbij kunt pakken als je het nodig hebt.',
  },
  {
    icon: require('../../assets/images/custom_icons/oefeningen_icon.png'),
    title: 'Ontspanningsoefeningen',
    text: 'Doe oefeningen die je helpen om te ontspannen en tot rust te komen.',
  },
];

interface InformationModalProps {
  modalInformationVisible: boolean;
  setModalInformationVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InformationModal: React.FC<InformationModalProps> = ({
  modalInformationVisible,
  setModalInformationVisible,
}) => {
  const { user } = useAuth();
  const [informatiegidsIndex, setInformatiegidsIndex] = useState<number>(0);
  const informatiegidsLength = 5;

  const handleNext = () => {
    if (informatiegidsIndex < informatiegidsLength) {
      setInformatiegidsIndex((prev) => ++prev);
    }
  };
  const handlePrevious = () => {
    if (informatiegidsIndex != 0) {
      setInformatiegidsIndex((prev) => --prev);
    }
  };

  // @TODO: Is this the right way of doing this?
  const handleWebsitePress = () => {
    Linking.canOpenURL('https://www.releafe.nl/').then((supported) => {
      if (supported) {
        Linking.openURL('https://www.releafe.nl/');
      } else {
        console.log("Can't open URL");
      }
    });
  };

  return (
    <View>
      <Modal
        animationType='none'
        transparent={true}
        visible={modalInformationVisible}
        onRequestClose={() => {
          setInformatiegidsIndex(0);
          setModalInformationVisible(!modalInformationVisible);
        }}
        statusBarTranslucent={true}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                maxHeight: '80%',
              }}
            >
              {/* First Page */}
              {informatiegidsIndex == 0 && (
                <>
                  <View style={{ rowGap: 5 }}>
                    <Image
                      source={require('../../assets/images/logo_releafe_05.png')}
                      style={{ width: 86, height: 62 }}
                      resizeMode='contain'
                    />
                    <Text style={styles.informationTitleIntro}>
                      Hi {user?.firstName}, en welkom bij Releafe.
                    </Text>
                    <View></View>
                  </View>

                  {/* Body Container */}
                  <View style={{ marginTop: 10, rowGap: 20 }}>
                    <Text style={styles.informationBody}>
                      Fijn dat je er bent. {'\n'} {'\n'}
                      Releafe helpt je stap voor stap om goed voor je mentale
                      gezondheid te zorgen. Je leert omgaan met zorgen en
                      gevoelens zoals stress. Ook ontdek je hoe je meer aandacht
                      kunt geven aan de positieve dingen in je leven.
                      {'\n'} {'\n'}
                      Volg deze korte uitleg om te zien hoe de app werkt en wat
                      die voor jou kan betekenen.
                    </Text>
                  </View>
                </>
              )}
              {/* Title, Description & Icon for pages past the first */}
              {informatiegidsIndex >= 1 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 5,
                    }}
                  >
                    {informatiegidsSteps[informatiegidsIndex].icon && (
                      <View style={{ width: 20 }}>
                        <Image
                          style={{
                            height: 20,
                            width: '100%',
                          }}
                          resizeMode='contain'
                          source={informatiegidsSteps[informatiegidsIndex].icon}
                        />
                      </View>
                    )}
                    <Text style={styles.informationTitle}>
                      {informatiegidsSteps[informatiegidsIndex].title}
                    </Text>
                  </View>
                  <Text
                    style={[styles.informationBody, { marginVertical: 20 }]}
                  >
                    {informatiegidsSteps[informatiegidsIndex].description}
                  </Text>
                </>
              )}
              {/*Second Page*/}
              {informatiegidsIndex == 1 && (
                <View style={{ rowGap: 20 }}>
                  {Array.from({
                    length: informatiegidsNavigationElements.length,
                  }).map((_, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',
                          columnGap: 15,
                        }}
                      >
                        <Image
                          source={informatiegidsNavigationElements[index].icon}
                          style={styles.navigationScreenIcon}
                        />

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            flexShrink: 1,
                          }}
                        >
                          <Text style={styles.informationBodyBold}>
                            {informatiegidsNavigationElements[index].boldtext}
                          </Text>
                          <Text style={styles.informationBody}>
                            {informatiegidsNavigationElements[index].text}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              {/*Third Page*/}
              <View style={{ rowGap: 20 }}>
                {informatiegidsIndex == 2 && (
                  <>
                    {Array.from({
                      length: informatiegidsExerciseElements.length,
                    }).map((_, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            columnGap: 15,
                          }}
                        >
                          <Image
                            source={informatiegidsExerciseElements[index].icon}
                            style={styles.navigationScreenIcon}
                          />
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              flexShrink: 1,
                            }}
                          >
                            <Text style={styles.informationBodyBold}>
                              {informatiegidsExerciseElements[index].title}
                            </Text>
                            <Text style={styles.informationBody}>
                              {informatiegidsExerciseElements[index].text}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
              {/*Fourth Page*/}
              {informatiegidsIndex == 3 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Reward Container */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: 5,
                        marginBottom: 20,
                      }}
                    >
                      {/* Points Container */}
                      <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>+15</Text>

                        <Image
                          style={styles.shopIcon}
                          source={require('../../assets/images/bonsai_tree_icons/shop_icon.png')}
                          resizeMode='contain'
                        />
                      </View>
                      {/* Trophy Container */}
                      <View style={styles.trophyContainer}>
                        <Image
                          style={styles.trophyIcon}
                          source={require('../../assets/images/bonsai_tree_icons/trophy_icon.png')}
                          resizeMode='contain'
                        />
                      </View>
                    </View>
                    <Text style={styles.informationBody}>
                      Met deze punten kun je jouw eigen bonsaiboom verzorgen en
                      laten groeien – bijvoorbeeld door extra bladeren of
                      bloesems toe te voegen.
                    </Text>
                    <Text style={styles.informationBody}>
                      Je vindt je bonsaiboom door rechtsboven op je profiel te
                      klikken.
                    </Text>
                    <View
                      style={{
                        height: 215,
                        width: '100%',
                        marginVertical: 20,
                      }}
                    >
                      <Image
                        resizeMode='contain'
                        source={require('../../assets/images/bonsai_tree_tree.png')}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
              {/*Fifth Page*/}
              {informatiegidsIndex == 4 && (
                <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                  Meldingen staan standaard aan. Wil je dit veranderen? Dan kun
                  je dat doen via de instellingen van je telefoon.
                </Text>
              )}
              {/*Sixth Page*/}
              {informatiegidsIndex == 5 && (
                <>
                  <Pressable
                    onPress={() => handleWebsitePress()}
                    style={styles.websiteButton}
                  >
                    <Text style={styles.websiteButtonText}>
                      Bezoek onze website
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
            {/*Close out Button*/}
            <Pressable
              style={{ position: 'absolute', top: 24, right: 24 }}
              onPress={() => {
                setInformatiegidsIndex(0);
                setModalInformationVisible(!modalInformationVisible);
              }}
            >
              <Feather name='x-circle' size={24} color='gray' />
            </Pressable>
            {/*Navigation controls*/}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={() => handlePrevious()}
                disabled={informatiegidsIndex == 0 ? true : false}
                style={informatiegidsIndex == 0 ? { opacity: 0.4 } : {}}
              >
                <MaterialCommunityIcons
                  name='chevron-left-circle-outline'
                  size={27}
                  color='black'
                />
              </Pressable>

              <View
                style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}
              >
                {Array.from({ length: informatiegidsLength + 1 }).map(
                  (_, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor:
                            index === informatiegidsIndex
                              ? '#829c7a'
                              : '#E4E1E1',
                          borderRadius: 99,
                        }}
                      ></View>
                    );
                  }
                )}
              </View>
              <Pressable
                onPress={() => handleNext()}
                disabled={
                  informatiegidsIndex == informatiegidsLength ? true : false
                }
                style={
                  informatiegidsIndex == informatiegidsLength
                    ? { opacity: 0.4 }
                    : {}
                }
              >
                <MaterialCommunityIcons
                  name='chevron-right-circle-outline'
                  size={27}
                  color='black'
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  headersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#C1D6BA',
    height: 150,
    width: '100%',
    borderRadius: 30,
    borderTopEndRadius: 0,
    paddingBottom: 20,
  },
  h1Text: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
    color: 'white',
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
    color: 'white',
  } as TextStyle,
  labelStyle: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 16,
  } as TextStyle,
  informationTitleIntro: {
    marginTop: 20,
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  informationTitle: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  informationBody: {
    ...Fonts.sofiaProLight[Platform.OS],
    lineHeight: 18,
    fontSize: 14,
  } as TextStyle,
  informationBodyBold: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  drawerItem: {
    paddingVertical: 10,
  },
  drawerItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000033',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 30,
    width: windowWidth - 2 * 15,
    backgroundColor: 'white',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  navigationScreenIcon: {
    height: 25,
    width: 25,
  },
  websiteButton: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    backgroundColor: '#5C6B57',
    marginVertical: 10,
  },
  websiteButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  } as TextStyle,
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 31,
    columnGap: 5,
    backgroundColor: '#90A38A',
    borderRadius: 7.5,
    padding: 5,
  },
  pointsText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
    fontSize: 16,
  } as TextStyle,
  shopIcon: {
    width: 29,
    height: 20,
    marginBottom: 5,
  },
  trophyContainer: {
    width: 35,
    padding: 5,
    borderRadius: 7.5,
    backgroundColor: '#FCF2D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyIcon: {
    width: 23,
    height: 20,
  },
});
