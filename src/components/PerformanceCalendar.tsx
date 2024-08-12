import React, { useState, useCallback, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextStyle,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';

import Feather from '@expo/vector-icons/Feather';
import { Fonts } from '../styles';

import Slider from '@react-native-community/slider';
import { DiaryContext } from '../context/DiaryContext';

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

const dotColorMap = new Map([
  [1, '#ef4848'],
  [2, '#de5950'],
  [3, '#ce6957'],
  [4, '#d1927c'],
  [5, '#d3a14f'],
  [6, '#ddb364'],
  [7, '#d1cd79'],
  [8, '#8cab76'],
  [9, '#6bcc85'],
  [10, '#4aed94'],
]);

const questions = [
  'Heb je je vandaag ergens zorgen over gemaakt?',
  'Zijn er vandaag ook andere dingen gebeurd die je gemoedstoestand hebben beïnvloed? En zo ja, hoe voelde je je daardoor?',
  'Wat heb je toen gedaan en welk effect had dit op je gemoedstoestand?',
  'Heb je ook dingen vermeden? Zo ja, waarom en hoe voelde dat?',
  'Waar ben je vandaag dankbaar voor?',
];

export const PerformanceCalendar = ({
  isOpen,
  setIsOpen,
  selectedDiaryEntry,
  setSelectedDiaryEntry,
}) => {
  const navigation = useNavigation();

  const { diaryEntries } = useContext(DiaryContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [displayDate, setDisplayDate] = useState<string>();
  const [displayTime, setDisplayTime] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      initializeCalendar();
    }, [diaryEntries])
  );

  const initializeCalendar = async () => {
    const initialDiaryEntry = diaryEntries.find(
      (entry) => getFormattedDate(entry.date) === getFormattedDate(selectedDate)
    );

    if (initialDiaryEntry) {
      setSelectedDiaryEntry(initialDiaryEntry);
      setDisplayDate(getFormattedDisplayDate(initialDiaryEntry.date));
      setDisplayTime(getFormattedDisplayTime(initialDiaryEntry.date));
    } else {
      setSelectedDiaryEntry(null);
      setDisplayDate(getFormattedDisplayDate(new Date()));
    }
  };

  const handleSelect = (selectedDay: string) => {
    const matchedEntry = diaryEntries.find(
      (entry) => entry.date.toISOString().slice(0, 10) === selectedDay
    );

    if (matchedEntry) {
      setSelectedDate(matchedEntry.date);
      setSelectedDiaryEntry(matchedEntry);
      setDisplayDate(getFormattedDisplayDate(matchedEntry.date));
      setDisplayTime(getFormattedDisplayTime(matchedEntry.date));
    } else {
      setSelectedDate(appendCurrentTime(new Date(selectedDay)));
      setSelectedDiaryEntry(null);
      setDisplayDate(getFormattedDisplayDate(new Date(selectedDay)));
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

  const getMarkedDates = () => {
    const markedDates = {};

    diaryEntries.forEach((entry) => {
      const formattedDate = getFormattedDate(entry.date);
      markedDates[formattedDate] = {
        marked: true,
        dotColor: getDotColor(entry.sliderValues.get(0)),
      };
    });

    markedDates[getFormattedDate(selectedDate)] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'black',
      selectedTextColor: 'white',
    };

    return markedDates;
  };

  const getDotColor = (index: number) => {
    return dotColorMap.get(index);
  };

  const appendCurrentTime = (date: Date) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    date.setHours(hours, minutes, seconds, milliseconds);
    return date;
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
          closeOnDayPress={true}
          // disablePan={true}
          onCalendarToggled={() => setIsOpen(!isOpen)}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Feather
                name='chevron-left'
                size={24}
                color='black'
                style={{ marginLeft: 75 }}
              />
            ) : (
              <Feather
                name='chevron-right'
                size={24}
                color='black'
                style={{ marginRight: 75 }}
              />
            )
          }
          onDayPress={(day) => {
            handleSelect(day.dateString);
          }}
          markingType='custom'
          markedDates={getMarkedDates()}
        />
      </CalendarProvider>

      {selectedDiaryEntry ? (
        <View style={isOpen ? { marginTop: 310 } : { marginTop: 155 }}>
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>
              Datum:
              <Text
                style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayDate}
              </Text>
            </Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen:
              <Text
                style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayTime} uur
              </Text>
            </Text>
            <Pressable
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('Diary2', { date: selectedDate })
              }
            >
              <Text style={styles.editButtonText}>Pas gegevens aan</Text>
            </Pressable>
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
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: 400 }}
          >
            {questions.map((question, index) => {
              return (
                <View
                  key={index}
                  style={{ width: windowWidth, paddingHorizontal: 20 }}
                >
                  <View style={styles.dataTextContainer}>
                    <Text style={styles.questionText}>{questions[index]}</Text>
                    <TextInput
                      editable={false}
                      value={selectedDiaryEntry.textValues.get(index)}
                      style={styles.dataTextInputContainer}
                      multiline={true}
                    ></TextInput>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={isOpen ? { marginTop: 310 } : { marginTop: 155 }}>
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>
              Datum:
              <Text
                style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayDate}
              </Text>
            </Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen:
              <Text
                style={{ ...Fonts.poppinsMedium[Platform.OS] } as TextStyle}
              >
                {' '}
                -
              </Text>
            </Text>
          </View>

          <View style={styles.noDataContainer}>
            <Text style={styles.noDataTitleText}>
              Nog geen gegevens beschikbaar
            </Text>
            <Text style={styles.noDataDescriptionText}>
              Vul het dagboek van deze dag alsnog {'\n'}in om jouw proces weer
              te geven
            </Text>
          </View>
          <Pressable
            style={styles.diaryButton}
            onPress={() =>
              navigation.navigate('Diary2', {
                date: selectedDate,
              })
            }
          >
            <Text style={styles.diaryButtonText}>Vul het dagboek in</Text>
          </Pressable>
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
    marginTop: 30,
  },
  dataTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 18,
  } as TextStyle,
  dataHeadingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
  noDataContainer: {
    marginTop: 40,
    width: windowWidth,
    paddingHorizontal: 60,
  },
  noDataTitleText: {
    ...Fonts.poppinsMediumItalic[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  diaryButton: {
    width: 225,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingVertical: 5,
    marginTop: 30,
  },
  diaryButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  editButton: {
    width: 175,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'black',
    paddingVertical: 5,
    marginTop: 20,
  },
  editButtonText: {
    ...Fonts.poppinsItalic[Platform.OS],
    fontSize: 12,
  } as TextStyle,
  dataTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 350,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
  },
  dataTextInputContainer: {
    fontSize: 14,
    height: 200,
    ...Fonts.poppinsRegular[Platform.OS],
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'black',
    paddingTop: 20,
    paddingLeft: 20,
    marginHorizontal: 25,
    marginBottom: 30,
  } as TextStyle,
  questionText: {
    marginTop: 30,
    paddingHorizontal: 25,
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
});
