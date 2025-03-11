import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextStyle,
  Platform,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import {
  CartesianChart,
  Line,
  PointsArray,
  useChartPressState,
} from 'victory-native';
import {
  Skia,
  useFont,
  Image as SkiaImage,
  Path as SkiaPath,
  useImage,
  SkImage,
  usePathValue,
  Group,
  RoundedRect as SkiaRoundedRect,
  Text as SkiaText,
} from '@shopify/react-native-skia';
import Animated, {
  SharedValue,
  useDerivedValue,
} from 'react-native-reanimated';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { ChartTimeframe } from '../types';
import { Fonts } from '../styles';

// @ts-expect-error
import poppinsLight from '../../assets/fonts/Poppins-Light.ttf';
// @ts-expect-error
import poppinsSemiBold from '../../assets/fonts/Poppins-SemiBold.ttf';

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

const windowWidth = Dimensions.get('window').width;
const paddingHorizontal = 20;
const chartWidth = windowWidth - paddingHorizontal * 2;

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
  string,
  { label: string; shape: ImageSourcePropType; color: string }
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

const fillMissingDays = (
  rawData: { date: Date; values: Record<number, number> }[],
  startDate?: Date,
  endDate?: Date
) => {
  if (rawData.length === 0) return [];

  const sortedData = rawData
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // If no explicit startDate or endDate provided, infer from the data
  const start = startDate ?? sortedData[0].date;
  const end = endDate ?? sortedData[sortedData.length - 1].date;

  const dateMap = new Map<
    string,
    { date: Date; values: Record<number, number> }
  >();

  sortedData.forEach((entry) => {
    const key = entry.date.toISOString().split('T')[0]; // Use date string for easy map lookup
    dateMap.set(key, entry);
  });

  const filledData: { date: Date; values: Record<number, number> }[] = [];

  let currentDate = new Date(start);

  while (currentDate <= end) {
    const dateKey = currentDate.toISOString().split('T')[0];

    if (dateMap.has(dateKey)) {
      filledData.push(dateMap.get(dateKey)!);
    } else {
      // Fill missing day with zeros
      filledData.push({
        date: new Date(currentDate),
        values: {
          0: 0, // algeheel
          1: 0, // angst
          2: 0, // stress
          3: 0, // energie
          4: 0, // concentratie
          5: 0, // slaap
        },
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
};

const aggregateWeeklyData = (
  rawData: { date: Date; values: Record<number, number> }[]
) => {
  const filledData = fillMissingDays(rawData);
  const weeks = chunkArray(filledData, 7);

  return weeks.flatMap((week) => {
    return week
      .map((day) => {
        const dayIndex = day.date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        const shiftedIndex = (dayIndex + 6) % 7; // Convert to Monday-first (Monday = 0)

        return {
          date: day.date,
          x: shiftedIndex, // Use this for sorting
          algeheel: day.values[0] ?? 0,
          angst: day.values[1] ?? 0,
          stress: day.values[2] ?? 0,
          energie: day.values[3] ?? 0,
          concentratie: day.values[4] ?? 0,
          slaap: day.values[5] ?? 0,
        };
      })
      .sort((a, b) => a.x - b.x) // Sort by shifted index
      .map((entry) => ({
        ...entry,
        x: WEEKLY_LABELS[entry.x], // Assign final labels in order
      }));
  });
};

const aggregateMonthlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  const weeks = chunkArray(rawData, 7); // Split into weeks
  return weeks.map((week, index) => {
    const weekNumber = calculateWeekOfYear(week[week.length - 1].date); // Calculate the week number from the start of the year

    return {
      // `week` is an array!
      date: week[0].date,
      x: `W${weekNumber}`, // Monthly label: W1, W2, etc.
      ...calculateAverages(week),
    };
  });
};

const aggregateYearlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  const months = chunkArrayMonths(rawData, 30); // Split into chunks of 30 days

  return months.map((month, index) => {
    // Get the date of the first entry in this month
    const firstEntryDate = month[0].date;

    // Get the month from the first entry (zero-indexed: 0 = January, 1 = February, etc.)
    const monthIndex = firstEntryDate.getMonth();

    // To ensure each chunk gets its correct month label
    const monthLabel = MONTHLY_LABELS[monthIndex];

    return {
      date: firstEntryDate,
      x: monthLabel, // Use the correct month label based on the first date
      ...calculateAverages(month),
    };
  });
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

const calculateWeekOfYear = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.ceil((days + 1) / 7); // Adding 1 to start counting from W1
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

const VerticalDashedLineTooltip = ({
  x,
  pointsData,
}: {
  x: SharedValue<number>;
  pointsData: Record<string, PointsArray>;
}) => {
  const path = Skia.Path.Make();

  const animatedPath = usePathValue((path) => {
    'worklet';
    path.reset();
    path.moveTo(x.value, 0);
    path.lineTo(x.value, 300);
    path.dash(10, 5, 0);
  }, path);

  const rectX = useDerivedValue(() => {
    // Calculate the middle of the chart
    const midpoint = chartWidth / 2;
    const offset = 10;

    // Check if x.value has passed the middle of the chart
    if (x.value < midpoint) {
      return x.value + offset;
    }
    return x.value - 100 - offset; // x.value - rectWidth - offset
  }, [x]);
  const textX = useDerivedValue(() => rectX.value + 10, [rectX]);
  const font = useFont(poppinsSemiBold, 10);

  const numberOfItems = Object.keys(pointsData).length;
  const rectHeight = numberOfItems * 20 + 10;

  return (
    <Group>
      <SkiaPath
        path={animatedPath}
        style='stroke'
        strokeWidth={2}
        color='gray'
      />

      <SkiaRoundedRect
        x={rectX}
        y={80}
        r={10}
        width={100}
        height={rectHeight}
        color='#E9F5E5' // #A9C1A1
      />

      {/* Create the text for each displayed point */}
      {Object.entries(pointsData).map(([label, points], index) => {
        const text = useDerivedValue(() => {
          // Find the closest point to x.value
          const closestPoint = points.reduce((prev, curr) => {
            return Math.abs(curr.x - x.value) < Math.abs(prev.x - x.value)
              ? curr
              : prev;
          });

          const capitalizedLabel =
            label.charAt(0).toUpperCase() + label.slice(1);

          return `${capitalizedLabel}: ${closestPoint.yValue}`;
        }, [x.value]);

        // Render the text for each displayed point
        return (
          <SkiaText
            key={label}
            x={textX}
            y={100 + index * 20}
            text={text}
            font={font}
            color='black'
          />
        );
      })}
    </Group>
  );
};

export const WellbeingChart = ({
  rawChartData,
  displayData,
  chartTimeframe,
}: {
  rawChartData: { date: Date; values: Record<number, number> }[];
  displayData: string[];
  chartTimeframe: ChartTimeframe;
}) => {
  const font = useFont(poppinsLight, getFontSize(chartTimeframe));
  const { state, isActive } = useChartPressState({
    x: '0',
    y: {
      algeheel: 0,
      angst: 0,
      stress: 0,
      concentratie: 0,
      energie: 0,
      slaap: 0,
    },
  });

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
        break;
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
    const today = new Date(); // 2024-04-08
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

    return entryIndex !== -1
      ? Math.floor(entryIndex / 7)
      : Math.floor(data.length / 7);
  };

  const getStartPageIndexMonthly = (data: AggregatedChartData[]) => {
    const today = new Date(); // 2024-04-08
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
    const today = new Date(); // 2024-04-08
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
    MONTHLY: 0,
    YEARLY: 0,
  });

  // Get current page index based on timeframe
  const currentPage = pageIndices[chartTimeframe];

  // Calculate slice range
  const pageSize = PAGE_SIZES[chartTimeframe];
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  const totalDataLength = currentData.length;
  const maxPages = Math.ceil(totalDataLength / PAGE_SIZES[chartTimeframe]) - 1;

  // Slice data for pagination
  const paginatedData = currentData.slice(startIndex, endIndex);

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
    let startDate = null;

    const pageIndex = pageIndices[chartTimeframe];
    const pageSize = PAGE_SIZES[chartTimeframe];

    const startElementIndex = pageIndex * pageSize;
    const lastElementIndex = startElementIndex + pageSize - 1;
    const safeIndex =
      lastElementIndex >= data.length ? data.length - 1 : lastElementIndex;

    // DEBUGGING
    console.log('Page Index:', pageIndex);
    console.log('Max Pages:', maxPages);
    console.log('Start Element Index:', startElementIndex);
    console.log('Last Element Index:', lastElementIndex);
    console.log('Safe Index:', safeIndex);
    console.log('Data (Safe Index):', data[safeIndex]);

    if (safeIndex < 0 || !data[safeIndex]) {
      startDate = new Date();
    } else {
      startDate = new Date(data[safeIndex].date);
    }

    if (chartTimeframe === 'WEEKLY') {
      // Copy the date to avoid modifying the original
      const tempDate = new Date(startDate);

      // Ensure it's in UTC to avoid timezone issues
      tempDate.setUTCHours(0, 0, 0, 0);

      // Move to Thursday of the current week (ISO rule)
      tempDate.setUTCDate(
        tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7)
      );

      // Get the first Thursday of the year
      const firstThursday = new Date(tempDate.getUTCFullYear(), 0, 4);
      firstThursday.setUTCDate(
        firstThursday.getUTCDate() + 4 - (firstThursday.getUTCDay() || 7)
      );

      // Calculate the week number (difference in days divided by 7)
      const weekNumber =
        Math.ceil((tempDate.getTime() - firstThursday.getTime()) / 604800000) +
        1;

      return `${tempDate.getUTCFullYear()} - Week ${weekNumber}`;
    }

    if (chartTimeframe === 'MONTHLY') {
      return `${startDate.toLocaleString('en-US', {
        month: 'long',
      })} ${startDate.getFullYear()}`;
    }

    if (chartTimeframe === 'YEARLY') {
      return `${startDate.getFullYear()}`;
    }
  };

  const images: Record<string, SkImage | null> = {
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
    <View style={{ height: 400, width: chartWidth, padding: 25 }}>
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
        chartPressState={state}
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
          tickCount: {
            x:
              paginatedData.length > 0
                ? paginatedData.length
                : getXAxisTickCount(chartTimeframe),
            y: 5,
          },
          tickValues: {
            x: Array.from(
              {
                length:
                  paginatedData.length > 0
                    ? paginatedData.length
                    : getXAxisTickCount(chartTimeframe),
              },
              (_, i) => i
            ),
            y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        }}
        domainPadding={30}
      >
        {({ points }) => {
          const displayedPointsData = displayData.reduce((acc, key) => {
            acc[key] = points[key as LineKeys];
            return acc;
          }, {} as Record<string, PointsArray>);

          return (
            <React.Fragment>
              {Object.entries(displayedPointsData).map(
                ([label, pointsData], index) => {
                  // Filter points for this specific label
                  const filteredPointsData = pointsData.filter(
                    (point) => point.yValue !== 0
                  );

                  return (
                    <React.Fragment key={index}>
                      {/* Render the Line */}
                      <Line
                        points={filteredPointsData}
                        color={lineProperties[label].color}
                        strokeWidth={2}
                        connectMissingData={true} // @TODO Is this needed with the filled data gaps approach?
                        animate={{ type: 'timing', duration: 300 }} // @WARN This line breaks the charts on snack-expo!
                        curveType='natural'
                      />

                      {/* Render the symbols on top of each data point */}
                      {filteredPointsData.map((point, idx) => {
                        if (point.y) {
                          return (
                            <SkiaImage
                              key={idx}
                              image={images[label]}
                              x={point.x - 6} // Adjust position
                              y={point.y - 6}
                              width={12}
                              height={12}
                              fit='contain'
                            />
                          );
                        }

                        return null; // good practice for map
                      })}
                    </React.Fragment>
                  );
                }
              )}
              {/* Render the tooltip */}
              {isActive && (
                <VerticalDashedLineTooltip
                  x={state.x.position}
                  pointsData={displayedPointsData}
                />
              )}
            </React.Fragment>
          );
        }}
      </CartesianChart>

      {/* Chart Legend */}
      <View style={styles.legendContainer}>
        {displayData.map((key) => {
          if (lineProperties[key as LineKeys]) {
            return (
              <View style={styles.legendLabelContainer} key={key}>
                <Image
                  source={lineProperties[key].shape}
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
