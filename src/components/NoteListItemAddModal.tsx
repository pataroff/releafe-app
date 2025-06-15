import React, { useState, useEffect, useRef } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Platform,
  TextStyle,
  Dimensions,
  Keyboard,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useWorry } from '../context/WorryContext';
import { useNote } from '../context/NoteContext';

import { DropdownComponent } from '../components/DropdownComponent';
import { MemoItem } from './MemoItem';
import { CloseModal } from './CloseModal';

import {
  Camera,
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera';
import { Audio, Video, ResizeMode } from 'expo-av';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';

import Toast from 'react-native-toast-message';
import { toastConfig } from '../utils/toastConfig';

const windowWidth = Dimensions.get('window').width;

const mediaAddIcons = [
  require('../../assets/images/media_add/media_add_camera.png'),
  require('../../assets/images/media_add/media_add_gallery.png'),
  require('../../assets/images/media_add/media_add_voice_memo.png'),
  require('../../assets/images/media_add/media_add_file.png'),
];

const voiceMemoRedIcon = require('../../assets/images/media_add/media_add_voice_memo_red.png');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
const videoExtensions = ['.mp4', '.mov', '.mkv', '.webm'];

interface NoteListModalProps {
  modalNoteListItemAddVisible: boolean;
  setModalNoteListItemAddVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteListItemAddModal: React.FC<NoteListModalProps> = ({
  modalNoteListItemAddVisible,
  setModalNoteListItemAddVisible,
}) => {
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);

  // Media Add State
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  // Picture State
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [image, setImage] = useState<string | null>(null);

  // Video State
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [video, setVideo] = useState<string | null>(null);
  const [videoThumbnailUri, setVideoThumbnailUri] = useState<string>('');

  // Audio State
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string>('');

  const cameraRef = useRef(null);

  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const {
    category,
    title,
    description,
    setCategory,
    setTitle,
    setDescription,
    resetWorryEntryFields,
  } = useWorry();

  const {
    uuid,
    mediaFile,
    audioMetering,
    setMediaFile,
    setAudioMetering,
    createOrUpdateNoteEntry,
    resetNoteEntryFields,
    getNoteEntryMediaFileUrl,
  } = useNote();

  const handleStore = () => {
    createOrUpdateNoteEntry();

    resetNoteEntryFields();
    resetWorryEntryFields();

    setModalNoteListItemAddVisible(!modalNoteListItemAddVisible);
  };

  const handleStorePress = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      showToast('error', 'Titel ontbreekt nog', 'Voeg een titel toe.');
    }

    if (!trimmedDescription) {
      showToast(
        'error',
        'Omschrijving ontbreekt nog',
        'Voeg een omschrijving toe.'
      );
    }

    setTitle(title);
    setDescription(description);
    handleStore();
  };

  const handleClose = () => {
    resetNoteEntryFields();
    resetWorryEntryFields();
    setModalNoteListItemAddVisible(!modalNoteListItemAddVisible);
  };

  const handleMediaButton = (index: number) => {
    switch (index) {
      case 0:
        handleCamera();
        break;
      case 1:
        handlePickImage();
        break;
      case 2:
        handleAudio();
        break;
      case 3:
        handlePickDocument();
        break;
    }
  };

  const handleMediaFileDelete = () => {
    setMediaFile({ uri: '', type: '', name: '' });
  };

  // Camera
  const handleCamera = async () => {
    Camera.requestCameraPermissionsAsync();
    Camera.requestMicrophonePermissionsAsync();
    // @TODO What if the user denies permissions?

    if (permission?.status !== 'granted') {
      await requestPermission();
    }

    setIsCameraOpen(!isCameraOpen);
  };

  const handleToggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleToggleCameraFlash = () => {
    setFlash((current) => (current === 'off' ? 'on' : 'off'));
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        // @ts-expect-error
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const showToast = (
    type: 'error' | 'success' | 'info',
    title: string,
    message: string
  ) => {
    Toast.show({
      topOffset: 80,
      type,
      text1: title,
      text2: message,
    });
  };

  const generateVideoThumbnail = async (videoUri: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 15000,
      });
      setVideoThumbnailUri(uri);
    } catch (error) {
      console.error(error);
    }
  };

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        setIsVideoRecording(true);

        let options = {
          quality: '1080p',
          maxDuration: 60,
          mute: false,
        };

        //@ts-expect-error
        const data = await cameraRef.current.recordAsync(options);
        generateVideoThumbnail(data.uri);
        setVideo(data.uri);
      } catch (error) {
        setIsVideoRecording(false);
        console.error(error);
      }
    }
  };

  const saveVideo = async () => {
    MediaLibrary.requestPermissionsAsync();
    // @TODO What if the user denies permissions?

    if (video) {
      try {
        await MediaLibrary.createAssetAsync(video);

        let fileData = {
          uri: video,
          type: 'video/*',
          name: video.split('/').pop() as string,
        };

        setMediaFile(fileData);
        setVideo(null);
        setIsCameraOpen(!isCameraOpen);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const stopVideoRecording = () => {
    setIsVideoRecording(false);
    //@ts-expect-error
    cameraRef.current.stopRecording();
  };

  const saveImage = async () => {
    MediaLibrary.requestPermissionsAsync();
    // @TODO What if the user denies permissions?

    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);

        let fileData = {
          uri: image,
          type: 'image/*',
          name: image.split('/').pop() as string,
        };

        setMediaFile(fileData);
        setImage(null);
        setIsCameraOpen(!isCameraOpen);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ImagePicker
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      let fileData = {
        uri: imageUri,
        type: 'image/*',
        name: imageUri.split('/').pop() as string,
      };

      setMediaFile(fileData);
    }
  };

  // Audio
  const handleAudio = () => {
    if (isAudioRecording) {
      setIsAudioRecording(false);
      stopAudioRecording();
    } else {
      setIsAudioRecording(true);
      recordAudio();
    }
  };

  const recordAudio = async () => {
    try {
      setAudioMetering([]);

      const permission = await Audio.requestPermissionsAsync();
      console.log(permission);
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setAudio(recording);
        console.log('Recording started...');

        recording.setOnRecordingStatusUpdate((status) => {
          if (status.metering) {
            setAudioMetering((curVal) => [...curVal, status.metering || -100]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stopAudioRecording = async () => {
    if (!audio) {
      return;
    }

    console.log('Stopping recording...');
    setIsAudioRecording(false);
    setAudio(null);
    await audio.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
    });
    const audioUri = audio.getURI();
    console.log('Recording stopped and stored at', audioUri);

    if (audioUri) {
      setAudioUri(audioUri);

      let fileData = {
        uri: audioUri,
        type: 'audio/*',
        name: audioUri.split('/').pop() as string,
      };

      setMediaFile(fileData);
    }
  };

  // DocumentPicker
  const handlePickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if (!result.canceled) {
      const documentUri = result.assets[0].uri;

      let fileData = {
        uri: documentUri,
        type: 'application/*',
        name: documentUri.split('/').pop() as string,
      };

      setMediaFile(fileData);
    }
  };

  const isFileObj = typeof mediaFile !== 'string';
  const fileName = isFileObj ? mediaFile?.name : mediaFile;
  const isAudio = fileName.startsWith('recording');
  const isImage = imageExtensions.some((ext) => fileName.endsWith(ext));
  const isVideo = videoExtensions.some((ext) => fileName.endsWith(ext));

  useEffect(() => {
    const fetchMediaFileUrl = async () => {
      setFileUrl(undefined);

      if (typeof mediaFile === 'string') {
        const url = await getNoteEntryMediaFileUrl(uuid);

        if (url) {
          if (isVideo) {
            generateVideoThumbnail(url);
          }
          setFileUrl(url);
        }
      } else {
        setFileUrl(mediaFile?.uri);
      }
    };

    fetchMediaFileUrl();
  }, [mediaFile]);

  return (
    <>
      {isCameraOpen ? (
        <Modal
          visible={isCameraOpen}
          style={{ flex: 1 }}
          statusBarTranslucent={true}
        >
          {!image && !video ? (
            <CameraView
              style={styles.camera}
              facing={facing}
              flash={flash}
              ref={cameraRef}
              mode={'video'}
            >
              <View style={styles.cameraButtonsWrapper}>
                {/* Top Row */}
                <View style={styles.cameraButtonsContainer}>
                  <Pressable onPress={() => setIsCameraOpen(false)}>
                    <MaterialCommunityIcons
                      name='window-close'
                      size={30}
                      color='white'
                    />
                  </Pressable>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 15,
                    }}
                  >
                    <Pressable onPress={handleToggleCameraFacing}>
                      <FontAwesome6
                        name='camera-rotate'
                        size={30}
                        color='white'
                      />
                    </Pressable>

                    <Pressable onPress={handleToggleCameraFlash}>
                      <MaterialCommunityIcons
                        name={flash === 'off' ? 'flash-off' : 'flash'}
                        size={30}
                        color='white'
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Bottom Row */}
                <View style={styles.cameraButtonsContainer}>
                  <Pressable onPress={() => takePicture()}>
                    <Text style={styles.text}>Take Picture</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      isVideoRecording ? stopVideoRecording() : recordVideo();
                    }}
                  >
                    <Text style={styles.text}>
                      {isVideoRecording ? 'Stop Recording' : 'Record Video'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </CameraView>
          ) : (
            <>
              {image ? (
                <>
                  <Image source={{ uri: image }} style={styles.camera} />
                  <View
                    style={[
                      {
                        position: 'absolute',
                        bottom: 60,
                        left: 0,
                        right: 0,
                      },
                      styles.cameraButtonsContainer,
                    ]}
                  >
                    <Pressable onPress={() => setImage('')}>
                      <Text style={styles.text}>Re-take</Text>
                    </Pressable>
                    <Pressable onPress={() => saveImage()}>
                      <Text style={styles.text}>Save</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Video
                    source={{ uri: video as string }}
                    style={styles.video}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={true}
                    useNativeControls
                    isLooping
                  />
                  <View
                    style={[
                      {
                        position: 'absolute',
                        bottom: 80,
                        left: 0,
                        right: 0,
                      },
                      styles.cameraButtonsContainer,
                    ]}
                  >
                    <Pressable onPress={() => setVideo('')}>
                      <Text style={styles.text}>Re-take</Text>
                    </Pressable>
                    <Pressable onPress={() => saveVideo()}>
                      <Text style={styles.text}>Save</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </>
          )}
        </Modal>
      ) : (
        <Modal
          animationType='none'
          transparent={true}
          visible={modalNoteListItemAddVisible}
          onRequestClose={() =>
            setModalNoteListItemAddVisible(!modalNoteListItemAddVisible)
          }
          statusBarTranslucent={true}
        >
          <CloseModal
            closeModalVisible={closeModalVisible}
            setCloseModalVisible={setCloseModalVisible}
            parentModalVisible={modalNoteListItemAddVisible}
            setParentModalVisible={setModalNoteListItemAddVisible}
            title='Stoppen met bericht toevoegen'
            description='Je staat op het punt te stoppen met het aanmaken van jouw bericht aan jezelf. Weet je het zeker?'
            handleClose={handleClose}
            denyText='Nee, ik wil doorgaan'
            confirmText='Ja, ik wil afsluiten'
          />
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.headersContainer}>
                {/* Title + Close Button */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.headersTitleText}>
                    Nieuwe bericht toevoegen
                  </Text>
                  <Pressable
                    style={{ position: 'absolute', right: 0 }}
                    onPress={() => setCloseModalVisible(!closeModalVisible)}
                  >
                    <Feather name='x-circle' size={24} color='gray' />
                  </Pressable>
                </View>

                {/* Description */}
                <Text style={styles.headersDescriptionText}>
                  Vul hieronder de gegevens in om een nieuw bericht voor jezelf
                  aan te maken.
                </Text>
              </View>

              {/* @TODO: Apply this to other TextInput components within the app! */}
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    <DropdownComponent
                      category={category}
                      setCategory={setCategory}
                    />

                    <TextInput
                      style={
                        {
                          ...Fonts.sofiaProRegular[Platform.OS],
                          verticalAlign: Platform.OS == 'android' ? 'top' : {},
                          backgroundColor: '#F6F7F8',
                          //fontStyle: 'italic',
                          borderRadius: 10,
                          height: 50,
                          width: '65%',
                          paddingLeft: 10,
                        } as TextStyle
                      }
                      placeholder='Voeg een titel toe...'
                      //placeholderTextColor='#dedede'
                      value={title}
                      onChangeText={(value) => setTitle(value)}
                    />
                  </View>

                  {/* Description + Media Add Buttons + Note Add Button */}
                  <View
                    style={{
                      flexGrow: 1,
                      backgroundColor: 'white',
                      borderRadius: 25,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                    }}
                  >
                    <TextInput
                      style={
                        {
                          ...Fonts.sofiaProRegular[Platform.OS],
                          verticalAlign: Platform.OS == 'android' ? 'top' : {},
                          backgroundColor: '#F6F7F8',
                          //fontStyle: 'italic',
                          position: 'relative',
                          padding: 10,
                          borderRadius: 10,
                          height: 150,
                        } as TextStyle
                      }
                      placeholder='Schrijf hier je note-to-self...'
                      //placeholderTextColor='#dedede'
                      multiline
                      value={description}
                      onChangeText={(value) => setDescription(value)}
                    />

                    <Text
                      style={{
                        ...(Fonts.sofiaProMedium[Platform.OS] as TextStyle),
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
                            onPress={() => handleMediaButton(index)}
                          >
                            <Image
                              resizeMode='contain'
                              style={{ height: 35, width: 35 }}
                              //TODO: Is there a better way to do this? - Luna
                              source={
                                index === 2
                                  ? isAudioRecording
                                    ? voiceMemoRedIcon
                                    : icon
                                  : icon
                              }
                            ></Image>
                          </Pressable>
                        );
                      })}
                    </View>

                    {/* Uploaded Media Container */}
                    {mediaFile && fileUrl && (
                      <View
                        style={{
                          marginTop: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {isAudio ? (
                          <MemoItem
                            uri={fileUrl}
                            metering={audioMetering}
                            containerStyle={{ width: '80%' }}
                          />
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: 50,
                              width: '80%',
                              backgroundColor: '#EEF1EC',
                              borderRadius: 10,
                            }}
                          >
                            <Image
                              style={{
                                borderRadius: 10,
                                height: 50,
                                width: 50,
                                marginRight: 15,
                              }}
                              source={{
                                uri: isImage ? fileUrl : videoThumbnailUri,
                              }}
                            />
                            <Text style={styles.mediaFileNameText}>
                              {fileName}
                            </Text>
                          </View>
                        )}

                        <Pressable onPress={handleMediaFileDelete}>
                          <Image
                            resizeMode='contain'
                            style={{ width: 43, height: 46 }}
                            source={require('../../assets/images/delete_icon.png')}
                          />
                        </Pressable>
                      </View>
                    )}

                    <Pressable
                      onPress={() => handleStorePress()}
                      style={{
                        marginVertical: 20,
                        alignSelf: 'center',
                        width: 215,
                        borderRadius: 10,
                        backgroundColor: '#A9C1A1',
                        paddingVertical: 12,
                      }}
                    >
                      <Text
                        style={
                          {
                            ...Fonts.sofiaProSemiBold[Platform.OS],
                            color: 'white',
                            textAlign: 'center',
                          } as TextStyle
                        }
                      >
                        Bericht aan jezelf opslaan
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Toast config={toastConfig} />
          </View>
        </Modal>
      )}
    </>
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
    padding: 25,
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
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cameraButtonsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  mediaFileNameText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
    fontSize: 13,
    flexShrink: 1,
    flexWrap: 'wrap',
  } as TextStyle,
});
