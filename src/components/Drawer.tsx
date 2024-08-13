import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TextStyle,
  Modal,
} from 'react-native';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(!isDrawerOpen);
      setTimeout(() => {
        setModalVisible(!modalVisible);
      }, 300);
    } else {
      setModalVisible(!modalVisible);
      setTimeout(() => {
        setIsDrawerOpen(!isDrawerOpen);
      }, 300);
    }
  };

  return (
    <>
      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modalTitleText}>Mijn zorgen</Text>
            </View>
            {/* Worries List */}
            <ScrollView
              style={styles.worriesListContainer}
              contentContainerStyle={styles.worriesListContentContainer}
            >
              {/* Worries List Item */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: '#dedede',
                  borderRadius: 20,
                  height: 60,
                  width: '100%',
                }}
              >
                {/* Icon */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 10,
                  }}
                >
                  <FontAwesome6 name='suitcase' size={24} color='black' />
                  <Text style={styles.worriesListItemText}>
                    Angst voor presentatie
                  </Text>
                </View>
                <View style={{ width: 120 }}>
                  <Pressable
                    onPress={() => console.log('Reframe button pressed!')}
                  >
                    <Image
                      resizeMode='contain'
                      style={{ width: '100%', height: 30 }}
                      source={require('../../assets/images/reframe_reframed_icon.png')}
                    />
                  </Pressable>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={styles.backButton}
                onPress={() => handleDrawer()}
              >
                <Text style={styles.backButtonText}>Terug</Text>
              </Pressable>
              <Pressable onPress={() => console.log('Sliders button pressed!')}>
                <FontAwesome6 name='sliders' size={24} color='black' />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.drawerContainer}>
        <View style={styles.drawerDescriptionContainer}>
          <Text style={styles.drawerDescriptionText}>
            Het zorgenbakje biedt een veilige ruimte om je zorgen en angsten te
            benoemen en op te schrijven. Het kan je helpen bij het loslaten van
            zorgen door deze visueel en symbolisch op te bergen.
          </Text>
          <Text style={styles.drawerDescriptionText}>
            Druk op de lade hieronder om je opgeborgen zorgen te bekijken.
          </Text>
        </View>

        <View>
          {isDrawerOpen ? (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{
                  width: '80%',
                  height: 150,
                  alignSelf: 'center',
                }}
                source={require('../../assets/images/drawer_open.png')}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleDrawer()}>
              <Image
                resizeMode='contain'
                style={{ width: '90%', height: 150, alignSelf: 'center' }}
                source={require('../../assets/images/drawer_closed.png')}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.bottomBarContainer}>
        <Pressable onPress={() => console.log('Naar archief pressed!')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}
          >
            <Feather name='archive' size={18} color='gray' />
            <Text style={styles.archiveButtonText}>Naar archief{' >'}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => console.log('Nieuwe zorg button pressed!')}>
          <View style={{ width: 150 }}>
            <Image
              resizeMode='contain'
              style={{
                width: '100%',
                height: 40,
              }}
              source={require('../../assets/images/nieuwe_zorg_button.png')}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};
export default Drawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  drawerDescriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    rowGap: 10,
  },
  drawerDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
  bottomBarContainer: {
    marginBottom: 95,
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
  archiveButtonText: {
    color: 'gray',
    ...Fonts.poppinsItalic[Platform.OS],
    fontStyle: 'italic',
  } as TextStyle,
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  worriesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  worriesListItemText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
});
