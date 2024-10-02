import React, { useState } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Fonts } from '../styles';
import Entypo from '@expo/vector-icons/Entypo';

import { NoteList } from '../components/NoteList';

const windowWidth = Dimensions.get('window').width;

export const NotesToSelfScreen: React.FC = ({ route }) => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyles}
      >
        {/* Title + Description */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 30,
            marginTop: 20,
            rowGap: 10,
          }}
        >
          <Text
            style={{
              ...(Fonts.poppinsBold[Platform.OS] as TextStyle),
              fontSize: 20,
              alignSelf: 'flex-start',
            }}
          >
            Notes-to-self
          </Text>

          <Text
            style={{
              ...(Fonts.poppinsRegular[Platform.OS] as TextStyle),
              alignSelf: 'flex-start',
            }}
          >
            Onder de notes-to-self kun je berichten aan jezelf opslaan die je op
            elk gewenst moment kunt bekijken. Deze berichten kun je volledig
            naar wens personaliseren.
          </Text>
        </View>

        {/* Note List */}
        <NoteList />

        {/* Add Button */}
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('NotesToSelf2')}
        >
          <Entypo name='plus' size={32} color='#5C6B57' />
        </Pressable>
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
