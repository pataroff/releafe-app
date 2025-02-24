import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextStyle,
  Platform,
} from 'react-native';
import { CartesianChart, Line } from 'victory-native';
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
  date: Date;
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

const aggregateWeeklyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  // [W1, W2, W3, W4, W5]
  return rawData.map((entry, index) => ({
    date: entry.date,
    x: WEEKLY_LABELS[index % 7], // @TODO Is this correctly assigning the day corresponding to that date on the x-axis?
    algeheel: entry.values[0] ?? 0,
    angst: entry.values[1] ?? 0,
    stress: entry.values[2] ?? 0,
    energie: entry.values[3] ?? 0,
    concentratie: entry.values[4] ?? 0,
    slaap: entry.values[5] ?? 0,
  }));
};

const aggregateMonthlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  const weeks = chunkArray(rawData, 7); // Split into weeks
  return weeks.map((week, index) => ({
    // `week` is an array!
    date: week[week.length - 1].date,
    x: `W${index + 1}`, // Monthly label: W1, W2, etc.
    ...calculateAverages(week),
  }));
};

const aggregateYearlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  const months = chunkArrayMonths(rawData, 30); // Split into months
  return months.map((month, index) => ({
    date: month[month.length - 1].date,
    x: MONTHLY_LABELS[index], // Monthly label: Jan, Feb, etc.
    ...calculateAverages(month),
  }));
};

// Helper to split array into chunks
const chunkArray = (
  data: { date: Date; values: Record<number, number> }[],
  size: number
) => {
  return Array.from({ length: Math.ceil(data.length / size) }, (_, i) =>
    data.slice(i * size, (i + 1) * size)
  );
};

const chunkArrayMonths = (
  data: { date: Date; values: Record<number, number> }[],
  size: number
) => {
  let numChunks = Math.ceil(data.length / size); // 365 days / 30 days = ~12 chunks

  return Array.from({ length: numChunks }, (_, i) => {
    const start = i * size;
    const end = Math.min(start + size, data.length); // Ensure we don't go out of bounds
    return data.slice(start, end);
  });
};

// Helper to calculate averages for a group of entries
const calculateAverages = (
  group: { date: Date; values: Record<number, number> }[]
) => {
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
      Object.values(entry.values).forEach((value, index) => {
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
  rawChartData: { date: Date; values: Record<number, number> }[];
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

  const currentData = handleTimeframe(chartTimeframe);

  // Update pageIndices after the data is aggregated
  useEffect(() => {
    switch (chartTimeframe) {
      case ChartTimeframe.Weekly:
        setPageIndices((prev) => ({
          ...prev,
          WEEKLY: getStartPageIndexWeekly(currentData),
        }));
        break;
      case ChartTimeframe.Monthly:
        setPageIndices((prev) => ({
          ...prev,
          MONTHLY: getStartPageIndexMonthly(currentData),
        }));
        break;
      case ChartTimeframe.Yearly:
        setPageIndices((prev) => ({
          ...prev,
          YEARLY: getStartPageIndexYearly(currentData),
        }));
      default:
        setPageIndices((prev) => ({
          ...prev,
          WEEKLY: 0,
          MONTHLY: 0,
          YEARLY: 0,
        }));
        break;
    }
  }, [aggregatedChartData, chartTimeframe]); // Re-run when chartTimeframe or aggregatedChartData changes

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  // @TODO Combine these 3 functions into 1!

  const getStartPageIndexWeekly = (data: AggregatedChartData[]) => {
    const today = new Date('2024-04-08'); // Replace with `new Date()` in production
    const weekStart = new Date(today);

    // @TODO Does this matter?
    // // Adjust so the week starts on Monday instead of Sunday
    // const dayOfWeek = today.getDay();
    // const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If today is Sunday (0), subtract 6 days to get Monday

    // weekStart.setDate(today.getDate() - daysToSubtract);
    // weekStart.setHours(0, 0, 0, 0);

    const entryIndex = data.findIndex(
      (entry) =>
        getFormattedDate(new Date(entry.date)) === getFormattedDate(weekStart)
    );

    console.log('Entry Index (WEEKLY):', entryIndex);

    return entryIndex !== -1
      ? Math.floor(entryIndex / 7)
      : Math.floor(data.length / 7); // Timeframe - 1
  };

  const getStartPageIndexMonthly = (data: AggregatedChartData[]) => {
    const today = new Date('2024-04-08'); // Replace with `new Date()` in production
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Find the first entry that belongs to the same month and year
    const entryIndex = data.findIndex((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });

    return entryIndex !== -1
      ? Math.floor(entryIndex / 5)
      : Math.floor(data.length / 5);
  };

  const getStartPageIndexYearly = (data: AggregatedChartData[]) => {
    const today = new Date('2025-04-08'); // Replace with `new Date()` in production
    const currentYear = today.getFullYear();

    // Find the first entry that belongs to the same month and year
    const entryIndex = data.findIndex((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === currentYear;
    });

    return entryIndex !== -1
      ? Math.floor(entryIndex / 12)
      : Math.floor(data.length / 12);
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
    MONTHLY: 0, // @TODO Does this needs to get incremented by 5?
    YEARLY: 0,
  });

  // Get current page index based on timeframe
  const currentPage = pageIndices[chartTimeframe];

  // Calculate slice range
  const pageSize = PAGE_SIZES[chartTimeframe];
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  // console.log('Start Index: ', startIndex);

  const totalDataLength = currentData.length;
  const maxPages = Math.ceil(totalDataLength / PAGE_SIZES[chartTimeframe]) - 1;

  // Slice data for pagination
  const paginatedData = currentData.slice(startIndex, endIndex);
  // console.log(paginatedData);

  // Pagination controls
  const handleNext = () => {
    setPageIndices((prev) => {
      return {
        ...prev,
        [chartTimeframe]: Math.min(prev[chartTimeframe] + 1, maxPages),
      };
    });
  };

  const handlePrev = () => {
    setPageIndices((prev) => {
      return {
        ...prev,
        [chartTimeframe]: Math.max(0, prev[chartTimeframe] - 1),
      };
    });
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

  const getTitle = (data: AggregatedChartData[]) => {
    if (!data || data.length === 0) return 'No Data';

    let index = pageIndices[chartTimeframe]; // Ensure we fetch the latest index

    // For monthly view, calculate the index for the first week of the current 5-week block
    if (chartTimeframe === 'MONTHLY') {
      // Calculate the block start index (5-week block)
      index = pageIndices[chartTimeframe] * 5; // Multiply by 5 to get the start of the block
    } else if (chartTimeframe === 'WEEKLY') {
      index = pageIndices[chartTimeframe] * 7;
    }

    // console.log('Index: ', index);
    console.log('Data at that index: ', data[index]);

    if (index < 0 || index >= data.length) return 'Unknown'; // Prevent invalid index access

    const startDate = new Date(data[index].date);
    // console.log('Start Date: ', startDate);

    if (chartTimeframe === 'WEEKLY') {
      // Get the first day of the year
      const firstDayOfYear = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0);
      // Calculate the number of days since the start of the year
      const daysSinceYearStart = Math.floor(
        (startDate.getTime() - firstDayOfYear.getTime()) / 86400000
      );
      // Adjust the days to account for the start of the week (Sunday)
      const weekNumber = Math.ceil(
        (daysSinceYearStart + firstDayOfYear.getDay() + 1) / 7
      ); // Add +1 to ensure Sunday is included in the first week
      return `${startDate.getFullYear()} - Week ${weekNumber}`;
    }

    if (chartTimeframe === 'MONTHLY') {
      return `${startDate.toLocaleString('en-US', {
        month: 'long',
      })} ${startDate.getFullYear()}`;
    }

    if (chartTimeframe === 'YEARLY') {
      return `${startDate.getFullYear()}`;
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
    <View style={{ height: 400, width: '100%', padding: 25 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingBottom: 10,
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
          {getTitle(currentData)}
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
        domainPadding={30}
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
