import React, { useState } from 'react';

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

import { Category, Priority } from '../types';

import { DropdownComponent } from './DropdownComponent';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface WorriesListItemAddModalProps {
  modalAddWorriesListItemVisible: boolean;
  setModalAddWorriesListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const WorriesListItemAddModal: React.FC<
  WorriesListItemAddModalProps
> = ({ modalAddWorriesListItemVisible, setModalAddWorriesListItemVisible }) => {
  const [category, setCategory] = useState<Category>(Category.Work);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [showPriorityButtons, setShowPriorityButtons] =
    useState<boolean>(false);

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddWorriesListItemVisible}
      onRequestClose={() =>
        setModalAddWorriesListItemVisible(!modalAddWorriesListItemVisible)
      }
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
              onPress={() =>
                setModalAddWorriesListItemVisible(
                  !modalAddWorriesListItemVisible
                )
              }
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
                <DropdownComponent />
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
                />
              </View>
              {/* Description */}
              <TextInput
                placeholder='Omschrijving'
                multiline
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
              />

              {/* Priority Button */}
              <Pressable
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: -30,
                }}
                onPress={() => console.log('Priority button pressed! ')}
              >
                <Feather name='flag' size={20} color='#dedede' />
              </Pressable>
            </View>

            {/* Store Button [2] */}
            <Pressable onPress={() => console.log('Store button pressed!')}>
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
