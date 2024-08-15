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

import { WorriesListModal } from './WorriesListModal';
import { WorriesListItemAddModal } from './WorriesListItemAddModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalWorriesListVisible, setModalWorriesListVisible] =
    useState<boolean>(false);
  const [modalAddWorriesListItemVisible, setModalAddWorriesListItemVisible] =
    useState<boolean>(false);

  const handleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(!isDrawerOpen);
      setTimeout(() => {
        setModalWorriesListVisible(!modalWorriesListVisible);
      }, 500);
    } else {
      setModalWorriesListVisible(!modalWorriesListVisible);
      setTimeout(() => {
        setIsDrawerOpen(!isDrawerOpen);
      }, 500);
    }
  };

  return (
    <>
      {/* Worries List Modal */}
      <WorriesListModal
        modalWorriesListVisible={modalWorriesListVisible}
        setModalWorriesListVisible={setModalWorriesListVisible}
        handleDrawer={handleDrawer}
      />

      {/* Add Worries List Item Modal */}
      <WorriesListItemAddModal
        modalAddWorriesListItemVisible={modalAddWorriesListItemVisible}
        setModalAddWorriesListItemVisible={setModalAddWorriesListItemVisible}
      />

      {/* Drawer */}
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
        <Pressable
          onPress={() =>
            setModalAddWorriesListItemVisible(!modalAddWorriesListItemVisible)
          }
        >
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
});
