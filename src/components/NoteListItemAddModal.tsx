import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Modal,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';

import { DropdownComponent } from '../components/DropdownComponent';
import { CloseModal } from './CloseModal';

const windowWidth = Dimensions.get('window').width;

const mediaAddIcons = [
  require('../../assets/images/media_add/media_add_camera.png'),
  require('../../assets/images/media_add/media_add_gallery.png'),
  require('../../assets/images/media_add/media_add_voice_memo.png'),
  require('../../assets/images/media_add/media_add_file.png'),
];

interface NoteListModalProps {
  modalAddNoteListItemVisible: boolean;
  setModalAddNoteListItemVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteListItemAddModal: React.FC<NoteListModalProps> = ({
  modalAddNoteListItemVisible,
  setModalAddNoteListItemVisible,
}) => {
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  const {
    category,
    title,
    description,
    setCategory,
    setTitle,
    setDescription,
    resetWorryEntryFields,
  } = useContext(WorryContext);

  const { createNoteEntry, resetNoteEntryFields } = useContext(NoteContext);

  const handleStore = () => {
    createNoteEntry();
    resetNoteEntryFields();
    resetWorryEntryFields();
    setModalAddNoteListItemVisible(!modalAddNoteListItemVisible);
  };

  const handleClose = () => {
    resetNoteEntryFields();
    resetWorryEntryFields();
    setModalAddNoteListItemVisible(!modalAddNoteListItemVisible);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddNoteListItemVisible}
      onRequestClose={() =>
        setModalAddNoteListItemVisible(!modalAddNoteListItemVisible)
      }
    >
      <CloseModal
        closeModalVisible={closeModalVisible}
        setCloseModalVisible={setCloseModalVisible}
        parentModalVisible={modalAddNoteListItemVisible}
        setParentModalVisible={setModalAddNoteListItemVisible}
        title='Stoppen met bericht toevoegen'
        description='Je staat op het punt te stoppen met het aanmaken van jouw bericht aan jezelf. Weet je het zeker?'
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
              <Text style={styles.headersTitleText}>
                Nieuwe bericht toevoegen
              </Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setCloseModalVisible(!closeModalVisible)}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {/* Description */}
            <Text style={styles.headersDescriptionText}>
              Vul hieronder de gegevens in om een nieuw bericht voor jezelf aan
              te maken.
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 15,
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            {/* Dropdown + Title */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 25,
                height: 115,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20,
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
                    backgroundColor: '#F6F7F8',
                    fontStyle: 'italic',
                    borderRadius: 10,
                    height: 50,
                    width: '65%',
                    paddingLeft: 10,
                  } as TextStyle
                }
                placeholder='Voeg een titel toe...'
                placeholderTextColor='#dedede'
                value={title}
                onChangeText={(value) => setTitle(value)}
              />
            </View>

            {/* Description + Media Add Buttons + Note Add Button */}
            <View
              style={{
                height: 340,
                backgroundColor: 'white',
                borderRadius: 25,
                paddingHorizontal: 20,
                paddingTop: 20,
                marginBottom: 100,
              }}
            >
              <TextInput
                style={
                  {
                    ...Fonts.poppinsItalic[Platform.OS],
                    backgroundColor: '#F6F7F8',
                    fontStyle: 'italic',
                    position: 'relative',
                    padding: 10,
                    borderRadius: 10,
                    height: 150,
                  } as TextStyle
                }
                placeholder='Schrijf hier je note-to-self...'
                placeholderTextColor='#dedede'
                multiline
                value={description}
                onChangeText={(value) => setDescription(value)}
              />

              <Text
                style={{
                  ...(Fonts.poppinsMedium[Platform.OS] as TextStyle),
                  marginTop: 20,
                }}
              >
                Media toevoegen
              </Text>

              {/* Media Add Buttons Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: 10,
                  marginTop: 10,
                }}
              >
                {mediaAddIcons.map((icon, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => console.log('Media add button pressed!')}
                    >
                      <Image
                        resizeMode='contain'
                        style={{ height: 35, width: 35 }}
                        source={icon}
                      ></Image>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable
                onPress={() => handleStore()}
                style={{
                  marginTop: 25,
                  alignSelf: 'center',
                  width: 215,
                  borderRadius: 10,
                  backgroundColor: '#A9C1A1',
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={
                    {
                      ...Fonts.poppinsSemiBold[Platform.OS],
                      color: 'white',
                      textAlign: 'center',
                    } as TextStyle
                  }
                >
                  Bericht aan jezelf opslaan
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  addButton: {
    position: 'absolute',
    borderRadius: 20,
    height: 60,
    width: 60,
    backgroundColor: '#E5F1E3',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
    right: 30,
  },
});
