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
        'Releafe kan je meldingen sturen. Bijvoorbeeld om je te herinneren je dagboek in te vullen of een oefening te doen. Wat je ontvangt, hangt af van hoe jij dit instelt.',
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
      title: "Persoonlijke doelen",
      text: 'Stel doelen die goed zijn voor je mentale gezondheid en belangrijk voor jou zijn. Je kunt ze aanpassen zoals jij dat wilt.',
    },
    {
      icon: require('../../assets/images/custom_icons/zorgenbakje_icon.png'),
      title: "Zorgenbakje",
      text: 'Schrijf je zorgen op en bewaar ze tijdelijk in het Zorgenbakje. Zo zet je ze even van je af.',
    },
    {
      icon: require('../../assets/images/custom_icons/reframing_icon.png'),
      title: "Reframen",
      text: 'Kijk op een andere manier naar je zorgen. Zo leer je omgaan met negatieve gedachten.',
    },
    {
      icon: require('../../assets/images/custom_icons/berichten_aan_jezelf_icon.png'),
      title: "Bericht aan jezelf",
      text: 'Schrijf een bericht aan jezelf dat je erbij kunt pakken als je het nodig hebt.\nTip: vraag iemand die je lief is om een bericht voor je te maken.',
    },
    {
      icon: require('../../assets/images/custom_icons/oefeningen_icon.png'),
      title: "Ontspanningsoefeningen",
      text: 'Doe oefeningen zoals mindfulness, meditatie, bewegen en ademhalen. Ze helpen je om te ontspannen en tot rust te komen.',
    },
  ];

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
                  <View style={{ marginTop: 20, rowGap: 20 }}>
                    <Text style={styles.informationBody}>
                      Fijn dat je er bent.
                    </Text>
                    <Text style={styles.informationBody}>
                    Releafe helpt je stap voor stap om goed voor je mentale gezondheid te zorgen. Je leert omgaan met zorgen en gevoelens zoals stress. Ook ontdek je hoe je meer aandacht kunt geven aan de positieve dingen in je leven.
                    {"\n"} {"\n"}
                    Volg deze korte uitleg om te zien hoe de app werkt en wat die voor jou kan betekenen.
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
                    style={{ ...styles.informationBody, marginVertical: 20 }}
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
                          width: '100%',
                          paddingRight: 30,
                        }}
                      >
                        <View style={{ alignSelf: 'center' }}>
                          <Image
                            source={
                              informatiegidsNavigationElements[index].icon
                            }
                            style={styles.navigationScreenIcon}
                          ></Image>
                        </View>
                        {informatiegidsNavigationElements[index].specialtext ? (
                          <Text style={styles.informationBody}>
                            {
                              informatiegidsNavigationElements[index]
                                .specialtext
                            }
                            <Text style={styles.informationBodyBold}>
                              {informatiegidsNavigationElements[index].boldtext}
                              <Text style={styles.informationBody}>
                                {informatiegidsNavigationElements[index].text}
                              </Text>
                            </Text>
                          </Text>
                        ) : (
                          <Text style={styles.informationBodyBold}>
                            {informatiegidsNavigationElements[index].boldtext}
                            <Text style={styles.informationBody}>
                              {'\n'}
                              {informatiegidsNavigationElements[index].text}
                            </Text>
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
              {/*Third Page*/}
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
                          marginBottom: 10,
                          marginRight: 30,
                        }}
                      >
                        <View style={{ alignSelf: 'center' }}>
                          <Image
                            source={informatiegidsExerciseElements[index].icon}
                            style={styles.navigationScreenIcon}
                          ></Image>
                        </View>
                        <View style = {{display: 'flex', flexDirection: 'column'}}>
                        <Text style = {styles.informationBodyBold}>
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
              {/*Fourth Page*/}
              {informatiegidsIndex == 3 && (
                <>
                <View style={{display: 'flex', flexDirection: 'column', columnGap: 10}}>
                  <Image
                    source={require('../../assets/images/information_achievement_points_icon.png')}
                    style={{
                      objectFit: 'contain',
                      width: windowWidth / 3.2,
                      height: 36,
                    }}
                  />
                  <Text style={{ ...styles.informationBody}}>
                    Met deze punten kun je jouw eigen bonsaiboom verzorgen en laten groeien – 
                    bijvoorbeeld door extra bladeren of bloesems toe te voegen.
                  </Text>
                  <Text style={{ ...styles.informationBody}}>
                    Je vindt je bonsaiboom door rechtsboven op je profiel te klikken.
                  </Text>
                  <Image
                    source={require('../../assets/images/bonsai_tree_tree.png')}
                    style={{
                      objectFit: 'contain',
                      alignSelf: 'center',
                      width: windowWidth / 1.2,
                      maxHeight: windowHeight /3,
                    }}
                    />
                </View>
                </>
              )}
              {/*Fifth Page*/}
              {informatiegidsIndex == 4 && (
                <>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                  Meldingen staan standaard aan. Wil je dat veranderen? Je kunt dit aanpassen via je instellingen. Ga naar het onderdeel ‘
                    <View style={{ width: windowWidth / 34 }}>
                      <Image
                        source={require('../../assets/images/drawer_icons/drawer_settings_icon.png')}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: 12,
                        }}
                      />
                    </View>
                    Extra meldingen’ in het scherm ‘Meldingen’.
                  </Text>
                  <Text style={styles.informationBody}>
                    Je instellingen vind je door rechtsboven op je profiel te klikken.
                  </Text>
                </>
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
              onPress={() =>
              {
                setInformatiegidsIndex(0);
                setModalInformationVisible(!modalInformationVisible)
              }
              }
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
    color: 'black',
    fontSize: 20,
  } as TextStyle,
  informationTitle: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 18,
  } as TextStyle,
  informationBody: {
    ...Fonts.sofiaProLight[Platform.OS],
    color: 'black',
    fontSize: 14,
  } as TextStyle,
  informationBodyBold: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
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
    objectFit: 'contain',
    paddingHorizontal: 10,
    height: 26,
    width: '100%',
    marginRight: 20,
    alignSelf: 'center',
  },
  websiteButton: {
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#5C6B57',
    marginVertical: 20,
  },
  websiteButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  } as TextStyle,
});
