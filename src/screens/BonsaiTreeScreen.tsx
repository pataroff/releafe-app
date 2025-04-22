import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextStyle,
  Image,
  Pressable,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { Fonts } from '../styles';

import { Header } from '../components/Header';

import { useGamification } from '../context/BonsaiContext';
import { bonsaiCategories } from '../utils/bonsai';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const stateIcons = [
  require('../../assets/images/bonsai_tree_icons/branches_icon.png'),
  require('../../assets/images/bonsai_tree_icons/leaves_icon.png'),
  require('../../assets/images/bonsai_tree_icons/blossom_icon.png'),
];

const branchesStateIcons = [
  {
    id: 'branches_1',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_1.png'),
  },
  {
    id: 'branches_2',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_2.png'),
  },
  {
    id: 'branches_3',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_3.png'),
  },
  {
    id: 'branches_4',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_4.png'),
  },
  {
    id: 'branches_5',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_5.png'),
  },
];

const leavesStateIcons = [
  {
    id: 'leaves_1',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_1.png'),
  },
  {
    id: 'leaves_2',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_2.png'),
  },
  {
    id: 'leaves_3',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_3.png'),
  },
  {
    id: 'leaves_4',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_4.png'),
  },
  {
    id: 'leaves_5',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_5.png'),
  },
];

const flowersStateIcons = [
  {
    id: 'flowers_1',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_1.png'),
  },
  {
    id: 'flowers_2',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_2.png'),
  },
  {
    id: 'flowers_3',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_3.png'),
  },
  {
    id: 'flowers_4',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_4.png'),
  },
  {
    id: 'flowers_5',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_5.png'),
  },
];

const branchesImages = [
  require('../../assets/images/bonsai_tree_icons/branches/branches_1.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_2.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_3.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_4.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_5.png'),
];

const leavesImages = [
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_1.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_2.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_3.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_4.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_5.png'),
];

const flowerImages = [
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_1.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_2.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_3.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_4.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_5.png'),
];

export const BonsaiTreeScreen: React.FC = ({ route }) => {
  const title = 'Bonsaiboom';
  const navigation = useNavigation();

  const { points, unlockedItems } = useGamification();

  const [showBranchesOptions, setShowBranchesOptions] =
    useState<boolean>(false);
  const [showLeavesOptions, setShowLeavessOptions] = useState<boolean>(false);
  const [showFlowersOptions, setShowFlowersOptions] = useState<boolean>(false);

  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number | null>(
    null
  );
  const [selectedLeafIndex, setSelectedLeafIndex] = useState<number | null>(
    null
  );
  const [selectedFlowerIndex, setSelectedFlowerIndex] = useState<number | null>(
    null
  );

  const selectedIndexSetters = [
    setSelectedBranchIndex,
    setSelectedLeafIndex,
    setSelectedFlowerIndex,
  ];

  const handleBonsaiStateDropdown = (index: number) => {
    switch (index) {
      case 0:
        setShowBranchesOptions(!showBranchesOptions);
        break;
      case 1:
        setShowLeavessOptions(!showLeavesOptions);
        break;
      case 2:
        setShowFlowersOptions(!showFlowersOptions);
        break;
    }
  };

  const handleBonsaiStateDropdownSelection = (
    categoryIndex: number,
    itemIndex: number
  ) => {
    selectedIndexSetters[categoryIndex](itemIndex);

    switch (categoryIndex) {
      case 0:
        setShowBranchesOptions(false);
        break;
      case 1:
        setShowLeavessOptions(false);
        break;
      case 2:
        setShowFlowersOptions(false);
        break;
    }
  };

  return (
    <>
      <StatusBar />
      <Header title={title} route={route} />

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../assets/images/bonsai_tree_screen_background.png')}
          style={styles.backgroundImage}
          resizeMode='cover'
        >
          {/* Overlay image */}
          <Image
            source={require('../../assets/images/bonsai_tree_overlay_background.png')}
            style={styles.overlayImage}
            resizeMode='cover'
          />

          {/* Main content */}
          <View style={{ flex: 1, zIndex: 2 }}>
            <ScrollView
              bounces={false}
              style={styles.container}
              contentContainerStyle={styles.contentContainerStyles}
            >
              {/* Headers */}
              <View style={styles.headersContainer}>
                <View style={styles.headersTextContainer}>
                  <Text style={styles.headersTitleText}>Bonsaiboom status</Text>
                  <Text style={styles.headersDescriptionText}>
                    Hier zie jij hoe jouw bonsaiboom ervoor staat. Klaar om ‘m
                    een upgrade te geven?
                  </Text>
                </View>

                {/* Bonsai Tree States */}
                <View style={styles.bonsaiTreeStatesContainer}>
                  {stateIcons.map((icon, index) => {
                    const isDropdownVisible =
                      (index === 0 && showBranchesOptions) ||
                      (index === 1 && showLeavesOptions) ||
                      (index === 2 && showFlowersOptions);

                    const dropdownIcons =
                      index === 0
                        ? branchesStateIcons
                        : index === 1
                        ? leavesStateIcons
                        : flowersStateIcons;

                    const setSelectedIndex = selectedIndexSetters[index];

                    return (
                      <View key={index}>
                        {/* Bonsai Tree State Button */}
                        <Pressable
                          style={styles.stateContainer}
                          onPress={() => handleBonsaiStateDropdown(index)}
                        >
                          <Image
                            source={icon}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </Pressable>

                        {/* Bonsai Tree State Dropdown */}
                        {isDropdownVisible && (
                          <ScrollView
                            style={{
                              position: 'absolute',
                              top: 30,
                              width: '100%',
                              maxHeight: 300,
                              backgroundColor: '#F1F1F1',
                              borderRadius: 20,
                              zIndex: 1,
                            }}
                            contentContainerStyle={{
                              alignItems: 'center',
                              paddingTop: 50,
                              paddingBottom: 10,
                              gap: 5,
                            }}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                          >
                            {dropdownIcons.map((icon, idx) => (
                              <Pressable
                                key={idx}
                                onPress={() =>
                                  handleBonsaiStateDropdownSelection(index, idx)
                                }
                                disabled={
                                  !unlockedItems.includes(icon.id)
                                    ? true
                                    : false
                                }
                                style={{
                                  width: 55,
                                  height: 55,
                                }}
                              >
                                <Image
                                  source={icon.image}
                                  style={{
                                    opacity: unlockedItems.includes(icon.id)
                                      ? 1
                                      : 0.25,
                                    width: '100%',
                                    height: '100%',
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    borderColor: 'white',
                                  }}
                                  resizeMode='cover'
                                />
                              </Pressable>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Bonsai Tree + Hill */}
              <View
                style={{
                  height: 400,
                  width: '100%',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Hill (anchored to bottom) */}
                <Image
                  source={require('../../assets/images/bonsai_tree_hill.png')}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 200,
                  }}
                />

                {/* Flowers */}
                <Image
                  source={flowerImages[selectedFlowerIndex]}
                  style={{
                    position: 'absolute',
                    bottom: 175, // same as hill height
                    left: '50%',
                    transform: [{ translateX: -windowWidth / 2 }],
                    width: '100%',
                    height: 235,
                    zIndex: 4,
                  }}
                />

                {/* Leaves */}
                <Image
                  source={leavesImages[selectedLeafIndex]}
                  style={{
                    position: 'absolute',
                    bottom: 175, // same as hill height
                    left: '50%',
                    transform: [{ translateX: -windowWidth / 2 }],
                    width: '100%',
                    height: 235,
                    zIndex: 3,
                  }}
                />

                {/* Branches */}
                <Image
                  source={branchesImages[selectedBranchIndex]}
                  style={{
                    position: 'absolute',
                    bottom: 175, // same as hill height
                    left: '50%',
                    transform: [{ translateX: -windowWidth / 2 }],
                    width: '100%',
                    height: 235,
                    zIndex: 2,
                  }}
                />

                {/* Root */}
                <Image
                  source={require('../../assets/images/bonsai_tree_icons/branches/branches_0.png')}
                  style={{
                    position: 'absolute',
                    bottom: 175, // same as hill height
                    left: '50%',
                    transform: [{ translateX: -windowWidth / 2 }],
                    width: '100%',
                    height: 235,
                    zIndex: 1,
                  }}
                />

                {/* Pot */}
                <Image
                  source={require('../../assets/images/bonsai_tree_icons/pots/pots_1.png')}
                  style={{
                    position: 'absolute',
                    bottom: 175, // same as hill height
                    left: '50%',
                    transform: [{ translateX: -windowWidth / 2 }],
                    width: '100%',
                    height: 235,
                    zIndex: 0,
                  }}
                />
              </View>

              {/* Bottom Bar */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 100,
                  height: 110,
                  width: '100%',
                  paddingHorizontal: 25,
                  zIndex: 3,
                }}
              >
                {/* Shop Button */}
                <Pressable
                  onPress={() => navigation.navigate('BonsaiTreeShop')}
                  style={{
                    height: 110,
                    width: 110,
                    borderRadius: 9999,
                    backgroundColor: '#5C6B57',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: 10,
                  }}
                >
                  {/* Shop Icon */}
                  <Image
                    source={require('../../assets/images/bonsai_tree_icons/shop_icon.png')}
                  />
                  {/* Points Text */}
                  <Text
                    style={
                      {
                        ...Fonts.sofiaProBold[Platform.OS],
                        fontSize: 16,
                        color: 'white',
                      } as TextStyle
                    }
                  >
                    {/* @TODO This should come from the context! */}
                    {points} punten
                  </Text>
                </Pressable>

                {/* Achievements Button */}
                <Pressable
                  style={{
                    height: 110,
                    width: 110,
                    borderRadius: 9999,
                    backgroundColor: '#FCF2D0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: 10,
                  }}
                >
                  {/* Trophy Icon */}
                  <Image
                    source={require('../../assets/images/bonsai_tree_icons/trophy_icon.png')}
                  />
                  {/* Achievements Text */}
                  <Text
                    style={
                      {
                        ...Fonts.sofiaProBold[Platform.OS],
                        fontSize: 16,
                        color: '#FFC700',
                      } as TextStyle
                    }
                  >
                    Prestaties
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  overlayImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // #F9F9F9
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // #F9F9F9
  },
  headersContainer: {
    position: 'relative',
    width: windowWidth,
    paddingTop: 40,
    paddingBottom: 80,
    // marginTop: 25,
    backgroundColor: '#F9F9F9',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headersTextContainer: {
    paddingHorizontal: 30,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    marginTop: 5,
  } as TextStyle,
  bonsaiTreeStatesContainer: {
    position: 'absolute',
    height: 100,
    width: 310,
    bottom: -50,
    left: '50%',
    transform: [{ translateX: -155 }], // -155 = -width / 2
    borderRadius: 30,
    backgroundColor: '#C1DEBE',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 25,
    zIndex: 2,
  },
  stateContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F9F9F9', // fallback
    zIndex: 2,
  },
});
