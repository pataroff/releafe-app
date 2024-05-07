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

          <Text style={styles.calendarTitleText}>Kalender</Text>
        </View>

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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 210,
    minHeight: windowHeight + 380,
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
    minWidth: windowWidth + 5,
    minHeight: 600,
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
    marginTop: 20,
  } as TextStyle,
});
