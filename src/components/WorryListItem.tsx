import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextStyle,
  Platform,
} from 'react-native';

import { Fonts } from '../styles';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Category, Priority, IWorryListItem } from '../types';
import { WorryContext } from '../context/WorryContext';

const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return <FontAwesome6 name='suitcase' size={24} color='black' />;
    case Category.Health:
      return <FontAwesome5 name='plus' size={24} color='black' />;
    case Category.Relationships:
      return <FontAwesome name='heart' size={24} color='black' />;
  }
};

const getPriority = (priority: Priority): string => {
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

interface WorryListItemProps {
  item: IWorryListItem;
  modalWorryListVisible: boolean;
  setModalWorryListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalAddWorryListItemVisible: boolean;
  setModalAddWorryListItemVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  modalReframingVisible: boolean;
  setModalReframingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrawer: () => void;
}

export const WorryListItem: React.FC<WorryListItemProps> = ({
  item,
  modalWorryListVisible,
  setModalWorryListVisible,
  modalAddWorryListItemVisible,
  setModalAddWorryListItemVisible,
  modalReframingVisible,
  setModalReframingVisible,
  handleDrawer,
}) => {
  const { uuid, category, priority, date, title, description, reframed } = item;

  const { updateWorryEntryFields, deleteWorryEntry } = useContext(WorryContext);

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const [showOptionButtons, setShowOptionButtons] = useState<boolean>(false);

  const expandItem = (uuid: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [uuid]: !prev[uuid],
    }));
  };

  const handleEdit = () => {
    updateWorryEntryFields(uuid, category, priority, title, description);
    setModalWorryListVisible(!modalWorryListVisible);
    handleDrawer();
    setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
  };

  const handleDelete = () => {
    deleteWorryEntry(uuid);
  };

  const handleReframing = () => {
    updateWorryEntryFields(uuid, category, priority, title, description);
    setModalWorryListVisible(!modalWorryListVisible);
    setModalReframingVisible(!modalReframingVisible);
  };

  return (
    <Pressable onPress={() => expandItem(uuid)}>
      {/* Worry List Item */}
      <View
        style={
          expandedItems[uuid] === true
            ? [
                styles.worryListItemContainer,
                {
                  height: 250, // TODO: Is this gonna be a hard-coded value?
                },
              ]
            : styles.worryListItemContainer
        }
      >
        {/* Priority Bar */}
        <View
          style={{
            position: 'absolute',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: getPriority(priority),
            width: 65,
            height: '100%',
          }}
        ></View>

        {/* Main Content Wrapper */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Category + Title + Reframe Icon */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              columnGap: 10,
              height: '100%',
              width: '100%',
            }}
          >
            {/* Category Container */}
            <View
              style={{
                display: 'flex',
                justifyContent:
                  expandedItems[uuid] == true ? 'flex-start' : 'center',
                alignItems: 'center',
                backgroundColor: '#EDF8E9',
                height: '100%',
                width: 65,
                borderRadius: 10,
                paddingTop: expandedItems[uuid] == true ? 18 : 0,
              }}
            >
              {getCategory(category)}
            </View>
            {/* Title + Date + Description + Reframe + Details Container */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:
                  expandedItems[uuid] == true ? 'space-between' : 'center',
                height: '100%',
                width: expandedItems[uuid] == true ? '73%' : '60%',
                paddingVertical: 10,
              }}
            >
              {/* Title + Date */}
              <View>
                {/* Title */}
                <Text style={styles.worryListItemText}>{title}</Text>
                {/* Date */}
                {expandedItems[uuid] == true && (
                  <Text style={{ fontSize: 11 }}>
                    Angemaakt op{' '}
                    <Text
                      style={
                        {
                          ...Fonts.poppinsMedium[Platform.OS],
                        } as TextStyle
                      }
                    >
                      {date.toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </Text>
                )}
              </View>
              {expandedItems[uuid] == true && (
                <>
                  {/* Description [2] */}
                  <Text
                    style={
                      {
                        fontSize: 12,
                        ...Fonts.poppinsRegular[Platform.OS],
                      } as TextStyle
                    }
                  >
                    {description}
                  </Text>

                  {/* Reframe + Details [3]  */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {/* Reframe Button */}
                    <Pressable
                      style={{ width: 160 }}
                      onPress={() => handleReframing()}
                    >
                      {reframed ? (
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
                    {showOptionButtons ? (
                      <>
                        <Pressable
                          style={{ position: 'absolute', right: 0 }}
                          onPress={() =>
                            setShowOptionButtons(!showOptionButtons)
                          }
                        >
                          <FontAwesome
                            name='caret-down'
                            size={24}
                            color='#A5B79F'
                          />
                        </Pressable>

                        <Pressable
                          style={[styles.optionButton, { bottom: 120 }]}
                          onPress={() => handleEdit()}
                        >
                          <Feather name='edit' size={20} color='white' />
                          <Text style={styles.optionButtonText}>Bewerken</Text>
                        </Pressable>

                        <Pressable
                          style={[styles.optionButton, { bottom: 75 }]}
                          onPress={() => console.log('Option 2 pressed!')}
                        >
                          <Feather name='archive' size={20} color='white' />
                          <Text style={styles.optionButtonText}>
                            Archiveren
                          </Text>
                        </Pressable>

                        <Pressable
                          style={[styles.optionButton, { bottom: 30 }]}
                          onPress={() => handleDelete()}
                        >
                          <FontAwesome6
                            name='trash-alt'
                            size={22}
                            color='white'
                          />
                          <Text style={styles.optionButtonText}>
                            Verwijderen
                          </Text>
                        </Pressable>
                      </>
                    ) : (
                      <Pressable
                        style={{ position: 'absolute', right: 0 }}
                        onPress={() => setShowOptionButtons(!showOptionButtons)}
                      >
                        <FontAwesome6
                          name='ellipsis-vertical'
                          size={24}
                          color='gray'
                        />
                      </Pressable>
                    )}
                  </View>
                </>
              )}
            </View>

            {/* Reframe Icon */}
            {expandedItems[uuid] !== true && (
              <View style={{ width: 30 }}>
                {reframed ? (
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
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  worryListItemContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    paddingLeft: 12,
    paddingRight: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  worryListItemText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
  } as TextStyle,
  optionButton: {
    position: 'absolute',
    right: 0,
    borderRadius: 30,
    height: 40,
    width: 150,
    backgroundColor: '#A5B79F',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
  },
  optionButtonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    color: 'white',
    fontSize: 16,
  } as TextStyle,
});
