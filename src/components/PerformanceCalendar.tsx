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

import { Divider } from 'react-native-paper';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { IDiaryEntry } from '../types';

import {
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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

const sliderTitlesAndDescriptions = [
  [
    'Algeheel gevoel',
    'Je algemene gevoel op deze dag was overwegend positief.',
  ],
  ['Angst & zorgen', 'Je ervaarde redelijk wat angst en/of zorgen deze dag.'],
  ['Stress', 'Je ervaarde weinig stress deze dag.'],
  ['Energie', 'Je had erg veel energie deze dag.'],
  ['Concentratie', 'Je had erg weinig concentratie deze dag.'],
  ['Slaap', 'Je had de nacht ervoor gemiddeld geslapen.'],
];

const textQuestions = [
  'Heb jij je vandaag ergens zorgen over gemaakt?',
  'Zijn er ook andere dingen gebeurd die je gevoel hebben beïnvloed?',
  'Heb je ook dingen vermeden?',
  'Wat heeft je vandaag dankbaar, trots of blij gemaakt?',
];

interface PerformanceCalendarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDiaryEntry: IDiaryEntry | null;
  setSelectedDiaryEntry: React.Dispatch<
    React.SetStateAction<IDiaryEntry | null>
  >;
}

export const PerformanceCalendar: React.FC<PerformanceCalendarProps> = ({
  isOpen,
  setIsOpen,
  selectedDiaryEntry,
  setSelectedDiaryEntry,
}) => {
  const navigation = useNavigation();
  const { diaryEntries } = useContext(DiaryContext);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<string>('');
  const [displayTime, setDisplayTime] = useState<string>('');

  const [sliderQuestionIndex, setSliderQuestionIndex] = useState<number>(0);
  const [textQuestionIndex, setTextQuestionIndex] = useState<number>(0);

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

  const handlePreviousSlider = () => {
    if (sliderQuestionIndex !== 0) {
      setSliderQuestionIndex(sliderQuestionIndex - 1);
    }
  };

  const handleNextSlider = () => {
    // @ts-ignore
    if (sliderQuestionIndex === selectedDiaryEntry?.sliderValues.size - 1) {
      setSliderQuestionIndex(0);
    } else {
      setSliderQuestionIndex(sliderQuestionIndex + 1);
    }
  };

  const handlePreviousText = () => {
    if (textQuestionIndex !== 0) {
      setTextQuestionIndex(textQuestionIndex - 1);
    }
  };

  const handleNextText = () => {
    // @ts-ignore
    if (textQuestionIndex === selectedDiaryEntry?.textValues.size - 1) {
      setTextQuestionIndex(0);
    } else {
      setTextQuestionIndex(textQuestionIndex + 1);
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
      selectedColor: '#A9C1A1',
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
      <CalendarProvider
        style={{
          marginTop: 40,
          // Shadow Test
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
        date={getFormattedDate(selectedDate)}
      >
        <ExpandableCalendar
          calendarWidth={windowWidth - 2 * 20}
          style={{ borderRadius: 30, overflow: 'hidden' }}
          theme={{
            todayTextColor: 'black',
            selectedDayTextColor: 'white',
            selectedDayBackgroundColor: '#A9C1A1',
            textMonthFontFamily: 'Poppins-Medium',
            textDayFontFamily: 'Poppins-Regular',
            arrowColor: 'black',
            monthTextColor: 'black',
            // @ts-ignore
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
          monthFormat='MMMM yyyy'
          hideArrows={isOpen ? false : true}
          firstDay={1}
          closeOnDayPress={true}
          onCalendarToggled={(isOpen) => setIsOpen(isOpen)}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Feather
                name='chevron-left'
                size={24}
                color='black'
                style={{ marginLeft: 40 }}
              />
            ) : (
              <Feather
                name='chevron-right'
                size={24}
                color='black'
                style={{ marginRight: 40 }}
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
        <View
          style={[
            {
              marginTop: 40,
              backgroundColor: 'white',
              borderRadius: 30,
              // Shadow Test
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}
        >
          <View style={styles.dataHeadersContainer}>
            <Text style={styles.dataTitleText}>
              Datum:
              <Text
                style={{ ...Fonts.poppinsRegular[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayDate}
              </Text>
            </Text>
            <Text style={styles.dataTitleText}>
              Tijd van invullen:
              <Text
                style={{ ...Fonts.poppinsRegular[Platform.OS] } as TextStyle}
              >
                {' '}
                {displayTime} uur
              </Text>
            </Text>
          </View>

          {/* The Wizard of Oz Method Data Visualization */}
          <View style={styles.dataSlidersContainer}>
            <Text style={styles.dataHeadingText}>
              {sliderTitlesAndDescriptions[sliderQuestionIndex][0]}
            </Text>
            <Text style={styles.dataDescriptionText}>
              {sliderTitlesAndDescriptions[sliderQuestionIndex][1]}
            </Text>
            <Slider
              disabled={true}
              style={{ width: '100%', height: 40 }}
              value={selectedDiaryEntry?.sliderValues.get(sliderQuestionIndex)}
              minimumValue={1}
              maximumValue={10}
              thumbTintColor='#A5B79F'
              minimumTrackTintColor='#A9C1A1'
              maximumTrackTintColor='#dedede'
            />
          </View>

          {/* Slider Index Controls */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
              paddingHorizontal: 25,
            }}
          >
            <Pressable
              onPress={() => handlePreviousSlider()}
              disabled={sliderQuestionIndex == 0 ? true : false}
              style={sliderQuestionIndex == 0 ? { opacity: 0.4 } : {}}
            >
              <MaterialCommunityIcons
                name='chevron-left-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>

            <View
              style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}
            >
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        index === sliderQuestionIndex ? '#829c7a' : '#E4E1E1',
                      borderRadius: 99,
                    }}
                  ></View>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleNextSlider()}
              disabled={
                sliderQuestionIndex == selectedDiaryEntry.sliderValues.size - 1
                  ? true
                  : false
              }
              style={
                sliderQuestionIndex == selectedDiaryEntry.sliderValues.size - 1
                  ? { opacity: 0.4 }
                  : {}
              }
            >
              <MaterialCommunityIcons
                name='chevron-right-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>
          </View>

          <Divider style={{ marginHorizontal: 30 }} bold={true} />

          <View style={{ marginTop: 30, paddingHorizontal: 25 }}>
            <Text style={styles.dataHeadingText}>Aanvullende vragen</Text>
            <Text style={styles.dataDescriptionText}>
              {textQuestions[textQuestionIndex]}
            </Text>
            <TextInput
              editable={false}
              value={selectedDiaryEntry.textValues.get(textQuestionIndex)}
              style={styles.dataTextInputContainer}
              multiline={true}
            ></TextInput>
          </View>

          {/* Text Index Controls */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
              paddingHorizontal: 25,
            }}
          >
            <Pressable
              onPress={() => handlePreviousText()}
              disabled={textQuestionIndex == 0 ? true : false}
              style={textQuestionIndex == 0 ? { opacity: 0.4 } : {}}
            >
              <MaterialCommunityIcons
                name='chevron-left-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>

            <View
              style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}
            >
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        index === textQuestionIndex ? '#829c7a' : '#E4E1E1',
                      borderRadius: 99,
                    }}
                  ></View>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleNextText()}
              disabled={
                textQuestionIndex == selectedDiaryEntry.textValues.size - 1
                  ? true
                  : false
              }
              style={
                textQuestionIndex == selectedDiaryEntry.textValues.size - 1
                  ? { opacity: 0.4 }
                  : {}
              }
            >
              <MaterialCommunityIcons
                name='chevron-right-circle-outline'
                size={27}
                color='black'
              />
            </Pressable>
          </View>

          {/* Edit Button */}
          <Pressable
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('Diary2', { date: selectedDate })
            }
          >
            <Text style={styles.editButtonText}>Pas gegevens aan</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            marginTop: 40,
            backgroundColor: 'white',
            borderRadius: 30,
            // Shadow Test
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
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
    marginTop: 30,
  },
  dataSlidersContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  dataTitleText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  dataHeadingText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
    marginBottom: 5,
  } as TextStyle,
  dataDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  noDataContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  noDataTitleText: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  noDataDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  diaryButton: {
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
    backgroundColor: '#5c6b57',
  },
  diaryButtonText: {
    ...Fonts.poppinsBold[Platform.OS],
    color: 'white',
    fontSize: 12,
  } as TextStyle,
  editButton: {
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 13,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 25,
    backgroundColor: '#5c6b57',
  },
  editButtonText: {
    ...Fonts.poppinsBold[Platform.OS],
    color: 'white',
    fontSize: 12,
  } as TextStyle,
  dataTextInputContainer: {
    fontSize: 14,
    height: 150,
    ...Fonts.poppinsRegular[Platform.OS],
    borderRadius: 10,
    paddingTop: 20,
    paddingLeft: 20,
    marginTop: 20,
    backgroundColor: '#F6F7F8',
  } as TextStyle,
});
