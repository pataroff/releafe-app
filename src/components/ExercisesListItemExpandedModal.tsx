import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
} from 'react-native';

import { WebView } from 'react-native-webview';

import { Fonts } from '../styles';
import { Exercise } from '../types';

import Feather from '@expo/vector-icons/Feather';

import { useGamification } from '../context/GamificationContext';

interface ExercisesListItemExpandedModalProps {
  modalExercisesListItemExpandedVisible: boolean;
  setModalExercisesListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  exercise: Exercise;
  earnedPointsModalVisible: boolean;
  setEarnedPointsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const windowWidth = Dimensions.get('window').width;

export const ExercisesListItemExpandedModal: React.FC<
  ExercisesListItemExpandedModalProps
> = ({
  modalExercisesListItemExpandedVisible,
  setModalExercisesListItemExpandedVisible,
  exercise,
  earnedPointsModalVisible,
  setEarnedPointsModalVisible,
}) => {
  const { icon, title, description, link } = exercise;

  const [hasPlayedFully, setHasPlayedFully] = useState<boolean>(false);

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalExercisesListItemExpandedVisible}
      onRequestClose={() => {
        setModalExercisesListItemExpandedVisible(
          !modalExercisesListItemExpandedVisible
        );
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Icon + Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* Icon + Title */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}
              >
                {/* Icon Container */}
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EDF8E9',
                    height: 65,
                    width: 65,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={icon}
                    style={{ width: 35, height: 35 }}
                    resizeMode='contain'
                  />
                </View>
                <Text style={styles.headersTitleText}>{title}</Text>
              </View>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => {
                  setModalExercisesListItemExpandedVisible(
                    !modalExercisesListItemExpandedVisible
                  );

                  if (hasPlayedFully) {
                    setTimeout(() => {
                      setEarnedPointsModalVisible(!earnedPointsModalVisible);
                    }, 100);
                    setHasPlayedFully(false);
                  }
                }}
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>
          </View>
          {/* Main Content Container */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={styles.mainContainer}
            contentContainerStyle={styles.mainContentContainer}
          >
            {/* Description + Instruction */}
            <View style={{ rowGap: 15 }}>
              <Text style={styles.descriptionText}>{description}</Text>
              <Text style={styles.instructionText}>
                Start de oefening door hieronder op de afspeelknop te drukken.
              </Text>
            </View>

            <WebView
              javaScriptEnabled
              contentMode='desktop'
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{ marginVertical: 20, height: 300 }}
              originWhitelist={['*']}
              onMessage={(event) => {
                if (event.nativeEvent.data === 'finished') {
                  console.log('Soundcloud track finished playing!');
                  setHasPlayedFully(true);
                }
              }}
              source={{
                html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script src="https://w.soundcloud.com/player/api.js"></script>
                    <style>
                      html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                      }
                      #baseDiv {
                        width: 100%;
                        height: 100%;
                      }
                    </style>
                  </head>
                  <body>
                    <div id="baseDiv">${link}</div>

                    <script>
                      window.addEventListener('DOMContentLoaded', function () {
                        var iframe = document.querySelector('iframe');
                        if (!iframe) return;

                        var widget = SC.Widget(iframe);
                        widget.bind(SC.Widget.Events.FINISH, function () {
                          window.ReactNativeWebView.postMessage('finished');
                        });
                      });
                    </script>
                  </body>
                </html>
              `,
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
            >
              <Image
                source={require('../../assets/images/use_headphones_icon.png')}
                style={{ width: 20, height: 20 }}
                resizeMode='contain'
              />
              <Text style={styles.useHeadphonesText}>
                Het is aangeraden om een hoofdtelefoon te gebruiken voor deze
                oefening.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderRadius: 15,
    height: '90%',
    width: windowWidth,
    backgroundColor: '#E5F1E3',
    display: 'flex',
    flexDirection: 'column',
  },
  headersContainer: {
    width: '100%',
    paddingRight: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersTitleText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 18,
    flexShrink: 1,
  } as TextStyle,
  mainContainer: {
    flexGrow: 0,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
  },
  descriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
  } as TextStyle,
  instructionText: {
    textAlign: 'center',
    fontSize: 13,
    ...Fonts.sofiaProMedium[Platform.OS],
  } as TextStyle,
  useHeadphonesText: {
    ...Fonts.sofiaProItalic[Platform.OS],
    color: 'gray',
    fontSize: 11,
    flexShrink: 1,
  } as TextStyle,
});
