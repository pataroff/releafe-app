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

import { useGamification } from '../context/BonsaiContext';

interface ExercisesListItemExpandedModalProps {
  modalExercisesListItemExpandedVisible: boolean;
  setModalExercisesListItemExpandedVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  exercise: Exercise;
}

const windowWidth = Dimensions.get('window').width;

export const ExercisesListItemExpandedModal: React.FC<
  ExercisesListItemExpandedModalProps
> = ({
  modalExercisesListItemExpandedVisible,
  setModalExercisesListItemExpandedVisible,
  exercise,
}) => {
  const { icon, title, description, link } = exercise;
  const { addPoints } = useGamification();

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
                  addPoints(10); // @TODO This is easy to cheat, how to prevent cheating?
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
              on
              bounces={false}
              javaScriptEnabled
              contentMode='desktop'
              style={{ marginVertical: 20 }}
              originWhitelist={['*']}
              source={{
                html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                      html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%; /* Ensure the iframe's parent container takes full height */
                      }
                      #baseDiv {
                        width: 100%;
                        height: 100%;
                      }
                    </style>
                  </head>
                  <body>
                    <div id="baseDiv">${link}</div>
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
    flex: 1,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 125, // @TODO Does this need to be a greater value?
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    flexGrow: 1,
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
