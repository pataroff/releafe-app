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
import { IDiaryEntry, ChartTimeframe } from '../types';

import { ChartTimeframeSelector } from './ChartTimeFrameSelector';
import { PerformanceCalendar } from './PerformanceCalendar';

import { WellbeingChart } from './WellbeingChart';
import MultiSelectDropdown from './MultiSelectDropdown';

const windowWidth = Dimensions.get('window').width;

export const Performance: React.FC<{ diaryData: IDiaryEntry[] }> = ({
  diaryData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState<ChartTimeframe>(
    ChartTimeframe.Weekly
  );
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'slaap',
    'energie',
    'stress',
  ]);

  const [selectedDiaryEntry, setSelectedDiaryEntry] =
    useState<IDiaryEntry | null>(null);

  const chartData = diaryData.map((entry) => ({
    date: entry.date,
    values: entry.sliderValues,
  }));

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
          <ChartTimeframeSelector
            chartTimeframe={chartTimeframe}
            setChartTimeframe={setChartTimeframe}
          />
          <MultiSelectDropdown
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
          />

          <View style={styles.performanceImageContainer}>
            <WellbeingChart
              rawChartData={chartData}
              displayData={selectedFields}
              chartTimeframe={chartTimeframe}
            />
            {/* {selectedDiaryEntry != null ? (
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
            )} */}
          </View>
        </View>

        <PerformanceCalendar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDiaryEntry={selectedDiaryEntry}
          setSelectedDiaryEntry={setSelectedDiaryEntry}
        />
      </View>
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
    flexGrow: 1,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  performanceImageContainer: {
    width: '100%',
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
