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

const currentDate = new Date().toLocaleString('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const currentTime = new Date().toLocaleTimeString('nl-NL', {
  timeStyle: 'short',
});

export const Performance: React.FC = () => {
  const { hasData } = useContext(DiaryContext);

  const [selected, setSelected] = useState<SelectOptions>(0);

  const handleSelect = (option: SelectOptions) => {
    setSelected(option);
  };

  return (
    <>
      <View style={styles.container}>
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
                style={{ width: windowWidth, height: 350, marginTop: 20 }}
                source={require('../../assets/images/chart_week.png')}
              />
            ) : selected === 1 ? (
              <Image
                style={{ width: windowWidth, height: 350, marginTop: 20 }}
                source={require('../../assets/images/chart_maand.png')}
              />
            ) : (
              <Image
                style={{ width: windowWidth, height: 350, marginTop: 20 }}
                source={require('../../assets/images/chart_jaar.png')}
              />
            )
          ) : (
            <Image
              style={{ width: windowWidth, height: 350, marginTop: 20 }}
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

        <View style={styles.dataHeadersContainer}>
          <Text style={styles.dataTitleText}>Datum: {currentDate}</Text>
          <Text style={styles.dataTitleText}>
            Tijd van invullen: {currentTime} uur{' '}
          </Text>

          {/* The Wizard of Oz Method Data Visualization */}
          <View style={styles.dataSlidersContainer}>
            <Text style={[styles.dataHeadingText, { fontSize: 18 }]}>
              Algemene stemming
            </Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={8}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Angstniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={3}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Stressniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={6}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Energieniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={8}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Focus en concentratie</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={4}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Slaap</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={5}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='black'
              maximumTrackTintColor='#dedede'
            />
          </View>
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
  container: {
    top: 210,
    minHeight: windowHeight + 800,
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
  dataHeadersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 50,
  },
  dataSlidersContainer: {
    width: windowWidth,
    paddingHorizontal: 10,
    marginTop: 40,
  },
  dataTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  dataHeadingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
});
