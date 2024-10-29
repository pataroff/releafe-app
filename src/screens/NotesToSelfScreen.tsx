import React from 'react';

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
        <View style={styles.headersContainer}>
          <Text style={styles.headersTitleText}>Berichten aan jezelf</Text>
          <Text style={styles.headersDescriptionText}>
            Onder de 'berichten aan jezelf' kun je notities voor jezelf opslaan
            die je op elk gewenst moment kunt bekijken. Deze berichten kun je
            volledig naar wens personaliseren.
          </Text>
          <Text style={styles.headersHeadingText}>Mijn berichten</Text>
          <Text style={styles.headersDescriptionText}>
            Bekijk hier de berichten aan jezelf, of voeg een bericht aan jezelf
            toe.
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
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  headersTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 22,
    color: '#5c6b57',
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
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
