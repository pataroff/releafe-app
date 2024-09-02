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
    setReframed,
    createWorryEntry,
    resetWorryEntryFields,
  } = useContext(WorryContext);

  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);

  const handleStore = () => {
    setReframed(false);
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
          {/* Title + Close Button */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.modalTitleText}>Zorg toevoegen</Text>
            <Pressable
              style={{ position: 'absolute', right: 0 }}
              onPress={() => handleClose()}
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>

          {/* Instructions */}
          <Text style={{ textAlign: 'center' }}>
            [Uitleg over het invullen van zorgen]
          </Text>

          {/* Main Content Wrapper */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/* Dropdown + Title + Description + Priority [1] */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 10,
                marginTop: 20,
              }}
            >
              {/* Dropdown + Title */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <DropdownComponent
                  category={category}
                  setCategory={setCategory}
                />
                <TextInput
                  style={
                    {
                      ...Fonts.poppinsItalic[Platform.OS],
                      fontStyle: 'italic',
                      borderWidth: 1,
                      borderColor: '#dedede',
                      borderRadius: 5,
                      height: 30,
                      width: '77%',
                      paddingLeft: 5,
                    } as TextStyle
                  }
                  placeholder='Titel'
                  placeholderTextColor='#dedede'
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                />
              </View>
              {/* Description */}
              <TextInput
                style={
                  {
                    ...Fonts.poppinsItalic[Platform.OS],
                    fontStyle: 'italic',
                    position: 'relative',
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#dedede',
                    height: 200,
                  } as TextStyle
                }
                placeholder='Omschrijving'
                placeholderTextColor='#dedede'
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
                      bottom: -35,
                      borderRadius: 99,
                      backgroundColor: '#dedede',
                      padding: 5,
                    }}
                    onPress={() => handlePriority(Priority.None)}
                  >
                    <Feather name='flag' size={20} color='gray' />
                  </Pressable>

                  <Pressable
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 5,
                      borderRadius: 99,
                      backgroundColor: '#dedede',
                      padding: 5,
                    }}
                    onPress={() => handlePriority(Priority.Low)}
                  >
                    <Feather name='flag' size={20} color='green' />
                  </Pressable>

                  <Pressable
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 45,
                      borderRadius: 99,
                      backgroundColor: '#dedede',
                      padding: 5,
                    }}
                    onPress={() => handlePriority(Priority.Medium)}
                  >
                    <Feather name='flag' size={20} color='orange' />
                  </Pressable>

                  <Pressable
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 85,
                      borderRadius: 99,
                      backgroundColor: '#dedede',
                      padding: 5,
                    }}
                    onPress={() => handlePriority(Priority.High)}
                  >
                    <Feather name='flag' size={20} color='red' />
                  </Pressable>
                </>
              ) : (
                <Pressable
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -35,
                    padding: 5,
                  }}
                  onPress={() => setShowPriorityButtons(!showPriorityButtons)}
                >
                  <Feather
                    name='flag'
                    size={20}
                    color={getPriorityColor(priority)}
                  />
                </Pressable>
              )}
            </View>

            {/* Store Button [2] */}
            <View
              style={{
                alignSelf: 'center',
                width: 200,
                height: 40,
              }}
            >
              <Pressable onPress={() => handleStore()}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: '100%',
                    height: 45,
                  }}
                  source={require('../../assets/images/opbergen_in_zorgenbakje_button.png')}
                />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderWidth: 2,
    borderRadius: 30,
    height: windowHeight <= 667 ? '65%' : '50%',
    width: windowWidth - 2 * 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
  },
  modalTitleText: {
    textAlign: 'center',
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
});
