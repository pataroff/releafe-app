import React, { useRef } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
  ScrollView,
} from 'react-native';
import { Fonts, Typography } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TextQuestion: React.FC = ({ questions }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Diary1')}
        style={styles.closeButton}
      >
        <AntDesign name='closecircleo' size={30} color='black' />
      </Pressable>
      {questions.map((question, index) => {
        return (
          <View key={index}>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{questions[index]}</Text>
            </View>
            <TextInput
              style={styles.diaryEntryFieldTextInput}
              multiline={true}
              placeholder='Schrijf het hier op...'
              placeholderTextColor='black'
            ></TextInput>
          </View>
        );
      })}
      <Pressable
        onPress={() => navigation.navigate('Diary1')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Afronden</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 240,
    width: windowWidth - 2 * 20,
    minHeight: windowHeight + 1000,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingHorizontal: 25,
    marginBottom: 350,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  questionContainer: {
    paddingVertical: 20,
  },
  questionText: {
    left: 5,
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  diaryEntryFieldTextInput: {
    fontSize: 14,
    height: 200,
    ...Fonts.poppinsItalic[Platform.OS],
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingTop: 20,
    paddingLeft: 20,
  } as TextStyle,
  button: {
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 4,
    marginVertical: 30,
  },
  buttonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
});
