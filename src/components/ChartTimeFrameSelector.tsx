import {
  View,
  Text,
  Platform,
  TextStyle,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Fonts } from '../styles';
import { ChartTimeframe } from '../types';

export const ChartTimeframeSelector: React.FC<{
  chartTimeframe: ChartTimeframe;
  setChartTimeframe: (option: ChartTimeframe) => void;
}> = ({ chartTimeframe, setChartTimeframe }) => {
  return (
    <View>
      <View style={styles.container}>
        <Pressable
          style={[
            chartTimeframe === ChartTimeframe.Weekly
              ? styles.selectedButton
              : styles.unselectedButton,
            styles.leftButton,
          ]}
          onPress={() => setChartTimeframe(ChartTimeframe.Weekly)}
        >
          <Text
            style={
              chartTimeframe === ChartTimeframe.Weekly
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Week
          </Text>
        </Pressable>
        <Pressable
          style={
            chartTimeframe === ChartTimeframe.Monthly
              ? styles.selectedButton
              : styles.unselectedButton
          }
          onPress={() => setChartTimeframe(ChartTimeframe.Monthly)}
        >
          <Text
            style={
              chartTimeframe === ChartTimeframe.Monthly
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Maand
          </Text>
        </Pressable>
        <Pressable
          style={[
            chartTimeframe === ChartTimeframe.Yearly
              ? styles.selectedButton
              : styles.unselectedButton,
            styles.rightButton,
          ]}
          onPress={() => setChartTimeframe(ChartTimeframe.Yearly)}
        >
          <Text
            style={
              chartTimeframe === ChartTimeframe.Yearly
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Jaar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#f6f6f6',
  },
  unselectedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  selectedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9C1A1',
    paddingVertical: 5,
  },
  leftButton: {
    borderRadius: 5,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  rightButton: {
    borderRadius: 5,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  unselectedText: {
    ...Fonts.sofiaProRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  selectedText: {
    ...Fonts.sofiaProMedium[Platform.OS],
    fontSize: 13,
  } as TextStyle,
});
