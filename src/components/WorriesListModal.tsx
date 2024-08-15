import React, { useState } from 'react';

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

import { Category, Priority, IWorriesListItem } from '../types';
import { WorriesListItem } from './WorriesListItem';

import { v4 as uuidv4 } from 'uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface WorriesListModalProps {
  modalWorriesListVisible: boolean;
  setModalWorriesListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrawer: () => void;
}

const mockData: IWorriesListItem[] = [
  {
    id: uuidv4(),
    category: Category.Work,
    priority: Priority.Low,
    date: new Date(),
    title: 'Angst voor presentatie',
    description:
      "Ik moet volgende week een belangrijke presentatie geven op het werk voor een groot publiek, inclusief mijn manager en een aantal senior collega's. Dit is een cruciale presentatie omdat het over een nieuw project gaat waar ik de leiding over heb gehad.",
    reframed: true,
  },
  {
    id: uuidv4(),
    category: Category.Relationships,
    priority: Priority.High,
    date: new Date(),
    title: 'Ruzies met partner',
    description:
      'Mijn partner en ik hebben de laatste tijd vaak ruzie, en ik ben bang dat onze relatie op het punt staat te eindigen.',
    reframed: false,
  },
  {
    id: uuidv4(),
    category: Category.Health,
    priority: Priority.Medium,
    date: new Date(),
    title: 'Hoofdpijn',
    description:
      'Ik heb de laatste tijd veel hoofdpijn en maak me zorgen dat het iets ernstigs kan zin, zoals een hersentumor.',
    reframed: false,
  },
];

export const WorriesListModal: React.FC<WorriesListModalProps> = ({
  modalWorriesListVisible,
  setModalWorriesListVisible,
  handleDrawer,
}) => {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalWorriesListVisible}
      onRequestClose={() =>
        setModalWorriesListVisible(!modalWorriesListVisible)
      }
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
          {/* Worries List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.worriesListContainer}
            contentContainerStyle={styles.worriesListContentContainer}
          >
            {mockData.map((data) => {
              return <WorriesListItem key={data.id} data={data} />;
            })}
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
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    width: 100,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  backButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
  worriesListContainer: {
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  worriesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 5,
  },
});
