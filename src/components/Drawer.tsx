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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { v4 as uuidv4 } from 'uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: Is this the right place to declare the enums?
enum Category {
  Work,
  Health,
  Relationships,
}

enum Priority {
  None,
  Low,
  Medium,
  High,
}

const getCategory = (category: Category) => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={24} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={24} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={24} color='black' />;
  }
};

const getPriority = (priority: Priority) => {
  switch (priority) {
    case Priority.None:
      return 'gray';
    case Priority.Low:
      return 'green';
    case Priority.Medium:
      return 'orange';
    case Priority.High:
      return 'red';
    default:
      return 'gray';
  }
};

const mockData = [
  {
    id: uuidv4(),
    category: Category.Work,
    priority: Priority.Low,
    date: new Date(),
    title: 'Angst voor presentatie',
    description:
      "Ik moet volgende week een belangrijke presentatie geven op het werk voor een groot publiek, inclusief mijn manager en een aantal senior collega's. Dit is een cruciale presentatie omdat het over een nieuw project gaat waar ik de leiding over heb gehad.",
    reframed: true,
  },
  {
    id: uuidv4(),
    category: Category.Relationships,
    priority: Priority.High,
    date: new Date(),
    title: 'Ruzies met partner',
    description:
      'Mijn partner en ik hebben de laatste tijd vaak ruzie, en ik ben bang dat onze relatie op het punt staat te eindigen.',
    reframed: false,
  },
  {
    id: uuidv4(),
    category: Category.Health,
    priority: Priority.Medium,
    date: new Date(),
    title: 'Hoofdpijn',
    description:
      'Ik heb de laatste tijd veel hoofdpijn en maak me zorgen dat het iets ernstigs kan zin, zoals een hersentumor.',
    reframed: false,
  },
];

const Drawer = () => {
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleDrawer = () => {
    if (!isDrawerOpen) {
      setIsDrawerOpen(!isDrawerOpen);
      setTimeout(() => {
        setModalVisible(!modalVisible);
      }, 500);
    } else {
      setModalVisible(!modalVisible);
      setTimeout(() => {
        setIsDrawerOpen(!isDrawerOpen);
      }, 500);
    }
  };

  const expandItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
              showsVerticalScrollIndicator={false}
              style={styles.worriesListContainer}
              contentContainerStyle={styles.worriesListContentContainer}
            >
              {mockData.map((data) => {
                return (
                  <Pressable key={data.id} onPress={() => expandItem(data.id)}>
                    {/* Worries List Item */}
                    <View
                      style={
                        expandedItems[data.id] === true
                          ? [
                              styles.worriesListItemContainer,
                              {
                                height: 220, // TODO: Is this gonna be a hard-coded value?
                              },
                            ]
                          : styles.worriesListItemContainer
                      }
                    >
                      {/* Priority Bar */}
                      <View
                        style={{
                          position: 'absolute',
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          backgroundColor: getPriority(data.priority),
                          width: 12.5,
                          height: '100%',
                        }}
                      ></View>

                      {/* Main Content Wrapper */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingVertical: 15,
                          height: '100%',
                        }}
                      >
                        {/* Category + Title + Icon [1] */}
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                        >
                          {/* Category + Title */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              columnGap: 10,
                            }}
                          >
                            <View />
                            {/* Category */}
                            {getCategory(data.category)}
                            {/* Title + Date Container */}
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              {/* Title */}
                              <Text style={styles.worriesListItemText}>
                                {data.title}
                              </Text>
                              {/* Date */}
                              {expandedItems[data.id] == true && (
                                <Text style={{ fontSize: 11 }}>
                                  Angemaakt op{' '}
                                  <Text
                                    style={
                                      {
                                        ...Fonts.poppinsMedium[Platform.OS],
                                      } as TextStyle
                                    }
                                  >
                                    {data.date.toLocaleDateString('nl-NL', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                    })}
                                  </Text>
                                </Text>
                              )}
                            </View>
                          </View>

                          {/* Reframe Icon */}
                          <View style={{ width: 30 }}>
                            {data.reframed ? (
                              <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: 30 }}
                                source={require('../../assets/images/reframe_reframed_icon.png')}
                              />
                            ) : (
                              <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: 30 }}
                                source={require('../../assets/images/reframe_not_reframed_icon.png')}
                              />
                            )}
                          </View>
                        </View>

                        {/* Description [2] */}
                        <View>
                          {expandedItems[data.id] == true && (
                            <Text
                              style={
                                {
                                  fontSize: 12,
                                  ...Fonts.poppinsRegular[Platform.OS],
                                } as TextStyle
                              }
                            >
                              {data.description}
                            </Text>
                          )}
                        </View>

                        {/* Reframe + Details [3]  */}
                        {expandedItems[data.id] == true && (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {/* Reframe Button */}
                            <Pressable
                              style={{ width: 160 }}
                              onPress={() =>
                                console.log('Reframe button pressed!')
                              }
                            >
                              {data.reframed ? (
                                <Image
                                  resizeMode='contain'
                                  style={{ width: '100%', height: 30 }}
                                  source={require('../../assets/images/reframe_again_button.png')}
                                />
                              ) : (
                                <Image
                                  resizeMode='contain'
                                  style={{ width: '100%', height: 30 }}
                                  source={require('../../assets/images/reframe_now_button.png')}
                                />
                              )}
                            </Pressable>

                            {/* Details Button */}
                            <Pressable
                              style={{ position: 'absolute', right: 0 }}
                              onPress={() =>
                                console.log('Ellipsis button pressed!')
                              }
                            >
                              <FontAwesome6
                                name='ellipsis-vertical'
                                size={24}
                                color='gray'
                              />
                            </Pressable>
                          </View>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
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
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  worriesListContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    rowGap: 5,
  },
  worriesListItemContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 20,
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
  },
  worriesListItemText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
});
