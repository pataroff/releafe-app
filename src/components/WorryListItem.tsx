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
  handleDrawer: () => void;
}

export const WorryListItem: React.FC<WorryListItemProps> = ({
  item,
  modalWorryListVisible,
  setModalWorryListVisible,
  modalAddWorryListItemVisible,
  setModalAddWorryListItemVisible,
  handleDrawer,
}) => {
  const { uuid, category, priority, date, title, description, reframed } = item;

  const { updateWorryEntryFields, deleteWorryEntry, resetWorryEntryFields } =
    useContext(WorryContext);

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

  return (
    <Pressable onPress={() => expandItem(uuid)}>
      {/* Worry List Item */}
      <View
        style={
          expandedItems[uuid] === true
            ? [
                styles.worryListItemContainer,
                {
                  height: 220, // TODO: Is this gonna be a hard-coded value?
                },
              ]
            : styles.worryListItemContainer
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
            backgroundColor: getPriority(priority),
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
              {getCategory(category)}
              {/* Title + Date Container */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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
            </View>

            {/* Reframe Icon */}
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
          </View>

          {/* Description [2] */}
          <View>
            {expandedItems[uuid] == true && (
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
            )}
          </View>

          {/* Reframe + Details [3]  */}
          {expandedItems[item.uuid] == true && (
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
                onPress={() => console.log('Reframe button pressed!')}
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
                    onPress={() => setShowOptionButtons(!showOptionButtons)}
                  >
                    <FontAwesome name='caret-down' size={24} color='#93bab5' />
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
                    <Text style={styles.optionButtonText}>Archiveren</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.optionButton, { bottom: 30 }]}
                    onPress={() => handleDelete()}
                  >
                    <FontAwesome6 name='trash-alt' size={22} color='white' />
                    <Text style={styles.optionButtonText}>Verwijderen</Text>
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
          )}
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
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 20,
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
  },
  worryListItemText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
  optionButton: {
    position: 'absolute',
    right: 0,
    borderRadius: 30,
    height: 40,
    width: 150,
    backgroundColor: '#93bab5',
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
