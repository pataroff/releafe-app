import React, { useState } from 'react';

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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Category, Priority, IWorryListItem } from '../types';

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

export const WorryListItem: React.FC<{ data: IWorryListItem }> = ({ data }) => {
  const { id, category, priority, date, title, description, reframed } = data;

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const expandItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Pressable onPress={() => expandItem(id)}>
      {/* Worry List Item */}
      <View
        style={
          expandedItems[id] === true
            ? [
                styles.WorryListItemContainer,
                {
                  height: 220, // TODO: Is this gonna be a hard-coded value?
                },
              ]
            : styles.WorryListItemContainer
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
                <Text style={styles.WorryListItemText}>{title}</Text>
                {/* Date */}
                {expandedItems[id] == true && (
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
            {expandedItems[id] == true && (
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
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => console.log('Ellipsis button pressed!')}
              >
                <FontAwesome6 name='ellipsis-vertical' size={24} color='gray' />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  WorryListItemContainer: {
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
  WorryListItemText: {
    ...Fonts.poppinsRegular[Platform.OS],
  } as TextStyle,
});
