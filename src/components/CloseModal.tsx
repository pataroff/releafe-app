import React, { SetStateAction, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextStyle,
  Platform,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

const windowWidth = Dimensions.get('window').width;

interface CloseModalProps {
  closeModalVisible: boolean;
  setCloseModalVisible: React.Dispatch<SetStateAction<boolean>>;
  parentModalVisible: boolean;
  setParentModalVisible: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  handleClose?: () => void;
}

export const CloseModal: React.FC<CloseModalProps> = ({
  closeModalVisible,
  setCloseModalVisible,
  parentModalVisible,
  setParentModalVisible,
  title,
  description,
  handleClose,
}) => {
  const handleCloseModal = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      // @ts-ignore
      handleClose();
    }, 100);
  };

  const handleParentModalClose = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      setParentModalVisible(!parentModalVisible);
    }, 100);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={closeModalVisible}
      onRequestClose={() => setCloseModalVisible(!setCloseModalVisible)}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={{ rowGap: 20 }}>
            <Text style={styles.modalTitleText}>{title}</Text>
            <Text style={styles.modalDescriptionText}>{description}</Text>
          </View>
          <View style={{ rowGap: 15 }}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setCloseModalVisible(!closeModalVisible)}
            >
              <Text style={styles.closeButtonText}>Annuleren</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() =>
                handleClose !== undefined
                  ? handleCloseModal()
                  : handleParentModalClose()
              }
            >
              <Text style={styles.cancelButtonText}>Afsluiten</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    borderRadius: 30,
    height: 270,
    width: windowWidth - 2 * 15,
    backgroundColor: 'white',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  modalDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  closeButton: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 6,
    backgroundColor: '#5c6b57',
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingVertical: 6,
    backgroundColor: 'white',
  },
  closeButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  cancelButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
});
