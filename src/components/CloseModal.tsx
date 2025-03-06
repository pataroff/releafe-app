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
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;

interface CloseModalProps {
  closeModalVisible: boolean;
  setCloseModalVisible: React.Dispatch<SetStateAction<boolean>>;
  parentModalVisible: boolean;
  setParentModalVisible: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  handleClose?: (index?: number) => void;
  route?: any;
}

export const CloseModal: React.FC<CloseModalProps> = ({
  closeModalVisible,
  setCloseModalVisible,
  parentModalVisible,
  setParentModalVisible,
  title,
  description,
  handleClose,
  route,
}) => {
  const handleCloseModal = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      // @ts-ignore
      handleClose();
    }, 100);
  };

  const handleParentCloseModal = () => {
    setCloseModalVisible(!closeModalVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      setParentModalVisible(!parentModalVisible);
    }, 100);
  };

  const handleDiaryCloseModal = (index: number) => {
    setCloseModalVisible(!closeModalVisible);
    setTimeout(() => {
      // @ts-ignore
      handleClose(index);
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ rowGap: 20 }}>
              <Text style={styles.modalTitleText}>{title}</Text>
              <Text style={styles.modalDescriptionText}>{description}</Text>
            </View>

            {route?.name == 'Diary1' && (
              <Pressable
                onPress={() =>
                  // @TODO: This could b made less explicit!
                  route?.name === 'Diary1'
                    ? handleDiaryCloseModal(1) // Don't Save and Close
                    : setCloseModalVisible(!closeModalVisible)
                }
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            )}
          </View>

          <View style={{ rowGap: 15 }}>
            <Pressable
              style={styles.closeButton}
              onPress={() =>
                route?.name === 'Diary1'
                  ? handleDiaryCloseModal(0) // Save and Close
                  : setCloseModalVisible(!closeModalVisible)
              }
            >
              <Text style={styles.closeButtonText}>
                {route?.name == 'Diary1'
                  ? 'Opslaan en afsluiten'
                  : 'Nee, ik wil doorgaan'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() =>
                handleClose !== undefined
                  ? route?.name === 'Diary1'
                    ? handleDiaryCloseModal(1) // Don't Save and Close
                    : handleCloseModal()
                  : handleParentCloseModal()
              }
            >
              <Text style={styles.cancelButtonText}>
                {route?.name == 'Diary1'
                  ? 'Niet opslaan en afsluiten'
                  : 'Ja, ik wil afsluiten'}
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  modalDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
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
    ...Fonts.sofiaProSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
  cancelButtonText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
});
