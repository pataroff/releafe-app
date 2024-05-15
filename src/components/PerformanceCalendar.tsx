import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextStyle,
  Dimensions,
} from 'react-native';

import {
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';

import { ChevronLeft, ChevronRight } from 'react-native-feather';
import { Fonts } from '../styles';

import Slider from '@react-native-community/slider';
import { DiaryContext } from '../context/DiaryContext';
import { IDiaryEntry } from '../types';

LocaleConfig.locales['nl'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mrt',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
  ],
  dayNamesShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  today: 'Vandaag',
};

LocaleConfig.defaultLocale = 'nl';

const windowWidth = Dimensions.get('window').width;

export const PerformanceCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { diaryEntries } = useContext(DiaryContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDiaryEntry, setSelectedDiaryEntry] =
    useState<IDiaryEntry | null>();

  const [displayDate, setDisplayDate] = useState<string>();
  const [displayTime, setDisplayTime] = useState<string>();

  useEffect(() => {
    initializeCalendar();
  }, []);

  const initializeCalendar = () => {
    const initialDiaryEntry = diaryEntries.find(
      (entry) =>
        getFormattedDate(entry.createdAt) === getFormattedDate(selectedDate)
    );

    setSelectedDiaryEntry(initialDiaryEntry);

    if (initialDiaryEntry) {
      setDisplayDate(getFormattedDisplayDate(initialDiaryEntry.createdAt));
      setDisplayTime(getFormattedDisplayTime(initialDiaryEntry.createdAt));
    } else {
      console.log(
        'No initialization diary entry found for selected date: ',
        getFormattedDate(selectedDate)
      );
    }
  };

  const handleSelect = (selectedDay: string) => {
    const matchedEntry = diaryEntries.find(
      (entry) => entry.createdAt.toISOString().slice(0, 10) === selectedDay
    );

    if (matchedEntry) {
      setSelectedDate(matchedEntry.createdAt);
      setSelectedDiaryEntry(matchedEntry);
      setDisplayDate(getFormattedDisplayDate(matchedEntry.createdAt));
      setDisplayTime(getFormattedDisplayTime(matchedEntry.createdAt));
    } else {
      setSelectedDate(new Date(selectedDay)); // convert to date, then convert back to iso?
      setSelectedDiaryEntry(null); // if no diary entry, set to null?
      console.log('No diary entry found for selected date: ', selectedDay);
    }
  };

  const getFormattedDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const getFormattedDisplayDate = (date: Date) => {
    return date.toLocaleString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const getFormattedDisplayTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', {
      timeStyle: 'short',
    });
  };
  return (
    <>
      <CalendarProvider date={getFormattedDate(selectedDate)}>
        <ExpandableCalendar
          theme={{
            todayTextColor: 'black',
            selectedDayTextColor: 'white',
            selectedDayBackgroundColor: 'black',
            textMonthFontFamily: 'Poppins-Medium',
            textDayFontFamily: 'Poppins-Regular',
            arrowColor: 'black',
            monthTextColor: 'black',
            'stylesheet.dot': {
              dot: {
                position: 'absolute',
                top: -5,
                width: 7,
                height: 7,
                borderRadius: 30,
              },
            },
          }}
          monthFormat='MMMM'
          // initialPosition={ExpandableCalendar.positions.CLOSED}
          hideArrows={isOpen ? false : true}
          hideExtraDays={true}
          // hideDayNames={true} // This bugs the week view when enabled!
          allowShadow={false}
          firstDay={1}
          closeOnDayPress={false}
          onCalendarToggled={() => setIsOpen(!isOpen)}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <ChevronLeft color='black' style={{ marginLeft: 75 }} />
            ) : (
              <ChevronRight color='black' style={{ marginRight: 75 }} />
            )
          }
          onDayPress={(day) => {
            handleSelect(day.dateString);
          }}
          markingType='custom'
          markedDates={{
            ['2024-05-01']: {
              marked: true,
              dotColor: '#ef4848',
            },
            ['2024-05-02']: {
              marked: true,
              dotColor: '#ddb354',
            },
            ['2024-05-03']: {
              marked: true,
              dotColor: '#8cab76',
            },
            ['2024-05-04']: {
              marked: true,
              dotColor: '#ce6957',
            },
            ['2024-05-05']: {
              marked: true,
              dotColor: '#4aed94',
            },
            ['2024-05-06']: {
              marked: true,
              dotColor: '#6bcc85',
            },
            ['2024-05-07']: {
              marked: true,
              dotColor: '#d1cd79',
            },
            [getFormattedDate(selectedDate)]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'black',
              selectedTextColor: 'white',
            },
          }}
        />
      </CalendarProvider>

      {selectedDiaryEntry && (
        <View style={{ marginTop: 310 }}>
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>Datum: {displayDate}</Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen: {displayTime} uur{' '}
            </Text>
          </View>

          {/* The Wizard of Oz Method Data Visualization */}
          <View style={styles.dataSlidersContainer}>
            <Text style={[styles.dataHeadingText, { fontSize: 18 }]}>
              Algemene stemming
            </Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(0)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Angstniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(1)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Stressniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(2)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Energieniveau</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(3)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Focus en concentratie</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(4)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='#000000'
              maximumTrackTintColor='#dedede'
            />
            <Text style={styles.dataHeadingText}>Slaap</Text>
            <Slider
              disabled={true}
              style={{ width: windowWidth - 2 * 40, height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(5)}
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor='black'
              maximumTrackTintColor='#dedede'
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dataHeadersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 50,
  },
  dataSlidersContainer: {
    width: windowWidth,
    paddingHorizontal: 30,
    marginTop: 40,
  },
  dataTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  dataHeadingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
});
