import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { CustomPicker } from './CustomPicker';
import { PerformanceChart } from './PerformanceChart';
import { PerformanceCalendar } from './PerformanceCalendar';

import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json';
import { CustomSelector } from './CustomSelector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

enum SelectOptions {
  Week,
  Maand,
  Jaar,
}

export const Performance: React.FC = () => {
  const [selected, setSelected] = useState<SelectOptions>();

  const handleSelect = (option: SelectOptions) => {
    setSelected(option);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.performanceTitleText}>Overzicht welzijn</Text>
        <Text style={styles.performanceDescriptionText}>
          Hier zie je een overzicht van de door jou ingevoerde scores in de
          geselecteerde periode.
        </Text>
        <CustomSelector selected={selected} handleSelect={handleSelect} />
        {/* <CustomPicker /> */}

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

        <Text style={styles.calendarTitleText}>Kalender</Text>
        {/* <Text style={styles.calendarDescriptionText}>
          Hier vindt je een overzicht van jouw data per dag en over de hele
          maand.
        </Text> */}
        <PerformanceCalendar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 200,
    width: windowWidth - 2 * 25,
    minHeight: windowHeight + 380,
    paddingTop: 25,
    paddingHorizontal: 10,
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
  } as TextStyle,
});
