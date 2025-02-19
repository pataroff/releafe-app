import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextStyle,
  Platform,
} from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import {
  useFont,
  Image as SkiaImage,
  useImage,
} from '@shopify/react-native-skia';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { ChartTimeframe } from '../types';
import { Fonts } from '../styles';

// @ts-expect-error
import poppins from '../../assets/fonts/Poppins-Light.ttf';

interface AggregatedChartData {
  x: string;
  algeheel: number;
  angst: number;
  stress: number;
  energie: number;
  concentratie: number;
  slaap: number;
}

const WEEKLY_LABELS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
const MONTHLY_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// @TODO Move this to 'types.ts'!
type LineKeys =
  | 'algeheel'
  | 'angst'
  | 'stress'
  | 'concentratie'
  | 'energie'
  | 'slaap';

const lineProperties: Record<
  LineKeys,
  { label: string; shape: string; color: string }
> = {
  algeheel: {
    label: 'Algeheel',
    shape: require('../../assets/images/symbols/Symbol-overall-feeling.png'),
    color: '#A9C1A1',
  },
  angst: {
    label: 'Angst',
    shape: require('../../assets/images/symbols/Symbol-anxiety-worries.png'),
    color: '#83DBCC',
  },
  stress: {
    label: 'Stress',
    shape: require('../../assets/images/symbols/Symbol-stress.png'),
    color: '#EDBD66',
  },
  energie: {
    label: 'Energie',
    shape: require('../../assets/images/symbols/Symbol-energy.png'),
    color: '#FC5E5E',
  },
  concentratie: {
    label: 'Concentratie',
    shape: require('../../assets/images/symbols/Symbol-concentration.png'),
    color: '#5A96FF',
  },
  slaap: {
    label: 'Slaap',
    shape: require('../../assets/images/symbols/Symbol-sleep.png'),
    color: '#B473FF',
  },
};

const aggregateWeeklyData = (rawData: Record<number, number>[]) => {
  // [W1, W2, W3, W4, W5]
  return rawData.map((entry, index) => ({
    x: WEEKLY_LABELS[index % 7],
    algeheel: entry[0] ?? 0,
    angst: entry[1] ?? 0,
    stress: entry[2] ?? 0,
    energie: entry[3] ?? 0,
    concentratie: entry[4] ?? 0,
    slaap: entry[5] ?? 0,
  }));
};

const aggregateMonthlyData = (rawData: Record<number, number>[]) => {
  const weeks = chunkArray(rawData, 7); // Split into weeks
  return weeks.map((week, index) => ({
    x: `W${index + 1}`, // Monthly label: W1, W2, etc.
    ...calculateAverages(week),
  }));
};

const aggregateYearlyData = (rawData: Record<number, number>[]) => {
  const months = chunkArrayMonths(rawData, 30); // Split into months // @TODO Check if it is really the average of the days and not the average of the average of the weeks!
  return months.map((monthData, index) => ({
    x: MONTHLY_LABELS[index], // Monthly label: Jan, Feb, etc.
    ...calculateAverages(monthData),
  }));
};

// Helper to split array into chunks
const chunkArray = (data: Record<number, number>[], size: number) => {
  return Array.from({ length: Math.ceil(data.length / size) }, (_, i) =>
    data.slice(i * size, (i + 1) * size)
  );
};

const chunkArrayMonths = (data: Record<number, number>[], size: number) => {
  let numChunks = Math.ceil(data.length / size); // 365 days / 30 days = ~12 chunks

  // @TODO Is there a better way of restricting to 12 months?
  if (numChunks > 12) {
    numChunks = 12;
  }

  return Array.from({ length: numChunks }, (_, i) => {
    const start = i * size;
    const end = Math.min(start + size, data.length); // Ensure we don't go out of bounds
    return data.slice(start, end);
  });
};

// Helper to calculate averages for a group of entries
const calculateAverages = (group: {}[]) => {
  const numEntries = group.length;

  // Mapping the numeric indices to the keys
  const keyMap = [
    'algeheel',
    'angst',
    'stress',
    'energie',
    'concentratie',
    'slaap',
  ];

  // Sum the values based on the key mapping
  const summed = group.reduce(
    (acc, entry) => {
      Object.values(entry).forEach((value, index) => {
        const key = keyMap[index];
        // @ts-expect-error
        if (key) acc[key] += value;
      });
      return acc;
    },
    { algeheel: 0, angst: 0, stress: 0, energie: 0, concentratie: 0, slaap: 0 }
  );

  // Calculate the average for each key
  Object.keys(summed).forEach((key) => {
    // @ts-expect-error
    summed[key] = numEntries ? Math.round(summed[key] / numEntries) : 0;
  });

  return summed;
};

const getFontSize = (timeframe: ChartTimeframe) => {
  switch (timeframe) {
    case ChartTimeframe.Yearly:
      return 10;
    case ChartTimeframe.Monthly:
      return 12;
    case ChartTimeframe.Weekly:
      return 14;
    default:
      return 14;
  }
};

export const PerformanceChart = ({
  rawChartData,
  displayData,
  chartTimeframe,
}: {
  rawChartData: Record<number, number>[];
  displayData: string[];
  chartTimeframe: ChartTimeframe;
}) => {
  // @TODO: Chart should show the current timeframe OR the current timeframe - 1!
  // Show what is there partially for the week, monthly shows prompt that there is not enough data yet to do the average!

  const font = useFont(poppins, getFontSize(chartTimeframe));
  // const { state, isActive } = useChartPressState({ x: 0, y: { slaap: 0 } });

  const aggregatedChartData = useMemo(() => {
    const WEEKLY_DATA = aggregateWeeklyData(rawChartData);
    const MONTHLY_DATA = aggregateMonthlyData(rawChartData);
    const YEARLY_DATA = aggregateYearlyData(rawChartData);
    return { WEEKLY_DATA, MONTHLY_DATA, YEARLY_DATA };
  }, [rawChartData]); // Only recompute if chartData changes

  const handleTimeframe = (chartTimeframe: ChartTimeframe) => {
    switch (chartTimeframe) {
      case ChartTimeframe.Weekly:
        return aggregatedChartData.WEEKLY_DATA;
      case ChartTimeframe.Monthly:
        return aggregatedChartData.MONTHLY_DATA;
      case ChartTimeframe.Yearly:
        return aggregatedChartData.YEARLY_DATA;
      default:
        return aggregatedChartData.WEEKLY_DATA;
    }
  };

  // PAGINATION
  const PAGE_SIZES = {
    WEEKLY: 7, // Show one full week
    MONTHLY: 5, // Show 5 weeks (approx. one month)
    YEARLY: 12, // Show 12 months at a time
  };

  // State for pagination
  const [pageIndices, setPageIndices] = useState({
    WEEKLY: 0,
    MONTHLY: 0,
    YEARLY: 0,
  });

  // Get current page index based on timeframe
  const currentPage = pageIndices[chartTimeframe];

  // Calculate slice range
  const pageSize = PAGE_SIZES[chartTimeframe];
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = handleTimeframe(chartTimeframe);
  const totalDataLength = currentData.length;
  const maxPages = Math.ceil(totalDataLength / PAGE_SIZES[chartTimeframe]) - 1;

  // Slice data for pagination
  const paginatedData = currentData.slice(startIndex, endIndex);

  // Pagination controls
  const handleNext = () => {
    console.log('test');
    setPageIndices((prev) => ({
      ...prev,
      [chartTimeframe]: Math.min(prev[chartTimeframe] + 1, maxPages),
    }));
  };

  const handlePrev = () => {
    setPageIndices((prev) => ({
      ...prev,
      [chartTimeframe]: Math.max(0, prev[chartTimeframe] - 1), // Prevent negative index
    }));
  };

  const getXAxisTickCount = (timeframe: ChartTimeframe) => {
    switch (timeframe) {
      case ChartTimeframe.Weekly:
        return 7; // Weekly would show 7 ticks (one per day)
      case ChartTimeframe.Monthly:
        return 5; // Monthly shows 5 ticks (4.33 weeks on average per month)
      case ChartTimeframe.Yearly:
        return 12; // Yearly shows 12 ticks (one per month)
      default:
        return 7; // Default to 7 ticks for weekly
    }
  };

  const getTitle = () => {
    const now = new Date(); // Get current date
    const year = now.getFullYear(); // Get current year

    if (chartTimeframe === 'WEEKLY') {
      const startOfYear = new Date(year, 0, 1);
      const days = startOfYear.getDay(); // Days offset for first week
      const adjustedDay = pageIndices.WEEKLY * 7 + 1 - days; // Find the correct day offset
      const weekDate = new Date(year, 0, adjustedDay);
      const weekNumber = Math.ceil(
        ((weekDate - startOfYear) / 86400000 + days) / 7
      );
      return `${weekDate.getFullYear()} - Week ${weekNumber + 1}`;
    }

    if (chartTimeframe === 'MONTHLY') {
      const monthIndex = pageIndices.MONTHLY; // 0 = Jan, 1 = Feb, ...
      const monthDate = new Date(year, monthIndex, 1);
      return `${monthDate.toLocaleString('en-US', {
        month: 'long',
      })} ${monthDate.getFullYear()}`;
    }

    if (chartTimeframe === 'YEARLY') {
      return `${year - maxPages + pageIndices.YEARLY}`;
    }

    return 'Unknown';
  };

  const images = {
    algeheel: useImage(
      require('../../assets/images/symbols/Symbol-overall-feeling.png')
    ),
    angst: useImage(
      require('../../assets/images/symbols/Symbol-anxiety-worries.png')
    ),
    stress: useImage(require('../../assets/images/symbols/Symbol-stress.png')),
    energie: useImage(require('../../assets/images/symbols/Symbol-energy.png')),
    concentratie: useImage(
      require('../../assets/images/symbols/Symbol-concentration.png')
    ),
    slaap: useImage(require('../../assets/images/symbols/Symbol-sleep.png')),
  };

  return (
    <View style={{ height: 300, width: '100%', padding: 25 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}
      >
        <Pressable
          onPress={() => handlePrev()}
          disabled={pageIndices[chartTimeframe] === 0 ? true : false}
        >
          <FontAwesome5
            name='chevron-left'
            size={20}
            color={pageIndices[chartTimeframe] === 0 ? 'gainsboro' : 'black'}
          />
        </Pressable>
        <Text
          style={
            { ...Fonts.poppinsMedium[Platform.OS], fontSize: 16 } as TextStyle
          }
        >
          {getTitle()}
        </Text>
        <Pressable
          onPress={() => handleNext()}
          disabled={pageIndices[chartTimeframe] === maxPages ? true : false}
        >
          <FontAwesome5
            name='chevron-right'
            size={20}
            color={
              pageIndices[chartTimeframe] === maxPages ? 'gainsboro' : 'black'
            }
          />
        </Pressable>
      </View>
      <CartesianChart
        data={paginatedData}
        xKey={'x'}
        yKeys={[
          'algeheel',
          'angst',
          'stress',
          'concentratie',
          'energie',
          'slaap',
        ]}
        axisOptions={{
          font,
          tickCount: { x: getXAxisTickCount(chartTimeframe), y: 5 },
          tickValues: {
            x: Array.from(
              { length: getXAxisTickCount(chartTimeframe) },
              (_, i) => i
            ),
            y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        }}
        domainPadding={25}
      >
        {({ points }) => (
          <React.Fragment>
            {displayData.map((key, index) => {
              if (points[key as LineKeys]) {
                return (
                  <React.Fragment key={`${key}-${index}`}>
                    {/* Render the Line */}
                    <Line
                      points={points[key as LineKeys]}
                      color={lineProperties[key as LineKeys]?.color}
                      strokeWidth={2}
                      connectMissingData={true}
                      animate={{ type: 'timing', duration: 300 }}
                      curveType='natural'
                    />

                    {/* Render the symbols on top of each data point */}
                    {points[key as LineKeys].map((point, imgIndex) => (
                      <SkiaImage
                        key={`${key}-img-${imgIndex}`}
                        image={images[key as LineKeys]}
                        x={point.x - 6} // Adjust position
                        y={point.y - 6} // Adjust position
                        width={12} // Set the size
                        height={12} // Set the size
                        fit='contain'
                      />
                    ))}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </React.Fragment>
        )}
      </CartesianChart>

      {/* Chart Legend */}
      <View style={styles.legendContainer}>
        {displayData.map((key) => {
          if (lineProperties[key as LineKeys]) {
            return (
              <View style={styles.legendLabelContainer} key={key}>
                <Image
                  source={lineProperties[key as LineKeys]?.shape}
                  style={styles.legendLabelIndicator}
                />
                <Text style={styles.legendLabelText}>
                  {lineProperties[key as LineKeys]?.label}
                </Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  legendLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  legendLabelIndicator: {
    width: 12,
    height: 12,
  },
  legendLabelText: {
    ...Fonts.poppinsMedium[Platform.OS],
    textTransform: 'uppercase',
    fontSize: 11,
  } as TextStyle,
});

export default PerformanceChart;
