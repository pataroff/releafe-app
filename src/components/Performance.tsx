import React, { useState, useContext } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { CustomSelector } from './CustomSelector';
import { CustomMultiPicker } from './CustomMultiPicker';
import { PerformanceCalendar } from './PerformanceCalendar';
import Slider from '@react-native-community/slider';

import { DiaryContext } from '../context/DiaryContext';

import { PerformanceChart } from './PerformanceChart';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

enum SelectOptions {
  Week,
  Maand,
  Jaar,
}

export const Performance: React.FC = () => {
  const { hasData } = useContext(DiaryContext);

  const [selected, setSelected] = useState<SelectOptions>(0);

  const handleSelect = (option: SelectOptions) => {
    setSelected(option);
  };

  return (
    <>
      <View
        style={hasData ? styles.containerHasData : styles.containerHasNoData}
      >
        <View style={styles.headersContainer}>
          <Text style={styles.performanceTitleText}>Overzicht welzijn</Text>
          <Text style={styles.performanceDescriptionText}>
            Hier zie je een overzicht van de door jou ingevoerde scores in de
            geselecteerde periode.
          </Text>
        </View>
        <CustomSelector selected={selected} handleSelect={handleSelect} />

        <View style={styles.performanceContainer}>
          <CustomMultiPicker selected={selected} />
          {/* The Wizard of Oz Method Chart */}
          {hasData ? (
            selected === 0 ? (
              <Image
                style={{ width: windowWidth, height: 350, marginTop: 25 }}
                source={require('../../assets/images/chart_week.png')}
              />
            ) : selected === 1 ? (
              <Image
                style={{ width: windowWidth, height: 350, marginTop: 25 }}
                source={require('../../assets/images/chart_maand.png')}
              />
            ) : (
              <Image
                style={{ width: windowWidth, height: 350, marginTop: 25 }}
                source={require('../../assets/images/chart_jaar.png')}
              />
            )
          ) : (
            <Image
              style={{ width: windowWidth, height: 350, marginTop: 25 }}
              source={require('../../assets/images/chart_empty.png')}
            />
          )}

          <View style={styles.headersContainer}>
            <Text style={styles.calendarTitleText}>Kalender</Text>
            <Text style={styles.calendarDescriptionText}>
              Hier vindt je een overzicht van jouw data per dag en over de hele
              maand.
            </Text>
          </View>
          <PerformanceCalendar />
        </View>
      </View>

      {/* The Actual Chart */}
      {/* {Platform.OS == 'web' ? (
          <WithSkiaWeb
            opts={{
              locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}`,
            }}
            //@ts-ignore
            getComponent={() => import('./PerformanceChart')}
            fallback={<Text>Loading Skia...</Text>}
          />
        ) : (
          <PerformanceChart />
        )} */}
    </>
  );
};

const styles = StyleSheet.create({
  containerHasNoData: {
    marginTop: 210,
    minHeight: windowHeight + 210,
    paddingTop: 25,
  },
  containerHasData: {
    marginTop: 210,
    minHeight: windowHeight + 790,
    paddingTop: 25,
  },
  headersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
  },
  performanceContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
    minWidth: windowWidth,
    minHeight: 610,
    // This needs to be fixed! 👇🏻
    maxHeight: 610,
  },
  performanceTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  performanceDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  calendarTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  calendarDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
    marginTop: 5,
  } as TextStyle,
});
