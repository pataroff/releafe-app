import React, { useContext } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { DropdownComponent } from '../components/DropdownComponent';

import { WorryContext } from '../context/WorryContext';
import { NoteContext } from '../context/NoteContext';

import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const mediaAddIcons = [
  require('../../assets/images/media_add/media_add_camera.png'),
  require('../../assets/images/media_add/media_add_gallery.png'),
  require('../../assets/images/media_add/media_add_voice_memo.png'),
  require('../../assets/images/media_add/media_add_file.png'),
];

export const NotesToSelfScreen2: React.FC = ({ route }) => {
  const navigation = useNavigation();

  const {
    category,
    title,
    description,
    setCategory,
    setTitle,
    setDescription,
    resetWorryEntryFields,
  } = useContext(WorryContext);

  const { createNoteEntry, resetNoteEntryFields } = useContext(NoteContext);

  const handleStore = () => {
    createNoteEntry();
    resetNoteEntryFields();
    resetWorryEntryFields();
    navigation.goBack();
  };

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
            Nieuwe note-to-self
          </Text>

          <Text
            style={{
              ...(Fonts.poppinsRegular[Platform.OS] as TextStyle),
              alignSelf: 'flex-start',
            }}
          >
            Vul hieronder de gegevens in om een nieuwe note-to-self aan te
            maken.
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          {/* Dropdown + Title */}
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 25,
              height: 115,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
            }}
          >
            <DropdownComponent category={category} setCategory={setCategory} />
            <TextInput
              style={
                {
                  ...Fonts.poppinsItalic[Platform.OS],
                  backgroundColor: '#F6F7F8',
                  fontStyle: 'italic',
                  borderRadius: 10,
                  height: 50,
                  width: '65%',
                  paddingLeft: 10,
                } as TextStyle
              }
              placeholder='Voeg een titel toe...'
              placeholderTextColor='#dedede'
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
          </View>

          {/* Description + Media Add Buttons + Note Add Button */}
          <View
            style={{
              height: 340,
              backgroundColor: 'white',
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingTop: 20,
              marginBottom: 100,
            }}
          >
            <TextInput
              style={
                {
                  ...Fonts.poppinsItalic[Platform.OS],
                  backgroundColor: '#F6F7F8',
                  fontStyle: 'italic',
                  position: 'relative',
                  padding: 10,
                  borderRadius: 10,
                  height: 150,
                } as TextStyle
              }
              placeholder='Schrijf hier je note-to-self...'
              placeholderTextColor='#dedede'
              multiline
              value={description}
              onChangeText={(value) => setDescription(value)}
            />

            <Text
              style={{
                ...(Fonts.poppinsMedium[Platform.OS] as TextStyle),
                marginTop: 20,
              }}
            >
              Media toevoegen
            </Text>

            {/* Media Add Buttons Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
                marginTop: 10,
              }}
            >
              {mediaAddIcons.map((icon, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => console.log('Media add button pressed!')}
                  >
                    <Image
                      resizeMode='contain'
                      style={{ height: 30, width: 30 }}
                      source={icon}
                    ></Image>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleStore()}
              style={{
                marginTop: 25,
                alignSelf: 'center',
                width: 175,
                borderRadius: 10,
                backgroundColor: '#A9C1A1',
                paddingVertical: 12,
              }}
            >
              <Text
                style={
                  {
                    ...Fonts.poppinsSemiBold[Platform.OS],
                    color: 'white',
                    textAlign: 'center',
                  } as TextStyle
                }
              >
                Note-to-self opslaan
              </Text>
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
    backgroundColor: '#f9f9f9',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
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
