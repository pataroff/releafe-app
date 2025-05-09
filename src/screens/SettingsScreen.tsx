import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Platform,
  TextStyle,
  Switch,
} from 'react-native';

import { Fonts } from '../styles';

import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';

const windowWidth = Dimensions.get('window').width;

export const SettingsScreen: React.FC = ({ route }) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyles}
    >
      {/* Settings Wrapper */}
      <View style={styles.settingsWrapper}>
        <View>
          {/* Heading */}
          <Text style={styles.headingText}>A</Text>

          {/* Settings Data Container */}
          <View
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              rowGap: 25,
            }}
          ></View>
          {/* Dividing Line */}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'gainsboro',
              marginVertical: 20,
            }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  settingsWrapper: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 25,
    marginBottom: 100,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  headingText: {
    ...Fonts.sofiaProBold[Platform.OS],
    fontSize: 22,
  } as TextStyle,
  bodyText: {
    ...Fonts.sofiaProLight[Platform.OS],
    fontSize: 18,
  } as TextStyle,
});
