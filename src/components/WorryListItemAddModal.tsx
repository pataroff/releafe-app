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

import { WorryContext } from '../context/WorryContext';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.None:
      return 'gray';
    case Priority.Low:
      return 'green';
    case Priority.Medium:
      return 'orange';
    case Priority.High:
      return 'red';
    default:
      return 'gray';
  }
};

interface WorryListItemAddModalProps {
  modalAddWorryListItemVisible: boolean;
  setModalAddWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalAddedWorryListItemVisible: boolean;
  setModalAddedWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const WorryListItemAddModal: React.FC<WorryListItemAddModalProps> = ({
  modalAddWorryListItemVisible,
  setModalAddWorryListItemVisible,
  modalAddedWorryListItemVisible,
  setModalAddedWorryListItemVisible,
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

  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);

  const handleStore = () => {
    createWorryEntry(),
      resetWorryEntryFields(),
      setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
    setModalAddedWorryListItemVisible(!modalAddedWorryListItemVisible);
  };

  const handleClose = () => {
    resetWorryEntryFields(),
      setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
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
                onPress={() => handleClose()}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {/* Instructions */}
            <Text style={[styles.headersDescriptionText, { fontSize: 14 }]}>
              Omschrijf hier jouw zorg
            </Text>
          </View>

          {/* Main Content Wrapper */}
          <View
            style={{
              flex: 1,
            }}
          >
            {/* Dropdown + Title */}
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
              <DropdownComponent
                category={category}
                setCategory={setCategory}
              />
              <TextInput
                style={
                  {
                    ...Fonts.poppinsRegular[Platform.OS],
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
            </View>

            {/* Description + Priority [1] */}
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
              <View>
                <Text style={styles.headersHeadingText}>
                  Situatieomschrijving
                </Text>
                <Text style={styles.headersDescriptionText}>
                  Omschrijf hier wat de situatie is van jouw zorg.
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
                      ...Fonts.poppinsRegular[Platform.OS],
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#f6f7f8',
                      height: 180,
                    } as TextStyle
                  }
                  placeholder='Schrij hier je zorg op...'
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
                      <Feather name='flag' size={18} color='green' />
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
                      <Feather name='flag' size={18} color='orange' />
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
                      <Feather name='flag' size={18} color='red' />
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
                    onPress={() => setShowPriorityButtons(!showPriorityButtons)}
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
                onPress={() => handleStore()}
              >
                <Text style={styles.storeButtonText}>
                  Zorg opslaan in zorgenbakje
                </Text>
              </Pressable>
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
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
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
    ...Fonts.poppinsBold[Platform.OS],
    color: 'white',
    fontSize: 12,
  } as TextStyle,
});
