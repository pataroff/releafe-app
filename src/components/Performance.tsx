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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Performance: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.performanceTitleText}>Prestaties</Text>
        <Text style={styles.performanceDescriptionText}>
          Hier zie je een overzicht van jouw prestaties over de afgelopen dagen.
        </Text>
        <CustomPicker />
        <PerformanceChart />
        <Text style={styles.calendarTitleText}>Kalender</Text>
        <Text style={styles.calendarDescriptionText}>
          Hier vindt je een overzicht van jouw data per dag en over de hele
          maand.
        </Text>
        <PerformanceCalendar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 220,
    width: windowWidth - 2 * 25,
    minHeight: windowHeight + 200,
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  performanceTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  performanceDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
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
