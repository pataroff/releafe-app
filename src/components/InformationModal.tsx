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
        'Deze mobiele applicatie bevat verschillende onderdelen die je kunt gebruiken:',
    },
    {
      title: 'Toolkit',
      description:
        'Binnen de toolkit vind je meerdere tools die je kunt gebruiken:',
    },
    {
      title: 'Bonsaiboom',
      description:
        'Op verschillende plekken kun je Releafe-punten verdienen, bijvoorbeeld door een oefening te doen of een zorg te reframen.',
    },
    {
      title: 'Notificaties',
      description:
        'Binnen Releafe. kun je pushmeldingen ontvangen, bijvoorbeeld wanneer het tijd is om je dagboek in te vullen of een oefening uit te voeren, afhankelijk van hoe jij dit instelt.',
      icon: require('../../assets/images/bell_icon.png'),
    },
    {
      title: 'Feedback',
      description:
        'Zijn er onduidelijkheden of heb je iets onjuist waargenomen binnen de mobiele applicatie?',
      icon: require('../../assets/images/information_icon.png'),
    },
  ];
  const informatiegidsNavigationElements = [
    {
      icon: require('../../assets/images/navigation_bar/home_icon.png'),
      boldtext: 'Het hoofdscherm',
      text: ' biedt een overzicht van je opgeslagen gegevens, zodat je snel een samenvatting van je data kunt inzien.',
    },
    {
      icon: require('../../assets/images/navigation_bar/diary_icon.png'),
      specialtext: 'In ',
      boldtext: 'het dagboek',
      text: ' kun je dagelijks je algehele gevoel en andere factoren rondom je mentale gezondheid bijhouden, evenals het beoordelen van jouw gestelde persoonlijke doelen.',
    },
    {
      icon: require('../../assets/images/navigation_bar/wellbeing_overview_icon.png'),
      boldtext: 'Het welzijnsoverzicht',
      text: ' toont je welzijnstoestand zoals beschreven in je dagboek. Ook kun je hier gegevens van andere dagen terugvinden.',
    },
    {
      icon: require('../../assets/images/navigation_bar/toolkit_icon.png'),
      boldtext: 'De toolkit',
      text: ' biedt verschillende tools ter ondersteuning van het verbeteren van je mentale gezondheid.',
    },
  ];
  const informatiegidsExerciseElements = [
    {
      icon: require('../../assets/images/custom_icons/persoonlijke_doelen_icon.png'),
      text: 'Bij de persoonlijke doelen kun je doelen stellen in verschillende richtingen, die je kunt personaliseren en waaraan je herinneringen kunt koppelen.',
    },
    {
      icon: require('../../assets/images/custom_icons/zorgenbakje_icon.png'),
      text: 'In het zorgenbakje kun je tijdelijk je zorgen opbergen, zodat je deze van je af kunt schrijven.',
    },
    {
      icon: require('../../assets/images/custom_icons/reframing_icon.png'),
      text: 'De eerder omschreven of nieuwe zorgen kun je reframen, zodat je leert op een andere manier naar negatieve gedachten te kijken.',
    },
    {
      icon: require('../../assets/images/custom_icons/berichten_aan_jezelf_icon.png'),
      text: 'Je kunt berichten voor jezelf uitschrijven als notities, die je later kunt teruglezen en waaraan je media, zoals audio-opnamen, kunt koppelen.',
    },
    {
      icon: require('../../assets/images/custom_icons/oefeningen_icon.png'),
      text: 'Met onze vele oefeningen kun je aan de slag met mindfulness, meditatie, ontspanning, lichaamsbeweging en ademhaling.',
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
                      Releafe. biedt je de mogelijkheid om actief aan je mentale
                      gezondheid te werken en ondersteuning te krijgen bij je
                      mentale klachten.
                    </Text>
                    <Text style={styles.informationBody}>
                      Volg deze informatiegids om te ontdekken hoe de mobiele
                      applicatie werkt en wat wij voor jou kunnen betekenen.
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
                              {' '}
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
                        <Text style={styles.informationBody}>
                          {informatiegidsExerciseElements[index].text}
                        </Text>
                      </View>
                    );
                  })}
                </>
              )}
              {/*Fourth Page*/}
              {informatiegidsIndex == 3 && (
                <>
                  <Image
                    source={require('../../assets/images/information_achievement_points_icon.png')}
                    style={{
                      objectFit: 'contain',
                      width: windowWidth / 3.2,
                      height: 36,
                      marginVertical: 10,
                    }}
                  />
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Met deze punten kun je jouw eigen bonsaiboom upgraden en
                    verzorgen, door bijvoorbeeld extra bladeren of bloesems toe
                    te voegen.
                  </Text>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Jouw bonsaiboom vind je door op je profiel te klikken,
                    rechtsboven in het scherm.
                  </Text>
                  <Image
                    source={require('../../assets/images/bonsai_tree_tree.png')}
                    style={{
                      objectFit: 'contain',
                      alignSelf: 'center',
                      width: windowWidth / 1.15,
                    }}
                  />
                </>
              )}
              {/*Fifth Page*/}
              {informatiegidsIndex == 4 && (
                <>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Alle meldingen zijn standaard ingeschakeld. Wil je dit
                    wijzigen? Dan kun je de meldingen aanpassen via de
                    instellingen, onderdelen "
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
                    extra meldingen" in het "Meldingen"-venster.
                  </Text>
                  <Text style={styles.informationBody}>
                    De instellingen vind je door op je profiel te klikken,
                    rechtsboven in het scherm.
                  </Text>
                </>
              )}
              {/*Sixth Page*/}
              {informatiegidsIndex == 5 && (
                <>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Veelgestelde vragen kun je vinden op onze website. Ook kun
                    je hier contact met ons opnemen.
                  </Text>
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
                setModalInformationVisible(!modalInformationVisible)
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
