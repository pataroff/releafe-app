import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import { Fonts } from '../styles';

import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

import { PerformanceChart } from './PerformanceChart';
import { PerformanceCalendar } from './PerformanceCalendar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Performance: React.FC = () => {
  return (
    <>
      <ScrollView
        style={{
          position: 'absolute',
          top: 200,
          width: windowWidth - 2 * 25,
          height: windowHeight,
          paddingTop: 25,
          paddingHorizontal: 10,
        }}
      >
        {/* Prestaties */}
        <View style={{ rowGap: 5 }}>
          <Text style={styles.performanceTitleText}>Prestaties</Text>
          <Text style={styles.performanceDescriptionText}>
            Hier zie je een overzicht van jouw prestaties over de afgelopen
            dagen.
          </Text>
        </View>
        {/* Chart */}
        <View style={{ marginTop: 20 }}>
          {/* <WithSkiaWeb
            // import() uses the default export of MySkiaComponent.tsx
            getComponent={() => import('../components/PerformanceChart')}
            fallback={<Text>Loading Skia...</Text>}
          /> */}
          <PerformanceChart />
        </View>
        {/* Calendar */}
        <PerformanceCalendar />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  performanceTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  performanceDescriptionText: {
    ...Fonts.poppinsMedium[Platform.OS],
  } as TextStyle,
});
