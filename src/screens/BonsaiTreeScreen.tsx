import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TextStyle,
  Image,
  Pressable,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { Fonts } from '../styles';

import { Header } from '../components/Header';

import {
  stateIcons,
  branchesStateIcons,
  leavesStateIcons,
  flowersStateIcons,
  branchesImages,
  leavesImages,
  flowerImages,
} from '../utils/gamification';

import { useGamification } from '../context/GamificationContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
// @TODO: Is there a better way to handle smaller screen sizes?
const windowHeight = Dimensions.get('window').height;

export const BonsaiTreeScreen: React.FC = ({ route }) => {
  const title = 'Bonsaiboom';
  const navigation = useNavigation();

  const {
    points,
    unlockedItems,
    treeState,
    setTreeState,
    updateTreeStateInDatabase,
  } = useGamification();

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

  // 1. Sync `treeState` from database into local state when it loads
  useEffect(() => {
    if (treeState) {
      setSelectedBranchIndex(treeState.selectedBranchIndex ?? null);
      setSelectedLeafIndex(treeState.selectedLeafIndex ?? null);
      setSelectedFlowerIndex(treeState.selectedFlowerIndex ?? null);
    }
  }, [treeState]);

  // 2. Save `treeState` to database when user leaves the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Save `treeState` locally when the screen loses focus
      setTreeState({
        selectedBranchIndex,
        selectedLeafIndex,
        selectedFlowerIndex,
      });
      // Save `treeState` to database when the screen loses focus
      updateTreeStateInDatabase(
        selectedBranchIndex,
        selectedLeafIndex,
        selectedFlowerIndex
      );
    });

    return unsubscribe; // Clean up the listener
  }, [navigation, selectedBranchIndex, selectedLeafIndex, selectedFlowerIndex]);

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
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps='handled'
              bounces={false}
              showsVerticalScrollIndicator={false}
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
                            bounces={false}
                            showsVerticalScrollIndicator={false}
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
                  height: windowHeight < 700 ? 500 : 400,
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
                {selectedBranchIndex !== null &&
                  selectedFlowerIndex !== null &&
                  (() => {
                    const flowersToUse = [];

                    // Step 1: Stack flowers from the selected flower level
                    for (let i = 0; i <= selectedFlowerIndex; i++) {
                      flowersToUse.push(
                        ...flowerImages.slice(i * 5, (i + 1) * 5)
                      );
                    }

                    // Step 2: Only display the correct number of flowers based on the selected branch level
                    const flowersToDisplay = [
                      ...flowersToUse.slice(0, selectedBranchIndex + 1), // Always show flowers based on branch index
                      ...(selectedFlowerIndex >= 1
                        ? [
                            // Loop through each level from 1 to selectedFlowerIndex
                            ...Array.from(
                              { length: selectedFlowerIndex },
                              (_, i) => {
                                // Slice each flower level, from (i + 1) * 5 to (i + 2) * 5 (because we skip the 0-index)
                                return flowerImages
                                  .slice((i + 1) * 5, (i + 2) * 5)
                                  .slice(0, selectedBranchIndex + 1);
                              }
                            ).flat(), // Flatten the array to ensure all flowers are in a single array
                          ]
                        : []),
                    ];

                    // Step 3: Render the flowers
                    return flowersToDisplay.map((imgSrc, idx) => (
                      <Image
                        key={`flower-${idx}`}
                        source={imgSrc}
                        style={{
                          position: 'absolute',
                          bottom: 175,
                          left: '50%',
                          transform: [{ translateX: -windowWidth / 2 }],
                          width: '100%',
                          height: 235,
                          zIndex: 28 + idx,
                        }}
                        resizeMode='cover'
                      />
                    ));
                  })()}

                {/* Leaves */}
                {selectedBranchIndex !== null &&
                  selectedLeafIndex !== null &&
                  (() => {
                    const leavesToUse = [];

                    // Step 1: Stack leaves from the selected leaf level
                    for (let i = 0; i <= selectedLeafIndex; i++) {
                      leavesToUse.push(
                        ...leavesImages.slice(i * 5, (i + 1) * 5)
                      );
                    }

                    // Step 2: Only display the correct number of leaves based on the selected branch level
                    const leavesToDisplay = [
                      ...leavesToUse.slice(0, selectedBranchIndex + 1), // Always show leaves based on branch index
                      ...(selectedLeafIndex >= 1
                        ? [
                            // Loop through each level from 1 to selectedLeafIndex
                            ...Array.from(
                              { length: selectedLeafIndex },
                              (_, i) => {
                                // Slice each leaf level, from (i + 1) * 5 to (i + 2) * 5 (because we skip the 0-index)
                                return leavesImages
                                  .slice((i + 1) * 5, (i + 2) * 5)
                                  .slice(0, selectedBranchIndex + 1);
                              }
                            ).flat(), // Flatten the array to ensure all leaves are in a single array
                          ]
                        : []),
                    ];

                    // Step 3: Render the leaves
                    return leavesToDisplay.map((imgSrc, idx) => (
                      <Image
                        key={`leaf-${idx}`}
                        source={imgSrc}
                        style={{
                          position: 'absolute',
                          bottom: 175,
                          left: '50%',
                          transform: [{ translateX: -windowWidth / 2 }],
                          width: '100%',
                          height: 235,
                          zIndex: 3 + idx,
                        }}
                        resizeMode='cover'
                      />
                    ));
                  })()}

                {/* Branches */}
                {selectedBranchIndex !== null && (
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
                )}

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
                  bottom: 120,
                  height: 100,
                  width: '100%',
                  paddingHorizontal: 25,
                  zIndex: 3,
                }}
              >
                {/* Shop Button */}
                <Pressable
                  onPress={() => navigation.navigate('BonsaiTreeShop')}
                  style={{
                    height: 100,
                    width: 100,
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
                    height: 100,
                    width: 100,
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
