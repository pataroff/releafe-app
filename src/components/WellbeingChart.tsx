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
  ChartPressState,
} from 'victory-native';
import {
  Skia,
  useFont,
  useFonts,
  Image as SkiaImage,
  Path as SkiaPath,
  useImage,
  SkImage,
  usePathValue,
  Group,
  RoundedRect as SkiaRoundedRect,
  Text as SkiaText,
  Paragraph as SkiaParagraph,
  TextAlign,
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
// @ts-expect-error
import sofiaProLight from '../../assets/fonts/SofiaProLight.ttf';

interface AggregatedChartData {
  date: Date;
  x: string;
  [key: string]: string | number | Date;
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
  'Maart',
  'Apr',
  'Mei',
  'Juni',
  'Juli',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dec',
];

// @TODO Move this to 'types.ts'!
type LineKeys = keyof typeof lineProperties;

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

  // If no explicit startDate provided, infer from the data
  const start = startDate ?? sortedData[0].date;

  // If no endDate provided, calculate end of current week
  if (!endDate) {
    const today = new Date();
    const dayOfWeek = today.getUTCDay(); // 0 = Sunday, 1 = Monday
    const daysUntilEndOfWeek = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    endDate = new Date(today);
    endDate.setDate(today.getDate() + daysUntilEndOfWeek);
    endDate.setHours(23, 59, 59, 999); // End of day
  }

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

  while (currentDate <= endDate) {
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

const fillMissingMonths = (
  rawData: { date: Date; values: Record<number, number> }[],
  startDate: Date,
  endDate: Date
) => {
  if (rawData.length === 0) return [];

  // Create a map of existing data
  const dataMap = new Map();
  rawData.forEach((entry) => {
    const key = `${entry.date.getFullYear()}-${entry.date.getMonth()}`;
    if (!dataMap.has(key)) {
      dataMap.set(key, []);
    }
    dataMap.get(key).push(entry);
  });

  const filledData = [];
  let currentDate = new Date(startDate);

  // For yearly view, we want to fill until the end of the year
  const adjustedEndDate = new Date(endDate);
  if (endDate.getMonth() < 11) {
    adjustedEndDate.setMonth(11); // Set to December
    adjustedEndDate.setDate(31); // Set to last day of December
  }

  // Iterate through each month in the range
  while (currentDate <= adjustedEndDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const key = `${year}-${month}`;

    if (dataMap.has(key)) {
      // Use existing data for this month
      filledData.push(...dataMap.get(key));
    } else {
      // Fill with zero values
      filledData.push({
        date: new Date(year, month, 1),
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

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return filledData.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const aggregateWeeklyData = (
  rawData: { date: Date; values: Record<number, number> }[]
) => {
  // Fill missing days including up to the end of the current week
  const filledData = fillMissingDays(rawData);
  const weeks = chunkArray(filledData, 7, 'week');

  return weeks.flatMap((week) => {
    return week
      .map((day) => {
        const dayIndex = day.date.getUTCDay(); // Using UTC day to avoid timezone issues
        const shiftedIndex = (dayIndex + 6) % 7; // Shifted to make Monday = 0

        return {
          date: day.date,
          x: shiftedIndex, // Sort by shifted index
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
        x: WEEKLY_LABELS[entry.x], // Map shifted index to your labels (Monday = 'ma', etc.)
      }));
  });
};

const aggregateMonthlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  const filledData = fillMissingWeeksForMonths(rawData);
  if (filledData.length > 0) {
    const weeks = chunkArrayWeeks(filledData);
    return weeks.map((week, index) => {
      const weekNumber = calculateISOWeek(week[0].date);

      return {
        // `week` is an array!
        date: week[0].date,
        x: `W${weekNumber}`, // Monthly label: W1, W2, etc.
        ...calculateAverages(week),
      };
    });
  }
};

const aggregateYearlyData = (
  rawData: {
    date: Date;
    values: Record<number, number>;
  }[]
) => {
  if (rawData.length === 0) return [];

  // Sort data by date
  const sortedData = [...rawData].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  // Get the date range
  const firstDate = new Date(sortedData[0].date);
  const lastDate = new Date();

  // Set to start of first year
  const startDate = new Date(firstDate.getFullYear(), 0, 1);

  // For end date, if we're not in December, extend to end of year
  const endDate = new Date(lastDate);
  if (endDate.getMonth() < 11) {
    endDate.setMonth(11);
    endDate.setDate(31);
  }

  // Fill missing months across all years
  const filledData = fillMissingMonths(sortedData, startDate, endDate);

  // Group by year-month and calculate averages
  const monthlyData = new Map();
  filledData.forEach((entry) => {
    const date = new Date(entry.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthlyData.has(key)) {
      monthlyData.set(key, []);
    }
    monthlyData.get(key).push(entry);
  });

  // Convert to final format
  const result: AggregatedChartData[] = Array.from(monthlyData.entries()).map(
    ([key, entries]) => {
      const [year, month] = key.split('-').map(Number);
      return {
        date: new Date(year, month, 1),
        x: MONTHLY_LABELS[month],
        ...calculateAverages(entries),
      };
    }
  );

  // Sort by date
  return result.sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Helper to split array into chunks
const chunkArray = (
  data: { date: Date; values: Record<number, number> }[],
  size: number,
  mode: 'week' | 'month' | 'default' = 'default'
) => {
  // Sort the data first
  const sortedData = [...data].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  if (mode === 'week') {
    const weeks: { date: Date; values: Record<number, number> }[][] = [];

    if (sortedData.length === 0) return weeks;

    // Clone the data map for easy lookup
    const dateMap = new Map<
      string,
      { date: Date; values: Record<number, number> }
    >();
    sortedData.forEach((entry) => {
      const key = entry.date.toISOString().split('T')[0];
      dateMap.set(key, entry);
    });

    // Start from the first Monday before or on the first date
    const firstDate = sortedData[0].date;
    const firstDayOfWeek = (firstDate.getDay() + 6) % 7; // Monday=0 ... Sunday=6
    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - firstDayOfWeek);

    // End at the last Sunday after or on the last date
    const lastDate = sortedData[sortedData.length - 1].date;
    const lastDayOfWeek = (lastDate.getDay() + 6) % 7;
    const endDate = new Date(lastDate);
    endDate.setDate(endDate.getDate() + (6 - lastDayOfWeek));

    // Iterate from startDate to endDate, adding days into weeks
    let currentWeek: { date: Date; values: Record<number, number> }[] = [];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0];

      const entry = dateMap.get(dateKey) ?? {
        date: new Date(currentDate),
        values: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      };

      currentWeek.push(entry);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks;
  }

  // Fallback for non-week modes (same as before)
  return Array.from({ length: Math.ceil(sortedData.length / size) }, (_, i) =>
    sortedData.slice(i * size, (i + 1) * size)
  );
};

// Function to chunk the array by ISO week
const chunkArrayWeeks = (
  data: { date: Date; values: Record<number, number> }[]
) => {
  const chunked: { date: Date; values: Record<number, number> }[][] = [];
  let currentWeek: { date: Date; values: Record<number, number> }[] = [];

  // Start with the first date
  let previousISOWeek = calculateISOWeek(data[0].date);

  data.forEach((entry) => {
    const currentISOWeek = calculateISOWeek(entry.date);

    // If the current date is in the same ISO week as the previous one, add it to the current chunk
    if (currentISOWeek === previousISOWeek) {
      currentWeek.push(entry);
    } else {
      // Otherwise, push the current week to chunked array and start a new chunk
      if (currentWeek.length > 0) {
        chunked.push(currentWeek);
      }
      currentWeek = [entry]; // Start a new chunk with the current day
      previousISOWeek = currentISOWeek;
    }
  });

  // Don't forget to push the last week group if it has data
  if (currentWeek.length > 0) {
    chunked.push(currentWeek);
  }

  return chunked;
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
  // Mapping the numeric indices to the keys
  const keyMap = [
    'algeheel',
    'angst',
    'stress',
    'energie',
    'concentratie',
    'slaap',
  ] as const;

  type MetricKey = (typeof keyMap)[number];

  // Initialize accumulators for each metric
  const sums: Record<MetricKey, number> = {
    algeheel: 0,
    angst: 0,
    stress: 0,
    energie: 0,
    concentratie: 0,
    slaap: 0,
  };

  const counts: Record<MetricKey, number> = {
    algeheel: 0,
    angst: 0,
    stress: 0,
    energie: 0,
    concentratie: 0,
    slaap: 0,
  };

  // Sum values and count non-zero entries for each metric
  group.forEach((entry) => {
    Object.entries(entry.values).forEach(([index, value]) => {
      const key = keyMap[Number(index)];
      if (key) {
        sums[key] += value;
        if (value !== 0) {
          counts[key]++;
        }
      }
    });
  });

  // Calculate average for each metric based on its own count of non-zero values
  const averages: Record<MetricKey, number> = { ...sums };
  (Object.keys(averages) as MetricKey[]).forEach((key) => {
    averages[key] = counts[key] ? Math.round(sums[key] / counts[key]) : 0;
  });

  return averages;
};

const calculateISOWeek = (date: Date): number => {
  const tempDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  // Move date to Thursday in current week
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));

  // Find first day of the year
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  // Calculate full weeks to this date
  const weekNo = Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  return weekNo;
};

// Helper function: Get ISO week number
const getISOWeek = (date: Date): number => {
  const target = new Date(date.valueOf());
  target.setUTCHours(0, 0, 0, 0);

  // Thursday in current week decides the year.
  target.setUTCDate(target.getUTCDate() + 3 - ((target.getUTCDay() + 6) % 7));

  // January 4 is always in week 1.
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const weekNumber =
    1 +
    Math.round(
      ((target.getTime() - firstThursday.getTime()) / 86400000 -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7
    );

  return weekNumber;
};

// Helper function: Get first ISO week number that intersects with a month
const getFirstISOWeekOfMonth = (year: number, month: number): number => {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  return getISOWeek(firstDayOfMonth);
};

// Helper function: Get last ISO week number that intersects with a month
const getLastISOWeekOfMonth = (year: number, month: number): number => {
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0)); // last day of month
  return getISOWeek(lastDayOfMonth);
};

// Helper function: Get Monday date for a given ISO week
const getDateOfISOWeek = (week: number, year: number): Date => {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const ISOweekStart = simple;
  if (dow <= 4) {
    ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  } else {
    ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  }
  ISOweekStart.setUTCHours(0, 0, 0, 0);
  return ISOweekStart;
};
const fillMissingWeeksForMonths = (
  rawData: { date: Date; values: Record<number, number> }[]
) => {
  if (rawData.length === 0) return [];

  // Sort data by date
  const sortedData = rawData
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Find the first and last date in the dataset
  const firstDate = sortedData[0].date;
  const lastDate = new Date();

  // Initialize the current working month and year
  let currentDate = new Date(firstDate);

  const result = [];

  // Iterate through all months from the first date to the last date
  while (currentDate <= lastDate) {
    const targetYear = currentDate.getUTCFullYear();
    const targetMonth = currentDate.getUTCMonth(); // 0 = January, 1 = February, etc.

    // Get first and last ISO weeks for the current month
    const firstISOWeek = getFirstISOWeekOfMonth(targetYear, targetMonth);
    const lastISOWeek = getLastISOWeekOfMonth(targetYear, targetMonth);

    // Adjust for year transition in December if the last ISO week goes into the next year
    let endDate;
    if (targetMonth === 11 && lastISOWeek === 1) {
      // For December, check if the last ISO week is actually in January of the next year
      endDate = getDateOfISOWeek(lastISOWeek, targetYear + 1);
      endDate.setUTCDate(endDate.getUTCDate() + 6); // Sunday of the last ISO week
    } else {
      // Normal case for other months
      endDate = getDateOfISOWeek(lastISOWeek, targetYear);
      endDate.setUTCDate(endDate.getUTCDate() + 6); // Sunday
    }

    endDate.setUTCHours(23, 59, 59, 999); // Make sure it's the last moment of the day

    // Get the Monday of the first ISO week
    const startDate = getDateOfISOWeek(firstISOWeek, targetYear);

    // Fill missing days for the current month
    const filledData = fillMissingDays(sortedData, startDate, endDate);
    result.push(...filledData);

    // Move to the next month
    currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);

    // @TODO: Edge case handling, better way of handling?
    if (currentDate > lastDate) {
      const targetYear = currentDate.getUTCFullYear();
      const targetMonth = currentDate.getUTCMonth(); // 0 = January, 1 = February, etc.

      // Get first and last ISO weeks for the current month
      const firstISOWeek = getFirstISOWeekOfMonth(targetYear, targetMonth);
      const lastISOWeek = getLastISOWeekOfMonth(targetYear, targetMonth);

      // Adjust for year transition in December if the last ISO week goes into the next year
      let endDate;
      if (targetMonth === 11 && lastISOWeek === 1) {
        // For December, check if the last ISO week is actually in January of the next year
        endDate = getDateOfISOWeek(lastISOWeek, targetYear + 1);
        endDate.setUTCDate(endDate.getUTCDate() + 6); // Sunday of the last ISO week
      } else {
        // Normal case for other months
        endDate = getDateOfISOWeek(lastISOWeek, targetYear);
        endDate.setUTCDate(endDate.getUTCDate() + 6); // Sunday
      }

      endDate.setUTCHours(23, 59, 59, 999); // Make sure it's the last moment of the day

      // Get the Monday of the first ISO week
      const startDate = getDateOfISOWeek(firstISOWeek, targetYear);

      // Fill missing days for the current month
      const filledData = fillMissingDays(sortedData, startDate, endDate);
      result.push(...filledData);
    }
  }

  return result;
};

const getISOWeekYear = (date: Date) => {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return d.getUTCFullYear();
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

          return `${capitalizedLabel}: ${
            closestPoint.yValue === 0 ? '-' : closestPoint.yValue
          }`;
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

// Add these helper functions at the top level
const getMonthData = (
  data: AggregatedChartData[],
  year: number,
  month: number
) => {
  // Get the first and last day of the month
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));

  // Get ISO week numbers for first and last day
  const firstWeek = getISOWeek(firstDayOfMonth);
  const lastWeek = getISOWeek(lastDayOfMonth);

  // Handle December-January transition
  const firstWeekYear = getISOWeekYear(firstDayOfMonth);
  const lastWeekYear = getISOWeekYear(lastDayOfMonth);

  // Get data for the current month
  const monthData = data.filter((entry) => {
    const entryDate = new Date(entry.date);
    const entryWeek = getISOWeek(entryDate);
    const entryWeekYear = getISOWeekYear(entryDate);

    if (firstWeekYear === lastWeekYear) {
      // Normal case - all weeks in same year
      return (
        entryWeekYear === firstWeekYear &&
        entryWeek >= firstWeek &&
        entryWeek <= lastWeek
      );
    } else {
      // Year transition case (December-January)
      return (
        (entryWeekYear === firstWeekYear && entryWeek >= firstWeek) ||
        (entryWeekYear === lastWeekYear && entryWeek <= lastWeek)
      );
    }
  });

  // Check if we only have data from a single week
  if (monthData.length > 0) {
    const uniqueWeeks = new Set(
      monthData.map((entry) => getISOWeek(new Date(entry.date)))
    );

    // If we only have one week of data
    if (uniqueWeeks.size === 1) {
      const weekNumber = Array.from(uniqueWeeks)[0];

      // Check if this week is the last week of current month and first week of next month
      const isLastWeekOfMonth = weekNumber === lastWeek;
      const isFirstWeekOfNextMonth =
        weekNumber ===
        getFirstISOWeekOfMonth(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1
        );

      // If it's a shared week, skip this month by returning empty data
      if (isLastWeekOfMonth && isFirstWeekOfNextMonth) {
        return [];
      }
    }
  }

  return monthData;
};

// Restore the getXAxisTickCount function
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

// Define ChartPressStateType
interface ChartPressStateType {
  x: string;
  y: Record<LineKeys, number>;
}

// Update type definitions
type ChartKeys = LineKeys | 'x';
type ChartDataPoint = {
  [K in ChartKeys]: K extends 'x' ? string : number;
} & {
  date: Date;
};

// Helper function to find the earliest and latest months with data
const findDataBoundaries = (data: AggregatedChartData[]) => {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const firstDate = new Date(sortedData[0].date);
  const lastDate = new Date(); // Use current date as the latest boundary

  return {
    earliestYear: firstDate.getFullYear(),
    earliestMonth: firstDate.getMonth(),
    latestYear: lastDate.getFullYear(),
    latestMonth: lastDate.getMonth(),
  };
};

// Helper function to check if a month has data
const hasDataForMonth = (
  data: AggregatedChartData[],
  year: number,
  month: number
) => {
  const monthData = getMonthData(data, year, month);
  return (
    monthData &&
    monthData.length > 0 &&
    monthData.some((entry) =>
      Object.values(entry).some(
        (value) => typeof value === 'number' && value > 0
      )
    )
  );
};

// Helper function to find the previous month with data
const findPreviousMonthWithData = (
  data: AggregatedChartData[],
  year: number,
  month: number
) => {
  const boundaries = findDataBoundaries(data);
  if (!boundaries) return null;

  let prevMonth = month;
  let prevYear = year;

  while (
    prevYear >= boundaries.earliestYear &&
    (prevYear > boundaries.earliestYear || prevMonth > boundaries.earliestMonth)
  ) {
    prevMonth--;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    if (hasDataForMonth(data, prevYear, prevMonth)) {
      return { year: prevYear, month: prevMonth };
    }
  }
  return null;
};

// Helper function to find the next month with data
const findNextMonthWithData = (
  data: AggregatedChartData[],
  year: number,
  month: number
) => {
  const boundaries = findDataBoundaries(data);
  if (!boundaries) return null;

  let nextMonth = month;
  let nextYear = year;

  while (
    nextYear <= boundaries.latestYear &&
    (nextYear < boundaries.latestYear || nextMonth < boundaries.latestMonth)
  ) {
    nextMonth++;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }

    if (hasDataForMonth(data, nextYear, nextMonth)) {
      return { year: nextYear, month: nextMonth };
    }
  }
  return null;
};

export const WellbeingChart = ({
  rawChartData,
  displayData,
  chartTimeframe,
}: {
  rawChartData: { date: Date; values: Record<number, number> }[];
  displayData: LineKeys[];
  chartTimeframe: ChartTimeframe;
}) => {
  const customFontMgr = useFonts({
    SofiaPro: [
      require('../../assets/fonts/SofiaProLight.ttf'),
      require('../../assets/fonts/SofiaProRegular.ttf'),
      require('../../assets/fonts/SofiaProBold.ttf'),
    ],
  });
  const font = useFont(sofiaProLight, getFontSize(chartTimeframe));
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
  }, [rawChartData]); // Only recompute if there are chartData changes

  const handleTimeframe = (chartTimeframe: ChartTimeframe) => {
    switch (chartTimeframe) {
      case ChartTimeframe.Weekly:
        return aggregatedChartData.WEEKLY_DATA || [];
      case ChartTimeframe.Monthly:
        return aggregatedChartData.MONTHLY_DATA || [];
      case ChartTimeframe.Yearly:
        return aggregatedChartData.YEARLY_DATA || [];
      default:
        return aggregatedChartData.WEEKLY_DATA || [];
    }
  };

  const currentChartData = useMemo(() => {
    return handleTimeframe(chartTimeframe); // Will return an empty array if undefined
  }, [chartTimeframe, aggregatedChartData]); // Recompute when chartTimeframe or aggregatedChartData change

  // Update pageIndices after the data is aggregated
  useEffect(() => {
    // Only update page indices if the data has changed or is now available
    if (currentChartData.length > 0) {
      setPageIndices((prev) => ({
        ...prev,
        [chartTimeframe]: getStartPageIndex(currentChartData, chartTimeframe),
      }));
    }
  }, [aggregatedChartData, chartTimeframe, currentChartData]); // Dependencies should trigger whenever relevant data changes

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const getStartPageIndex = (
    data: AggregatedChartData[],
    timeframe: ChartTimeframe
  ) => {
    const today = new Date(); // Current date
    const currentMonth = today.getMonth(); // Current month
    const currentYear = today.getFullYear(); // Current year
    let entryIndex = -1;

    switch (timeframe) {
      case ChartTimeframe.Weekly:
        // Adjust date to match the start of the current week (e.g., Monday)
        const weekStart = new Date(today);
        // const dayOfWeek = today.getDay();
        // const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If today is Sunday (0), subtract 6 days to get Monday
        // weekStart.setDate(today.getDate() - daysToSubtract);
        // weekStart.setHours(0, 0, 0, 0);

        // Find the first entry for the same week
        entryIndex = data.findIndex(
          (entry) =>
            getFormattedDate(new Date(entry.date)) ===
            getFormattedDate(weekStart)
        );
        return entryIndex !== -1
          ? Math.floor(entryIndex / 7)
          : Math.floor(data.length / 7);

      case ChartTimeframe.Monthly:
        // Find the first entry in the current month and year
        entryIndex = data.findIndex((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getMonth() === currentMonth &&
            entryDate.getFullYear() === currentYear
          );
        });
        return entryIndex !== -1
          ? Math.floor(entryIndex / 5)
          : Math.floor(data.length / 5);

      case ChartTimeframe.Yearly:
        // Find the first entry in the current year
        entryIndex = data.findIndex((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate.getFullYear() === currentYear;
        });
        return entryIndex !== -1
          ? Math.floor(entryIndex / 12)
          : Math.floor(data.length / 12);

      default:
        return 0; // Fallback, return 0 if no matching timeframe
    }
  };
  // PAGINATION
  const PAGE_SIZES = {
    WEEKLY: 7, // Show one full week
    MONTHLY: 5, // Show 5 weeks (approx. one month) // @TODO This value should be dynamically calculated iso weeks in a month!
    YEARLY: 12, // Show 12 months at a time
  };

  // State for pagination
  const [pageIndices, setPageIndices] = useState({
    WEEKLY: 0,
    MONTHLY: 0,
    YEARLY: 0,
  });

  // Step 1: Calculate initial pageSize (used for the first page)
  let pageSize = useMemo(() => {
    if (!currentChartData || currentChartData.length === 0) return 0;

    if (chartTimeframe === 'MONTHLY') {
      let paginationDate = currentChartData[0].date;
      const currentYear = paginationDate.getUTCFullYear();
      const currentMonth = paginationDate.getUTCMonth();

      const firstISOWeekThisMonth = getFirstISOWeekOfMonth(
        currentYear,
        currentMonth
      );
      const lastISOWeekThisMonth = getLastISOWeekOfMonth(
        currentYear,
        currentMonth
      );
      const firstISOWeekNextMonth = getFirstISOWeekOfMonth(
        currentYear,
        currentMonth + 1
      );
      const lastISOWeekNextMonth = getLastISOWeekOfMonth(
        currentYear,
        currentMonth + 1
      );

      let firstISOWeek = firstISOWeekThisMonth;
      let lastISOWeek = lastISOWeekThisMonth;

      const selectedMonth = currentMonth;
      const selectedYear = currentYear;

      const isShiftedToNextMonth =
        currentChartData?.filter((data) => {
          const dataDate = new Date(data.date);
          const isoWeek = getISOWeek(dataDate);
          const isoWeekYear = getISOWeekYear(dataDate);
          return (
            isoWeek >= firstISOWeek &&
            isoWeek <= lastISOWeek &&
            isoWeekYear === selectedYear
          );
        }).length === 1;

      if (isShiftedToNextMonth) {
        firstISOWeek = firstISOWeekNextMonth;
        lastISOWeek = lastISOWeekNextMonth;
      }

      let numberOfWeeksInMonth = Math.ceil(lastISOWeek - firstISOWeek + 1);

      if (isShiftedToNextMonth) {
        numberOfWeeksInMonth--;
      }

      return numberOfWeeksInMonth;
    }

    return PAGE_SIZES[chartTimeframe];
  }, [chartTimeframe, currentChartData]);

  // Step 2: Calculate startIndex (dynamically based on currentPage * pageSize)
  const currentPage = pageIndices[chartTimeframe];

  let startIndex = useMemo(() => {
    return currentPage * pageSize; // Use pageSize for initial startIndex calculation
  }, [currentPage, pageSize]);

  const endIndex = startIndex + pageSize;

  const totalDataLength = currentChartData.length;
  const maxPages = Math.ceil(totalDataLength / PAGE_SIZES[chartTimeframe]) - 1;

  let paginatedData = null;

  // Add state for month/year tracking
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Get data for the current month
  paginatedData = useMemo(() => {
    if (chartTimeframe === 'MONTHLY') {
      const monthData = getMonthData(
        currentChartData,
        currentYear,
        currentMonth
      );

      // If no data for current month (or only shared week), automatically move to next month
      if (monthData.length === 0) {
        // Use setTimeout to avoid state updates during render
        setTimeout(() => {
          setCurrentMonth((prev) => {
            if (prev === 11) {
              setCurrentYear((year) => year + 1);
              return 0;
            }
            return prev + 1;
          });
        }, 0);
      }

      return monthData;
    } else {
      const pageSize = PAGE_SIZES[chartTimeframe];
      const startIndex = pageIndices[chartTimeframe] * pageSize;
      const endIndex = startIndex + pageSize;
      return currentChartData?.slice(startIndex, endIndex);
    }
  }, [
    chartTimeframe,
    currentChartData,
    currentMonth,
    currentYear,
    pageIndices,
  ]);

  // Update pagination controls
  const handleNext = () => {
    if (chartTimeframe === 'MONTHLY') {
      const nextMonthData = findNextMonthWithData(
        currentChartData,
        currentYear,
        currentMonth
      );
      if (nextMonthData) {
        setCurrentYear(nextMonthData.year);
        setCurrentMonth(nextMonthData.month);
      }
    } else {
      setPageIndices((prev) => ({
        ...prev,
        [chartTimeframe]: Math.min(prev[chartTimeframe] + 1, maxPages),
      }));
    }
  };

  const handlePrev = () => {
    if (chartTimeframe === 'MONTHLY') {
      const prevMonthData = findPreviousMonthWithData(
        currentChartData,
        currentYear,
        currentMonth
      );
      if (prevMonthData) {
        setCurrentYear(prevMonthData.year);
        setCurrentMonth(prevMonthData.month);
      }
    } else {
      setPageIndices((prev) => ({
        ...prev,
        [chartTimeframe]: Math.max(0, prev[chartTimeframe] - 1),
      }));
    }
  };

  // Update the title generation
  const getTitle = () => {
    if (chartTimeframe === 'MONTHLY') {
      const date = new Date(currentYear, currentMonth);
      return `${date.toLocaleString('en-US', {
        month: 'long',
      })} ${currentYear}`;
    }

    if (chartTimeframe === 'WEEKLY') {
      // Find the date for the current page
      const pageSize = PAGE_SIZES[chartTimeframe];
      const startIndex = pageIndices[chartTimeframe] * pageSize;
      const currentData = currentChartData[startIndex];

      if (!currentData) {
        return `${new Date().getUTCFullYear()} - Week ${getISOWeek(
          new Date()
        )}`;
      }

      const weekNumber = calculateISOWeek(currentData.date);
      return `${currentData.date.getUTCFullYear()} - Week ${weekNumber}`;
    }

    if (chartTimeframe === 'YEARLY') {
      const pageSize = PAGE_SIZES[chartTimeframe];
      const startIndex = pageIndices[chartTimeframe] * pageSize;
      const currentData = currentChartData[startIndex];
      return currentData
        ? `${new Date(currentData.date).getFullYear()}`
        : `${new Date().getFullYear()}`;
    }

    return ''; // Fallback
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

  // Get the data boundaries
  const dataBoundaries = useMemo(
    () => findDataBoundaries(currentChartData),
    [currentChartData]
  );

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
          disabled={
            chartTimeframe === 'MONTHLY'
              ? !dataBoundaries ||
                !findPreviousMonthWithData(
                  currentChartData,
                  currentYear,
                  currentMonth
                )
              : pageIndices[chartTimeframe] === 0
          }
        >
          <FontAwesome5
            name='chevron-left'
            size={20}
            color={
              chartTimeframe === 'MONTHLY'
                ? !dataBoundaries ||
                  !findPreviousMonthWithData(
                    currentChartData,
                    currentYear,
                    currentMonth
                  )
                  ? 'gainsboro'
                  : 'black'
                : pageIndices[chartTimeframe] === 0
                ? 'gainsboro'
                : 'black'
            }
          />
        </Pressable>
        <Text
          style={
            { ...Fonts.sofiaProMedium[Platform.OS], fontSize: 16 } as TextStyle
          }
        >
          {getTitle()}
        </Text>
        <Pressable
          onPress={() => handleNext()}
          disabled={
            chartTimeframe === 'MONTHLY'
              ? !dataBoundaries ||
                !findNextMonthWithData(
                  currentChartData,
                  currentYear,
                  currentMonth
                )
              : pageIndices[chartTimeframe] === maxPages
          }
        >
          <FontAwesome5
            name='chevron-right'
            size={20}
            color={
              chartTimeframe === 'MONTHLY'
                ? !dataBoundaries ||
                  !findNextMonthWithData(
                    currentChartData,
                    currentYear,
                    currentMonth
                  )
                  ? 'gainsboro'
                  : 'black'
                : pageIndices[chartTimeframe] === maxPages
                ? 'gainsboro'
                : 'black'
            }
          />
        </Pressable>
      </View>
      <CartesianChart
        chartPressState={state as any}
        data={paginatedData || []}
        xKey='x'
        yKeys={
          displayData as (
            | 'algeheel'
            | 'angst'
            | 'stress'
            | 'concentratie'
            | 'energie'
            | 'slaap'
          )[]
        }
        axisOptions={{
          font,
          tickCount: {
            x: paginatedData?.length || getXAxisTickCount(chartTimeframe),
            y: 5,
          },
          tickValues: {
            x: Array.from(
              {
                length:
                  paginatedData?.length || getXAxisTickCount(chartTimeframe),
              },
              (_, i) => i
            ),
            y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        }}
        domainPadding={30}
      >
        {({ points }: { points: Record<LineKeys, PointsArray> }) => {
          const displayedPointsData = displayData.reduce((acc, key) => {
            acc[key] = points[key];
            return acc;
          }, {} as Record<LineKeys, PointsArray>);

          const allDataZero = Object.values(displayedPointsData).every(
            (pointsData) => pointsData.every((point) => point.yValue === 0)
          );

          if (allDataZero && customFontMgr !== null) {
            const paragraphBuilder = Skia.ParagraphBuilder.Make(
              {
                textAlign: TextAlign.Center,
              },
              customFontMgr
            );

            const paragraph = paragraphBuilder
              .pushStyle({
                fontFamilies: ['SofiaPro'],
                fontSize: 14,
                fontStyle: { weight: 500 },
                color: Skia.Color('black'),
                heightMultiplier: 1.25,
              })
              .addText(
                'Geen gegevens beschikbaar voor de geselecteerde periode. Vul je dagboek in om hier je voortgang te bekijken.'
              )
              .pop()
              .build();
            return (
              <SkiaParagraph
                paragraph={paragraph}
                x={55} // Adjust as needed
                y={100} // Adjust as needed
                width={200}
                color='black'
              />
            );
          }

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
          if (lineProperties[key]) {
            return (
              <View style={styles.legendLabelContainer} key={key}>
                <Image
                  source={lineProperties[key].shape}
                  style={styles.legendLabelIndicator}
                />
                <Text style={styles.legendLabelText}>
                  {lineProperties[key].label}
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
    ...Fonts.sofiaProMedium[Platform.OS],
    textTransform: 'uppercase',
    fontSize: 11,
  } as TextStyle,
});
