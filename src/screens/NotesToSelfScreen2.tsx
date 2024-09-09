import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Platform,
  Dimensions,
  TextStyle,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { NoteListItemExpanded } from '../components/NoteListItemExpanded';

const windowWidth = Dimensions.get('window').width;

export const NotesToSelfScreen2: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        <NoteListItemExpanded route={route} />

        {/* Buttons */}
        <View style={styles.bottomBarContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Terug</Text>
          </Pressable>
          <View style={styles.editButton}>
            <Feather name='edit' size={20} color='white' />
            <Pressable onPress={() => console.log('Edit button pressed!')}>
              <Text style={styles.editButtonText}>Bewerken</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  bottomBarContainer: {
    marginBottom: 100,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#dedede',
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  backButton: {
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    paddingVertical: 10,
    backgroundColor: '#dedede',
  },
  backButtonText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  editButton: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    paddingVertical: 10,
    backgroundColor: '#0f7c6f',
  },
  editButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
  } as TextStyle,
});
