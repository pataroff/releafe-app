import React, { useEffect, useContext } from 'react';

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
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface WorryListItemAddedModalProps {
  modalAddedWorryListItemVisible: boolean;
  setModalAddedWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const WorryListItemAddedModal: React.FC<
  WorryListItemAddedModalProps
> = ({ modalAddedWorryListItemVisible, setModalAddedWorryListItemVisible }) => {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddedWorryListItemVisible}
      onRequestClose={() =>
        setModalAddedWorryListItemVisible(!modalAddedWorryListItemVisible)
      }
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* Icon + Title + Close Button */}
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 15,
                width: 200,
              }}
            >
              <Image
                style={{ width: '100%', height: 50 }}
                resizeMode='contain'
                source={require('../../assets/images/zorg_opgeborgen_gelukt_icon.png')}
              />
              <Text style={styles.modalTitleText}>Gelukt!</Text>
            </View>
            {/* X Close Button */}
            <Pressable
              style={{ position: 'absolute', right: 0, top: 0 }}
              onPress={() =>
                setModalAddedWorryListItemVisible(
                  !modalAddedWorryListItemVisible
                )
              }
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            Je hebt je zorg opgeborgen. Het kan helpen om deze te reframen,
            zodat je in het vervolg een helpende gedachte hebt voor deze zorg.
            Wil je dit nu alsnog doen?
          </Text>

          {/* Buttons */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              columnGap: 15,
            }}
          >
            {/* Close Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() =>
                setModalAddedWorryListItemVisible(
                  !modalAddedWorryListItemVisible
                )
              }
            >
              <Text style={styles.closeButtonText}>Afsluiten</Text>
            </Pressable>
            {/* Reframe Button */}
            <Pressable
              style={styles.reframeButton}
              onPress={() => console.log('Reframe button pressed!')}
            >
              <Text style={styles.reframeButtonText}>
                Deze zorg nu reframen
              </Text>
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
    height: windowHeight <= 667 ? '50%' : '40%',
    width: windowWidth - 2 * 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    textAlign: 'center',
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  descriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  closeButton: {
    backgroundColor: '#dedede',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  closeButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  reframeButton: {
    backgroundColor: '#00d8bd',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  reframeButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
});
