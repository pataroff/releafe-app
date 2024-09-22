import React, { useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
  TextStyle,
  Platform,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { WorryListItem } from './WorryListItem';

import { WorryContext } from '../context/WorryContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface WorryListModalProps {
  modalWorryListVisible: boolean;
  setModalWorryListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddWorryListItemVisible: boolean;
  setModalAddWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrawer: () => void;
}

export const WorryListModal: React.FC<WorryListModalProps> = ({
  modalWorryListVisible,
  setModalWorryListVisible,
  modalAddWorryListItemVisible,
  setModalAddWorryListItemVisible,
  modalReframingVisible,
  setModalReframingVisible,
  handleDrawer,
}) => {
  const { worryEntries } = useContext(WorryContext);

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalWorryListVisible}
      onRequestClose={() => setModalWorryListVisible(!modalWorryListVisible)}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.modalTitleText}>Mijn zorgen</Text>
            <Pressable
              style={{ position: 'absolute', right: 0 }}
              onPress={() => handleDrawer()}
            >
              <Feather name='x-circle' size={24} color='black' />
            </Pressable>
          </View>
          {/* Worry List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.worryListContainer}
            contentContainerStyle={styles.worryListContentContainer}
          >
            {worryEntries.length > 0 ? (
              worryEntries.map((item) => {
                return (
                  <WorryListItem
                    key={item.uuid}
                    item={item}
                    modalWorryListVisible={modalWorryListVisible}
                    setModalWorryListVisible={setModalWorryListVisible}
                    modalAddWorryListItemVisible={modalAddWorryListItemVisible}
                    setModalAddWorryListItemVisible={
                      setModalAddWorryListItemVisible
                    }
                    modalReframingVisible={modalReframingVisible}
                    setModalReframingVisible={setModalReframingVisible}
                    handleDrawer={handleDrawer}
                  />
                );
              })
            ) : (
              <>
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataTitleText}>Zorgenbakje leeg</Text>
                  <Text style={styles.noDataDescriptionText}>
                    Er staat geen zorgen in jouw zorgenbakje. Keer terug als je
                    een zorg wilt toevoegen.
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Pressable style={styles.backButton} onPress={() => handleDrawer()}>
              <Text style={styles.backButtonText}>Terug</Text>
            </Pressable>
            <Pressable onPress={() => console.log('Sliders button pressed!')}>
              <FontAwesome6 name='sliders' size={24} color='black' />
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
    height: windowHeight - 2 * 100,
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
  backButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 100,
    paddingVertical: 6,
    backgroundColor: '#dedede',
  },
  backButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  worryListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  worryListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    paddingHorizontal: 30,
  },
  noDataTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 16,
    textAlign: 'center',
  } as TextStyle,
});
