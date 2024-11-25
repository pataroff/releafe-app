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

import { IWorryListItem } from '../types';
import { getPriorityColor, getCategory } from '../utils/worry';
import { WorryContext } from '../context/WorryContext';

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

  const expandItem = (uuid: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [uuid]: !prev[uuid],
    }));
  };

  const handleEdit = () => {
    updateWorryEntryFields(uuid, category, priority, title, description);
    setModalWorryListVisible(!modalWorryListVisible);
    setTimeout(() => {
      setModalAddWorryListItemVisible(!modalAddWorryListItemVisible);
      handleDrawer();
    }, 300);
  };

  const handleDelete = () => {
    deleteWorryEntry(uuid);
  };

  const handleReframing = () => {
    updateWorryEntryFields(uuid, category, priority, title, description);
    setModalWorryListVisible(!modalWorryListVisible);
    // 👇🏻 This fixes the app freezing!
    setTimeout(() => {
      setModalReframingVisible(!modalReframingVisible);
    }, 300);
  };

  return (
    <Pressable
      style={
        expandedItems[uuid] === true
          ? [
              styles.worryListItemContainer,
              {
                flex: 1,
              },
            ]
          : [styles.worryListItemContainer, { height: 60 }]
      }
      onPress={() => expandItem(uuid)}
    >
      {/* Priority Bar */}
      <View
        style={{
          position: 'absolute',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: getPriorityColor(priority),
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
          {/* Title + Date + Description + Edit + Delete + Reframe Container */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent:
                expandedItems[uuid] == true ? 'space-between' : 'center',
              width: expandedItems[uuid] == true ? '73%' : '60%',
              paddingVertical: 15,
              rowGap: 15,
            }}
          >
            {/* Title + Date */}
            <View
              style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}
            >
              {/* Title */}
              <Text style={styles.worryListItemTitleText}>{title}</Text>
              {/* Date */}
              {expandedItems[uuid] == true && (
                <Text style={styles.worryListItemDateText}>
                  Angemaakt op{' '}
                  {date.toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </View>
            {expandedItems[uuid] == true && (
              <>
                {/* Description [2] */}
                <Text style={styles.worryListItemDescriptionText}>
                  {description}
                </Text>

                {/* Edit + Delete + Reframe  */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 10,
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      columnGap: 5,
                    }}
                  >
                    {/* Edit Button  */}
                    <Pressable onPress={() => handleEdit()}>
                      <Image
                        resizeMode='contain'
                        style={{ width: 46, height: 46 }}
                        source={require('../../assets/images/worry_item_edit_icon.png')}
                      />
                    </Pressable>

                    {/* Delete Button  */}
                    <Pressable onPress={() => handleDelete()}>
                      <Image
                        resizeMode='contain'
                        style={{ width: 43, height: 46 }}
                        source={require('../../assets/images/worry_item_delete_icon.png')}
                      />
                    </Pressable>
                  </View>
                  {/* Reframe Button */}
                  <Pressable onPress={() => handleReframing()}>
                    {reframed ? (
                      <Image
                        style={{ width: 190, height: 47 }}
                        source={require('../../assets/images/reframe_again_button.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          width: 149,
                          height: 47,
                        }}
                        source={require('../../assets/images/reframe_now_button.png')}
                      />
                    )}
                  </Pressable>
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
  worryListItemTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 15,
  } as TextStyle,
  worryListItemDateText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 11,
  } as TextStyle,
  worryListItemDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
