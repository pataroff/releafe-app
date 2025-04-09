import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  Dimensions,
  TextStyle,
  Platform,
  TextInput,
} from 'react-native';

import { Priority } from '../types';
import { DropdownComponent } from './DropdownComponent';
import { CloseModal } from './CloseModal';

import { WorryContext } from '../context/WorryContext';
import { getPriorityColor } from '../utils/worry';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;

interface WorryListItemAddModalProps {
  modalAddWorryListItemVisible: boolean;
  setModalAddWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorryListItemAddModal: React.FC<WorryListItemAddModalProps> = ({
  modalAddWorryListItemVisible,
  setModalAddWorryListItemVisible,
  modalReframingVisible,
  setModalReframingVisible,
}) => {
  const {
    category,
    priority,
    title,
    description,
    setCategory,
    setPriority,
    setTitle,
    setDescription,
    createWorryEntry,
    resetWorryEntryFields,
  } = useContext(WorryContext);

  const [worryListItemAddModalIndex, setWorryListItemAddModalIndex] =
    useState<number>(0);
  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const handleStore = () => {
    createWorryEntry();
    setWorryListItemAddModalIndex(1);
  };

  const handleClose = () => {
    resetWorryEntryFields();
    setWorryListItemAddModalIndex(0);
    setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
  };

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
  const handleStorePress  = () => {
    if(!title)
    {
      //TODO: Add error message - Luna
    }
    else
    {
      title.trim();
<<<<<<< Updated upstream
=======
      description.trim();
>>>>>>> Stashed changes
      handleStore();
    }
  }

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  const handleReframing = () => {
    // resetWorryEntryFields(); // TODO: Where should the reset happen?
    setWorryListItemAddModalIndex(0);
    setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
    setTimeout(() => {
      setModalReframingVisible(!modalReframingVisible);
    }, 300);
  };

  const handlePriority = (priority: Priority) => {
    setPriority(priority);
    setShowPriorityButtons(!showPriorityButtons);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddWorryListItemVisible}
      onRequestClose={() => handleClose()}
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalAddWorryListItemVisible}
        setParentModalVisible={setModalAddWorryListItemVisible}
        title='Stoppen met zorg toevoegen'
        description='Je staat op het punt te stoppen met het toevoegen van jouw zorg. Weet je het zeker?'
        denyText='Nee, ik wil doorgaan'
        confirmText='Ja, ik wil afsluiten'
        handleClose={handleClose}
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headersTitleText}>Nieuwe zorg toevoegen</Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setCloseModalVisible(!closeModalVisible)}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {/* Instructions */}
            <Text style={[styles.headersDescriptionText, { fontSize: 14 }]}>
              {worryListItemAddModalIndex === 1
                ? 'Zorg is opgeslagen'
                : 'Omschrijf hier jouw zorg'}
            </Text>
          </View>

          {/* Main Content Wrapper */}
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                marginHorizontal: 20,
                borderRadius: 30,
                padding: 20,
                backgroundColor: 'white',
              }}
            >
              {worryListItemAddModalIndex == 0 ? (
                <>
                  {/* Dropdown + Title */}
                  <DropdownComponent
                    category={category}
                    setCategory={setCategory}
                  />
                  <TextInput
                    style={
                      {
                        ...Fonts.sofiaProRegular[Platform.OS],
                        backgroundColor: '#f6f7f8',
                        borderRadius: 10,
                        height: 40,
                        width: '67%',
                        paddingLeft: 10,
                      } as TextStyle
                    }
                    placeholder='Voeg een titel toe...'
                    placeholderTextColor='#00000080'
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                  />
                </>
              ) : (
                <>
                  {/* Success Image + Text */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      rowGap: 5,
                    }}
                  >
                    {/* Success Image */}
                    <Image
                      style={{ width: '100%', height: 50 }}
                      resizeMode='contain'
                      source={require('../../assets/images/zorg_opgeborgen_gelukt_icon.png')}
                    />
                    {/* Success Text */}
                    <Text style={styles.successHeadingText}>
                      Zorg opgeslagen
                    </Text>
                    <Text style={styles.successDescriptionText}>
                      Zorg is opgeslagen in het zorgenbakje
                    </Text>
                  </View>
                </>
              )}
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 20,
                marginHorizontal: 20,
                padding: 25,
                backgroundColor: 'white',
                borderRadius: 30,
                rowGap: 10,
              }}
            >
              {worryListItemAddModalIndex == 0 ? (
                <>
                  {/* Description + Priority [1] */}
                  <View>
                    <Text style={styles.headersHeadingText}>
                      Situatieomschrijving
                    </Text>
                  </View>

                  <View
                    style={{
                      position: 'relative',
                    }}
                  >
                    {/* Description */}
                    <TextInput
                      style={
                        {
                          ...Fonts.sofiaProRegular[Platform.OS],
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: '#f6f7f8',
                          height: 180,
                        } as TextStyle
                      }
                      placeholder='Schrijf hier op wat je kwijt wil over jouw zorg...'
                      placeholderTextColor='#00000080'
                      multiline
                      value={description}
                      onChangeText={(value) => setDescription(value)}
                    />

                    {/* Priority Button(s)*/}
                    {showPriorityButtons ? (
                      <>
                        {/* TODO: Is there a better way of doing this? */}
                        <Pressable
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            borderRadius: 99,
                            backgroundColor: '#dedede',
                            padding: 5,
                          }}
                          onPress={() => handlePriority(Priority.None)}
                        >
                          <Feather name='flag' size={18} color='gray' />
                        </Pressable>

                        <Pressable
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 35,
                            borderRadius: 99,
                            backgroundColor: '#dedede',
                            padding: 5,
                          }}
                          onPress={() => handlePriority(Priority.Low)}
                        >
                          <Feather
                            name='flag'
                            size={18}
                            color={getPriorityColor(Priority.Low)}
                          />
                        </Pressable>

                        <Pressable
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 70,
                            borderRadius: 99,
                            backgroundColor: '#dedede',
                            padding: 5,
                          }}
                          onPress={() => handlePriority(Priority.Medium)}
                        >
                          <Feather
                            name='flag'
                            size={18}
                            color={getPriorityColor(Priority.Medium)}
                          />
                        </Pressable>

                        <Pressable
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 105,
                            borderRadius: 99,
                            backgroundColor: '#dedede',
                            padding: 5,
                          }}
                          onPress={() => handlePriority(Priority.High)}
                        >
                          <Feather
                            name='flag'
                            size={18}
                            color={getPriorityColor(Priority.High)}
                          />
                        </Pressable>
                      </>
                    ) : (
                      <Pressable
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          padding: 5,
                        }}
                        onPress={() =>
                          setShowPriorityButtons(!showPriorityButtons)
                        }
                      >
                        <Feather
                          name='flag'
                          size={18}
                          color={getPriorityColor(priority)}
                        />
                      </Pressable>
                    )}
                  </View>
                  <Pressable
                    style={styles.storeButton}
                    onPress={() => handleStorePress()}
                  >
                    <Text style={styles.storeButtonText}>
                      Zorg opslaan in Zorgenbakje
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  {/* Success CTA */}
                  <Text style={styles.successCtaDescriptionText}>
                    Je hebt jouw zorg opgeborgen. Het kan helpen om deze te
                    reframen, zodat je in het vervolg een helpende gedachte hebt
                    voor deze zorg. Wil ie dit nu doen?
                  </Text>
                  {/* CTA Buttons */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => handleClose()}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>
                        Nee, afsluiten
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleReframing()}
                      style={styles.reframeButton}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          columnGap: 5,
                        }}
                      >
                        <Image
                          source={require('../../assets/images/custom_icons/reframing_icon_white.png')}
                          style={{ width: 24, height: 24 }}
                        />
                        <Text style={styles.reframeButtonText}>
                          Nu reframen
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 15,
    height: '90%',
    width: windowWidth,
    backgroundColor: '#E5F1E3',
    display: 'flex',
    flexDirection: 'column',
  },
  headersContainer: {
    width: '100%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  storeButton: {
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 13,
    marginTop: 10,
    backgroundColor: '#A9C1A1',
    alignSelf: 'center',
  },
  storeButtonText: {
    ...Fonts.sofiaProBold[Platform.OS],
    color: 'white',
    fontSize: 12,
  } as TextStyle,
  successHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  successDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  successCtaDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  cancelButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: 130,
    backgroundColor: '#E8E8E8',
  },
  cancelButtonText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  reframeButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: 130,
    backgroundColor: '#829B7A',
  },
  reframeButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 13,
    color: 'white',
  } as TextStyle,
});
