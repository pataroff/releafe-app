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

import { AuthContext } from '../context/AuthContext';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { topLeft } from '@shopify/react-native-skia';
import { useSharedValue } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;

export const CustomDrawerContent = (props) => {

  const { user, signOut } = useContext(AuthContext);
  const { navigation } = props;

  const [informatiegidsModalActive, setInformatiegidsModalActive] =
    useState<boolean>(false);

  const[informatiegidsIndex, setInformatiegidsIndex] = useState<number>(0);
  const informatiegidsLength = 5;

  const handleNext = () => {
    if(informatiegidsIndex < informatiegidsLength)
    {
      setInformatiegidsIndex((prev) => ++prev);
    }
  }
  const handlePrevious = () => {
    if(informatiegidsIndex!=0)
    {
      setInformatiegidsIndex((prev) => --prev);
    }
  }
  const informatiegidsSteps = [
    {
      title: 'Releafe',
      description: '',
    },
    {
      title: 'Onderdelen',
      description: 'Deze mobiele applicatie bevat verschillende onderdelen die je kunt gebruiken:',
    },
    {
      title: 'Toolkit',
      description: 'Binnen de toolkit vind je meerdere tools die je kunt gebruiken:',
    },
    {
      title: 'Bonsaiboom',
      description: 'Op verschillende plekken kun je Releafe-punten verdienen, bijvoorbeeld door een oefening te doen of een zorg te reframen.',
    },
    {
      title: 'Notificaties',
      description: 'Binnen Releafe. kun je pushmeldingen ontvangen, bijvoorbeeld wanneer het tijd is om je dagboek in te vullen of een oefening uit te voeren, afhankelijk van hoe jij dit instelt.',
      icon: require('../../assets/images/bell_icon.png'),
    },
    {
      title: 'Feedback',
      description: 'Zijn er onduidelijkheden of heb je iets onjuist waargenomen binnen de mobiele applicatie?',
      icon: require('../../assets/images/information_icon.png'),
    },
  ]
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
      text: ' biedt verschillende tools ter ondersteuning van het verbeteren van je mentale gezondheid.'
    }
  ];
  const informatiegidsExerciseElements = [
    {
      icon: require('../../assets/images/custom_icons/persoonlijke_doelen_icon.png'),
      text: 'Bij de persoonlijke doelen kun je doelen stellen in verschillende richtingen, die je kunt personaliseren en waaraan je herinneringen kunt koppelen.'
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
  ]

  const menuConfigGroup1 = [
    {
      label: 'Persoonlijk profiel',
      icon: require('../../assets/images/drawer_icons/drawer_profile_icon.png'),
      action: () => console.log('Persoonlijk profiel pressed!'),
    },
    {
      label: 'Bonsai boom',
      icon: require('../../assets/images/drawer_icons/drawer_bonsai_tree_icon.png'),
      action: () =>
        navigation.navigate('BonsaiTree', { screen: 'BonsaiTree1' }),
    },
    {
      label: 'Community',
      icon: require('../../assets/images/drawer_icons/drawer_community_icon.png'),
      action: () => console.log('Community pressed!'),
    },
  ];

  const menuConfigGroup2 = [
    {
      label: 'Informatiegids',
      icon: require('../../assets/images/drawer_icons/drawer_info_icon.png'),
      action: () => 
        {
          console.log('Informatiegids pressed!');
          setInformatiegidsModalActive(!informatiegidsModalActive);
        }
    },
    {
      label: 'Instellingen',
      icon: require('../../assets/images/drawer_icons/drawer_settings_icon.png'),
      action: () => console.log('Instellingen pressed!'),
    },
    {
      label: 'Uitloggen',
      icon: require('../../assets/images/drawer_icons/drawer_sign_out_icon.png'),
      // @TODO: In case of a component clear up, the `signOut` function would need to be passed as a param as it is destructured from the `useContext` hook!
      action: () => signOut(),
    },
  ];

  return (
  <>
    <SafeAreaView>
      <Modal
        animationType='none'
        transparent={true}
        visible={informatiegidsModalActive}
        onRequestClose={() =>
        {
          setInformatiegidsIndex(0);
          setInformatiegidsModalActive(!informatiegidsModalActive)
        }
        }
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
              <Image source={require('../../assets/images/logo_releafe_05.png')}
                style={{ width: 88, height: 62, paddingBottom: 90 }}
                resizeMode='contain'/>
              <View style={{ rowGap: 20 }}>
                <Text style={styles.informationTitleIntro}>
                  Hi {user?.firstName}, en welkom bij Releafe.
                </Text>
                <Text style={styles.informationBody}>
                Releafe. biedt je de mogelijkheid om actief aan je mentale gezondheid te werken en ondersteuning te krijgen bij je 
                mentale klachten.
                </Text>
                <Text style={styles.informationBody}>
                  Volg deze informatiegids om te ontdekken hoe de mobiele applicatie werkt en wat wij voor jou kunnen betekenen.
                </Text>
              </View>
              </>
              )}
              {/*Title, Description & Icon for pages past the first*/}
              {informatiegidsIndex >= 1 && (
              <>
              <View style ={
                {
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10,
                }
              }>
                {informatiegidsSteps[informatiegidsIndex].icon && (
                  <Image style= {
                  {
                    objectFit: 'contain',
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: 20,
                    width: 20,
                    marginRight: 5,
                    top: 4,
                  }
                  }
                  source={informatiegidsSteps[informatiegidsIndex].icon}></Image>
                  )}
                <Text style = {styles.informationTitle}>
                  {informatiegidsSteps[informatiegidsIndex].title}
                </Text>
              </View>
              <Text style = {{...styles.informationBody, marginBottom: 10}}>
                {informatiegidsSteps[informatiegidsIndex].description}
              </Text>
              </>)}
              {/*Second Page*/}
              {informatiegidsIndex == 1 && (
                <>
                {Array.from({ length: informatiegidsNavigationElements.length}).map((_, index) => {
                  return (
                  <View 
                  key = {index}
                  style= {{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginRight: 30,
                    }}>
                    <Image source={informatiegidsNavigationElements[index].icon} style = {styles.navigationScreenIcon}></Image>
                    {informatiegidsNavigationElements[index].specialtext ? (
                    <Text style={styles.informationBody}>
                      {informatiegidsNavigationElements[index].specialtext}
                      <Text style = {styles.informationBodyBold}>
                        {informatiegidsNavigationElements[index].boldtext}
                        <Text style = {styles.informationBody}>
                          {" "}{informatiegidsNavigationElements[index].text}
                        </Text>
                      </Text>
                    </Text>
                    ) : 
                      <Text style = {styles.informationBodyBold}>
                        {informatiegidsNavigationElements[index].boldtext}
                        <Text style = {styles.informationBody}>
                          {" "}{informatiegidsNavigationElements[index].text}
                        </Text>
                      </Text>
                    }
                  </View>
                  );
                  })}
                </>
              )}
              {/*Third Page*/}
              {informatiegidsIndex == 2 && (
              <>
                {Array.from({ length: informatiegidsExerciseElements.length}).map((_, index) => {
                  return (
                  <View
                  key={index} 
                  style= {{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginRight: 30,
                    }}>
                    <Image source={informatiegidsExerciseElements[index].icon} style = {styles.navigationScreenIcon}></Image>
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
                
                </>
              )}
            </View>
            {/*Close out Button*/}
            <Pressable style = {{position: 'absolute', top: 24, right: 24,}}
              onPress={() =>
                setInformatiegidsModalActive(!informatiegidsModalActive)
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
            
                    <View style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
                      {Array.from({ length: informatiegidsLength + 1 }).map((_, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              width: 8,
                              height: 8,
                              backgroundColor: index === informatiegidsIndex ? '#829c7a' : '#E4E1E1',
                              borderRadius: 99,
                            }}
                          ></View>
                        );
                      })}
                    </View>
            
                    <Pressable
                      onPress={() => handleNext()}
                      disabled={informatiegidsIndex == informatiegidsLength  ? true : false}
                      style={informatiegidsIndex == informatiegidsLength  ? { opacity: 0.4 } : {}}
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
    </SafeAreaView>
    <View style={{ flex: 1 }}>
      <View style={styles.headersContainer}>
        <View
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            columnGap: 15,
            paddingHorizontal: 30,
          }}
        >
          <Avatar.Text
            style={{
              backgroundColor: '#C1D6BA',
              borderWidth: 2,
              borderColor: 'white',
            }}
            color='white'
            size={54}
            label={user?.firstName[0] + user?.lastName[0]}
          />
          <View style={{ rowGap: 5 }}>
            <Text style={styles.h1Text}>Hallo, {user?.firstName}!</Text>
            <Text style={styles.bodyText}>Waar ben je naar op zoek?</Text>
          </View>
          {/* @TODO: Is there a better way of doing this? */}
          <Pressable
            style={{ position: 'absolute', right: 25, top: 5 }}
            onPress={() => navigation.closeDrawer()}
          >
            <Feather name='x-circle' size={22} color='white' />
          </Pressable>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0, // Removes extra space at the top
          flexGrow: 1,
          paddingBottom: 30,
        }}
      >
        <DrawerItemList {...props} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            paddingHorizontal: 20,
          }}
        >
          <View>
            {menuConfigGroup1.map((item, index, array) => {
              return (
                <DrawerItem
                  key={`group1-${index}`}
                  icon={({ color }) => (
                    <Image
                      source={item.icon}
                      resizeMode='contain'
                      style={{
                        marginRight: -5,
                        width: 34,
                        height: 27,
                        tintColor: color,
                      }}
                    />
                  )}
                  onPress={item.action}
                  label={item.label}
                  labelStyle={styles.labelStyle}
                  style={[
                    styles.drawerItem,
                    index !== array.length - 1 && styles.drawerItemWithBorder,
                  ]}
                />
              );
            })}
          </View>

          <View>
            {menuConfigGroup2.map((item, index, array) => {
              return (
                <DrawerItem
                  key={`group2-${index}`}
                  icon={({ color }) => (
                    <Image
                      source={item.icon}
                      resizeMode='contain'
                      style={{
                        marginRight: -5,
                        width: 34,
                        height: 27,
                        tintColor: index !== array.length - 1 ? color : 'red',
                      }}
                    />
                  )}
                  onPress={item.action}
                  label={item.label}
                  labelStyle={
                    index === array.length - 1
                      ? [styles.labelStyle, { color: 'red' }]
                      : styles.labelStyle
                  }
                  style={[
                    styles.drawerItem,
                    index !== array.length - 1 && styles.drawerItemWithBorder,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
   </>
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
  informationTitleIntro:
  {
    ...Fonts.sofiaProMedium[Platform.OS],
    color: 'black',
    fontSize: 20,
  } as TextStyle,
  informationTitle:
  {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'black',
    fontSize: 18,
  } as TextStyle,
  informationBody:
  {
    ...Fonts.sofiaProLight[Platform.OS],
    color: 'black',
    fontSize: 14,
  } as TextStyle,
  informationBodyBold:
  {
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
  navigationScreenIcon:
  {
    objectFit: 'contain',
    paddingRight: 10,
    paddingLeft: 10,
    height: 26,
    width: 26,
    marginRight: 25,
    top: 4,
    alignSelf: 'center'
  }
});
