import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import Checkbox from 'expo-checkbox';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { DropdownComponent } from './DropdownComponent';
import { CustomProgressBar } from './CustomProgressBar';

import { WorryContext } from '../context/WorryContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface ReframingModalProps {
  reframingSteps: { title: string; description: string; instruction: string }[];
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalWorryListVisible: boolean;
  setModalWorryListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReframingModal: React.FC<ReframingModalProps> = ({
  reframingSteps,
  modalReframingVisible,
  setModalReframingVisible,
  modalWorryListVisible,
  setModalWorryListVisible,
}) => {
  const {
    category,
    title,
    description,
    setCategory,
    setTitle,
    setDescription,
    resetWorryEntryFields,
  } = useContext(WorryContext);

  const [isChecked, setChecked] = useState<boolean>(true);
  const [reframingModalIndex, setReframingModalIndex] = useState<number>(0);

  const [feeling, setFeeling] = useState<string>('');

  const handleClose = () => {
    resetWorryEntryFields();
    setModalReframingVisible(!modalReframingVisible);
    setModalWorryListVisible(!modalWorryListVisible);
  };

  const handlePrevious = () => {
    if (reframingModalIndex > 0) {
      setReframingModalIndex(reframingModalIndex - 1);
    } else {
      handleClose();
    }
  };

  const handleNext = () => {
    if (reframingModalIndex < reframingSteps.length - 1) {
      setReframingModalIndex(reframingModalIndex + 1);
    }
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalReframingVisible}
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
            <Text style={styles.modalTitleText}>
              {reframingSteps[reframingModalIndex].title}
            </Text>
            <Pressable
              style={{ position: 'absolute', right: 0 }}
              onPress={() => handleClose()}
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>

          {/* Description */}
          <Text
            style={
              {
                ...Fonts.poppinsRegular[Platform.OS],
                fontSize: 12,
                textAlign: 'center',
                marginTop: 10,
              } as TextStyle
            }
          >
            {reframingSteps[reframingModalIndex].description}
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
            {reframingModalIndex == 0 && (
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
                      height: windowHeight <= 667 ? 250 : 340,
                    } as TextStyle
                  }
                  placeholder='Omschrijving'
                  placeholderTextColor='#dedede'
                  multiline
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                />

                {reframingModalIndex == 0 && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      columnGap: 10,
                      marginTop: 10,
                    }}
                  >
                    <Checkbox
                      color='black'
                      value={isChecked}
                      onValueChange={setChecked}
                    />
                    <Text style={{ ...Fonts.poppinsRegular } as TextStyle}>
                      Koppelen aan zorg
                    </Text>
                  </View>
                )}
              </View>
            )}

            {reframingModalIndex > 0 && reframingModalIndex !== 5 && (
              // @TODO Create a 'NotesContext'!
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
                    marginTop: 20,
                  } as TextStyle
                }
                placeholder='Ik voel me...'
                placeholderTextColor='#dedede'
                multiline
                value={feeling}
                onChangeText={(value) => setFeeling(value)}
              />
            )}

            {/* Slider Option */}
            {/* {reframingModalIndex == 1 || reframingModalIndex == 6 &&} */}

            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'gray',
              }}
            >
              {reframingSteps[reframingModalIndex].instruction}
            </Text>

            {/* Buttons */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={styles.backButton}
                onPress={() => handlePrevious()}
              >
                <Text style={styles.backButtonText}>
                  {reframingModalIndex == 0 ? 'Afsluiten' : 'Terug'}
                </Text>
              </Pressable>
              <CustomProgressBar
                progress={reframingModalIndex}
                totalSteps={10}
              />
              <Pressable
                style={styles.continueButton}
                onPress={() => handleNext()}
              >
                <Text style={styles.continueButtonText}>Verder</Text>
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
    height: windowHeight <= 667 ? '90%' : '85%',
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
    fontSize: 16,
  } as TextStyle,
  backButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 90,
    paddingVertical: 10,
    backgroundColor: '#dedede',
  },
  backButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  continueButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 90,
    paddingVertical: 10,
    backgroundColor: '#00d8bd',
  },
  continueButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontStyle: 'italic',
    color: 'white',
  } as TextStyle,
});
