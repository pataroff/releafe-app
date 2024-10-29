import React, { useState } from 'react';

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
import { IDiaryEntry, SelectOptions } from '../types';

import { CustomSelector } from './CustomSelector';
import { CustomMultiPicker } from './CustomMultiPicker';
import { PerformanceCalendar } from './PerformanceCalendar';

import { PerformanceChart } from './PerformanceChart';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json';

const windowWidth = Dimensions.get('window').width;

export const Performance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOptions>(0);

  const [selectedDiaryEntry, setSelectedDiaryEntry] =
    useState<IDiaryEntry | null>(null);

  const handleSelect = (option: SelectOptions) => {
    setSelected(option);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headersContainer}>
          <Text style={styles.performanceTitleText}>Overzicht welzijn</Text>
          <Text style={styles.performanceDescriptionText}>
            Hier vind je een overzicht van de door jou ingevoerde gegevens uit
            het dagboek voor de geselecteerde periode.
          </Text>
          <Text style={styles.performanceHeadingText}>
            Persoonlijk dashboard
          </Text>
        </View>

        <View style={styles.performanceContainer}>
          <CustomSelector selected={selected} handleSelect={handleSelect} />
          <View style={styles.performanceImageContainer}>
            {selectedDiaryEntry != null ? (
              selected === 0 ? (
                <Image
                  resizeMode='contain'
                  style={{ width: '100%', height: 300 }}
                  source={require('../../assets/images/chart_week.png')}
                />
              ) : selected === 1 ? (
                <Image
                  resizeMode='contain'
                  style={{ width: '100%', height: 300 }}
                  source={require('../../assets/images/chart_maand.png')}
                />
              ) : (
                <Image
                  resizeMode='contain'
                  style={{ width: '100%', height: 300 }}
                  source={require('../../assets/images/chart_jaar.png')}
                />
              )
            ) : (
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: 300 }}
                source={require('../../assets/images/chart_empty.png')}
              />
            )}
          </View>
        </View>

        <PerformanceCalendar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDiaryEntry={selectedDiaryEntry}
          setSelectedDiaryEntry={setSelectedDiaryEntry}
        />
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
    width: windowWidth,
    marginTop: 25,
    marginBottom: 110,
    paddingHorizontal: 20,
  },
  headersContainer: {
    paddingHorizontal: 10,
  },
  performanceHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
    marginTop: 20,
  } as TextStyle,
  performanceContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 30,
    height: 360,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  performanceImageContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  performanceTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    color: '#5c6b57',
    fontSize: 22,
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
