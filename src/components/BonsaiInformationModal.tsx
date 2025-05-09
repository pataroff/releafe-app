import React, { useContext, useState } from 'react';
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
} from 'react-native';

import { useAuth } from '../context/AuthContext';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

interface BonsaiInformationModalProps {
  modalBonsaiInformationVisible: boolean;
  setModalBonsaiInformationVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const BonsaiInformationModal: React.FC<BonsaiInformationModalProps> = ({
  modalBonsaiInformationVisible,
  setModalBonsaiInformationVisible,
}) => {
  const { user } = useAuth();
  const [informatiegidsIndex, setInformatiegidsIndex] = useState<number>(0);

  const handleNext = () => {
    if (informatiegidsIndex < informatiegidsSteps.length) {
      setInformatiegidsIndex((prev) => ++prev);
    }
  };
  const handlePrevious = () => {
    if (informatiegidsIndex != 0) {
      setInformatiegidsIndex((prev) => --prev);
    }
  };
  const informatiegidsSteps = [
    {
      title: 'Releafe',
      description: '',
    },
    {
      title: 'Releafe-Puten',
      description:
        'In de app kun je op verschillende manieren Releafe-punten verdienen. Bijvoorbeeld door je dagboek in te vullen, een zorg anders te bekijken of een persoonlijk doel te behalen.',
    },
    {
      title: 'Bonsaiboom upgraden',
      description:
        'Je kunt jouw bonsaiboom op drie manieren aanpassen en laten groeien: door takken, bladeren of bloesems toe te voegen.',
    },
    {
      title: 'Punten en prestaties',
      description:
        'Linksonder zie je hoeveel Releafe-punten je hebt. Klik hierop om takken, bladeren of bloesems voor jouw bonsaiboom te kopen.',
    },
  ];

  return (
    <View>
      <Modal
        animationType='none'
        transparent={true}
        visible={modalBonsaiInformationVisible}
        onRequestClose={() => {
          setInformatiegidsIndex(0);
          setModalBonsaiInformationVisible(!modalBonsaiInformationVisible);
        }}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/*First Page*/}
              {informatiegidsIndex == 0 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <Image
                      source={require('../../assets/images/bonsai_tree_information_icon.png')}
                      style={{ width: 96, height: 64 }}
                      resizeMode='contain'
                    />
                    <View style={{ rowGap: 20, marginVertical: 20 }}>
                      <Text style={styles.informationTitleIntro}>
                        Hi {user?.firstName}, welkom bij je bonsaiboom.
                      </Text>
                      <Text style={{ ...styles.informationBody }}>
                        Hier kun je jouw eigen bonsaiboom verzorgen en aanpassen zoals 
                        jij dat wilt.
                        Ontdek wat er allemaal mogelijk is!

                      </Text>
                    </View>
                  </View>
                </>
              )}
              {/*Title, Description & Icon for pages past the first*/}
              {informatiegidsIndex >= 1 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.informationTitle}>
                      {informatiegidsSteps[informatiegidsIndex].title}
                    </Text>
                  </View>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    {informatiegidsSteps[informatiegidsIndex].description}
                  </Text>
                </>
              )}
              {/*Second Page*/}
              {informatiegidsIndex == 1 && (
                <>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Op plekken waar je punten en badges kunt verdienen, zie je deze symbolen:
                  </Text>
                  <View
                    style={{ width: windowWidth / 3.2, paddingVertical: 10 }}
                  >
                    <Image
                      source={require('../../assets/images/information_achievement_points_icon.png')}
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 36,
                      }}
                    />
                  </View>
                </>
              )}
              {/*Third Page*/}
              {informatiegidsIndex == 2 && (
                <>
                  <Image
                    source={require('../../assets/images/bonsai_upgrades_information_icons.png')}
                    style={{
                      objectFit: 'contain',
                      width: windowWidth / 1.25,
                      height: 128,
                      marginBottom: 10,
                    }}
                  />
                </>
              )}
              {/*Fourth Page*/}
              {informatiegidsIndex == 3 && (
                <>
                  <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                    Rechtsonder vind je je prestaties: de badges die je hebt 
                    verdiend door actief bezig te zijn met je mentale gezondheid.
                  </Text>
                  <Image
                    source={require('../../assets/images/bonsai_points_achievements_information_icons.png')}
                    style={{
                      objectFit: 'contain',
                      alignSelf: 'center',
                      width: windowWidth / 1.15,
                      height: 160,
                    }}
                  />
                </>
              )}
            </View>
            {/*Close out Button*/}
            <Pressable
              style={{ position: 'absolute', top: 24, right: 24 }}
              onPress={() =>
              {
                setInformatiegidsIndex(0);
                setModalBonsaiInformationVisible(!modalBonsaiInformationVisible)
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
                {Array.from({ length: informatiegidsSteps.length }).map(
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
                  informatiegidsIndex == informatiegidsSteps.length - 1
                    ? true
                    : false
                }
                style={
                  informatiegidsIndex == informatiegidsSteps.length - 1
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
    paddingRight: 10,
    paddingLeft: 10,
    height: 26,
    width: 26,
    marginRight: 25,
    top: 4,
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
